interface PackInfo {
  code: number
  data: Datum[]
}

interface Datum {
  id: string
  // 1 -> 全量包, 2 -> 差异包
  type: 1 | 2
  sign_url: string
  attach_info: Attachinfo
}

interface Attachinfo {
  comment: LastId
  project: LastId
  tag: LastId
  tag_bind: LastId
  task: LastId
  task_conclusion: LastId
  task_config: LastId
  task_dispatch: LastId
  task_flow_step: LastId
  task_flow_step_relation: LastId
  task_follow: LastId
  task_relation: LastId
  task_repeat: LastId
  task_repeat_finish: LastId
  workspace: LastId
  workspace_bind: LastId
  workspace_member: LastId
}

interface LastId {
  id: string
}

export { PackInfo, Attachinfo }
