import React from 'react'

const NavBar = ({ contents, roomtype, uname }) => {
  return (
    <nav
      className="navbar navbar-dark bg-dark"
      style={{ justifyContent: 'center', color: 'white' }}
    >
      {contents}
    </nav>
  )
}

export default NavBar
