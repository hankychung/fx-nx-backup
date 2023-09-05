import React from 'react'

import { GanttList } from '@flyele-nx/gantt'

// Init
const App = () => {
  return (
    <div className="Wrapper">
      <GanttList projectId="2214923039933130" isinitGantt={false}></GanttList>
    </div>
  )
}

export default App
