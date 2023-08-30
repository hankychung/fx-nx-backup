import { memo, useEffect, useState } from 'react'
import style from './index.module.scss'
import { FlyTextTooltip } from '@flyele/flyele-components'
import { FlyDoc } from '@flyele-nx/types'
import { getFileIcon, isImage } from '@flyele-nx/utils'
import { diskApi } from '@flyele-nx/service'

interface IProps {
  item: FlyDoc
}

const _FileItem = ({ item }: IProps) => {
  const [imageUrl, setImageUrl] = useState('')

  // TODO: 现在是每张图片都请求一次接口，待优化
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (isImage(item.file_name)) {
        const response = await diskApi.getOnlineImage({
          ids: [item.file_id],
          grantor: '',
          flyeleId: ''
        })
        if (response.code === 0) {
          const imageUrls = response.data
          const imageUrl = imageUrls[item.file_id]
          setImageUrl(imageUrl)
        }
      }
    }

    fetchImageUrl()
  }, [item.file_id, item.file_name])

  const src = isImage(item.file_name)
    ? imageUrl
    : getFileIcon(item.file_name, 'small')

  return (
    <div className={style.container}>
      <img className={style.icon} src={src} alt="" />
      <div className={style.info}>
        <FlyTextTooltip className={style.info_title} text={item.file_name} />
        <span className={style.info_desc}>{item.flyele_name}</span>
      </div>
    </div>
  )
}

export const FileItem = memo(_FileItem)
