import React from 'react'

import Header from '../header'
import Nav from '../nav'

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
