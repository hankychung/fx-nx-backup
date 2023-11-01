import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import styles from './index.module.scss'
import { PageBottom } from '../../components/page-bottom'
import { getLang } from '../../../config'
import cs from 'classnames'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../routes'

interface IList {
  key: string
  title: string
  desc: string
}

const commonUrl =
  'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/official-website/product-'

const UseButton = ({
  width,
  height,
  bgColor = '#30D6C5',
  marginTop,
  marginBottom,
  fontSize
}: {
  width?: string
  height?: string
  bgColor?: string
  marginTop?: string
  marginBottom?: string
  fontSize?: string
}) => {
  const navigate = useNavigate()

  const goToPage = () => {
    navigate(routePath.download)
    window.scrollTo(0, 0)
  }

  return (
    <div
      className={styles.btn}
      style={{
        width,
        height,
        backgroundColor: bgColor,
        marginTop: marginTop,
        marginBottom: marginBottom,
        fontSize: fontSize
      }}
      onClick={goToPage}
    >
      {I18N.officialWebsite.getStarted}
    </div>
  )
}

const List = ({
  title,
  list,
  btnColor,
  rootClass,
  circleColor = '#7589FA'
}: {
  title: string
  list: IList[]
  btnColor: string
  rootClass?: string
  circleColor?: string
}) => {
  return (
    <div className={cs(styles.listContent, rootClass)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.list}>
        {list.map((item) => (
          <div key={item.key} className={styles.listItem}>
            <div className={styles.itemTop}>
              <div
                className={styles.circle}
                style={{
                  backgroundColor: circleColor
                }}
              />
              <div className={styles.itemTitle}>{item.title}</div>
            </div>
            <div className={styles.itemBottom}>{item.desc}</div>
          </div>
        ))}
      </div>
      <UseButton bgColor={btnColor} />
    </div>
  )
}

export const ProductPage = () => {
  const isCN = getLang() === 'zh-CN'

  const scenarios: IList[] = [
    {
      key: 'okr',
      title: I18N.officialWebsite.okrDevelopment,
      desc: I18N.officialWebsite.visualDisplayGroup
    },
    {
      key: 'decompose',
      title: I18N.officialWebsite.layerByLayerDecomposition,
      desc: I18N.officialWebsite.setTeamGoals
    },
    {
      key: 'team',
      title: I18N.officialWebsite.relatedTaskItems,
      desc: I18N.officialWebsite.supportForTargeting
    }
  ]

  const project: IList[] = [
    {
      key: 'project',
      title: I18N.officialWebsite.flexiblePlanningSystem,
      desc: I18N.officialWebsite.byWhLight
    },
    {
      key: 'view',
      title: I18N.officialWebsite.multiViewVisualization,
      desc: I18N.officialWebsite.canUseGrouping
    },
    {
      key: 'follow',
      title: I18N.officialWebsite.taskProgressFrom,
      desc: I18N.officialWebsite.systemFollowUpPerson
    }
  ]

  const team: IList[] = [
    {
      key: 'template',
      title: I18N.officialWebsite.automationWork,
      desc: I18N.officialWebsite.supportForCombiningFatherAndSon
    },
    {
      key: 'teamView',
      title: I18N.officialWebsite.teamScheduleView,
      desc: I18N.officialWebsite.crossProjectViewing
    }
  ]

  const personal: IList[] = [
    {
      key: 'all',
      title: I18N.officialWebsite.fullPlatformMultiEnd,
      desc: I18N.officialWebsite.supportsPca
    },
    {
      key: 'good',
      title: I18N.officialWebsite.sunZhouMoonAndFourElephants,
      desc: I18N.officialWebsite.canPerformTasks
    },
    {
      key: 'summary',
      title: I18N.officialWebsite.earlyPlanAndLateTotal,
      desc: I18N.officialWebsite.pushOnTimeEveryDay
    }
  ]

  return (
    <div className={styles.productPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            {I18N.officialWebsite.flyingItemsCanBeCoordinated}
          </div>
          <div className={styles.headerDesc}>
            {I18N.officialWebsite.basedOnPdc}
          </div>
          <UseButton width="270px" marginTop="50px" />
        </div>
      </div>
      <div className={styles.bigBgBox}>
        <div
          className={styles.bgBox}
          style={{
            backgroundImage: `url(${commonUrl}pdca${isCN ? '' : '-en'}.png)`
          }}
        />
      </div>
      <div className={cs(styles.bigBgBox, styles.scenarios)}>
        <div
          className={styles.bgBox}
          style={{
            backgroundImage: `url(${commonUrl}scenarios${
              isCN ? '' : '-en'
            }.png)`
          }}
        >
          <div className={styles.scenariosTitle}>
            {I18N.officialWebsite.fourMajorWorkplaces}
          </div>
          <div className={styles.contentLeft}>
            <List
              title={I18N.officialWebsite.goalManagement}
              list={scenarios}
              btnColor="#7589FA"
              rootClass={styles.scenariosList}
            />
          </div>
        </div>
      </div>
      <div className={cs(styles.bigBgBox, styles.project)}>
        <div
          className={styles.bgBox}
          style={{
            backgroundImage: `url(${commonUrl}project${isCN ? '' : '-en'}.png)`
          }}
        >
          <List
            title={I18N.officialWebsite.projectManagement}
            list={project}
            btnColor="#FE8596"
            circleColor="#FE8596"
            rootClass={styles.projectList}
          />
        </div>
      </div>
      <div className={styles.bigBgBox}>
        <div
          className={styles.bgBox}
          style={{
            backgroundImage: `url(${commonUrl}team${isCN ? '' : '-en'}.png)`
          }}
        >
          <div className={styles.contentLeft}>
            <List
              title={I18N.officialWebsite.teamWorkManagement}
              list={team}
              btnColor="#5DD5FB"
              circleColor="#5DD5FB"
              rootClass={styles.teamList}
            />
          </div>
        </div>
      </div>
      <div className={cs(styles.bigBgBox, styles.schedule)}>
        <div
          className={styles.bgBox}
          style={{
            backgroundImage: `url(${commonUrl}schedule${isCN ? '' : '-en'}.png)`
          }}
        >
          <List
            title={I18N.officialWebsite.personalScheduleManagement}
            list={personal}
            btnColor="#30D6C5"
            circleColor="#30D6C5"
            rootClass={styles.personalList}
          />
        </div>
      </div>
      <div className={styles.bigBgBox}>
        <div
          className={styles.bgBox}
          style={{
            backgroundImage: `url(${commonUrl}core${isCN ? '' : '-en'}.png)`
          }}
        >
          <div className={styles.coreBtn}>
            <UseButton
              width="200px"
              height="44px"
              bgColor="#7589FA"
              marginBottom="5vw"
              fontSize="16px"
            />
          </div>
        </div>
      </div>

      <PageBottom />
    </div>
  )
}
