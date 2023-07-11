import { ReactComponent as ErrorMember } from '../../../../../../assets/payImg/error_member.svg'
import style from './index.module.scss'

const LogOut = ({
  txt = '该用户已注销，无法为其开通会员'
}: {
  txt: string
}) => {
  return (
    <div className={style.logout}>
      <div style={{ width: '100%' }}>
        <div className={style.info}>
          <ErrorMember></ErrorMember>
          <div>{txt}</div>
        </div>
      </div>
    </div>
  )
}

export default LogOut
