import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import Link from 'next/link'

class Sign_up extends Component {
    render() {
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
                    <Link href="/" passHref>
                        <Button block size="lg" >
                            Go To Login
                        </Button>
                    </Link>
                    <Button block size="lg" >
                        Sign Up
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Sign_up
