import React, { useContext, useState } from 'react'
import StoreContext from '../store'
import { Button, Form } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { config } from 'config'

function HomePage() {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const { userName } = state
  const router = useRouter()

  const [formValues, setFormValues] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  //console.log(userName)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formValues.userName || !formValues.password) {
      setErrorMsg('Fields cannot be empty')
      return
    }

    const response = await fetch(config.url.LOGIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formValues
      })
    })

    const textResponse = await response.text()
    //console.log(textResponse)
    if (textResponse == formValues.userName) {
      dispatch({ type: 'LOGIN', payload: textResponse })
      router.push('/dashboard')
    } else {
      setErrorMsg(textResponse)
    }
  }

  const onChange = (e) => {
    let { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
      <div className="placeholder">This website is not responsive. Please visit on a computer.</div>
      <div className="info" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>League of Tasks</h1>
        <h5>a competitive way to organize your work</h5>
      </div>
      <div className="Login">
        <Form>
          <div style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>
          <Form.Group size="lg" controlId="email">
            <Form.Label>User Name</Form.Label>
            <Form.Control autoFocus onChange={onChange} name="userName" />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={onChange} type="password" name="password" />
          </Form.Group>
          <Button block size="lg" type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <Link href="/signup" passHref>
            <Button block size="lg" className="SignUpBtn">
              Sign Up
            </Button>
          </Link>
        </Form>
      </div>
    </>
  )
}

export default HomePage
