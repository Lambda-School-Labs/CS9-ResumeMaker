import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./CSS/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-dark bg-primary">
        <ol className="breadcrumb">
          {this.props.breadcrumbs.map((item, index) => <li className="breadcrumb-item" key={index}><Link to={item.link} className="sidebar-button">{item.title}</Link></li>)}
        </ol>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button type="button" className="btn btn-secondary">Logout</button>
      </nav>
    );
  }
}

export default Navbar;
