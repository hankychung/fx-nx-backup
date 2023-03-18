/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 14:44:25
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-18 14:43:38
 * @FilePath: /fx-nx/libs/service-module/src/lib/MemberIntroduction/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/IntroductionBox'
import { memberPowerStaticData } from '@flyele-nx/constant'
import PayModal from '../PayModal'

export const MemberIntroduction = () => {
  const [show, setShow] = useState(false)
  const [vipType, setVipType] = useState('')

  const onClickBtn = (key: string) => {
    if (key === 'personal' || key === 'team') {
      setVipType(key)
      setShow(true)
    }
    console.log('onClickBtn', key)
  }

  const payType = useMemo(() => {
    return vipType === 'personal' ? 1 : 2
  }, [vipType])

  return (
    <div className={styles.memberIntroduction}>
      {memberPowerStaticData.map((item) => {
        return (
          <IntroductionBox
            key={item.key}
            info={item}
            onClickBtn={() => onClickBtn(item.key)}
          />
        )
      })}
      <PayModal
        visible={show}
        mineId=""
        modalType="team"
        payType={payType}
        memberList={[]}
        onClose={() => {
          setShow(false)
        }}
      ></PayModal>
    </div>
  )
}
