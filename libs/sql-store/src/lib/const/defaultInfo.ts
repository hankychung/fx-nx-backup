export const defaultInfo: any = {
  task: {
    id: '',
    matter_type: 0,
    title: '',
    detail: '',
    files: null,
    start_time: 0,
    start_time_full_day: 0,
    end_time: 0,
    end_time_full_day: 0,
    remind_at: null,
    repeat_type: 0,
    end_repeat_at: 0,
    execute_addr: '',
    widget: null,
    state: 0,
    creator_id: '0',
    complete_at: 0,
    cancel_at: 0,
    create_at: 0,
    update_at: 0,
    cancel_from: 0,
    priority_level: 0
  },
  task_dispatch: {
    id: '',
    dispatch_id: '',
    ref_task_id: '',
    taker_id: '',
    invite_id: '',
    invite_type: '',
    identity: 0,
    state: 0,
    operate_state: 0,
    personal_state: 0,
    reason: '',
    is_admin: 0,
    is_dispatch: 0,
    execute_at: 0,
    personal_remind_at: null,
    accept_at: 0,
    finish_time: 0,
    cancel_at: 0,
    revoke_at: 0,
    exit_at: 0,
    set_admin_at: 0,
    topmost_at: 0,
    create_at: 0,
    update_at: 0,
    delete_at: 0,
    is_view: 0,
    status: 0,
    is_valid: 0
  },
  task_follow: {
    id: '',
    user_id: '',
    task_id: '',
    create_at: 0
  },
  task_config: {
    id: '',
    max_taker_total: 0,
    category: 0,
    parent_id: '',
    level: 0,
    sort: 0,
    is_checkbox: 0,
    ref_meeting_id: '',
    project_id: '',
    import_project_user_id: '',
    import_project_at: 0,
    project_task_sort: 0,
    score: 0,
    last_active_at: 0,
    repeat_change_id: '',
    application_id: '',
    flow_step_id: '0',
    application_json: null,
    operate_type: 0,
    creator_id: '',
    create_at: 0,
    update_at: 0
  },
  tag: {
    id: '',
    name: '',
    creator_id: '',
    color: '',
    type: 0,
    state: 0,
    create_at: 0,
    update_at: 0
  },
  tag_bind: {
    id: '',
    tag_id: '',
    user_id: '',
    object_id: '',
    state: 0,
    create_at: 0,
    update_at: 0
  },
  task_repeat: {
    repeat_id: '',
    task_id: '',
    start_time: 0,
    start_time_full_day: 0,
    end_time: 0,
    end_time_full_day: 0,
    remind_at: null,
    cycle: 0,
    cycle_date: null,
    change_id: '',
    complete_at: 0,
    create_at: 0
  },
  task_repeat_finish: {
    id: 0,
    repeat_id: '',
    task_id: '',
    user_id: '',
    finish_time: 0
  },
  task_conclusion: {
    task_id: '',
    content: '',
    files: null,
    creator_id: '',
    updater_id: '',
    create_at: 0,
    update_at: 0,
    delete_at: 0
  },
  workspace_bind: {
    id: '',
    workspace_id: '',
    project_id: '',
    creator_id: '',
    sort: 0,
    state: 0,
    ws_type: 0,
    accept_at: 0,
    refuse_at: 0,
    revoke_at: 0,
    create_at: 0,
    update_at: 0
  },
  workspace: {
    id: '',
    name: '',
    icon: '',
    icon_color: '',
    bg_icon: '',
    creator_id: '',
    ws_desc: '',
    ws_type: 0,
    files: null,
    level: 1,
    create_at: 0,
    update_at: 0,
    state: 1,
    expired_at: 0,
    update_level_at: 0,
    attr_json: null
  },
  workspace_member: {
    id: '',
    workspace_id: '',
    creator_id: '',
    user_id: '',
    invite_id: '',
    identify: 0,
    invite_type: '',
    member_type: 0,
    state: 0,
    approval_state: 0,
    approval_at: 0,
    accept_at: 0,
    refuse_at: 0,
    revoke_at: 0,
    exit_at: 0,
    create_at: 0,
    update_at: 0,
    source: '',
    target_member_type: 0
  },
  project: {
    id: '',
    project_name: '',
    project_desc: '',
    files: null,
    target_time: 0,
    state: 0,
    creator_id: '',
    cancel_at: 0,
    create_at: 0,
    update_at: 0
  },
  task_relation: {
    task_id: '',
    user_id: '',
    taker_total: 0,
    child_total: 0,
    comment_total: 0,
    important_total: 0,
    quote_total: 0,
    file_total: 0,
    note_total: 0,
    record_total: 0,
    gadget_meeting_total: 0,
    gadget_todo_total: 0,
    gadget_time_collect_total: 0,
    gadget_notice_total: 0
  },
  task_flow_step: {
    id: '',
    task_id: '',
    application_flow_step_id: '',
    name: '',
    range_type: 0,
    range_user_ids: null,
    specify_user_ids: null,
    operate_type: 0,
    sort: 0,
    state: 0,
    complete_at: 0,
    back_detail: '',
    creator_id: '',
    create_at: 0,
    update_at: 0
  },
  task_flow_step_relation: {
    id: '',
    task_id: '',
    user_id: '',
    step_id: '',
    is_lock: 0,
    complete_at: 0,
    is_back: 0,
    removed_at: 0,
    back_at: 0,
    create_at: 0,
    update_at: 0,
    delete_at: 0
  }
}
