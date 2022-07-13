import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import NavbarMember from '../Navbar/NavbarAdmin/NavbarMember';
import NavbarMemberKasir from '../Navbar/NavbarKasir/NavbarMemberKasir';

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
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
            this.state.role = localStorage.getItem("role")
        } else {
            window.location = "/Login"
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

    addMember = () => {
        this.setState({
            isModalOpen: true,
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_member: item.id_member,
            nama: item.nama,
            alamat: item.alamat,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            image: item.image,
            action: "update"
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let form = {
            nama : this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
        let url = ""
        if (this.state.action === "insert"){
            url = "http://localhost:8080/member"
            axios.post(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getMember()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if (this.state.action === "update") {
            url = "http://localhost:8080/member/" + this.state.id_member
            axios.put(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getMember()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    handleDel = (id_member) => {
        let url = "http://localhost:8080/member/" + id_member
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getMember()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
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
                            <NavbarMember />
                        }
                {this.state.role == "kasir" &&
                            <NavbarMemberKasir />
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
                                  {/* button untuk mengedit */}
                                  <button className="btn btn-sm btn-primary m-1"  onClick={() => this.handleEdit(item)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                  </svg>
                                  </button>
                                  {/* button untuk menghapus */}
                                  <button className="btn btn-sm btn-dark m-1"  onClick={() => this.handleDel(item.id_member)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                  </svg>
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
                    <button className="btn btn-dark" onClick={() => this.addMember()}>
                    <i className="material-icons opacity-10">add</i>
                    <span className="nav-link-text ms-2"> Add Member</span>
                  </button>
                  </div>
                </div>
              </div>
            </main>
          </div>

        <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
            <Modal.Header closeButton  className="bg-gradient-primary">
                <Modal.Title className="text-white">Form Member</Modal.Title>
            </Modal.Header>
            <Form onSubmit={e => this.handleSave(e)}>
                <Modal.Body>
                    <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                        <Form.Label className="text-black" >Nama </Form.Label>
                        <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="alamat">
                        <Form.Label className="text-black">Alamat</Form.Label>
                        <Form.Control className="text-dark bg-transparent" type="text" name="alamat" placeholder="Masukkan Alamat" value={this.state.alamat} onChange={this.handleChange} />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="jenis_kelamin">
                        <Form.Label className="text-black">Gender</Form.Label>
                        <Form.Control className="text-dark bg-transparent" type="text" name="jenis_kelamin" placeholder="Masukkan Jenis Kelamin" value={this.state.jenis_kelamin} onChange={this.handleChange} />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="jenis_kelamin">
                        <Form.Label className="text-black" > Gender </Form.Label>
                        <Form.Select id="mySelect" name="jenis_kelamin" value={this.state.jenis_kelamin} onChange={this.handleChange} required>
                            <option className="firstOption" value="" hidden={true}>
                                Pilih Gender
                            </option>
                            <option value="P">Perempuan</option>
                            <option value="L">Laki-Laki</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tlp">
                        <Form.Label className="text-black"> Telephone</Form.Label>
                        <Form.Control className="text-dark bg-transparent" type="text" name="tlp" placeholder="Masukkan Telephone" value={this.state.tlp} onChange={this.handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={this.handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </div>
        )
    }
}