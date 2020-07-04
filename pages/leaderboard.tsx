import React, { useContext } from 'react'
import { StoreContext } from "../store"
import Layout from '../components/layout'

const Leaderboard: React.FC = () => {
  const { value } = useContext(StoreContext)
  const { state, dispatch} = value

  console.log(state)

  return (
    <Layout>
      <h1>Leaderboard</h1>
    </Layout>
  )
}

export default Leaderboard