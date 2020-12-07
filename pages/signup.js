import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { config } from 'config'

function Sign_up(props) {
    const router = useRouter()
  
    const [formValues, setFormValues] = useState({})
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      const response = await fetch(config.url.SIGN_UP, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formValues,
        })
      })
  
      const jsonResponse = await response.json()
      if(jsonResponse.result == "success") {
        router.push("/")
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
                        type="password"
                        onChange={onChange}
                        name="password"
                    />
                </Form.Group>
                <Link href="/" passHref>
                    <Button block size="lg" >
                        Go To Login
                    </Button>
                </Link>
                <Button block size="lg" onClick={handleSubmit}>
                    Sign Up
                </Button>
            </Form>
        </div>
    ) 
}

export default Sign_up
