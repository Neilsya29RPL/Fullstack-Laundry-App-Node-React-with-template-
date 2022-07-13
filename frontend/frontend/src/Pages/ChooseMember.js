import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import NavbarChooseMem from '../Navbar/NavbarAdmin/NavbarChooseMem';
import NavbarChooseMemKasir from '../Navbar/NavbarKasir/NavbarChooseMemKasir';

export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            members: [],
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            image: null,//karena objek jadi pake null
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
            this.state.role = localStorage.getItem('role')
        } else {
            window.location = "/Login"
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0] //up 1 file saja
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getMember = () => {
        let member = (localStorage.getItem("nama"))
        let url = "http://localhost:8080/member"
        axios.get(url)
            .then(res => {
                this.setState({
                    members: res.data.member,
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(member)
    }

    choose= item => {
        if (window.confirm(`Choose ${item.nama} ?`)){
            localStorage.setItem("id_member", item.id_member)
            localStorage.setItem("nama_member", item.nama)
            window.location = "/ChoosePaket"
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempMember = this.state.members
            let result = tempMember.filter(item => {
                return item.nama.toLowerCase().includes(keyword) 

            })
            this.setState({members: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getMember()
    }

    render() {
        return (
        <div>
          <div>
            {/* CSS Files */}
            <link id="pagestyle" href="../assets/css/material-dashboard.css?v=3.0.2" rel="stylesheet" />
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
            {this.state.role == "admin" &&
                        <NavbarChooseMem />
                    }
            {this.state.role == "kasir" &&
                        <NavbarChooseMemKasir />
                    }
            </aside>
            {/* Navbar */}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
              <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true" align="left">
                <div className="container-fluid py-1 px-3">
                  <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                          <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                          <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Member</li>
                      </ol>
                      <h6 className="font-weight-bolder mb-0">Member</h6>
                  </nav>
                  <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div className="input-group input-group-outline">
                            <label className="form-label">Search Member...</label>
                            <input type="text" className="form-control" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
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
                  <div className="col-12">
                    <div className="card my-4">
                      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                          <h6 className="text-white text-capitalize ps-3">Member Laundry</h6>
                        </div>
                      </div>
                      <div className="card-body px-0 pb-2">
                        <div className="table-responsive p-0">
                          <table className="table align-items-center mb-0">
                            <thead align="center">
                              <tr>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">No</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Nama</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Alamat</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Gender</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-3">Telephone</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Option</th>
                              </tr>
                            </thead>
                            <tbody  align="center">
                            {this.state.members.map((item, index) => {
                              return (                    
                              <tr key={index}>
                                  <td>
                                  <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.nama}</p>
                                </td>
                                  <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.alamat}</p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.jenis_kelamin}</p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.tlp}</p>
                                </td>
                                <td>
                                <button className="btn btn-sm btn-success m-1" onClick={() => this.choose(item)}>
                                    Choose
                                </button>
                                </td>
                              </tr>
                                )
                              })}
                            </tbody>
                          </table>
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