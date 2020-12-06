import React, { useContext } from 'react'
import Head from 'next/head'
import StoreContext from '../store'

import Layout from '../components/layout'
import * as Icon from '../components/icons'
import { THEME } from '../constants'
import { Button, Form } from 'react-bootstrap'
import Link from 'next/link'

function HomePage() {
  const store = useContext(StoreContext)

  return (
    <div className="Login">
      <Form onSubmit={() => console.log("form submitted")}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
          />
        </Form.Group>
        <Link href="/signup" passHref>
          <Button block size="lg" >
            SignUp
          </Button>
        </Link>

        <Button block size="lg" type="submit" >
          Login
        </Button>
      </Form>
    </div>
  )
}

export default HomePage
