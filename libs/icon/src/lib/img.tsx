import CircleArrowUpImg from './img/circle_arrow_up.svg'
import VipGift from './img/gift.svg'

type IImg = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

export const CircleArrowUp: React.FC<IImg> = (props) => {
  return <img {...props} src={CircleArrowUpImg} alt="" />
}

export const VipGiftIcon: React.FC<IImg> = (props) => {
  return <img {...props} src={VipGift} alt="" />
}
