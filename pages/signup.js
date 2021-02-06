import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { config } from 'config'

function Sign_up(props) {
    const router = useRouter()
  
    const [formValues, setFormValues] = useState({})
    const [errorMsg, setErrorMsg] = useState("")
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      if(!formValues.userName || !formValues.password) {
        setErrorMsg("Fields cannot be empty")
        return
      }

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
      } else {
        setErrorMsg(jsonResponse.result)
      }
    }
  
    const onChange = (e) => {
      let { name, value } = e.target
      setFormValues({ ...formValues, [name]: value })
    }

    return (
        <div className="Signup">
          <Form>
            <div style={{color: "red", marginBottom: "10px"}}>{errorMsg}</div>
            <Form.Group size="lg" controlId="email">
                <Form.Label>User Name</Form.Label>
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
            <Button block size="lg" onClick={handleSubmit}>
                Sign Up
            </Button>
            <Link href="/" passHref>
                <Button block size="lg" className="LoginBtn">
                    Login
                </Button>
            </Link>
          </Form>
        </div>
    ) 
}

export default Sign_up
