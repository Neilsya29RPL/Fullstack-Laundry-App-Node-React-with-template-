import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Button, Form, FormControl } from "react-bootstrap";

class NavbarHome extends React.Component {
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    window.location = "../Login"
  }
  render() {
    return(
      // <div>
      //   <Navbar bg="dark" variant="dark">
      //       <Container>
      //         <Navbar.Brand href="#home">Laundry </Navbar.Brand>
      //         <Nav className="me-auto">
      //           <Nav.Link href="/">Home</Nav.Link>
      //           <Nav.Link href="/Paket">Paket</Nav.Link>
      //           <Nav.Link href="/Member">Member</Nav.Link>
      //           <Nav.Link href="/Transaksi">Transaksi</Nav.Link>
      //           <Nav.Link href="/User">User</Nav.Link>
      //           <Nav.Link onClick={() => this.Logout()}>Logout</Nav.Link>
      //         </Nav>
      //         <Form className="d-flex">
      //         <FormControl
      //           type="search"
      //           placeholder="Search"
      //           className="me-2"
      //           aria-label="Search"
      //         />
      //         <Button variant="outline-success">Search</Button>
      //       </Form>
      //       </Container>
      //   </Navbar> 
      //   <br></br>
      // </div>
      
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
            <a className="nav-link text-white" href="/">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white active bg-gradient-primary" href="/User">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">person</i>
              </div>
              <span className="nav-link-text ms-1">Users</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="/Member">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">people</i>
              </div>
              <span className="nav-link-text ms-1">Member</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="/Paket">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">shop</i>
              </div>
              <span className="nav-link-text ms-1">Paket</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/Outlet">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">home</i>
              </div>
              <span className="nav-link-text ms-1">Outlet</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="/ChooseMember">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">create</i>
              </div>
              <span className="nav-link-text ms-1">Choose Member</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="/Transaksi">
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

export default NavbarHome;