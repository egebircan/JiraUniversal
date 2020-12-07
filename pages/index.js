import React, { useContext, useState } from 'react'
import Head from 'next/head'
import StoreContext from '../store'

import Layout from '../components/layout'
import * as Icon from '../components/icons'
import { THEME } from '../constants'
import { Button, Form } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { config } from 'config'
import { userReducer } from 'store/user'

function HomePage() {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const { userName } = state
  const router = useRouter()

  const [formValues, setFormValues] = useState({})

  console.log(userName)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(config.url.LOGIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formValues,
      })
    })

    const textResponse = await response.text()
    console.log(textResponse)
    if(textResponse == formValues.userName) {
      dispatch({ type: 'LOGIN', payload: textResponse })
      router.push("/dashboard")
    }
  }

  const onChange = (e) => {
    let { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <div className="Login">
      <Form>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            onChange={onChange}
            name="userName"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={onChange}
            type="password"
            name="password"
          />
        </Form.Group>
        <Link href="/signup" passHref>
          <Button block size="lg" >
            SignUp
          </Button>
        </Link>

        <Button block size="lg" type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default HomePage
