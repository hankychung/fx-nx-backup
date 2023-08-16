export type Styles = {
  cell_wrap: string
  content_wrap: string
  gray: string
  img_box: string
  ov_hidden: string
  text: string
  txt_ellipsis: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
