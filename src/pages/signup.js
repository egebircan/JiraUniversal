import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { config } from "config"
import { Link, useHistory } from "react-router-dom"

function SignUp(props) {
  const router = useHistory()

  const [formValues, setFormValues] = useState({})
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formValues.userName || !formValues.password) {
      setErrorMsg("Fields cannot be empty")
      return
    }

    const response = await fetch(config.url.SIGN_UP, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formValues,
      }),
    })

    const jsonResponse = await response.json()
    if (jsonResponse.result == "success") {
      router.push("/")
    } else {
      setErrorMsg(jsonResponse.result)
    }
  }

  const onChange = e => {
    let { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>League of Tasks</h1>
        <h5>a competitive way to organize your work</h5>
      </div>
      <div className="Signup">
        <Form>
          <div style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</div>
          <Form.Group size="lg" controlId="email">
            <Form.Label>User Name</Form.Label>
            <Form.Control autoFocus onChange={onChange} name="userName" />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={onChange} name="password" />
          </Form.Group>
          <Button block size="lg" onClick={handleSubmit}>
            Sign Up
          </Button>
          <div style={{ width: "100%", height: "15px" }}></div>
          <Link to="/" passHref>
            <Button block size="lg" className="LoginBtn">
              Login
            </Button>
          </Link>
        </Form>
      </div>
    </>
  )
}

export default SignUp
