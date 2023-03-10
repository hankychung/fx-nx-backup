/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-01-10 18:08:00
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-08 16:36:58
 */

import React from 'react'
import { SelectMemberService } from './service'

export const SelectMemberContext = React.createContext<SelectMemberService>(
  new SelectMemberService()
)
