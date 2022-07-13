import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Button, Form, FormControl } from "react-bootstrap";

class NavbarHomeKasir extends React.Component {
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    window.location = "../Login"
  }
  render() {
    return(
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
        <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
          <img src="./assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
          <span className="ms-3 font-weight-bold text-white">Bunga Laundry</span>
        </a>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div className="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link text-white active bg-gradient-primary" href="/">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="/TransaksiOwner">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">done_all</i>
              </div>
              <span className="nav-link-text ms-1">Transaksi</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="sidenav-footer position-absolute w-100 bottom-0 ">
        <div className="mx-3">
            <a className="nav-link text-white " onClick={() => this.Logout()}>
              <div className="btn bg-gradient-primary mt-4 w-100">
                <i className="material-icons opacity-10">logout </i>
                <span className="nav-link-text ms-1">Log Out</span>
              </div>
            </a>
        </div>
      </div>
    </aside>
    );
  }
}

export default NavbarHomeKasir;