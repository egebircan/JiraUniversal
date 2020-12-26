import React, { useContext, useRef, useEffect } from 'react'
import { StoreContext } from "../store"
import Layout from '../components/layout'
import LeaderboardElement from '../components/leaderboardElement'
import { GetStaticProps } from 'next'
import { config } from 'config'
import styled from "styled-components"
import { Table } from "react-bootstrap"
import Link from 'next/link'

const LeaderboardDiv = styled.div`
  width: 40%;
  max-height: 400px;
  overflow: auto;
  margin: auto;
`

const Leaderboard: React.FC = ({responseJson}: any) => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const { userName } = state

  const ref = useRef();

  const renderLeaderboard = () => {
    console.log(responseJson)
    for(let i = 0; i < 100; i++) {
      responseJson.unshift({ userName: 'ege', totalScore: 34 })
    }
    //responseJson.push({ userName: 'mujdat', totalScore: 34 }

    const responseArray = responseJson.map((e, index) => {
      if(userName === e.userName) {
        console.log("GİRİYOR")
        console.log(ref)
        return (
          <tr ref={ref} style={{ backgroundColor: index + 1 % 2 === 0 ? '#d7e7fa' : 'white' }}>
            <td>{ index + 1 }</td>
            <td>{ e.userName }</td>
            <td>{ e.totalScore }</td>
          </tr>
        )
      }
      return <LeaderboardElement order={ index + 1 } userName={e.userName} totalScore={e.totalScore} />
    }) 

    console.log(ref) 

    return responseArray
  }

  useEffect(() => {
    ref && ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
  }, [])

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
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
      <Link href="/">
        <button onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</button>
      </Link>
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