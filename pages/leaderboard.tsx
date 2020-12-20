import React, { useContext, useRef } from 'react'
import { StoreContext } from "../store"
import Layout from '../components/layout'
import LeaderboardElement from '../components/leaderboardElement'
import { GetStaticProps } from 'next'
import { config } from 'config'
import styled from "styled-components"
import { Table } from "react-bootstrap"

const LeaderboardDiv = styled.div`
  width: 40%;
  max-height: 400px;
  overflow: auto;
  margin: auto;
`

const Leaderboard: React.FC = ({responseJson}: any) => {
  const { value } = useContext(StoreContext)
  const { state, dispatch} = value
  const { userName } = state

  const renderLeaderboard = () => {
    console.log(responseJson)
    for(let i = 0; i < 100; i++) {
      responseJson.push({ userName: 'ege', totalScore: 34 })
    }
    responseJson.push({ userName: 'mujdat', totalScore: 34 })
    return responseJson.map((e, index) => {
      if(userName === e.userName) {
        return <LeaderboardElement order={ index + 1 } userName={e.userName} totalScore={e.totalScore} />
      }
      return <LeaderboardElement order={ index + 1 } userName={e.userName} totalScore={e.totalScore} />
    }) 
  }

  return (
    <Layout>
      <LeaderboardDiv>
        <Table striped bordered hover style={{ textAlign: 'center' }}>
        <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {renderLeaderboard()}
          </tbody>
        </Table>
      </LeaderboardDiv>
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