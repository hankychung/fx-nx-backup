import { IScheduleTask } from '@flyele-nx/types'

export interface IMsg {
  co?: number // code
  rid: string // 事项ID
  o: string // 消息创建人ID
  file_id?: string // 文件ID, 仅当违规时发送
  cnt?: string // 消息内容
  subtitle?: string // 消息标题
  commid?: string // 评论ID
  rt?: string // 消息类型
  m?: string //消息ID
  t?: string // 标题
  sf?: '1' | '2' | '3' | '4' // 消息发送方平台 [[1, wechat], [2, pc], [3, mobile], [4, web]]
  af?: string //影响的用户ID
  cn?: string // 创建人昵称
  message_type?: number // 对code的细分解释
  diff?: IScheduleTask // 编辑后的差量数据
  batchId?: string // 批量操作的id
  batchType?: 1 | 2 | 3 | 4 // 批量操作的类型 1->create,2->accept,3->refuse,4->finish
  isQueryComment?: boolean // 对话页 - 是否需要查询接口来添加 msg
  isAccept?: boolean // 是否自动接受
}

export function convertSocketMsg(msg: any) {
  const { a, b, c, d, e, f, g, j, h, i, n, k, m, l, p, q, r, s, t } = msg

  return {
    co: c,
    rid: a,
    o: e,
    file_id: j,
    cnt: h,
    subtitle: n,
    commid: f,
    rt: b,
    m: d,
    t: g,
    sf: i,
    af: k,
    cn: l,
    message_type: m,
    diff: p,
    batchId: q,
    batchType: r,
    isQueryComment: s || false,
    // 自动接受标志
    isAccept: t
  } as IMsg
}
