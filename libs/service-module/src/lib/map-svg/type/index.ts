import * as d3 from '../d3/d3-import'
import { IsMdata, Mdata } from './mdata'
import { TargetMdata } from './target'

export type Transition = d3.Transition<d3.BaseType, Mdata, d3.BaseType, unknown>

export type SelectionG = d3.Selection<SVGGElement, Mdata, SVGGElement, IsMdata>
export type SelectionTargetG = d3.Selection<
  SVGGElement,
  TargetMdata,
  SVGGElement,
  TargetMdata
>

export type SelectionPath = d3.Selection<
  SVGPathElement,
  Mdata,
  SVGGElement,
  IsMdata
>

export type SelectionRect = d3.Selection<
  SVGRectElement,
  Mdata,
  SVGGElement,
  IsMdata
>

export type SelectionCircle = d3.Selection<
  SVGCircleElement,
  Mdata,
  SVGGElement,
  IsMdata
>

export type SelectionText = d3.Selection<
  SVGTextElement,
  Mdata,
  SVGGElement,
  IsMdata
>
export type SelectionTargetText = d3.Selection<
  SVGTextElement,
  TargetMdata,
  SVGGElement,
  TargetMdata
>

export type SelectionTextContent = d3.Selection<
  SVGTextContentElement,
  Mdata,
  SVGGElement,
  IsMdata
>

export type EnterE = d3.Selection<d3.EnterElement, Mdata, SVGGElement, IsMdata>

export type GContent = d3.Selection<SVGGElement, Mdata, SVGGElement, IsMdata>
