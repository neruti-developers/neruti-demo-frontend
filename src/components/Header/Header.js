import React from 'react'
import { IndexLink, Link } from 'react-router'

import './Header.scss'

const navBarStyle = {
  background:'#425cbb',
  color : '#fff',
  marginBottom:'0px',
  fontFamily:'Montserrat, sans-serif'
}

const fontStyle = {
  color:'#fff',
  fontFamily:'Montserrat, sans-serif'
}

const navbarBrand = {
  padding:'10px'
}

const numbers = [1, 2, 3, 4, 5];

export default class Header extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

   render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top" style={navBarStyle}>
        <div className="navbar-header">
          <img to="/" src={require('./assets/nrt-logo.png')} alt='Neruti' className="navbar-brand" style={navbarBrand} ></img>
        </div>
        <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li>
                  <IndexLink to='/' activeClassName='route--active' style={fontStyle}>Home</IndexLink>
                </li>
                <li>
                  <Link to='/counter' activeClassName='route--active' style={fontStyle}>Counter</Link>
                </li>
                <li>
                  <Link to='/map' activeClassName='route--active' style={fontStyle}>Demo</Link>
                </li>
              </ul>
              
              </div>
        </nav>
      </div>
    );
  }

}

