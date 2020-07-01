import React, { useContext } from 'react'
import { StoreContext } from "../store"

function Deneme() {
  const { value } = useContext(StoreContext)
  const { state, dispatch} = value

  return (
    <h1>DENEME</h1>
  )
}

export default Deneme