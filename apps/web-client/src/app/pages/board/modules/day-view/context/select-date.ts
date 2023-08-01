import React from 'react'

export const SelectDateCtx = React.createContext({
  selectedDate: 0,
  handleSelectDate: (a: number) => {
    console.log('handleSelectDate', a)
  }
})
