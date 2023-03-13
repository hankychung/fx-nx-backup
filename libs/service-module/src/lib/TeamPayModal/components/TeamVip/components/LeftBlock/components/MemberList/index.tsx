/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 16:38:39
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-13 10:28:47
 * @FilePath: /electron-client/app/components/PersonPayModal/components/TeamVip/components/LeftBlock/components/MemberList/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useState } from 'react'
import { FlyAvatar } from '@flyele/flyele-components'
import { useMemoizedFn } from 'ahooks'
import { filter, uniqueId } from 'lodash'
import { ReactComponent as MemberPersonVip } from '../../../../../../../../assets/payImg/member_person_vip.svg'
import { ReactComponent as MemberTeamVip } from '../../../../../../../../assets/payImg/member_team_vip.svg'

import SearchInput from '../../../../../SearchInput'
import style from './index.module.scss'
import { SingleCheckItemRow } from '../../../../../CheckItem/SingleCheckItemRow'
import {
  CheckBoxState,
  CheckColorType
} from '../../../../../CheckItem/SingleCircleCheckBox'
import { SelectMemberService } from '../../../../../../context/service'
import { useListPrevNext } from '../../../../../../hooks/useListPreNext'
import { VipPayType } from '../../../../../controller'

const MemberList = ({
  resultArr,
  service,
  vipType
}: {
  resultArr: any
  service: SelectMemberService
  vipType: VipPayType
}) => {
  const interacts: any = []
  const [searchValue, setSearchValue] = useState<string>('')
  const [activeSearch, setActiveSearch] = useState(false)
  const [searchList, setSearchList] = useState<any[]>([])
  const idPrefix = useMemo(() => uniqueId('searchPopover_list'), [])
  const { selIndex, next, prev } = useListPrevNext({
    list: searchList,
    defaultIndex: 0,
    idPrefix,
    scrollProps: {
      behavior: 'auto',
      block: 'center'
    }
  })
  const showList = interacts
  /**
   * 选中某一项
   */
  const onClickItem = useMemoizedFn((item: any) => {
    const resArr = [...resultArr]
    const key = item.user_id
    const findItem = resArr.findIndex((item) => item.user_id === key)

    if (findItem === -1) {
      resArr.push(item)
    } else {
      resArr.splice(findItem, 1)
    }
    service.selectMember({ list: resArr })
  })
  /**
   * 键盘控制
   */
  const keyBoardHandle = useMemoizedFn((e: KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case 'arrowdown':
        next()
        break
      case 'arrowup':
        prev()
        break
      case 'enter':
        searchList[selIndex] && onClickItem && onClickItem(searchList[selIndex])
        break
      default:
      // onSelect()
    }
  })

  const addEventListen = useMemoizedFn(() => {
    document.addEventListener('keydown', keyBoardHandle)
  })

  const clearEventListen = useMemoizedFn(() => {
    document.removeEventListener('keydown', keyBoardHandle)
  })
  /**
   * 处理搜索的逻辑
   * 模糊搜索
   */

  useEffect(() => {
    const resArr: any[] = []

    if (searchValue && showList && showList.length) {
      const sKey = ['original_name']
      const reg = new RegExp(searchValue)

      for (let i = 0; i < sKey.length; i++) {
        resArr.push(
          ...filter(showList, (item: any) => {
            if (!item[sKey[i]]) return false
            if (typeof item[sKey[i]] !== 'string') {
              return item[sKey[i]].toString().match(reg)
            }
            return item[sKey[i]].match(reg)
          })
        )
      }
    }

    setSearchList([...resArr])
  }, [searchValue, showList])
  const onActiveSearch = useMemoizedFn(() => {
    setSearchList(showList || [])
    setActiveSearch(true)
    addEventListen()
  })
  const onSearch = (value: string) => {
    if (!value) {
      setActiveSearch(false)
      clearEventListen()
    } else {
      addEventListen()
      setActiveSearch(true)
    }
    setSearchValue(value)
  }
  const onCancelSearch = () => {
    setSearchValue('')
    setActiveSearch(false)
    clearEventListen()
  }

  return (
    <div className={style.memberList}>
      {vipType === VipPayType.NOVIPCREATE && (
        <div>
          <div className={style.title}>
            <div>选择更多好友开通</div>
          </div>
          <div className={style.search}>
            <SearchInput
              value={searchValue}
              defaultText="输入用户名搜索"
              onActive={onActiveSearch}
              onChange={onSearch}
              onCancel={onCancelSearch}
              placeholder="输入用户名搜索"
              showCancle={false}
              // defaultText={searchDefaultText}
              overlayClassName={style.searchOverClassName}
            />
          </div>
        </div>
      )}

      {!activeSearch && (
        <div className={style.itemList}>
          {showList &&
            showList.length > 0 &&
            showList.map((_: any) => {
              return (
                <div key={_.user_id}>
                  <SingleCheckItemRow
                    // key={item.id}
                    data={{}}
                    state={
                      resultArr
                        .map((item: any) => item.user_id)
                        .includes(_.user_id)
                        ? CheckBoxState.checked
                        : CheckBoxState.unset
                    }
                    className={style.row_name}
                    onClick={() => onClickItem(_)}
                    colorType={CheckColorType.GREEN}
                    // isClickIcon
                  >
                    <div className={style.mem_info}>
                      <FlyAvatar src={_.avatar} size={30} />
                      <div className={style.mem_name}>
                        <div className={style.name_icon}>
                          <span>{_.original_name || _.nick_name}</span>
                          <div className={style.mine}>我</div>
                          <MemberPersonVip  className={style.member_person_vip}></MemberPersonVip>
                          <MemberTeamVip  className={style.member_team_vip}></MemberTeamVip>
                        </div>
                        <span>{_.telephone}</span>
                      </div>
                    </div>
                  </SingleCheckItemRow>
                </div>
              )
            })}
        </div>
      )}
      {activeSearch && (
        <div className={style.itemList}>
          {searchList &&
            searchList.length > 0 &&
            searchList.map((_) => {
              return (
                <div key={_.user_id}>
                  <SingleCheckItemRow
                    // key={item.id}
                    data={{}}
                    state={
                      resultArr
                        .map((item: any) => item.user_id)
                        .includes(_.user_id)
                        ? CheckBoxState.checked
                        : CheckBoxState.unset
                    }
                    className={style.row_name}
                    onClick={() => onClickItem(_)}
                    colorType={CheckColorType.GREEN}
                    // isClickIcon
                  >
                    <div className={style.mem_info}>
                      <FlyAvatar src={_.avatar} size={30} />
                      <div className={style.mem_name}>
                        <div>{_.original_name || _.nick_name}</div>
                        <span>{_.telephone}</span>
                      </div>
                    </div>
                  </SingleCheckItemRow>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default MemberList
