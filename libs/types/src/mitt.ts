export type IMittEvent = {
  // 退出登录
  logout: void
  // 缓存worker初始化完成
  cacheWorkerInited: void
  // socket - 更新本地缓存数据库
  updateDatabase: void
}
