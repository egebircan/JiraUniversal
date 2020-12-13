import React, { useContext } from 'react'

const LeaderboardElement: React.FC = ({userName, totalScore}: any) => {
  return (
    <div>
      { `${userName} - ${totalScore}` }
    </div>
  )
}

export default LeaderboardElement