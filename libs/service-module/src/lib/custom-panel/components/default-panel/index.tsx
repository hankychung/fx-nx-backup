import React, { useRef, useState } from 'react'
import style from './index.module.scss'
import { PlayIcon } from '@flyele-nx/icon'

// 默认看板，播放引导视频
const DefaultPanel: React.FC<React.PropsWithChildren<unknown>> = () => {
  const ref = useRef<HTMLVideoElement>(null)

  const [showPlayBtn, setShowPlayBtn] = useState(false)
  const [playEnd, setPlayEnd] = useState(false)

  const onEnd = () => {
    setPlayEnd(true)

    if (ref.current) {
      ref.current.currentTime = 0
    }
  }

  const rePlay = () => {
    setShowPlayBtn(false)
    setPlayEnd(false)
    ref.current?.play()
  }

  return (
    <div className={style.wrap}>
      {/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
      <video
        src="https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/video/panel-guide.mp4"
        autoPlay
        onEnded={onEnd}
        ref={ref}
        style={{
          display: playEnd ? 'none' : 'block'
        }}
      />

      {playEnd && (
        <div
          className={style.finished_play_box}
          onMouseEnter={() => setShowPlayBtn(true)}
          onMouseLeave={() => setShowPlayBtn(false)}
        >
          {showPlayBtn && (
            <div className={style.play_box}>
              {/* <img alt="" src={playIcon} onClick={rePlay} />*/}
              <PlayIcon color="#5D7BFF" onClick={rePlay} />
              <span>点击再次播放</span>
            </div>
          )}
          <img
            alt=""
            src="https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/board/custom-panel-guide.png"
            className={style.guide_img}
          />
          <span className={style.tips}>自定义视图：用你想要的打开方式</span>
        </div>
      )}
    </div>
  )
}

export default DefaultPanel
