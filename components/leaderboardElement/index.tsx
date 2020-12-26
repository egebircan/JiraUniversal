import React from 'react'
import { StoreContext } from 'store'

const LeaderboardElement: React.FC = ({order, userName, totalScore}: any) => {

  return (
    <tr style={{ backgroundColor: order % 2 === 0 ? '#d7e7fa' : 'white' }}>
      <td>{ order }</td>
      <td>{ userName }</td>
      <td>{ totalScore }</td>
    </tr>
  )
}

export default LeaderboardElement