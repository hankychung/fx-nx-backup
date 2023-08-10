import React from 'react'

export const PersonalContext = React.createContext<{
  activeTag: number
  activeTagName: string
  setActiveTag: (tag: number) => void
  setActiveTagName: (tagName: string) => void
}>({
  activeTag: 0,
  activeTagName: '',
  setActiveTag: (tag: number) => {
    console.log('tag', tag)
  },
  setActiveTagName: (tagName: string) => {
    console.log('tagName', tagName)
  }
})
