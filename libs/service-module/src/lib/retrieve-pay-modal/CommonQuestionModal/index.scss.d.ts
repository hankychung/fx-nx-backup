export type Styles = {
  wrap: string
  header_title: string
  footer: string
  question_answer: string
  question: string
  answer: string
  add_subtract: string
  checkDifferent: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
