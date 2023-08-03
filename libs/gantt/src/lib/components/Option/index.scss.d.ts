export type Styles = {
  'btn-text': string
  cancel: string
  'colum-active': string
  comfirm: string
  content: string
  footer: string
  'full-mask': string
  header: string
  'img-tip': string
  item: string
  item__content: string
  item__content__drag: string
  item__content__name: string
  item__status: string
  option: string
  option__icon: string
  'option__icon-active': string
  option__main: string
  'option__main-shaking': string
  other: string
  shaking: string
  'sub-title': string
  title: string
  display: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
