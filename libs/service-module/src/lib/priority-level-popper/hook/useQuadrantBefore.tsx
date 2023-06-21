import React, { useMemo } from 'react'
import {
  ImportantUrgent,
  ImportantNoUrgent,
  UrgentNoImportant,
  NoImportantNoUrgent
} from '@flyele-nx/icon'
import { ScheduleTaskConst } from '@flyele-nx/service'

interface UseQuadrantBeforeProps {
  type: ScheduleTaskConst.QuadrantValue
  color?: string
}

export const getQuadrantBeforeIcon = ({
  type,
  color
}: UseQuadrantBeforeProps) => {
  switch (type) {
    case ScheduleTaskConst.QuadrantValue.important_urgent: {
      return <ImportantUrgent color={color || '#E65454'} />
    }
    case ScheduleTaskConst.QuadrantValue.important_no_urgent: {
      return <ImportantNoUrgent color={color || '#E69448'} />
    }
    case ScheduleTaskConst.QuadrantValue.urgent_no_important: {
      return <UrgentNoImportant color={color || '#7E7FF8'} />
    }
    default: {
      return <NoImportantNoUrgent color={color || '#989F9F'} />
    }
  }
}

export const useQuadrantBefore = ({ type, color }: UseQuadrantBeforeProps) => {
  const titleBefore = useMemo(() => {
    return getQuadrantBeforeIcon({ type, color })
  }, [color, type])

  return titleBefore
}
