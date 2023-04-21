/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 16:38:39
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-21 17:08:26
 * @FilePath: /electron-client/app/components/PersonPayModal/components/TeamVip/components/LeftBlock/components/MemberList/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useState } from 'react'
import { FlyAvatar } from '@flyele/flyele-components'
import { useMemoizedFn } from 'ahooks'
import { filter, uniqueId } from 'lodash'
import { ReactComponent as MemberPersonVip } from '../../../../../../../../assets/payImg/member_person_vip.svg'
import { ReactComponent as MemberTeamVip } from '../../../../../../../../assets/payImg/member_team_vip.svg'

import SearchInput from '../../../../../search-input'
import style from './index.module.scss'
import { SingleCheckItemRow } from '../../../../../check-item/single-check-item-row'
import {
  CheckBoxState,
  CheckColorType
} from '../../../../../check-item/single-circle-check-box'
import { SelectMemberService } from '../../../../../../context/service'
import { useListPrevNext } from '../../../../../../hooks/useListPreNext'
import { VipPayType } from '../../../../../controller'
import { IFlyeleAvatarItem } from '../../../../../../../pay-modal'

const MemberList = ({
  resultArr,
  service,
  vipType,
  memberList,
  mineId
}: {
  resultArr: IFlyeleAvatarItem[]
  service: SelectMemberService
  vipType: VipPayType
  memberList: IFlyeleAvatarItem[]
  mineId: string
}) => {
  const interacts = memberList
  const [searchValue, setSearchValue] = useState<string>('')
  const [activeSearch, setActiveSearch] = useState(false)
  const [searchList, setSearchList] = useState<IFlyeleAvatarItem[]>([])
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
  const onClickItem = useMemoizedFn((item) => {
    if (item.userId === mineId && vipType === VipPayType.NOVIPCREATE) {
      return
    }
    const resArr = [...resultArr]
    const key = item.userId
    const findItem = resArr.findIndex((item) => item.userId === key)

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
    const resArr: IFlyeleAvatarItem[] = []

    if (searchValue && showList && showList.length) {
      const sKey = 'name'
      const reg = new RegExp(searchValue)

      for (let i = 0; i < sKey.length; i++) {
        const list = filter(showList, (item: IFlyeleAvatarItem) => {
          if (!item[sKey]) return false
          return item[sKey].match(reg)
        }) as IFlyeleAvatarItem[]
        resArr.push(...list)
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
            showList.map((_) => {
              return (
                <div key={_.userId}>
                  <SingleCheckItemRow
                    // key={item.id}
                    data={{}}
                    state={
                      resultArr.map((item) => item.userId).includes(_.userId)
                        ? _.userId === mineId &&
                          vipType === VipPayType.NOVIPCREATE
                          ? CheckBoxState.disable
                          : CheckBoxState.checked
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
                          <div className={style.name}>{_.name}</div>
                          {mineId === _.userId && (
                            <div className={style.mine}>我</div>
                          )}
                          {_.isVip && !_.isTeamVip && (
                            <MemberPersonVip
                              className={style.member_person_vip}
                            ></MemberPersonVip>
                          )}
                          {_.isTeamVip && (
                            <MemberTeamVip
                              className={style.member_team_vip}
                            ></MemberTeamVip>
                          )}
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
                <div key={_.userId}>
                  <SingleCheckItemRow
                    // key={item.id}
                    data={{}}
                    state={
                      resultArr.map((item) => item.userId).includes(_.userId)
                        ? _.userId === mineId &&
                          vipType === VipPayType.NOVIPCREATE
                          ? CheckBoxState.disable
                          : CheckBoxState.checked
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
                          <div className={style.name}>{_.name}</div>
                          {mineId === _.userId && (
                            <div className={style.mine}>我</div>
                          )}
                          {_.isVip && !_.isTeamVip && (
                            <MemberPersonVip
                              className={style.member_person_vip}
                            ></MemberPersonVip>
                          )}
                          {_.isTeamVip && (
                            <MemberTeamVip
                              className={style.member_team_vip}
                            ></MemberTeamVip>
                          )}
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
    </div>
  )
}

export default MemberList
