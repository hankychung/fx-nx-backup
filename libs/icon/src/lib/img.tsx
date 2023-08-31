import CircleArrowUpImg from './img/circle_arrow_up.svg'
import VipGift from './img/gift.svg'
import StarImg from './img/star.svg'
import Loading from './img/loading.gif'
import CircleArrowUpGreyImg from './img/circle_arrow_up_grey.png'

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

export const StarIcon: React.FC<IImg> = (props) => {
  return <img {...props} src={StarImg} alt="" />
}

export const LoadingIcon: React.FC<IImg> = (props) => {
  return <img {...props} src={Loading} alt="" />
}

export const CircleArrowUpGrey: React.FC<IImg> = (props) => {
  return <img {...props} src={CircleArrowUpGreyImg} alt="" />
}
