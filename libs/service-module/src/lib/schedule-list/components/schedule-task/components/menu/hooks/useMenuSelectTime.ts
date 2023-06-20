import { useMemoizedFn } from 'ahooks'
import { IAction } from '../../../../../../context-menu'

export const useMenuSelectTime = (): IAction => {
  const action = useMemoizedFn(() => {
    console.log('调用外部')
  })

  return {
    txt: '调整时间',
    callback: action,
    checkAction: true
  }
}
