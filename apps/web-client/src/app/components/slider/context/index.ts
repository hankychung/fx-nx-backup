import React from 'react'
import { RoutePath } from '../../../routes/const'

export const MenuBarContext = React.createContext<{
  activeTab: RoutePath | ''
  actionCallback: ((k: RoutePath) => void) | null
}>({
  activeTab: '',
  actionCallback: null
})
