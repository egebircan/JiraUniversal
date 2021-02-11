// @ts-nocheck

import React, { useContext, useRef, useEffect, useState } from "react"
import { StoreContext } from "../store"
import Layout from "../components/layout"
import { Button } from "react-bootstrap"
import LeaderboardElement from "../components/leaderboardElement"
import { config } from "config"
import styled from "styled-components"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

const LeaderboardDiv = styled.div`
  margin-top: 40px;
`

const Leaderboard: React.FC = props => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  //const { userName } = state
  const userName = localStorage.getItem("username")
  const [users, setUsers] = useState([])

  const ref = useRef()

  const renderLeaderboard = () => {
    const responseArray = users.map((e, index) => {
      if (userName === e.userName) {
        return (
          <tr
            ref={ref}
            style={{
              backgroundColor: (index + 1) % 2 === 0 ? "#d7e7fa" : "white",
              color: "purple",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <td>{index + 1}</td>
            <td>{e.userName}</td>
            <td>{e.totalScore}</td>
          </tr>
        )
      }
      return <LeaderboardElement order={index + 1} userName={e.userName} totalScore={e.totalScore} />
    })

    return responseArray
  }

  const fetchUsers = async () => {
    const response = await fetch(config.url.GET_ALL_TOTAL_SCORES)
    const responseJson = await response.json()
    setUsers(responseJson)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    ref && ref.current && ref.current.scrollIntoView({ behavior: "smooth" })
  }, [users])

  return (
    <Layout>
      <Link to="/">
        <Button
          style={{ marginTop: "15px", marginRight: "15px", float: "right" }}
          onClick={() => dispatch({ type: "LOGOUT" })}
          variant="secondary"
          size="lg"
        >
          Log Out
        </Button>
      </Link>
      <div
        style={{
          width: "50%",
          margin: "auto",
          overflow: "auto",
          maxHeight: "700px",
        }}
      >
        <LeaderboardDiv>
          {users.length && (
            <Table striped bordered hover style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>{renderLeaderboard()}</tbody>
            </Table>
          )}
        </LeaderboardDiv>
      </div>
    </Layout>
  )
}

export default Leaderboard
