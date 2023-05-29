type ValidConsoleType =
  | 'createDB-start'
  | 'createDB-end'
  | 'unzip-start'
  | 'unzip-end'
  | 'api-start'
  | 'api-end'
  | 'update-table-start'
  | 'update-table-end'
  | 'query-start'
  | 'query-end'
  | 'error'

function yieldConsole(info: {
  type:
    | 'createDB-start'
    | 'createDB-end'
    | 'update-table-start'
    | 'update-table-end'
}): void

function yieldConsole(info: {
  type: 'unzip-start' | 'unzip-end' | 'query-start' | 'query-end' | 'error'
  data: object
}): void

function yieldConsole(info: {
  type: 'api-start' | 'api-end'
  url: string
}): void

function yieldConsole(info: {
  type: ValidConsoleType
  data?: object
  url?: string
}) {
  self.postMessage({
    key: 'console',
    info: {
      ...info,
      timestamp: new Date().valueOf()
    },
    date: new Date().valueOf()
  })
}

export { yieldConsole }
