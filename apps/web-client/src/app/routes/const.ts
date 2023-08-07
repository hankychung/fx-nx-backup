export enum RoutePath {
  login = '/login',
  // 侧边栏
  board = '/board',
  view = '/view',
  matter = '/matter',
  targetLibrary = '/targetLibrary',
  notes = '/notes',
  member = '/member',
  file = '/file',
  applicationLibrary = '/applicationLibrary',
  review = '/review',

  //子路由头部
  dayView = '/board/day-view',
  weekView = '/board/week-view',
  monthView = '/board/day-view',
  fullView = '/board/full-view',
  quadrantView = '/board/quadrant-view'
}

export enum MenuBarItem {
  EMPTY = '',
  PROJECT = 'project',
  SPACE = 'space',
  MORE = 'more'
}
