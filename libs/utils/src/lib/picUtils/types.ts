export interface IDomToImageOptions {
  needUrl?: boolean
  ignoreElements?: (element: Element) => boolean
  backgroundColor?: string
  width?: number
  height?: number
}
