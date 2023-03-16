import * as d3All from './d3-import'

export const d3 = d3All

export const linkVertical = d3
  .linkVertical()
  .source((d) => d.source)
  .target((d) => d.target)

export const linkHorizontal = d3
  .linkHorizontal()
  .source((d) => d.source)
  .target((d) => d.target)
