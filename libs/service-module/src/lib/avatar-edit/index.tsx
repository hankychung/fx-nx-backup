import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { Slider, Modal, Button, ModalProps } from 'antd'
import { ReactComponent as ResetIcon } from '../../assets/icons/avatar_reset.svg'
import { ReactComponent as RotateIcon } from '../../assets/icons/avatar_rotate.svg'
import css from './index.module.scss'
import { I18N } from '@flyele-nx/i18n'

interface IProps {
  src: string
  open: boolean
  loading?: boolean

  /**
   * 弹窗设置
   */
  modalSetting?: Omit<ModalProps, 'open' | 'onCancel'>

  /**
   * AvatarEditor编辑组件设置
   */
  editorSetting?: Omit<AvatarEditorProps, 'ref' | 'image'>

  /**
   * 转换后的文件名
   * @default avatar.png
   */
  fileName?: string

  /**
   * 转换后的文件类型
   * @default image/png
   */
  fileType?: string

  onCancel?: () => void

  /**
   * canvas转图片成功
   */
  onSuccess?: (src: File) => void

  /**
   * 点击上传按钮
   */
  handleUpload?: () => void

  /**
   * 点击确定按钮
   */
  handleConfirm?: () => void
}

const _AvatarEdit = (props: IProps) => {
  const {
    open,
    src,
    loading,
    fileName = 'avatar.png',
    fileType = 'image/png',
    onCancel,
    onSuccess,
    handleUpload,
    handleConfirm,
    modalSetting,
    editorSetting
  } = props
  const editor = useRef<AvatarEditor>(null)
  const [image, setImage] = useState<string | File>('')
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    setImage(src)
  }, [src, setImage])

  const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSave = () => {
    console.log('check editor', editor)

    editor.current
      ?.getImageScaledToCanvas()
      .toBlob(async (res: Blob | null) => {
        console.log('check editor res', res)

        if (!res) return
        const file = new window.File([res], fileName, { type: fileType })

        onSuccess?.(file)
      }, fileType)
  }

  const handleScale = (val: number) => {
    // const scale = parseFloat(e.target.value)
    setScale(val)
  }

  const rotateLeft: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setRotate((rotate - 90) % 360)
  }

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }

  const reset = () => {
    setImage(src)
    setRotate(0)
    setScale(1)
  }

  return (
    <Modal
      className={css.container}
      open={open}
      zIndex={1002}
      title={I18N.common.avatarEdit}
      width={312}
      footer={null}
      mask={false}
      onCancel={onCancel}
      centered
      maskClosable={false}
      {...modalSetting}
    >
      <div className={css['modal-body']}>
        <Dropzone
          onDrop={([image]) => setImage(image)}
          noClick
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => {
            console.log('getRootProps', { ...getRootProps() })

            return (
              <div {...getRootProps()} className={css.preview}>
                <AvatarEditor
                  ref={editor}
                  scale={scale}
                  position={position}
                  onPositionChange={handlePositionChange}
                  rotate={rotate}
                  height={275}
                  width={275}
                  borderRadius={275}
                  image={image}
                  disableHiDPIScaling
                  border={[0, 0]}
                  {...editorSetting}
                />
                <input
                  name="newImage"
                  type="file"
                  onChange={handleNewImage}
                  {...getInputProps()}
                />
              </div>
            )
          }}
        </Dropzone>

        <div className={css.operate}>
          <div className={css['slide-wrap']}>
            <div
              className={css.icon}
              onClick={() => {
                const val = scale - 0.1

                setScale(val <= 1 ? 1 : val)
              }}
            >
              -
            </div>
            <Slider
              onChange={handleScale}
              min={1}
              max={2}
              step={0.01}
              defaultValue={1}
              className={css.slide}
              value={scale}
              tooltipVisible={false}
            />
            <div
              className={css.icon}
              onClick={() => {
                const val = scale + 0.1

                setScale(val >= 2 ? 2 : val)
              }}
            >
              +
            </div>
          </div>
          <div className={css['btn-group']}>
            <ResetIcon
              className={css.icon}
              width={18}
              height={18}
              color="#8B8D95"
              onClick={reset}
            />
            <RotateIcon
              className={css.icon}
              width={18}
              height={18}
              color="#8B8D95"
              onClick={rotateLeft}
            />
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <Button onClick={handleUpload} style={{ marginRight: 'auto' }}>
          {I18N.common.upload}
        </Button>
        <Button onClick={onCancel}>{I18N.common.cancel}</Button>
        <Button
          onClick={() => {
            handleConfirm?.()
            handleSave()
          }}
          style={{ marginLeft: '10px' }}
          type="primary"
          loading={loading}
        >
          {I18N.common.confirm}
        </Button>
      </div>
    </Modal>
  )
}

export const AvatarEdit = memo(_AvatarEdit)
