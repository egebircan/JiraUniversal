import React from "react"
import { Nav } from "react-bootstrap"

const Header: React.FC = () => (
  <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link href="/dashboard" style={{ fontSize: "40px" }}>
        Dashboard
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/leaderboard" style={{ fontSize: "40px" }}>
        Leaderboard
      </Nav.Link>
    </Nav.Item>
  </Nav>
)

export default Header
