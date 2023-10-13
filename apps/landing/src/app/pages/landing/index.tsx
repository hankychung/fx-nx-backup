import styles from './index.module.scss'
import { ReactComponent as Arrow } from '../../../assets/arrow.svg'
import { sensors } from '../../../sensor'
import { getSearch } from '@flyele-nx/utils'
import { FlyLogo } from '@flyele-nx/icon'
import classNames from 'classnames'

const Landing = () => {
  const handleClick = (button_name: string) => {
    sensors.track('freeuse_button_click_2', { button_name: button_name })
    const url = `https://download.flyele.net/v1/downloads/install/package?channel=${
      getSearch()['utm_source']
    }`

    // console.log(getSearch()['utm_source'], url)

    window.location.href = url
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={classNames(styles.mb_show, styles.header_logo)}>
          <FlyLogo className={styles.header_logo_img} />
          <span>飞项</span>
        </div>
        <div className={styles.header_box}>
          <div className={styles.header_title}>
            飞项-可协同的时间、任务管理模版
          </div>
          <span className={styles.header_body}>
            基于PDCA、四象限时间管理、目标管理法为职场人量身打造，适合时间管理、任务管理、工作管理的多种管理需求，最终实现效率提升、工作精进、成长晋升。
          </span>
          <div
            className={classNames(styles.free_button_arrow)}
            style={{ marginTop: 40 }}
            onClick={() => {
              handleClick('下载使用-顶部')
            }}
            data-agl-cvt="6"
          >
            下载使用
          </div>
        </div>
      </div>
      <div className={classNames(styles.mb_show, styles.func_title)}>
        飞项功能介绍
      </div>
      <ol className={styles.functions}>
        <li className={styles.board}>
          <div className={classNames(styles.board_box, styles.box)}>
            <div className={styles.board_title}>
              今日面板-汇集个人和团队的所有事
            </div>
            <span className={styles.board_body}>
              飞项作为伴随职业人成长的平台非常强调“连接”，无论是团队任务还是个人待办，长期的目标或每日计划，都会汇集到你的个人工作管理面板，方便你管理自己与协作的所有事儿。
            </span>
            <div
              className={classNames(styles.free_button_arrow)}
              style={{ marginTop: 20 }}
              onClick={() => {
                handleClick('下载使用-今日面板')
              }}
              data-agl-cvt="6"
            >
              下载使用
              <Arrow />
            </div>
            <img
              className={classNames(styles.mb_show, styles.main_img)}
              src={require('../../../assets/mb-landingBG2.png')}
              alt=""
            />
          </div>
        </li>
        <li className={styles.manage}>
          <div className={classNames(styles.manage_box, styles.box)}>
            <div className={styles.manage_title}>多平台云同步，管理更方便</div>
            <span className={styles.manage_body}>
              PC端全面和细致管理，APP/公众号小程序便捷管理,让你随时掌握任务进展，多类提醒，把控时间不忘事
            </span>
            <div
              className={styles.free_button_arrow}
              style={{ marginTop: 20 }}
              onClick={() => {
                handleClick('下载使用-多平台云同步')
              }}
              data-agl-cvt="6"
            >
              下载使用
              <Arrow />
            </div>
            <img
              className={classNames(styles.mb_show, styles.main_img)}
              src={require('../../../assets/mb-landingBG3.png')}
              alt=""
            />
          </div>
        </li>
        <li className={styles.component}>
          <div className={classNames(styles.component_box, styles.box)}>
            <div className={styles.component_title}>
              多种桌面小组件，操作更方便
            </div>
            <span className={styles.component_body}>
              APP、PC桌面支持日、月多种视图小组件，让你不进入产品也能快速创建、完成与管理计划
            </span>
            <div
              className={styles.free_button_arrow}
              style={{ marginTop: 20 }}
              onClick={() => {
                handleClick('下载使用-多种桌面小组件')
              }}
              data-agl-cvt="6"
            >
              下载使用
              <Arrow />
            </div>
            <img
              className={classNames(styles.mb_show, styles.main_img)}
              src={require('../../../assets/mb-landingBG4.png')}
              alt=""
            />
          </div>
        </li>
        <li className={styles.view}>
          <div className={classNames(styles.view_box, styles.box)}>
            <div className={styles.view_title}>多种视图，统筹管理任务</div>
            <span className={styles.view_body}>
              四象限管理重要紧急，同时飞项支持根据你需要的条件自定义组合，全量视图汇集所有事情
              脉络图和关系图支持自由构建目标、项目、任务的脉络关系，以你喜欢的方式管你想管的事
            </span>
            <div
              className={styles.free_button_arrow}
              style={{ marginTop: 20 }}
              onClick={() => {
                handleClick('下载使用-多种视图')
              }}
              data-agl-cvt="6"
            >
              下载使用
              <Arrow />
            </div>
            <img
              className={classNames(styles.mb_show, styles.main_img)}
              src={require('../../../assets/mb-landingBG5.png')}
              alt=""
            />
          </div>
        </li>
        <li className={styles.target}>
          <div className={classNames(styles.target_box, styles.box)}>
            <div className={styles.target_title}>
              用目标及项目管理好团队的所有事儿
            </div>
            <span className={styles.target_body}>
              okr目标及关键成果法，帮助团队将目标落地到任务
              任务以项目为合集，统筹团队的日程、机制、数据
            </span>
            <div
              className={styles.free_button_arrow}
              style={{ marginTop: 20 }}
              onClick={() => {
                handleClick('下载使用-目标及项目管理')
              }}
              data-agl-cvt="6"
            >
              下载使用
              <Arrow />
            </div>
            <img
              className={classNames(styles.mb_show, styles.main_img)}
              src={require('../../../assets/mb-landingBG6.png')}
              alt=""
            />
          </div>
        </li>
      </ol>
      <div className={styles.user_say}>
        <div className={styles.user_say_box}>
          <div className={styles.user_say_box_tittle}>我们的用户这样说</div>
          <div className={styles.user_say_box_user}>
            <div
              className={classNames(
                styles.user_say_box_item,
                styles.user_say_box_item1
              )}
            ></div>
            <div
              className={classNames(
                styles.user_say_box_item,
                styles.user_say_box_item2
              )}
            ></div>
            <div
              className={classNames(
                styles.user_say_box_item,
                styles.user_say_box_item3
              )}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottom_title}>立即开启你的高效管理模式吧</div>
        <div className={styles.bottom_body}>把每件事都干的漂漂亮亮</div>
        <div
          className={styles.free_button}
          style={{
            backgroundColor: 'white',
            color: '#30D6C5'
          }}
          onClick={() => {
            handleClick('下载使用-底部')
          }}
          data-agl-cvt="6"
        >
          下载使用
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_item}>
          <p>版权所有©2020-2022飞项科技.保留一切权利.</p>
          <p>飞项科技（广州）有限公司 粤ICP备2020073377号</p>
        </div>
        <div className={styles.footer_item}>
          <p>粤公网安备44011202001924号</p>
          <p>增值电信业务经营许可证：粤B2-20220181</p>
        </div>
      </div>
    </div>
  )
}

export default Landing
