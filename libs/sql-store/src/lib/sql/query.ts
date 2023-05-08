export const QueryTaskTakersSQL = (task_id: string, repeat_id: string) => {
  return `SELECT a.ref_task_id AS task_id, a.dispatch_id, a.ref_task_id, a.creator_id, a.taker_id, a.invite_id, a.invite_type,
  a.identity, a.state, a.operate_state, a.personal_state, a.reason, a.is_admin, a.is_dispatch, a.execute_at,
  a.personal_remind_at, a.accept_at, a.finish_time, a.cancel_at, a.revoke_at, a.exit_at, a.set_admin_at,
  a.topmost_at, a.create_at, a.update_at, a.delete_at, a.is_view, a.status, a.is_valid, 
  ${repeat_id ? `e.finish_time` : 'a.finish_time'},
  CASE WHEN a.creator_id = a.taker_id THEN 1 ELSE a.is_view END AS is_view
FROM task_dispatch a
      ${
        repeat_id
          ? `LEFT JOIN task_repeat_finish e ON e.repeat_id = ${repeat_id} AND a.taker_id = e.user_id`
          : ''
      } 
WHERE ref_task_id IN (${task_id})
AND is_valid = 1
AND status = 1
AND delete_at = 0
AND identity NOT IN (10804, 10811)
AND operate_state = 0;`
}

export const QueryTaskTreeTotal = (task_id: string) => {
  return `SELECT count(*) as task_tree_total from task_dispatch d JOIN task_config c ON c.id = d.ref_task_id WHERE instr(c.parent_id, ${task_id}) GROUP BY ref_task_id`
}

export const QueryTaskTreeCompleteTotal = (task_id: string) => {
  return `SELECT count(*) as task_tree_complete_total from task_dispatch d JOIN task_config c ON c.id = d.ref_task_id JOIN task t ON t.id = d.ref_task_id WHERE (complete_at != 0 or finish_time != 0 ) AND instr(c.parent_id, ${task_id})`
}

export const QueryTaskChildTotal = (task_id: string) => {
  return `SELECT t.id, COUNT(*) AS task_tree_total, COUNT(CASE WHEN complete_at > 0 THEN t.id END) AS task_tree_complete_total
  FROM task t
  JOIN task_config tc
  ON t.id = tc.id
  WHERE t.state = 10201
  AND t.matter_type IN (10701, 10702, 10705)
  AND INSTR(tc.parent_id, ${task_id})`
}

export const FullDoseCountSql = ({ user_id }: { user_id: string }) => {
  return `SELECT COUNT(*) AS total, COUNT(CASE WHEN finish_time = 0 THEN task_id END) AS unfinished_total,
  COUNT(CASE WHEN finish_time > 0 THEN task_id END) AS finished_total,
  COUNT(CASE WHEN creator_id = ${user_id} AND takers != '' AND takers != '${user_id}'
                 THEN task_id END) AS dispatch_total,
  COUNT(CASE WHEN creator_id != taker_id THEN task_id END) AS accepted_total,
  COUNT(CASE WHEN finish_time = 0 AND
                  (DATETIME(start_time, 'unixepoch', 'localtime') <= DATETIME('now', 'localtime') OR
                   cycle_date <= DATE('now', 'localtime')) AND
                  (end_time = 0 OR DATETIME(end_time, 'unixepoch', 'localtime') > DATETIME('now', 'localtime'))
                 THEN task_id END) AS in_progress_total,
  COUNT(CASE WHEN finish_time = 0 AND end_time > 0 AND
                  DATETIME(end_time, 'unixepoch', 'localtime') < DATETIME('now', 'localtime')
                 THEN task_id END) AS delay_total,
  COUNT(CASE WHEN takers != CAST(${user_id} AS text) THEN task_id END) AS cooperation_total,
  COUNT(CASE WHEN takers = CAST(1097162535731344 AS text) OR (takers ISNULL AND creator_id = ${user_id})
                      THEN task_id END) AS personal_total
FROM (SELECT a.id AS task_id, a.taker_id, a.cycle_date, a.start_time, a.end_time, a.creator_id, a.finish_time, takers
     FROM (SELECT a.taker_id, b.id, b.creator_id,
                  CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%Y-%m-%d', d.cycle_date, 'localtime')
                       ELSE '' END AS cycle_date, IFNULL(d.start_time, b.start_time) AS start_time,
                  IFNULL(d.end_time, b.end_time) AS end_time, IFNULL(e.finish_time, a.finish_time) AS finish_time
             FROM (SELECT ref_task_id, taker_id, finish_time
                     FROM task_dispatch
                    WHERE taker_id = ${user_id}
                      AND is_valid = 1
                      AND status = 1
                      AND delete_at = 0
                      AND personal_state IN (0, 10409, 10604, 10611)
                      AND operate_state = 0) AS a
                      LEFT JOIN task AS b
                      ON a.ref_task_id = b.id
                      LEFT JOIN task_config AS c
                      ON b.id = c.id
                      LEFT JOIN task_repeat AS d
                      ON c.id = d.task_id AND b.repeat_type > 0 AND
                         STRFTIME('%Y-%m-%d', d.cycle_date, 'localtime') <= DATETIME('now', 'localtime')
                      LEFT JOIN task_repeat_finish AS e
                      ON d.repeat_id = e.repeat_id AND e.user_id = ${user_id}
            WHERE a.ref_task_id = b.id
              AND b.state = 10201
              AND b.matter_type IN (10701, 10702, 10705)) AS a
              LEFT JOIN (SELECT GROUP_CONCAT(taker_id) AS takers, ref_task_id
                           FROM task_dispatch
                          WHERE is_valid = 1
                            AND status = 1
                            AND delete_at = 0
                            AND personal_state IN (0, 10409, 10604, 10611)
                            AND operate_state = 0
                          GROUP BY ref_task_id) aa
              ON a.id = aa.ref_task_id);`
}

export const BaseQuerySql = ({
  limit,
  where,
  order,
  user_id,
  LeftJoinRepeatAnd
}: {
  limit: string
  where?: string
  order: string
  user_id: string
  LeftJoinRepeatAnd: string // 平铺和非平铺模式下 循环事项的判断
}) => {
  return `SELECT *, CASE WHEN date ISNULL THEN 99 ELSE 0 END AS date_idx,
  CASE WHEN STRFTIME('%w', date) == '0' THEN '周日'
       WHEN STRFTIME('%w', date) == '1' THEN '周一'
       WHEN STRFTIME('%w', date) == '2' THEN '周二'
       WHEN STRFTIME('%w', date) == '3' THEN '周三'
       WHEN STRFTIME('%w', date) == '4' THEN '周四'
       WHEN STRFTIME('%w', date) == '5' THEN '周五'
       WHEN STRFTIME('%w', date) == '6' THEN '周六' END AS weekday,
       CAST(CASE WHEN start_time > 0 AND start_time_full_day = 1 THEN start_time
        WHEN start_time = 0 AND end_time > 0 AND end_time_full_day = 1 THEN end_time
        ELSE '9999999999' END AS int) AS time_idx
FROM (SELECT a.dispatch_id, a.identity, a.taker_id, a.state, a.personal_state, a.operate_state, a.id AS task_id, a.matter_type, a.repeat_type,
a.end_repeat_at, a.create_at, a.category, a.repeat_id, a.cycle, a.cycle_date, a.title, a.detail, a.files,
a.start_time, a.start_time_full_day, a.end_time, a.end_time_full_day, a.remind_at, a.widget, a.project_id,
IFNULL(f.content, '') AS conclusion, a.creator_id, a.priority_level, a.update_at, a.complete_at,
a.finish_time, CASE WHEN j.id > 0 THEN 1 ELSE 0 END AS is_follow,
CASE WHEN a.delete_at > 0 THEN 1 ELSE 0 END AS schedule_hide,
CASE WHEN a.complete_at = 0 AND (DATETIME(a.start_time, 'unixepoch', 'localtime') > DATETIME('now', 'localtime') OR
    cycle_date > DATE('now', 'localtime')) THEN 1
    WHEN a.complete_at = 0 AND (a.end_time = 0 OR DATETIME(a.end_time, 'unixepoch', 'localtime') >
    DATETIME('now', 'localtime')) THEN 2
    WHEN a.complete_at = 0 AND (a.end_time > 0 AND DATETIME(a.end_time, 'unixepoch', 'localtime') <
    DATETIME('now', 'localtime')) THEN 3
    WHEN a.complete_at > 0 AND (a.complete_at <= a.end_time OR a.end_time = 0) THEN 4
    WHEN a.complete_at > 0 AND a.end_time > 0 AND a.complete_at > a.end_time THEN 5 END AS matter_state,
w.project_name, project_creator_id, 
CASE WHEN workspace_id IS NULL THEN 0 ELSE workspace_id END AS workspace_id, workspace_name, ws_type, 
is_external_member,
IFNULL(tags, '[]') AS tags, parent_id, parent_name, IFNULL(k.taker_total, 0) AS taker_total,
IFNULL(k.child_total, 0) AS child_total, CASE WHEN zb.child_count > 0 THEN 1 ELSE 0 END AS has_child,
IFNULL(k.comment_total, 0) AS comment_total,
IFNULL(k.important_total, 0) AS important_total, IFNULL(k.quote_total, 0) AS quote_total,
IFNULL(k.file_total, 0) AS file_total, IFNULL(gadget_meeting_total, 0) AS gadget_meeting_total,
IFNULL(gadget_todo_total, 0) AS gadget_todo_total, flow_step_id, flow_step_name, flow_step_complete_at,
tag_str, application_id,
IFNULL(application_name, '') AS application_name,
case WHEN a.project_id = '' OR a.project_id = 0 THEN 1 ELSE 0 END as is_no_project,
CASE WHEN z.user_id != '' THEN 1 ELSE 0 END AS flow_step_join, flow_step_user_count, STRFTIME('%Y-%m-%d', DATETIME(date, 'unixepoch', 'localtime')) AS date, 
timestamp, admins, takers
FROM (SELECT a.dispatch_id, a.identity, a.taker_id, a.state, a.personal_state, a.operate_state, a.delete_at, b.id,
        b.matter_type, b.title, b.detail, b.priority_level, b.update_at, CASE WHEN b.files != '' THEN b.files ELSE '[]' END AS files,
        IFNULL(b.remind_at, '{}') AS remind_at, IFNULL(b.widget, '{}') AS widget, b.repeat_type, b.end_repeat_at,
        b.creator_id, b.create_at, c.category,
        CASE WHEN c.project_id > 0 THEN c.project_id ELSE 0 END AS project_id,
        CASE WHEN c.flow_step_id > 0 THEN c.flow_step_id ELSE 0 END AS flow_step_id,
        CASE WHEN c.application_id > 0 THEN c.application_id ELSE 0 END AS application_id,
        CASE WHEN JSON_VALID(c.application_json) == 1 THEN c.application_json ->> '$.name' ELSE '' END AS application_name,
        IFNULL(d.repeat_id, '') AS repeat_id, 
        IFNULL(d.cycle, 0) AS cycle,
        CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%Y-%m-%d', d.cycle_date, 'localtime') ELSE '' END AS cycle_date, 
        IFNULL(d.start_time, b.start_time) AS start_time,
        IFNULL(d.start_time_full_day, b.start_time_full_day) AS start_time_full_day,
        IFNULL(d.end_time, b.end_time) AS end_time,
        IFNULL(d.end_time_full_day, b.end_time_full_day) AS end_time_full_day,
        IFNULL(d.complete_at, b.complete_at) AS complete_at, IFNULL(e.finish_time, a.finish_time) AS finish_time,
        CASE WHEN c.flow_step_id > 0 AND b.start_time = 0 AND b.end_time = 0 THEN b.create_at + 86399
             WHEN IFNULL(d.start_time, b.start_time) > 0
                 THEN (CASE WHEN IFNULL(d.start_time_full_day, b.start_time_full_day) = 2
                                THEN IFNULL(d.start_time, b.start_time) + 86399
                            ELSE IFNULL(d.start_time, b.start_time) END)
             WHEN IFNULL(d.end_time, b.end_time) > 0 THEN IFNULL(d.end_time, b.end_time)
             ELSE (CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%s', d.cycle_date,'localtime') + 86399.5
                        ELSE b.create_at + 1000000000 END) END AS timestamp,
            CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%s', d.cycle_date, 'localtime')
              WHEN d.start_time > 0 THEN d.start_time
              WHEN b.start_time > 0 THEN b.start_time
              WHEN d.end_time > 0 THEN d.end_time
              WHEN b.end_time > 0 THEN b.end_time
              WHEN c.flow_step_id > 0 THEN (CASE WHEN c.flow_step_id > 0 THEN b.create_at
                                                  ELSE b.create_at + 1000000000 END)
              ELSE '' END AS date, parent_id, CASE WHEN b1.id > 0 THEN b1.title ELSE '' END AS parent_name
   FROM (SELECT ref_task_id, dispatch_id, identity, taker_id, state, personal_state, operate_state, delete_at,
                finish_time
           FROM task_dispatch
          WHERE taker_id = ${user_id}
            AND is_valid = 1
            AND personal_state IN (0, 10409, 10604, 10611)
            AND operate_state = 0) AS a
            LEFT JOIN task AS b
            ON a.ref_task_id = b.id
            LEFT JOIN task_config AS c
            ON b.id = c.id
            ${LeftJoinRepeatAnd}
            LEFT JOIN task b1 
            ON c.parent_id != '' AND c.category IN (0, 2) AND SUBSTR(c.parent_id, 0, INSTR(c.parent_id || ',', ',')) = b1.id
  WHERE a.ref_task_id = b.id
    AND b.state = 10201
    AND b.matter_type IN (10701, 10702, 10705)) AS a

    LEFT JOIN (SELECT GROUP_CONCAT(taker_id) AS takers, ref_task_id
                                FROM task_dispatch
                               WHERE is_valid = 1
                                  AND status = 1
                                  AND delete_at = 0
                                  AND personal_state IN (0, 10409, 10604, 10611)
                                  AND operate_state = 0
                               GROUP BY ref_task_id) aa ON a.id = aa.ref_task_id

    LEFT JOIN (SELECT GROUP_CONCAT(taker_id) AS admins, ref_task_id
          FROM task_dispatch
          WHERE is_valid = 1
                AND status = 1
                AND delete_at = 0
                AND is_admin = 1
                AND personal_state IN (0, 10409, 10604, 10611)
                AND operate_state = 0
          GROUP BY ref_task_id) ab
          ON a.id = ab.ref_task_id

    LEFT JOIN (SELECT object_id AS task_id, GROUP_CONCAT(tag_id) AS tag_str,
            '[' || GROUP_CONCAT('{"tag_id":"' || CAST(tag_id AS text) || '","name":"' || name || '","color":"' || color || '"}') || ']' AS tags
                 FROM tag ft
                          JOIN tag_bind ftb
                          ON ft.id = ftb.tag_id
                WHERE ftb.user_id = ${user_id}
                  AND ftb.state = 1
                GROUP BY object_id) ff2
    ON a.id = ff2.task_id
    LEFT JOIN task_conclusion AS f
    ON a.id = f.task_id AND f.delete_at = 0
    LEFT JOIN task_follow AS j
    ON j.user_id = ${user_id} AND j.task_id = a.id
    LEFT JOIN (SELECT fp.id AS project_id, project_name, fp.creator_id AS project_creator_id,
              fw.id AS workspace_id, fw.name AS workspace_name, fwb.ws_type, CASE WHEN fwm.member_type = 2 THEN 1 ELSE 0 END AS is_external_member
          FROM project AS fp
          LEFT JOIN workspace_bind fwb
          ON fp.id = fwb.project_id AND fwb.state = 1 AND fwb.accept_at > 0 AND (fwb.ws_type = 1 OR (fwb.ws_type = 2 AND fwb.creator_id = ${user_id} AND fp.state = 10201))
          LEFT JOIN workspace AS fw
          ON fwb.workspace_id = fw.id
          LEFT JOIN workspace_member AS fwm
          ON fw.id = fwm.workspace_id AND fwm.user_id = ${user_id} AND
             fwm.state = 10902) w
    ON a.project_id = w.project_id
    LEFT JOIN task_relation AS k
    ON a.id = k.task_id AND k.user_id = ${user_id}
    LEFT JOIN (SELECT tc.id, IFNULL(tfs.name, '') AS flow_step_name,
                      IFNULL(tfsr.complete_at, 0) AS flow_step_complete_at, IFNULL(tfsr.user_id, '') AS user_id,
                      CASE WHEN r.id > 0 THEN COUNT(*) ELSE 0 END AS flow_step_user_count
                 FROM task_config AS tc
                      LEFT JOIN task_flow_step tfs
                      ON tfs.id = tc.flow_step_id
                      LEFT JOIN task_flow_step_relation AS tfsr
                      ON tfsr.step_id = tfs.id AND tfsr.delete_at = 0 AND tfsr.user_id = ${user_id}
                      LEFT JOIN task_flow_step_relation AS r
                      ON r.step_id = tfs.id AND r.delete_at = 0
                GROUP BY tc.id, tfs.id) z
    ON a.id = z.id
    LEFT JOIN (SELECT CAST(CASE WHEN INSTR(parent_id, ',') > 0
                THEN SUBSTR(parent_id, -INSTR(parent_id, ',') + 1)
                ELSE parent_id END AS bigint) AS task_id, COUNT(*) AS child_count
                FROM task_config
                WHERE category = 2
                GROUP BY parent_id) AS zb
    ON a.id = zb.task_id)
${where || ''} 
${order}
${limit} `
}
