import { useMemoizedFn, useMount } from 'ahooks'
import { nxControllerRegister } from '@flyele-nx/service-module'
import { useMessage } from '@flyele-nx/ui'

export const useNxController = () => {
  const [showMsg, contextHolder] = useMessage()

  const init = useMemoizedFn(() => {
    // showMsg
    nxControllerRegister.handlerShowMsgRegister(showMsg)
  })

  useMount(() => {
    init()
  })

  return {
    contextHolder
  }
}
