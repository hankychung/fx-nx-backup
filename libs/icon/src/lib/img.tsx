import CircleArrowUpImg from './img/circle_arrow_up.svg'

type IImg = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

export const CircleArrowUp: React.FC<IImg> = (props) => {
  return <img {...props} src={CircleArrowUpImg} alt="" />
}
