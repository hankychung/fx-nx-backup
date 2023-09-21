import { I18N } from '@flyele-nx/i18n'
import React, { FC, PropsWithChildren } from 'react'
import styles from './index.module.scss'
import { FlyButton } from '@flyele/flyele-components'
import { ArrowDownIcon } from '@flyele-nx/icon'
import cs from 'classnames'

interface IProps {
  visible: boolean
  title: string
  desc: string
  needFooter?: boolean
  goNext?: () => void
  goBack?: () => void
  disableNext?: boolean
  loadingNext?: boolean
  nextBtnText?: string
}

const _CommonPage: FC<PropsWithChildren<IProps>> = ({
  children,
  visible,
  title,
  desc,
  needFooter = true,
  goNext,
  goBack,
  disableNext = false,
  loadingNext = false,
  nextBtnText = I18N.common.nextStep
}) => {
  return (
    <div
      className={cs(
        styles.commonPageRoot,
        visible ? [styles.showPage] : [styles.unShowPage]
      )}
    >
      <div className={styles.titleBox}>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.title}>{title}</div>
      </div>
      {children}
      {needFooter && (
        <div className={styles.footer}>
          <div className={styles.goBackBtn} onClick={goBack}>
            <div className={styles.arrow}>
              <ArrowDownIcon
                width={20}
                height={20}
                color="rgba(0, 0, 0, 0.4)"
              />
            </div>
            {I18N.common.return}
          </div>
          <div className={styles.goNextBtn}>
            <FlyButton
              theme="primary"
              block
              disable={disableNext}
              loading={loadingNext}
              onClick={goNext}
            >
              {nextBtnText}
            </FlyButton>
          </div>
        </div>
      )}
    </div>
  )
}

export const CommonPage = React.memo(_CommonPage)
