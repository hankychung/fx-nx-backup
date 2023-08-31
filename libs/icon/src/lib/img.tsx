import CircleArrowUpImg from './img/circle_arrow_up.svg'
import VipGift from './img/gift.svg'
import StarImg from './img/star.svg'
import Loading from './img/loading.gif'
import TakerAdd from './img/taker_add.png'
import TakerAddDisabled from './img/taker_add_disabled.png'
import TakerRemove from './img/taker_remove.png'

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

export const TakerAddIcon: React.FC<IImg> = (props) => {
  return <img {...props} src={TakerAdd} alt="" />
}

export const TakerAddDisabledIcon: React.FC<IImg> = (props) => {
  return <img {...props} src={TakerAddDisabled} alt="" />
}

export const TakerRemoveIcon: React.FC<IImg> = (props) => {
  return <img {...props} src={TakerRemove} alt="" />
}
