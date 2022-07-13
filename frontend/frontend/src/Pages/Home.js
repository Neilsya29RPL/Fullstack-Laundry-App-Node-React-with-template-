import React from 'react'
import axios from 'axios'
import NavbarHome from '../Navbar/NavbarAdmin/NavbarHome';
import NavbarHomeKasir from '../Navbar/NavbarKasir/NavbarHomeKasir';
import NavbarHomeOwner from '../Navbar/NavbarOwner/NavbarHomeOwner';

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            userName: "",
            userCount: 0,
            memberCount: 0,
            outletCount: 0,
            paketCount: 0,
            tranCount: 0
        }
        // cek di local storage apakah ada token (sudah login) 
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.role = localStorage.getItem('role')
        }
        // jika belum login 
        else {
            window.location = '/Login'
        }
    }

    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    // mendapatkan nama user
    getUser = () => {
        let user = localStorage.getItem('nama')
        let url = "http://localhost:8080/user"

        axios.get(url)
        .then(res => {
            this.setState({
                userName: user,
                userCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // mendapatkan nama member
    getMember = () => {
        let url = "http://localhost:8080/member"

        axios.get(url)
        .then(res => {
            this.setState({
                memberCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // mendapatkan nama paket
    getPaket = () => {
        let url = "http://localhost:8080/paket"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                paketCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // mendapatkan nama outlet
    getOutlet = () => {
        let url = "http://localhost:8080/outlet"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                outletCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // mendapatkan nama transaksi
    getTran = () => {
        let url = "http://localhost:8080/transaksi"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    tranCount: res.data.count
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    componentDidMount = () => {
        this.getUser()
        this.getMember()
        this.getPaket()
        this.getOutlet()
        this.getTran()
    }

    render() {
        return (
            <div>
              <div>
                <link id="pagestyle" href="../assets/css/material-dashboard.css?v=3.0.2" rel="stylesheet" />
                <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
                {this.state.role == "admin" &&
                            <NavbarHome />
                        }
                {this.state.role == "kasir" &&
                            <NavbarHomeKasir />
                        }
                {this.state.role == "owner" &&
                    <NavbarHomeOwner />
                }
                </aside>
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true" align="left">
                              <div className="container-fluid py-1 px-3">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                        <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
                                    </ol>
                                    <h6 className="font-weight-bolder mb-0">Dashboard</h6>
                                </nav>
                                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                                  <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                      <div className="input-group input-group-outline">
                                          <label className="form-label">Search...</label>
                                          <input type="text" className="form-control"/>
                                      </div>
                                  </div>
                                </div>
                                <ul className="navbar-nav  justify-content-end">
                                  <li className="nav-item d-flex align-items-center">
                                      <a href="/Cart" className="nav-link text-body font-weight-bold px-0">
                                        <i className="material-icons opacity-10">local_grocery_store</i>
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </nav>
                  {/* End Navbar */}
                  <div className="container-fluid py-4">
                    <div className="row">
                    <div className="row mt-4">
                      <div className="">
                        <div className="card z-index-2 ">
                          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                              <div className="chart">
                                <h2 className="alert text-white text-center mb-1" align="center">Hy! Welcome {this.state.userName}</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <br></br>
                  <div className="row mt-6">
                      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                          <div className="card-header p-3 pt-2">
                            <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                              <i className="material-icons opacity-10">people</i>
                            </div>
                            <div className="text-end pt-1">
                              <p className="text-sm mb-0 text-capitalize">Total Member</p>
                              <h4 className="mb-0">{this.state.memberCount}</h4>
                            </div>
                          </div>
                          <hr className="dark horizontal my-0" />
                          <div className="card-footer p-3" align="center">
                            <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Member Laundry</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                          <div className="card-header p-3 pt-2">
                            <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                              <i className="material-icons opacity-10">shop</i>
                            </div>
                            <div className="text-end pt-1">
                              <p className="text-sm mb-0 text-capitalize">Total Paket</p>
                              <h4 className="mb-0">{this.state.paketCount}</h4>
                            </div>
                          </div>
                          <hr className="dark horizontal my-0" />
                          <div className="card-footer p-3"  align="center">
                            <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Paket Laundry</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                        <div className="card">
                          <div className="card-header p-3 pt-2">
                            <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                              <i className="material-icons opacity-10">home</i>
                            </div>
                            <div className="text-end pt-1">
                              <p className="text-sm mb-0 text-capitalize">Total Outlet</p>
                              <h4 className="mb-0">{this.state.outletCount}</h4>
                            </div>
                          </div>
                          <hr className="dark horizontal my-0" />
                          <div className="card-footer p-3"  align="center">
                            <p className="mb-0"><span className="text-danger text-sm font-weight-bolder"></span>Outlet Laundry</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6">
                        <div className="card">
                          <div className="card-header p-3 pt-2">
                            <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                              <i className="material-icons opacity-10">local_grocery_store</i>
                            </div>
                            <div className="text-end pt-1">
                              <p className="text-sm mb-0 text-capitalize">Total Transaksi</p>
                              <h4 className="mb-0">{this.state.tranCount}</h4>
                            </div>
                          </div>
                          <hr className="dark horizontal my-0" />
                          <div className="card-footer p-3"  align="center">
                            <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Transaksi Laundry</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </main>
            </div>
         </div>
        )
    }
}