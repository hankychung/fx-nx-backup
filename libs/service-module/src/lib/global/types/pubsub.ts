enum Pubs {
  // 专门用来测试用的
  TEST_PUBSUB_EVENT = 'TEST_PUBSUB_EVENT',

  REFRESH_NICKNAME = 'REFRESH_NICKNAME',
  // 清除所有的子事项的父亲为某个ref_id的缓存
  CLEAR_ALL_CHILDREN_CACHE = 'CLEAR_ALL_CHILDREN_CACHE',

  // 通知 - 更新事项卡片列表
  NEW_NOTICE = 'NEW_NOTICE',
  TOKEN_INVALID = 'TOKEN_INVALID',
  CREATE_SUCCESS = 'CREATE_SUCCESS',
  HAS_REDDOT = 'HAS_REDDOT', // 有新的红点

  // 更新详情页面
  TASK_UPDATE = 'TASK_UPDATE',
  TASK_DETAIL_UPDATE = 'TASK_DETAIL_UPDATE',
  TOKEN_UPDATE = 'TOKEN_UPDATE',
  // 读取消息
  READ_MSG = 'READ_MSG',
  READ_MSG_All = 'READ_MSG_All',

  CUR_TASK_ID = 'CUR_TASK_ID',

  /**
   * 笔记
   */
  // 笔记创建
  NOTES_CREATE = 'NOTES_CREATE',
  // 笔记更新
  NOTES_DETAIL_UPDATE = 'NOTES_DETAIL_UPDATE',
  // 笔记删除
  NOTES_DELETE = 'NOTES_DELETE',
  // 笔记@用户
  NOTES_ADD_AT_MEMBER = 'NOTES_ADD_AT_MEMBER',
  // 笔记添加共享人
  NOTES_ADD_SHARE_MEMBER = 'NOTES_ADD_SHARE_MEMBER',
  // 笔记删除共享人
  NOTES_DELETE_SHARE_MEMBER = 'NOTES_DELETE_SHARE_MEMBER',
  // 笔记停止共享
  NOTES_STOP_SHARE = 'NOTES_STOP_SHARE',
  // 笔记新增评论
  NOTES_ADD_COMMENT = 'NOTES_ADD_COMMENT',

  // 事项新评论
  NEW_COMMENT = 'NEW_COMMENT',

  // 本地发送了一条新评论
  SEND_NEW_COMMENT = 'SEND_NEW_COMMENT',
  // 本地在文件tab上传了文件评论
  SEND_NEW_FILE_COMMENT = 'SEND_NEW_FILE_COMMENT',

  // 事项文件更改（加/删）
  TASK_FILE_ADD = 'TASK_FILE_ADD',
  TASK_FILE_REMOVE = 'TASK_FILE_REMOVE',
  // TASK_FILE_UPDATE = 'TASK_FILE_UPDATE',
  // 自己端事项文件更改（增/删）
  SELF_TASK_FILE_REMOVE = 'SELF_TASK_FILE_REMOVE',
  /** 飞项文档中的文件删除 */
  FLYELEDOC_FILE_REMOVE = 'FLYELEDOC_FILE_REMOVE',

  // 修改任务协作信息	协作信息变更，撤回，设置重点等等
  COOPERATION_MODIFIED = 'COOPERATION_MODIFIED',

  //
  RED_POS = 'RED_POS',

  SOCKET_RECONNECT = 'SOCKET_RECONNECT',

  // 删除条目
  DELETE_MATTER_ITEM = 'DELETE_MATTER_ITEM',

  // 查询notice返回的是空
  DELETE_NULL_MATTER_ITEM = 'DELETE_NULL_MATTER_ITEM',

  RELOAD = 'RELOAD',

  UPDATE_INVITE = 'UPDATE_INVITE',

  MESSAGE_NEW_INVITE = 'MESSAGE_NEW_INVITE',

  MESSAGE_READ = 'MESSAGE_READ',

  // 事项和会议的编辑
  EDIT_4 = 'EDIT_4',
  CHECK_PROJECT_ROUTER_PATH = 'CHECK_PROJECT_ROUTER_PATH', // 切换项目路由地址

  // 事项
  TASK_6_CANCEL_STATE = 'TASK_6_CANCEL_STATE',
  TASK_7_FINISH_STATE = 'TASK_7_FINISH_STATE',
  TASK_10_TAKER_ADD = 'NOTICE_10_TAKER_ADD',
  TASK_12_TAKER_REMOVE = 'TASK_12_TAKER_REMOVE',
  TASK_21_SCHEDULE_VISIBLE = 'TASK_21_SCHEDULE_VISIBLE', // 是否在日程显示
  TASK_25_CHILD_PROCESS_UPDATE = 'TASK_25_CHILD_PROCESS_UPDATE', // 子事项列表更新
  TASK_40_EDIT_START_TIME = 'TASK_40_EDIT_START_TIME',
  TASK_41_EDIT_END_TIME = 'TASK_41_EDIT_END_TIME',
  TASK_60_RELAVANT_UPDATE = 'TASK_60_RELAVANT_UPDATE', // 事项关联数据更新 - (子事项, 重点, 文件...)
  TAKER_22_UPDATE = 'TAKER_22_UPDATE', // 事项责任人更新
  // TASK_CLEAR_TEMP_BY_TASK_ID = 'TASK_CLEAR_TEMP_BY_TASK_ID', // 清除缓存

  // 会议
  MEETING_5_CANCEL_STATE = 'MEETING_5_CANCEL_STATE',
  MEETING_9_TAKER_ADD = 'MEETING_9_TAKER_ADD',
  MEETING_11_TAKER_REMOVE = 'MEETING_11_TAKER_REMOVE',
  MEETING_42_EDIT_TIME = 'MEETING_42_EDIT_TIME',
  MEETING_38_MEETING_NOTE_UPDATE = 'MEETING_38_MEETING_NOTE_UPDATE', // 输出会议纪要
  MEETING_DIY_01_REFREH_NOTE = 'MEETING_DIY_01_REFREH_NOTE', // 自定义：更新会议纪要状态按钮

  // 公告
  NOTICE_8_STATE = 'NOTICE_8_STATE', // 公告 - 公告状态更新（已结束，已取消）
  NOTICE_26_TAKER_ADD = 'NOTICE_26_TAKER_ADD', // 添加承接人（时间征集丨公告）
  NOTICE_27_TAKER_REMOVE = 'NOTICE_27_TAKER_REMOVE', // 删除承接人（时间征集丨公告）

  // 项目
  TASK_CREATE_IN_PROJECT = 'TASK_CREATE_IN_PROJECT', // 项目里面创建事项
  PROJECT_UPDATE = 'PROJECT_UPDATE', // 项目发生更新
  PROJECT_UPDATE_DETAIL = 'PROJECT_UPDATE_DETAIL', // 项目详情(非socket)发生更新
  PROJECT_TAKERS_UPDATE = 'PROJECT_TAKERS_UPDATE', // 项目协作人发生更新
  PROJECT_INVITE_JOIN = 'PROJECT_INVITE_JOIN', // 项目被邀请加入成功
  PROJECT_TAKER_REMOVE_PC = 'PROJECT_TAKER_REMOVE_PC', // 项目协助人被移除（本端更新）
  // PROJECT_STATEMENT = 'PROJECT_56_PROJECT_STATUS_CHANGE', // 项目关联信息发生变化
  PROJECT_TASK_UPDATE = 'PROJECT_TASK_UPDATE', // 项目中事项发生更新
  PROJECT_TASK_CREATE = 'PROJECT_TASK_CREATE', // 项目中有新事项创建
  SCHEDULE_MATTER_CHILDREN_CARD_UPDATE = 'SCHEDULE_MATTER_CHILDREN_CARD_UPDATE', // 有子事项日程类卡片 更新
  PROJECT_50_CREATE = 'PROJECT_50_CREATE',
  PROJECT_51_DETAIL_UPDATE = 'PROJECT_50_DETAIL_UPDATE',
  PROJECT_52_DELETE_PROJECT = 'PROJECT_52_DELETE_PROJECT',
  PROJECT_53_TAKER_ADD = 'PROJECT_53_TAKER_ADD',
  PROJECT_54_TAKER_REMOVE = 'PROJECT_54_TAKER_REMOVE',
  PROJECT_SELECTOR_LIST = 'PROJECT_SELECTOR_LIST', //  [53, 54] socket 监听
  PROJECT_MEMBER_REFRESH = 'PROJECT_MEMBER_REFRESH', // 项目成员刷新
  PROJECT_55_TAKER_STATE_CHANGE = 'PROJECT_55_TAKER_STATE_CHANGE',
  PROJECT_56_PROJECT_STATUS_CHANGE = 'PROJECT_56_PROJECT_STATUS_CHANGE', // 项目关联信息发生变化
  PROJECT_62_GROUP_EDIT = 'PROJECT_62_GROUP_EDIT', // 修改项目分组信息
  PROJECT_64_GROUP_CREATE = 'PROJECT_64_GROUP_CREATE', // 新增项目事项分组
  PROJECT_65_GROUP_DELETE = 'PROJECT_65_GROUP_DELETE', // 删除项目事项分组
  PROJECT_GROUP_TRANSACTION = 'PROJECT_GROUP_TRANSACTION', // 创建和删除 项目事项分组
  PROJECT_66_GROUP_MATTER_MOVE = 'PROJECT_66_GROUP_MATTER_MOVE', // 移动事项所在分组
  PROJECT_MATTER_GROUP_CHANGE = 'PROJECT_MATTER_GROUP_CHANGE', // 本端项目中的事项所属分组发生改变
  PROJECT_GROUP_LIST_REFRESH = 'PROJECT_GROUP_LIST_REFRESH', // 本端项目分组列表刷新
  PROJECT_94_STATE_CHANGE = 'PROJECT_94_STATE_CHANGE', // 项目激活状态变化
  CREATE_PROJECT = 'CREATE_PROJECT', // 创建项目
  CANCEL_PROJECT = 'CANCEL_PROJECT', // 解散项目
  EXIT_PROJECT = 'EXIT_PROJECT', // 退出项目
  ARCHIVE_PROJECT_TOGETHER = 'ARCHIVE_PROJECT_TOGETHER', // 项目归档状态发生改变，目前处理刷项目详情

  // 空间,
  SPACE_75_CREATE = 'SPACE_75_CREATE', // 创建空间
  SPACE_76_UPDATE = 'SPACE_76_UPDATE', // 修改空间
  SPACE_77_DISSOLVE = 'SPACE_77_DISSOLVE', // 解散空间
  SPACE_78_INVITE_MEMBER = 'SPACE_78_INVITE_MEMBER', // 邀请空间成员
  SPACE_79_REMOVE_MEMBER = 'SPACE_79_REMOVE_MEMBER', // 移除空间成员
  SPACE_83_ADD_NEW_MEMBER = 'SPACE_83_ADD_NEW_MEMBER', // 新增空间成员
  SPACE_81_DISABLE_CHANGE = 'SPACE_81_DISABLE_CHANGE', // 空间激活状态发生变化
  SPACE_89_EXIT = 'SPACE_89_EXIT', // 退出空间
  SPACE_90_LEVEL_CHANGE = 'SPACE_90_LEVEL_CHANGE', // 空间等级变化
  SPACE_88_MEMBER_STATE_UPDATE = 'SPACE_88_MEMBER_STATE_UPDATE', // 空间成员状态变化
  SPACE_84_EXAMINE = 'SPACE_84_EXAMINE', // 审批状态发生变化
  SPACE_32_OPERATING_RECORD = 'SPACE_32_OPERATING_RECORD', // 空间操作记录刷新
  SPACE_PROJECT_REFRESH = 'SPACE_PROJECT_REFRESH', // 空间项目列表刷新 80 85
  SPACE_92_NEW_NOTICES = 'SPACE_92_NEW_NOTICES', // 空间有新审批通知
  SPACE_93_PORJECT_SHIFT_IN = 'SPACE_93_PORJECT_SHIFT_IN', // 空间中有项目移入

  // 空间本端操作
  SPACE_DIY_SELF_EXIT = 'SPACE_DIY_SELF_EXIT', // 本端退出空间 (自己主动退出空间)
  SPACE_DIY_DISSOLVE = 'SPACE_DIY_DISSOLVE', // 本端解散空间
  SPACE_DIY_UPDATE = 'SPACE_DIY_UPDATE', // 空间详情更新
  SPACE_DIY_NOTICE_HANDLE = 'SPACE_DIY_NOTICE_HANDLE', // 处理空间通知(审批)
  SPACE_PROJECT_TOTAL = 'SPACE_PROJECT_TOTAL', // 空间项目总数更新问题
  /** 空间升级生成，继续邀请成员 */
  SPACE_UPGRADE_FORWORAD_ACTION = 'SPACE_UPGRADE_FORWORAD_ACTION',

  SPACE_CREATE_FORWORAD = 'SPACE_CREATE_FORWORAD',
  // 更新日程列表
  UPDATE_SCHEDULE = 'UPDATE_SCHEDULE',

  /** 更新日程列表-处理不是本人触发的 */
  UPDATE_SCHEDULE_NOT_TRIGGERED_BY_ME = 'UPDATE_SCHEDULE_NOT_TRIGGERED_BY_ME',

  // 更新日程最新创建列表
  UPDATE_NEW_CREATE = 'UPDATE_NEW_CREATE',

  // 更新最新创建列表至日程列表
  MERGE_NEW_CREATE = 'MERGE_NEW_CREATE',

  // 活动 task
  ACTIVE_TASK = 'ACTIVE_TASK',

  // 更新MenuBar tab 高亮
  CHANGE_TAB = 'CHANGE_TAB',

  UPDATE_ONLINE_STATE = 'UPDATE_ONLINE_STATE',

  APP_ACTIVE_OFFLINE = 'APP_ACTIVE_OFFLINE', // app主动下线
  CLIENT_OFFLINE = 'CLIENT_OFFLINE', // 客户端被挤下线

  UPDATE_REDUX = 'UPDATE_REDUX',

  UPDATE_DETAIL_PATH = 'UPDATE_DETAIL_PATH', // 更新详情路由

  // DIY 特殊信号
  /**
   * DIY_01_REFRESH_SMALLTOOLS_DRAWER 通知小工具抽屉刷新列表数据
   * DIY_02_OPEN_SMALLTOOLS_DRAWER 在某个事项窗体内部，打开小工具抽屉
   * DIY_03_DELETE_BY_AUTOMARK 删掉已读的tempTask中的公告
   * DIY_04_CLOSE_TASK_ALL_DRAWER 关闭所有事项的小抽屉
   * DIY_05_SCROll_TO_TOP 滚动到顶部
   * DIY_06_REFRESH_RELATION_TEMPTASK 刷新事项关系TempTask
   * DIY_07_UPDATE_REPEAT_ITEM_LIST 更新循环列表
   * DIY_08_SHOW_DETAIL_DRAWER_AND_OPEN_TAGS_EDIT 关闭工具抽屉-打开详情-打开编辑标签
   * DIY_09_SHOW_THE_PROJECT_DETAIL_LIST 小窗体通知主窗体切路由
   */
  DIY_01_REFRESH_SMALLTOOLS_DRAWER = 'DIY_01_REFRESH_SMALLTOOLS_DRAWER',
  DIY_02_OPEN_SMALLTOOLS_DRAWER = 'DIY_02_OPEN_SMALLTOOLS_DRAWER',
  DIY_03_DELETE_BY_AUTOMARK = 'DIY_03_DELETE_BY_AUTOMARK',
  DIY_04_CLOSE_TASK_ALL_DRAWER = 'DIY_04_CLOSE_TASK_ALL_DRAWER',
  DIY_05_SCROll_TO_TOP = 'DIY_05_SCROll_TO_TOP',

  /**
   * 用户relation 刷新! 目前还有很多的奇怪的操作!
   * 注:
   *  - 创建操作 请直接对照create_success 更新
   *  - 此处也有很多黑魔法, 历史遗留问题, 目前我只校准了重点/文本部分的内容. 后续再补
   */
  DIY_06_REFRESH_RELATION_TEMPTASK = 'DIY_06_REFRESH_RELATION_TEMPTASK',

  DIY_07_UPDATE_REPEAT_ITEM_LIST = 'DIY_07_UPDATE_REPEAT_ITEM_LIST',
  DIY_08_SHOW_DETAIL_DRAWER_AND_OPEN_TAGS_EDIT = 'DIY_08_SHOW_DETAIL_DRAWER_AND_OPEN_TAGS_EDIT',

  // 让我显示项目内详情列表！
  DIY_09_SHOW_THE_PROJECT_DETAIL_LIST = 'DIY_09_SHOW_THE_PROJECT_DETAIL_LIST',

  // v17: 显示事项详情抽屉
  DIY_11_SHOW_TASK_DETAIL_DRAWER = 'DIY_11_SHOW_TASK_DETAIL_DRAWER',

  // 聚焦在输入框中，通知左侧上下键失焦
  DIY_99_FOCUS_TEXTAREA = 'DIY_99_FOCUS_TEXTAREA',

  // 更新事项的责任人
  LOCAL_UPDATE_ADMIN = 'LOCAL_UPDATE_ADMIN',

  // 更新事项总结
  DIY_10_UPDATE_MATTER_SUMMARY = 'DIY_10_UPDATE_MATTER_SUMMARY',

  // 更新事项概览卡片的循环时间显示
  DIY_13_UPDATE_MATTER_REPEAT_TIME = 'DIY_13_UPDATE_MATTER_REPEAT_TIME',

  // 通知主窗体详情创建拉起
  DIY_12_VIP_CREATE_TO_MAIN_DETAIL = 'DIY_12_VIP_CREATE_TO_MAIN_DETAIL',

  // 通知小挂件的编辑区失焦
  DIV_18_VIP_QUICK_CREATE_BLUR = 'DIV_18_VIP_QUICK_CREATE_BLUR',

  DIY_17_GIVEME_BANDAGE = 'DIY_17_GIVEME_BANDAGE',

  DIY_30_BATCH_DELETE_FILE = 'DIY_30_BATCH_DELETE_FILE',
  DIY_31_BATCH_DELETE_MSG = 'DIY_31_BATCH_DELETE_MSG',
  DIY_32_EXPORT_RECORD_LIST_UPDATE = 'DIY_32_EXPORT_RECORD_LIST_UPDATE',

  /**
   * 增量更新数据操作
   *
   * DB_INCREASE_01_READUX_AND_SQLITEDB 本地更新redux缓存和增量
   * DB_INCREASE_02_UPDATE_FORCE 强制拉全量接口更新
   * DB_INCREASE_03_READUX_AND_SQLITEDB_SILENT 静默更新，不更新日历
   */
  LOCAL_UPDATE_SCHEDULE = 'LOCAL_UPDATE_SCHEDULE', // 仅针对循环事件的完成/重启
  LOCAL_UPDATE_SCHEDULE_ITEMS = 'LOCAL_UPDATE_SCHEDULE_ITEMS', // 全量更新日程数据
  DB_INCREASE_01_READUX_AND_SQLITEDB = 'DB_INCREASE_01_READUX_AND_SQLITEDB', // 更新详情
  BATCH_01_READUX_AND_SQLITEDB = 'BATCH_01_READUX_AND_SQLITEDB', // 用途于 DB_INCREASE_01_READUX_AND_SQLITEDB 一致，但是批量发送task_ids

  DB_INCREASE_02_UPDATE_FORCE = 'DB_INCREASE_02_UPDATE_FORCE',

  DB_INCREASE_03_READUX_AND_SQLITEDB_SILENT = 'DB_INCREASE_03_READUX_AND_SQLITEDB_SILENT',
  BATCH_UPDATE_READUX_TASK = 'BATCH_UPDATE_READUX_TASK',

  DELETE_CALENDAR_FROM_SCHEDULE = 'DELETE_CALENDAR_FROM_SCHEDULE',
  LOG_OUT = 'LOG_OUT',
  HANDLE_LOGOUT = 'HANDLE_LOGOUT',
  REFRESH_TOKEN = 'REFRESH_TOKEN',

  MATTER_STORE = 'MATTER_STORE',

  // 非socket/数据的一些通信
  CHATBOX_SCROLL = 'CHATBOX_SCROLL',

  // 关注事项
  FOLLOW_TASK = 'FOLLOW_TASK',

  // 本端修改状态
  LOCAL_UPDATE_STATE = 'LOCAL_UPDATE_STATE',

  // 自定义看板新增或者修改
  UPDATE_OR_ADD_CUSTOM_PANEL = 'UPDATE_AND_ADD_CUSTOM_PANEL',

  // 更新成员人日程
  UPDATE_SCHEDULE_MEMBER = 'UPDATE_SCHEDULE_MEMBER',

  // 更新成员人日程 - 带数据
  UPDATE_SCHEDULE_MEMBER_ITEMS = 'UPDATE_SCHEDULE_MEMBER_ITEMS',

  // 更新动态列表草稿
  UPDATE_MATTER_DRAFT = 'UPDATE_MATTER_DRAFT',

  UPDATE_TAGS = 'UPDATE_TAGS',

  BATCH_UPDATE_TAG = 'BATCH_UPDATE_TAG', // 批量更新事项标签（比如更改了某一个标签的名称，所有应用该标签的事项，都需要更改）

  DEL_TAG = 'DEL_TAG',

  // 关联项目变更
  UPDATE_REF_PROJECT = 'UPDATE_REF_PROJECT',
  // 隐藏事项
  HIDE_SCHEDULE = 'HIDE_SCHEDULE',

  UPDATE_FULL_LIST = 'UPDATE_FULL_LIST',

  READ_NOTICE = 'READ_NOTICE',

  // 邀请成功
  TASK_INVITE_SUCCESS = 'TASK_INVITE_SUCCESS',

  // 本地成员人创建同步
  UPDATE_MEMBER_TASK = 'UPDATE_MEMBER_TASK',

  // 导入事项
  IMPORT_MATTER = 'IMPORT_MATTER',

  // 对话框id
  DIALOG_ID = 'DIALOG_ID',

  // 自定义看板ws推送
  CUSTOM_PANEL_WS = 'CUSTOM_PANEL_WS',

  // 刷新事项页
  RELOAD_PAGE = 'RELOAD_PAGE',

  // 更新token时间
  REFRESH_TOKEN_STAMP = 'REFRESH_TOKEN_STAMP',

  // REFRESH_TOKEN_HOOK = 'REFRESH_TOKEN_HOOK',

  // 删除已完成的循环事项
  DEL_COMPLETE_CYCLE_ITEM = 'DEL_COMPLETE_CYCLE_ITEM',

  PROJECT_MEMBER_CHANGE = 'PROJECT_MEMBER_CHANGE',

  ALL_PROJECT_MEMBER_REFRESH = 'ALL_PROJECT_MEMBER_REFRESH',

  /**
   * vip小组件
   */
  SETTINGS_VIP_SMALLTOOLSWIN_UPDATE = 'SETTINGS_VIP_SMALLTOOLSWIN_UPDATE',
  // 文件下载进度
  DOWNLOAD_FILE_PROGRESS = 'DOWNLOAD_FILE_PROGRESS',

  HANDLE_MODIFY_TIME = 'HANDLE_MODIFY_TIME',

  // 处理 socket
  HANDLE_SOCKET = 'HANDLE_SOCKET',

  // 修改脉络图 key
  MODIFY_VENATION_WIN_KEY = 'MODIFY_VENATION_WIN_KEY',

  // 关闭当前脉络图
  CLOSE_VENATION_WIN = 'CLOSE_VENATION_WIN',

  // 脉络图 win show 状态
  VENATION_WIN_SHOW = 'VENATION_WIN_SHOW',

  // 今日看板更新置顶
  BOARD_TOPMOST = 'BOARD_TOPMOST',

  // 空间专属

  // (项目)移动到空间
  PROJECT_MOVETO_SPACE = 'PROJECT_MOVETO_SPACE',

  // 导出表格状态变更
  EXPORT_STATUS_CHANGE = 'EXPORT_STATUS_CHANGE',

  // 更新vip 相关信息(socket) 同步 redux
  UPDATE_VIP_INFO = 'UPDATE_VIP_INFO',
  // 本端领取会员后通知本端
  UPDATE_VIP_INFO_LOCAL = 'UPDATE_VIP_INFO_LOCAL',

  /**
   * vip 弹窗
   */
  VIP_01_AD_VIP_SMALL_TOOLS = 'VIP_01_AD_VIP_SMALL_TOOLS',

  // 打开图片预览
  OPEN_IMAGE_PREVIEW_WINDOW = 'OPEN_IMAGE_PREVIEW_WINDOW',

  CLOSE_TASK = 'CLOSE_TASK',
  // 新增待审批成员
  SPACE_MEMBER_STATUS_CHANGE = 'SPACE_MEMBER_STATUS_CHANGE',

  // 空间等级变化
  SPACE_LEVEL_CHANGE = 'SPACE_LEVEL_CHANGE',

  SPACE_DIR_CHANGE = 'SPACE_DIR_CHANGE',

  SPACE_DIR_FILE_CHANGE = 'SPACE_DIR_FILE_CHANGE',

  // 刷新空间列表
  SPACE_LIST_REFRESH = 'SPACE_LIST_REFRESH',

  // 空间解散、退出
  // SPACE_CANCEL = 'SPACE_CANCEL',

  // 打开/关闭协作人弹窗
  // OPEN_TAKER_MODAL = 'OPEN_TAKER_MODAL',
  // CLOSE_TAKER_MODAL = 'CLOSE_TAKER_MODAL',

  // 刷新空间成员列表
  REFRESH_SPACE_MEMBER_LIST = 'REFRESH_SPACE_MEMBER_LIST',

  // 子窗口要求主窗口跳转文件页面
  MAIN_WINDOW_JUMP_FILE_PAGE = 'MAIN_WINDOW_JUMP_FILE_PAGE',
  // 子窗口要求主窗口跳转应用库页面
  MAIN_WINDOW_JUMP_APPLACATION_PAGE = 'MAIN_WINDOW_JUMP_APPLACATION_PAGE',
  // 主窗使用应用创建事项
  MAIN_WINDOW_CREATE_MATTER_USE_APPLICATION = 'MAIN_WINDOW_CREATE_MATTER_USE_APPLICATION',
  // 主窗使用应用创建事项
  MAIN_WINDOW_NO_PROJECT_USE_APPLICATION = 'MAIN_WINDOW_NO_PROJECT_USE_APPLICATION',
  // 创建或更新应用完成更新列表
  CREATE_APPLICATION_SUCCESS = 'CREATE_APPLICATION_SUCCESS',
  // 子窗口要求主窗口跳转文件页面
  MAIN_WINDOW_JUMP_PAGE = 'MAIN_WINDOW_JUMP_PAGE',

  // 牛皮藓空间跳转到讨论页并打开侧拉窗
  ALERT_JUMP_MATTER_OPEN_DETAIL = 'ALERT_JUMP_MATTER_OPEN_DETAIL',
  // 邀请协作人更新月视图 - 创建非我执行的事项
  RELOAD_MONTH_CALENDAR = 'RELOAD_MONTH_CALENDAR',
  // 项目文件发生改变
  PROJECT_FILE_CHANGE = 'PROJECT_FILE_CHANGE',

  // 手动 history.push 时，同时要设置菜单选中
  SET_MENU_ACTIVE_TAB = 'SET_MENU_ACTIVE_TAB',

  // 完结事项
  FINISHED_TASK = 'FINISHED_TASK',

  // 刷新卡片
  REFRESH_COMMENT_CARD = 'REFRESH_COMMENT_CARD',

  // 跳转到项目详情（项目的概览、事项切换不是通过切路由，且没有参数判断）
  JUMP_PROJECT_OVERVIEW = 'JUMP_PROJECT_OVERVIEW',

  // app更新版本
  APP_NEW_VERSION = 'APP_NEW_VERSION',
  // 日历视图待安排数量
  TASK_TOTAL = 'TASK_TOTAL',

  // 用户重新登录 重新通知到 各个窗体 sensorLogin
  RELOGIN_TO_WINDOW_SENSOR_LOGIN = 'RELOGIN_TO_WINDOW_SENSOR_LOGIN',
  // 强制更新通知
  FORCE_UPDATE = 'FORCE_UPDATE',
  // 当前用户已被停用
  USER_STOP = 'USER_STOP',
  // 当前用户已被注销
  USER_LOGGED_OUT = 'USER_LOGGED_OUT',
  // 软件升级弹窗
  SHOW_UPDATE_MODAL = 'SHOW_UPDATE_MODAL',

  // 空间新手提示 点击后回调
  /// SPACE_TIPS_CLICK_CB = 'SPACE_TIPS_CLICK_CB',

  // 弹窗相关
  VISIBLE_SUMMARY_MODAL = 'VISIBLE_SUMMARY_MODAL',

  // 侧拉红点
  SIDE_READ_MSG = 'SIDE_READ_MSG',
  // 打开预览模式
  OPEN_PREVIEW_Mode = 'OPEN_PREVIEW_Mode',

  CELL_TASK_COUNT = 'CELL_TASK_COUNT',

  // 协作人更新--私有化内蒙古使用到
  USER_INFO_UPDATE = 'USER_INFO_UPDATE',

  WORKSPACE_PROJECT_COLLECT_CHANGE = 'WORKSPACE_PROJECT_COLLECT_CHANGE',

  MENUBAR_PROJECT_COLLECT_CHANGE = 'MENUBAR_PROJECT_COLLECT_CHANGE', // 通知侧边栏项目新增、更改、删除

  MENUBAR_SPACE_PROJECT_ROUTER_CHANGE = 'MENUBAR_SPACE_PROJECT_ROUTER_CHANGE', // 通知侧边栏空间、项目路由更改

  SPACE_HAS_RED_CHANGE = 'SPACE_HAS_RED_CHANGE', // 空间列表红点变化
  // 刷新空间项目页归档项目列表
  // REFRESH_SPACE_PROJECT_ARCHIVE = 'REFRESH_SPACE_PROJECT_ARCHIVE',

  // 批量完成
  LOCAL_BATCH_COMPLETE = 'LOCAL_BATCH_COMPLETE',
  LOCAL_BATCH_REPEAT_COMPLETE = 'LOCAL_BATCH_REPEAT_COMPLETE',

  // 循环周期变更
  REPEAT_CYCLE_CHANGE = 'REPEAT_CYCLE_CHANGE',

  // 创建子事项
  MAKE_CHILD = 'MAKE_CHILD',

  // 本地更新总结
  LOCAL_UPDATE_SUMMARY = 'LOCAL_UPDATE_SUMMARY',

  // 本地更新分组名称
  LOCAL_UPDATE_GROUP_NAME = 'LOCAL_UPDATE_GROUP_NAME',
  // 刷新项目成员列表
  REFRESH_PROJECT_MEMBER_LIST = 'REFRESH_PROJECT_MEMBER_LIST',
  // 通知小挂件右键菜单失焦
  VIPWIN_CONTEXMENU_BLUR = 'VIPWIN_CONTEXMENU_BLUR',

  // 删除总结
  DELETE_SUMMARY = 'DELETE_SUMMARY',
  // 初始化colortips
  INIT_COLORTIPS = 'INIT_COLORTIPS',
  // 自定义看板更新
  UPDATA_BOARD = 'UPDATA_BOARD',
  // 创建模版参数
  CREATE_APPLICATION_PARAMS = 'CREATE_APPLICATION_PARAMS',
  // 创建工作流参数
  CREATE_WORKFLOW_PARAMS = 'CREATE_WORKFLOW_PARAMS',
  // 对话页点击弹出勾选框的Hover
  SHOW_WORKFLOW_OPERATION_BY_MATTER = 'SHOW_WORKFLOW_OPERATION_BY_MATTER',

  // 跳路由
  PUSH_ROUTER = 'PUSH_ROUTER',

  // 更新详情信息
  RELOAD_DETAIL = 'RELOAD_DETAIL',

  // 本地更新详情信息
  RELOAD_DETAIL_LOCALLY = 'RELOAD_DETAIL_LOCALLY',

  // @人弹窗通知关闭
  AT_HIDDEN = 'AT_HIDDEN',

  // 登录成功
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',

  // 更新整体工作流
  UPDATE_ENTIRE_FLOW = 'UPDATE_ENTIRE_FLOW',
  // 清空新增
  EMPTY_NEWTASK = 'EMPTY_NEWTASK',

  /**
   * ---------- TODO 待整理视图用的socket
   */
  // 打开笔记窗体
  SHOW_NOTE_DRAWER = 'SHOW_NOTE_DRAWER',
  // 展示视图详细页面
  OPEN_SCREEN_DETAIL = 'OPEN_SCREEN_DETAIL',
  // 视图新增
  SCREEN_ADD = 'SCREEN_ADD',
  // 视图删除
  SCREEN_DELETE = 'SCREEN_DELETE',
  // 他端视图删除通知视图页面弹出alert
  SCREEN_DELETE_TO_MINDMAP = 'SCREEN_DELETE_TO_MINDMAP',
  // 通知 项目内 隐藏符合视图id的显示
  CALL_PROJECT_SCREEN_HIDE = 'CALL_PROJECT_SCREEN_HIDE',
  // 通知 视图详情组件 隐藏符合视图id的显示
  CALL_SCREEN_DETAIL_HIDE = 'CALL_SCREEN_DETAIL_HIDE',

  // 全局 事项添加设置
  GLOBAL_TASK_SETTING = 'GLOBAL_TASK_SETTING',

  // 全局 目标详情
  TARGET_DETAIL = 'TARGET_DETAIL',
  CREATE_TARGET = 'CREATE_TARGET',
  CREATE_TARGET_CLOSED = 'CREATE_TARGET_CLOSED',
  HANDLE_CLOSE_TARGET_CREATE = 'HANDLE_CLOSE_TARGET_CREATE',
  HANDLE_CLOSE_TARGET_DRAWER = 'HANDLE_CLOSE_TARGET_DRAWER',
  UPDATE_TARGET_LIST = 'UPDATE_TARGET_LIST',
  OPEN_TARGET_MEMBER_MODAL = 'OPEN_TARGET_MEMBER_MODAL',
  OPEN_TARGET_CREATE_MEMBER_MODAL = 'OPEN_TARGET_CREATE_MEMBER_MODAL',
  UPDATE_TARGET_DETAIL = 'UPDATE_TARGET_DETAIL',
  CANCLE_317_TARGET = 'CANCLE_317_TARGET',
  TARGET_322_ALIGN = 'TARGET_322_ALIGN',
  TARGET_321_REMOVE = 'TARGET_321_REMOVE',
  TARGET_325_326_327_SORT = 'TARGET_325_326_327_SORT',
  ALIGN_TARGET_UP = 'ALIGN_TARGET_UP',
  // 项目导航栏更新
  PROJECT_ROUTER_TAB_CONFIG = 'PROJECT_ROUTER_TAB_CONFIG',
  // 空间/项目列表排序更新
  SORT_OF_SPACE_AND_PROJECT = 'SORT_OF_SPACE_AND_PROJECT',

  // 时间识别更改
  TIME_ANALYSIS = 'TIME_ANALYSIS',
  // 禁止时间识别
  STOP_ANALYSIS = 'STOP_ANALYSIS',

  // p2完结事项Final matter
  FINALMATTAR = 'FINALMATTAR',

  // 小挂件刷新
  PENDANTREFRESH = 'PENDANTREFRESH',

  // 全局 空间权益弹窗
  SPACE_RIGHTS_MODAL_SHOW = 'SPACE_RIGHTS_MODAL_SHOW',
  SHOW_CREATE_TASK_WINDOW = 'SHOW_CREATE_TASK_WINDOW',

  // 全局 企业版弹窗
  TOGGLE_ENTERPRISE_VERSION_MODAL = 'TOGGLE_ENTERPRISE_VERSION_MODAL',
  TOGGLE_ENTERPRISE_ERROR_MODAL = 'TOGGLE_ENTERPRISE_ERROR_MODAL',
  TOGGLE_ENTERPRISE_VERSION_UPGRADE_MODAL = 'TOGGLE_ENTERPRISE_VERSION_UPGRADE_MODAL',

  // 企业微信退出
  TOGGLE_ENTERPRISE_VERSION_OUT = 'TOGGLE_ENTERPRISE_VERSION_OUT',

  USER_OPENED_WELFARE_CENTER = 'USER_OPENED_WELFARE_CENTER',

  // 全局 显示创建非我执行类事项的引导弹窗
  SHOW_CREATE_TASK_MYDISPATCH_GUIDE = 'SHOW_CREATE_TASK_MYDISPATCH_GUIDE',

  WECOM_NICKNAME = 'WECOM_NICKNAME',

  PAY_SUCCESS = 'PAY_SUCCESS',
  // 更新新增区域
  UPDATA_NEWAREA = 'UPDATA_NEWAREA',

  // 通知登录
  // LOGINSUCCESS = 'LOGINSUCCESS',
  // 事项循环更改文案标题
  // 为了解决刘奇之前在 app/pages/small-tools/task/tab-detail/RepeatTask 做的操作
  UPDATE_REPEAT_TASK_TITLE = 'UPDATE_REPEAT_TASK_TITLE',

  BINDTELEPHONE = 'BINDTELEPHONE',

  UPGRADE_PERSON_VIP_FORWARD_INVITE = 'UPGRADE_PERSON_VIP_FORWARD_INVITE',
  UPGRADE_PERSON_TEAM_VIP_FORWARD_INVITE = 'UPGRADE_PERSON_TEAM_VIP_FORWARD_INVITE',

  // 到达福利节点
  ARRIVE_WELFARE = 'ARRIVE_WELFARE',
  // 打开工作流详情添加协作人
  SHOW_WORK_FLOWDRAWER_DRAWER_ADD = 'SHOW_WORK_FLOWDRAWER_DRAWER_ADD',
  // 打开工作流详情移除协作人
  SHOW_WORK_FLOWDRAWER_DRAWER_DEL = 'SHOW_WORK_FLOWDRAWER_DRAWER_DEL',

  // 应用库的数据更新
  WHEN_APPLICATION__DATA_UPDATE = 'WHEN_APPLICATION__DATA_UPDATE',

  // 更新其他窗口（挂件等） 创建事项的配置
  UPDATE_RENDERER_CREATETASK_CONFIG = 'UPDATE_RENDERER_CREATETASK_CONFIG',

  // 更新通信录刷新协作人信息
  REFRESH_CONTACT_LIST = 'REFRESH_CONTACT_LIST',

  // 更新数据报表列表
  REFETCH_DATAREPORT_UPDATE_LIST = 'REFETCH_DATAREPORT_UPDATE_LIST'
}

export default Pubs
