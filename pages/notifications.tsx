import React, { useContext } from 'react'
import { StoreContext } from "../store"
import Layout from '../components/layout'

const Notifications: React.FC = () => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value

  return (
    <Layout>
      <h1>Notifications</h1>
    </Layout>
  )
}

export default Notifications