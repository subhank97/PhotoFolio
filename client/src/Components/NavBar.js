import React from 'react'
import { BrowserRouter as Link } from 'react-router-dom'

function NavBar() {
  return (
  
      <div >
        <nav className="nav">
          <ul>
            <li>
            <Link to="/">Discover</Link>
            </li>
            <li>
              <Link to="/new-post">New Post</Link>
            </li>
          </ul>
        </nav>
      </div>

   
  )
}

export default NavBar