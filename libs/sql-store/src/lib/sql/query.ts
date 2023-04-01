export const QueryTaskTakersSQL = (task_id: string) => {
  return `SELECT taker_id, is_admin, finish_time
   FROM task_dispatch
   WHERE ref_task_id = ${task_id} AND is_valid = 1
   AND identity NOT IN (10804, 10811)
   AND operate_state = 0`
}

export const BaseQuerySql = ({
  limit,
  where,
  order,
  user_id
}: {
  limit: string
  where?: string
  order: string
  user_id: string
}) => {
  return `SELECT * FROM (SELECT a.dispatch_id, a.identity, a.state, a.personal_state, a.operate_state, a.id AS task_id, a.matter_type, a.repeat_type,
a.end_repeat_at, a.create_at, a.category, a.repeat_id, a.cycle, a.cycle_date, a.title, a.detail, a.files,
a.start_time, a.start_time_full_day, a.end_time, a.end_time_full_day, a.remind_at, a.widget, a.project_id,
IFNULL(f.content, '') AS conclusion, a.creator_id, IFNULL(i.create_at, 0) AS update_at, a.complete_at,
a.finish_time, CASE WHEN j.id > 0 THEN 1 ELSE 0 END AS is_follow,
CASE WHEN a.delete_at > 0 THEN 1 ELSE 0 END AS schedule_hide,
CASE WHEN a.complete_at = 0 AND (a.start_time > STRFTIME('%s', 'now') OR cycle_date > DATE('now')) THEN 1
     WHEN a.complete_at = 0 AND (a.end_time = 0 OR a.end_time > STRFTIME('%s', 'now')) THEN 2
     WHEN a.complete_at = 0 AND (a.end_time > 0 OR a.end_time < STRFTIME('%s', 'now')) THEN 3
     WHEN a.complete_at > 0 AND (a.complete_at <= a.end_time OR a.end_time = 0) THEN 4
     WHEN a.complete_at > 0 AND a.end_time > 0 AND a.complete_at > a.end_time THEN 5 END AS matter_state,
w.project_name, project_creator_id, workspace_id, workspace_name, ws_type, is_external_member,
IFNULL(tags, '[]') AS tags, parent_id, parent_name, IFNULL(k.taker_total, 0) AS taker_total,
IFNULL(k.child_total, 0) AS child_total, IFNULL(k.comment_total, 0) AS comment_total,
IFNULL(k.important_total, 0) AS important_total, IFNULL(k.quote_total, 0) AS quote_total,
IFNULL(k.file_total, 0) AS file_total, IFNULL(gadget_meeting_total, 0) AS gadget_meeting_total,
IFNULL(gadget_todo_total, 0) AS gadget_todo_total, flow_step_id, flow_step_name, flow_step_complete_at,
z.user_id, step_user_count, date, timestamp, application_id,
CASE WHEN STRFTIME('%w', date) == '0' THEN '周日'
     WHEN STRFTIME('%w', date) == '1' THEN '周一'
     WHEN STRFTIME('%w', date) == '2' THEN '周二'
     WHEN STRFTIME('%w', date) == '3' THEN '周三'
     WHEN STRFTIME('%w', date) == '4' THEN '周四'
     WHEN STRFTIME('%w', date) == '5' THEN '周五'
     WHEN STRFTIME('%w', date) == '6' THEN '周六' END AS weekday
FROM (SELECT a.dispatch_id, a.identity, a.taker_id, a.state, a.personal_state, a.operate_state, a.delete_at, b.id,
        b.matter_type, b.title, b.detail, CASE WHEN b.files != '' THEN b.files ELSE '[]' END AS files,
        IFNULL(b.remind_at, '{}') AS remind_at, IFNULL(b.widget, '{}') AS widget, b.repeat_type, b.end_repeat_at,
        b.creator_id, b.create_at, c.category,
        CASE WHEN c.project_id > 0 THEN c.project_id ELSE 0 END AS project_id,
        CASE WHEN c.flow_step_id > 0 THEN c.flow_step_id ELSE 0 END AS flow_step_id,
        CASE WHEN c.application_id > 0 THEN c.application_id ELSE 0 END AS application_id,
        IFNULL(d.repeat_id, '') AS repeat_id, IFNULL(d.cycle, 0) AS cycle,
        CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%Y-%m-%d', d.cycle_date) ELSE '' END AS cycle_date, 
        IFNULL(d.start_time, b.start_time) AS start_time,
        IFNULL(d.start_time_full_day, b.start_time_full_day) AS start_time_full_day,
        IFNULL(d.end_time, b.end_time) AS end_time,
        IFNULL(d.end_time_full_day, b.end_time_full_day) AS end_time_full_day,
        IFNULL(d.complete_at, b.complete_at) AS complete_at, IFNULL(e.finish_time, a.finish_time) AS finish_time,
        CASE WHEN c.flow_step_id > 0 AND b.start_time = 0 AND b.end_time = 0
                 THEN STRFTIME('%Y-%m-%d', DATETIME(b.create_at, 'unixepoch')) + 86399
             WHEN IFNULL(d.start_time, b.start_time) > 0
                 THEN (CASE WHEN IFNULL(d.start_time_full_day, b.start_time_full_day) = 2
                                THEN IFNULL(d.start_time, b.start_time) + 86399
                            ELSE IFNULL(d.start_time, b.start_time) END)
             WHEN IFNULL(d.end_time, b.end_time) > 0 THEN IFNULL(d.end_time, b.end_time)
             ELSE (CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%s', d.cycle_date) + 86399.5
                        ELSE b.create_at + 1000000000 END) END AS timestamp,
        CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%Y-%m-%d', d.cycle_date)
             WHEN d.start_time > 0 THEN STRFTIME('%Y-%m-%d', DATETIME(d.start_time, 'unixepoch'))
             WHEN b.start_time > 0 THEN STRFTIME('%Y-%m-%d', DATETIME(b.start_time, 'unixepoch'))
             WHEN d.end_time > 0 THEN STRFTIME('%Y-%m-%d', DATETIME(d.end_time, 'unixepoch'))
             WHEN b.end_time > 0 THEN STRFTIME('%Y-%m-%d', DATETIME(b.end_time, 'unixepoch'))
             WHEN c.flow_step_id > 0 THEN (CASE WHEN c.flow_step_id > 0
                                                    THEN STRFTIME('%Y-%m-%d', DATETIME(b.create_at, 'unixepoch'))
                                                ELSE STRFTIME('%Y-%m-%d',
                                                              DATETIME(b.create_at + 1000000000, 'unixepoch')) END)
             ELSE '' END AS date, CAST(SUBSTR(c.parent_id, 0, INSTR(c.parent_id, ',')) AS bigint) AS parent_id,
        CASE WHEN b1.id > 0 THEN b1.title ELSE '' END AS parent_name
   FROM (SELECT ref_task_id, dispatch_id, identity, taker_id, state, personal_state, operate_state, delete_at,
                finish_time
           FROM task_dispatch
          WHERE taker_id = ${user_id}
            AND is_valid = 1
            AND personal_state IN (0, 10409, 10604, 10611)
            AND operate_state = 0) AS a,
        task AS b
            LEFT JOIN task_config AS c
            ON b.id = c.id
            LEFT JOIN task_repeat AS d
            ON c.id = d.task_id AND b.repeat_type > 0
            LEFT JOIN task_repeat_finish AS e
            ON d.repeat_id = e.repeat_id AND e.user_id = ${user_id}
            LEFT JOIN task b1
            ON c.category IN (0, 2) AND SUBSTR(c.parent_id, 0, INSTR(c.parent_id, ',')) = b1.id
  WHERE a.ref_task_id = b.id
    AND b.state = 10201
    AND b.matter_type IN (10701, 10702, 10705)) AS a
    LEFT JOIN (SELECT object_id AS task_id, GROUP_CONCAT('CAST(tag_id AS text) || ","') as tag_ids,
          '[' || GROUP_CONCAT('{"tag_id:"' || CAST(tag_id AS text) || '", "name":"' ||  name || '", "color":"' || color || '}') || ']' AS tags
                 FROM tag ft
                          JOIN tag_bind ftb
                          ON ft.id = ftb.tag_id
                WHERE ftb.user_id = ${user_id}
                  AND ftb.state = 1
                GROUP BY object_id) ff2
    ON a.id = ff2.task_id
    LEFT JOIN task_conclusion AS f
    ON a.id = f.task_id AND f.delete_at = 0
    LEFT JOIN message_action AS g
    ON a.id = g.ref_id AND g.user_id = ${user_id} AND g.delete_at = 0
    LEFT JOIN message AS h
    ON a.id = h.ref_id AND h.id = g.last_message_id
    LEFT JOIN comment AS i
    ON h.comment_id = i.id
    LEFT JOIN task_follow AS j
    ON j.user_id = ${user_id} AND j.task_id = a.id
    LEFT JOIN (SELECT c.id, IFNULL(fp.project_name, '') AS project_name,
                      IFNULL(fp.creator_id, '') AS project_creator_id,
                      IFNULL(fwb.workspace_id, 0) AS workspace_id, IFNULL(fw.name, '') AS workspace_name,
                      IFNULL(fw.ws_type, 0) AS ws_type,
                      CASE WHEN fwm.member_type = 2 THEN 1 ELSE 0 END AS is_external_member
                 FROM task_config c
                          LEFT JOIN project AS fp
                          ON c.project_id = fp.id
                          LEFT JOIN workspace_bind fwb
                          ON c.application_id = fwb.id
                          LEFT JOIN workspace AS fw
                          ON fwb.workspace_id = fw.id
                          LEFT JOIN workspace_member AS fwm
                          ON fw.id = fwm.workspace_id AND fwm.user_id = ${user_id} AND fwm.state = 10902) w
    ON a.id = w.id
    LEFT JOIN task_relation AS k
    ON a.id = k.task_id AND k.user_id = ${user_id}
    LEFT JOIN (SELECT tc.id, IFNULL(tfs.name, '') AS flow_step_name,
                      IFNULL(tfsr.complete_at, 0) AS flow_step_complete_at, IFNULL(tfsr.user_id, '') AS user_id,
                      CASE WHEN r.id > 0 THEN COUNT(*) ELSE 0 END AS step_user_count
                 FROM task_config AS tc
                      LEFT JOIN task_flow_step tfs
                      ON tfs.id = tc.flow_step_id
                      LEFT JOIN task_flow_step_relation AS tfsr
                      ON tfsr.step_id = tfs.id AND tfsr.delete_at = 0 AND tfsr.user_id = ${user_id}
                      LEFT JOIN task_flow_step_relation AS r
                      ON r.step_id = tfs.id AND r.delete_at = 0
                GROUP BY tc.id, tfs.id) z
    ON a.id = z.id)
${where || ''} 
${order}
${limit} `
}
