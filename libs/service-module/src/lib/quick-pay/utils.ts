export const regFenToYuan = (a: number) => {
  let num = Number(a)
  let num1: string
  if (!num) {
    //等于0
    return num + '.00'
  } else {
    //不等于0
    num = Math.round(num * 100) / 10000
    num1 = num + ''
    num1 += '' //转成字符串
    const reg =
      num1.indexOf('.') > -1
        ? /(\d{1,3})(?=(?:\d{3})+\.)/g
        : /(\d{1,3})(?=(?:\d{3})+$)/g //千分符的正则
    // console.log(num.indexOf('.')>-1)
    return num1.replace(reg, '$1,') //千分位格式化
  }
}

export const getResidueTime = (totalSeconds: number, text = '0') => {
  //   const nowtime = new Date().getTime() // 当前时间 毫秒数
  //   const endTime = dayjs.unix(end).valueOf() //结束时间  毫秒数
  //   const totalSeconds = (endTime - nowtime) / 1000 // 结束时间-当前时间 = 剩余多少时间
  const day = parseInt(`${totalSeconds / 3600 / 24}`) //天
  const hour = parseInt(`${(totalSeconds / 3600) % 24}`)
    .toString()
    .padStart(2, '0') //时
  const minute = parseInt(`${(totalSeconds / 60) % 60}`)
    .toString()
    .padStart(2, '0') //分
  const second = parseInt(`${totalSeconds % 60}`)
    .toString()
    .padStart(2, '0') //秒
  let residueTime =
    '倒计时：' + day + '天 ' + hour + '时 ' + minute + '分 ' + second + '秒'
  if (day >= 1) {
    residueTime = `老用户${(+text * 10).toFixed(1)}折，限时${day + 1}天`
  }
  if (day === 0) {
    residueTime = `限时 ${hour}:${minute}:${second}`
  }
  if (totalSeconds <= 0) {
    residueTime = '0'
  }

  return residueTime
}
