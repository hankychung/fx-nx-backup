export type Styles = {
  alertContainer: string
  cancel: string
  mask: string
  ok: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
