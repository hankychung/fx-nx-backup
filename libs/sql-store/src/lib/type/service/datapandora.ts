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
  comment: Comment
  project: Comment
  tag: Comment
  tag_bind: Comment
  task: Comment
  task_conclusion: Comment
  task_config: Comment
  task_dispatch: Comment
  task_flow_step: Comment
  task_flow_step_relation: Comment
  task_follow: Comment
  task_relation: Comment
  task_repeat: Comment
  task_repeat_finish: Comment
  workspace: Comment
  workspace_bind: Comment
  workspace_member: Comment
}

interface Comment {
  id: string
}

export { PackInfo }
