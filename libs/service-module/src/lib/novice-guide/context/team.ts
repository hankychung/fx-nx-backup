import React from 'react'

interface ISpaceInfo {
  icon: string
  icon_color: string
}

export const TeamContext = React.createContext<{
  userId: string
  activeIndustryTag: number
  activeTeamSize: string
  spaceInfo: ISpaceInfo
  spaceName: string
  activeIndustryTagTitle: string
  setActiveIndustryTag?: React.Dispatch<React.SetStateAction<number>>
  setActiveTeamSize?: React.Dispatch<React.SetStateAction<string>>
  setSpaceInfo?: React.Dispatch<React.SetStateAction<ISpaceInfo>>
  setSpaceName?: React.Dispatch<React.SetStateAction<string>>
  setActiveIndustryTagTitle?: React.Dispatch<React.SetStateAction<string>>
}>({
  userId: '',
  activeIndustryTag: 0,
  activeTeamSize: '',
  spaceInfo: {
    icon: '',
    icon_color: ''
  },
  spaceName: '',
  activeIndustryTagTitle: ''
})
