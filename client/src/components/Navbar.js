import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar(props) {
  if (props.user === null)
  return (
    <nav>
      <div className="nav-wrapper grey darken-3">
        <Link to="/" className="brand-logo">Clinic Locations <i className="fas fa-map-marked-alt"></i></Link>
        <ul className="right">
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/login">Sign In</NavLink></li>
        </ul>
      </div>-
    </nav>    
  );
  else return (
    <nav>
      <div className="nav-wrapper grey darken-3">
        <Link to="/" className="brand-logo">Clinic Locations <i className="fas fa-map-marked-alt"></i></Link>
        <ul className="right">
          <li><NavLink to="/">{props.user}</NavLink></li>
          <li onClick={props.logout}><NavLink to="/">Log out</NavLink></li>
        </ul>
      </div>-
    </nav>
  )
}

export default Navbar;