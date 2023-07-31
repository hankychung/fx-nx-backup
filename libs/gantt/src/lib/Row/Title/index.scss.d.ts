export type Styles = {
  box: string
  'close-box': string
  'close-box-open': string
  'icon-box': string
  'icon-box-open': string
  'icon-cycle': string
  'icon-wrapper': string
  line: string
  'line-lower': string
  'line-outer': string
  modal: string
  'repeat-box': string
  'repeat-box-wrapper': string
  title: string
  'title-active': string
  'title-create': string
  txt: string
  txtBox: string
  'edit-icon': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
