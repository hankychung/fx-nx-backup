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
  }
}
