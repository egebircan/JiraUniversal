import React, { useContext } from 'react'
import { StoreContext } from "../store"
import Layout from '../components/layout'
import LeaderboardElement from '../components/leaderboardElement'
import { GetStaticProps } from 'next'
import { config } from 'config'

const Leaderboard: React.FC = ({responseJson}: any) => {
  const { value } = useContext(StoreContext)
  const { state, dispatch} = value

  const renderLeaderboard = () => {
    console.log(responseJson)
    return responseJson.map(e => {
      return <LeaderboardElement userName={e.userName} totalScore={e.totalScore} />
    }) 
  }

  return (
    <Layout>
      <h1>Leaderboard</h1>
      {renderLeaderboard()}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(config.url.GET_ALL_TOTAL_SCORES)
  const responseJson = await response.json()

  //! TODO: null check
  return {
    props: {
      responseJson,
    } // will be passed to the page component as props
  }
}

export default Leaderboard