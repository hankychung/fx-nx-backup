import { I18N } from '@flyele-nx/i18n'
export interface IEqualComparisonData {
  key: string
  title: string // 标题
  desc?: string // 描述，tooltip显示
  free: string | boolean // 免费的权益
  personal: string | boolean // 个人会员的权益
  team: string | boolean // 团队会员的权益
  teamDesc?: string // 团队会员的权益， tooltip显示
  onclick?: boolean
}

export interface IEqualComparison {
  [key: string]: {
    title: string
    data: IEqualComparisonData[]
  }
}

/**
 * 身份权益对比
 */
export const identityEqualComparisonData: IEqualComparison = {
  taskAbility: {
    title: I18N.officialWebsite.abilityToHandleMatters,
    data: [
      {
        key: 'taskNumber',
        title: I18N.officialWebsite.numberOfItems,
        free: I18N.officialWebsite.infinite,
        personal: I18N.officialWebsite.infinite,
        team: I18N.officialWebsite.infinite
      },
      {
        key: 'taskChildNumber',
        title: I18N.officialWebsite.numberOfDescendantsAffairs,
        free: I18N.officialWebsite.multipleLayers2,
        personal: I18N.officialWebsite.multipleLayers,
        team: I18N.officialWebsite.multipleLayers
      },
      {
        key: 'taskTakerNumber',
        title: I18N.officialWebsite.singleEventCoordination,
        free: I18N.officialWebsite.people,
        personal: I18N.officialWebsite.people2,
        team: I18N.officialWebsite.people2
      },
      {
        key: 'taskImport',
        title: I18N.officialWebsite.eventImport,
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'taskExport',
        title: I18N.officialWebsite.eventExport,
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'customCircle',
        title: I18N.officialWebsite.customLoop,
        free: false,
        personal: true,
        team: true
      }
    ]
  },
  functionalUse: {
    title: I18N.officialWebsite.functionUsage,
    data: [
      {
        key: 'weekView',
        title: I18N.officialWebsite.weeklyView,
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'mouthView',
        title: I18N.common.calendar_view,
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'fullView',
        title: I18N.officialWebsite.fullTableView,
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'customView',
        title: I18N.common.custom_list,
        free: I18N.officialWebsite.individual7,
        personal: I18N.officialWebsite.individual6,
        team: I18N.officialWebsite.individual6
      },
      {
        key: 'fourView',
        title: I18N.officialWebsite.fourQuadrantView,
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'personalChromatogramView',
        title: I18N.officialWebsite.personalContextVision,
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'personalRelationView',
        title: I18N.officialWebsite.personalRelationshipView,
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'personalTarget',
        title: I18N.common.personalGoals,
        free: I18N.officialWebsite.nonDistributableItems,
        personal: true,
        team: true
      },
      {
        key: 'personalApplication',
        title: I18N.officialWebsite.personalTemplateLibrary,
        desc: I18N.officialWebsite.membersCanQuickly,
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'mouthSmallTool',
        title: I18N.officialWebsite.monthlyViewPendant,
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'taskChromatogram',
        title: I18N.officialWebsite.eventContextMap,
        free: I18N.officialWebsite.onlySupportsViewing2,
        personal: I18N.officialWebsite.onlySupportsViewing,
        team: I18N.officialWebsite.onlySupportsViewing
      },
      {
        key: 'batchOperation',
        title: I18N.officialWebsite.batchOperation,
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'localCalendarSync',
        title: I18N.officialWebsite.localCalendarSameAs,
        free: false,
        personal: true,
        team: true
      },
      {
        key: 'tableHeader',
        title: I18N.officialWebsite.tableHeaderDisplay,
        free: I18N.officialWebsite.individual5,
        personal: true,
        team: true
      },
      {
        key: 'notice',
        title: I18N.common.note,
        free: true,
        personal: true,
        team: true
      },
      {
        key: 'noticeWithTask',
        title: I18N.officialWebsite.notesRelatedMatters,
        free: false,
        personal: true,
        team: true
      }
    ]
  },
  dataAbility: {
    title: I18N.officialWebsite.dataCapability,
    data: [
      {
        key: 'fileSave',
        title: I18N.officialWebsite.fileStorage,
        free: '2G',
        personal: '20G',
        team: '20G'
      },
      {
        key: 'fileUpdateSize',
        title: I18N.officialWebsite.onASingleFile,
        free: '50M',
        personal: '300M',
        team: '300M'
      }
    ]
  },
  teamSpace: {
    title: I18N.officialWebsite.teamSpace,
    data: [
      {
        key: 'freeSpace',
        title: I18N.common.free_teamspace,
        free: I18N.officialWebsite.createJoin,
        personal: I18N.officialWebsite.createJoin,
        team: I18N.officialWebsite.createInfinitePlus
      },
      {
        key: 'specialSpace',
        title: I18N.common.pro_teamspace,
        free: false,
        personal: false,
        team: I18N.officialWebsite.createInfinitePlus
      }
    ]
  }
}

/**
 * 空间权益对比
 */
export const spaceEqualComparisonData: IEqualComparison = {
  space: {
    title: '',
    data: [
      {
        key: 'spaceMember',
        title: I18N.common.member,
        free: I18N.officialWebsite.peopleDoNotNeedMembers,
        personal: I18N.officialWebsite.peopleDoNotNeedMembers,
        team: I18N.officialWebsite.infiniteTeamOnly,
        teamDesc: I18N.officialWebsite.toObtainABlank,
        onclick: true
      },
      {
        key: 'externalMember',
        title: I18N.common.guest,
        free: false,
        personal: false,
        team: I18N.officialWebsite.unlimitedWithoutMeeting,
        teamDesc: I18N.officialWebsite.externalMembersCan,
        onclick: true
      },
      {
        key: 'spaceProjectNum',
        title: I18N.officialWebsite.withinASingleSpace,
        free: I18N.officialWebsite.individual4,
        personal: I18N.officialWebsite.individual4,
        team: I18N.officialWebsite.infinite
      },
      {
        key: 'projectMember',
        title: I18N.common.project_member,
        free: I18N.officialWebsite.individual4,
        personal: I18N.officialWebsite.individual4,
        team: I18N.common.numberOfPeopleInTheSpace
      },
      {
        key: 'projectTask',
        title: I18N.officialWebsite.itemsWithinTheProject,
        free: I18N.officialWebsite.individual3,
        personal: I18N.officialWebsite.individual3,
        team: I18N.officialWebsite.infinite
      },
      {
        key: 'spaceTask',
        title: I18N.officialWebsite.overallSpaceMatters,
        free: I18N.officialWebsite.individual2,
        personal: I18N.officialWebsite.individual2,
        team: I18N.officialWebsite.infinite
      },
      {
        key: 'spaceSave',
        title: I18N.officialWebsite.spaceStorage,
        free: '2G',
        personal: '2G',
        team: I18N.officialWebsite.numberOfPeopleG,
        teamDesc: I18N.officialWebsite.withinSpaceCapacity
      },
      {
        key: 'dataReport',
        title: I18N.officialWebsite.dataReport,
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'applicationTemplateNum',
        title: I18N.officialWebsite.numberOfTemplates,
        free: I18N.officialWebsite.individual,
        personal: I18N.officialWebsite.individual,
        team: true
      },
      {
        key: 'teamTarget',
        title: I18N.officialWebsite.teamObjectives,
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'teamMemberTarget',
        title: I18N.officialWebsite.teamMemberDay,
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'teamMonthView',
        title: I18N.officialWebsite.teamMonthlyView,
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'relationView',
        title: I18N.officialWebsite.relationshipView,
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'spaceChromatogram',
        title: I18N.officialWebsite.spatialVenationDiagram,
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'projectChromatogram',
        title: I18N.officialWebsite.projectContextMap,
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'spaceAvaOrBg',
        title: I18N.officialWebsite.advancedSpaceHead,
        free: false,
        personal: false,
        team: true
      },
      {
        key: 'spaceTaskChildNumber',
        title: I18N.officialWebsite.numberOfDescendantsAffairs,
        free: I18N.officialWebsite.multipleLayers2,
        personal: I18N.officialWebsite.multipleLayers2,
        team: I18N.officialWebsite.multipleLayers
      },
      {
        key: 'spaceTaskTakerNumber',
        title: I18N.officialWebsite.singleEventCoordination,
        free: I18N.officialWebsite.people,
        personal: I18N.officialWebsite.people,
        team: I18N.officialWebsite.infinite
      },
      {
        key: 'spaceTaskExport',
        title: I18N.officialWebsite.eventExport,
        free: false,
        personal: false,
        team: true
      }
    ]
  }
}
