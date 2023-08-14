import { useLocation } from 'react-router-dom'
import { useRef, useEffect } from 'react'
// import useSubscribe from 'hooks/useSubscribe'
// import sub from 'constants/pubsub'

type IProps = {
  handler: () => void
}

function isBoard() {
  return window.location.href.includes('schedule/board')
}

export const useUpdateBoard = ({ handler }: IProps) => {
  const { pathname } = useLocation()
  const needRefreshRef = useRef(false)
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  // useSubscribe(
  //   {
  //     type: sub.UPDATE_SCHEDULE,
  //     handler: () => {
  //       if (isBoard()) {
  //         handlerRef.current()
  //       } else {
  //         needRefreshRef.current = true
  //       }
  //     },
  //   },
  //   []
  // )

  // useSubscribe(
  //   {
  //     type: sub.FOLLOW_TASK,
  //     handler: () => {
  //       if (isBoard()) {
  //         handlerRef.current()
  //       } else {
  //         needRefreshRef.current = true
  //       }
  //     },
  //   },
  //   []
  // )

  // useSubscribe(
  //   {
  //     type: sub.DELETE_MATTER_ITEM,
  //     handler: () => {
  //       if (isBoard()) {
  //         handlerRef.current()
  //       } else {
  //         needRefreshRef.current = true
  //       }
  //     },
  //   },
  //   []
  // )

  useEffect(() => {
    if (isBoard() && needRefreshRef.current) {
      needRefreshRef.current = false
      handlerRef.current()
    }
  }, [pathname])
}
