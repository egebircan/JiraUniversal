import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import Link from 'next/link'
import styles from './index.module.css'

const Header: React.FC = () => (
  <Nav fill className={styles.header} variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Link href="/dashboard" passHref>
        <Nav.Link>Dashboard</Nav.Link>
      </Link>
    </Nav.Item>
    <Nav.Item>
      <Link href="/leaderboard" passHref>
        <Nav.Link>Leaderboard</Nav.Link>
      </Link>
    </Nav.Item>
    <Nav.Item>
      <Link href="/notifications" passHref>
        <Nav.Link>Notifications</Nav.Link>
      </Link>
    </Nav.Item>
  </Nav>
);

export default Header