import React from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import NavbarUser from '../Navbar/NavbarAdmin/NavbarUser';

export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            user: [],
            outlets: [],
            id_user: "",
            nama: "",
            username: "",
            password: "",
            id_outlet: "",
            role: "",
            fillPassword: true,
            isModalOpen: false,
            action: ""

        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getUser = () => {
        let user = (localStorage.getItem("nama"))
        let url = "http://localhost:8080/user"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    user: res.data.user,
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(user)
    }

    getOutlet = () => {
      let url = "http://localhost:8080/outlet"

      axios.get(url, this.headerConfig())
      
          .then(res => {
              this.setState({
                  outlets: res.data.outlet,
                  // custCount: res.data.count
              })

          })
          .catch(err => {
              console.log(err.message)
          })
          
  }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_user: item.id_user,
            nama: item.nama,
            username: item.username,
            password: item.password,
            id_outlet: item.id_outlet,
            role: item.role,
            action: "update"
        })
    }

    Add = () => {
        this.setState({
            isModalOpen: true,
            action: "insert",
            id_user: 0,
            nama: "",
            username: "",
            password: "",
            id_outlet: "",
            role: "",
            fillPassword: true,
        })
    }

    dropUser = id_user => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = "http://localhost:8080/user/" + id_user
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getUser()
                })
                .catch(error => console.log(error))
        }
    }

    handleSave = e => {
        e.preventDefault()
        let form = {
            id_user: this.state.id_user,
            nama: this.state.nama,
            username: this.state.username,
            password: this.state.password,
            id_outlet: this.state.id_outlet,
            role: this.state.role
        }

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/user"
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getUser()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            url = "http://localhost:8080/user/" + this.state.id_user
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getUser()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        }
    }

    searching = event => {
      if(event.keyCode === 13){
          // 13 adalah kode untuk tombol enter
          let keyword = this.state.keyword.toLowerCase()
          let tempUser = this.state.user
          let result = tempUser.filter(item => {
              return item.nama.toLowerCase().includes(keyword) 

          })
          this.setState({user: result})
      }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getUser()
        this.getOutlet()
    }

    render() {
        return (
            <div>
            {/* <Header/> */}
              <div>
                {/* CSS Files */}
                <link id="pagestyle" href="../assets/css/material-dashboard.css?v=3.0.2" rel="stylesheet" />
                <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
                        <NavbarUser/>
                </aside>
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true" align="left">
                    <div className="container-fluid py-1 px-3">
                      <nav aria-label="breadcrumb">
                          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                              <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                              <li className="breadcrumb-item text-sm text-dark active" aria-current="page">User</li>
                          </ol>
                          <h6 className="font-weight-bolder mb-0">User</h6>
                      </nav>
                      <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                            <div className="input-group input-group-outline">
                                <label className="form-label">Search User...</label>
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
                              <h6 className="text-white text-capitalize ps-3">User Laundry</h6>
                            </div>
                          </div>
                          <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                              <table className="table align-items-center mb-0">
                                <thead align="center">
                                  <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">No</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Nama</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Username</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Outlet</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-3">Role</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Option</th>
                                  </tr>
                                </thead>
                                <tbody  align="center">
                                {this.state.user.map((item, index) => {
                                  return (                    
                                  <tr key={index}>
                                      <td>
                                      <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">{item.nama}</p>
                                    </td>
                                      <td>
                                      <p className="text-xs font-weight-bold mb-0">{item.username}</p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">{item.id_outlet}</p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">{item.role}</p>
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
                                      <button className="btn btn-sm btn-dark m-1"  onClick={() => this.dropUser(item.id_user)}>
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
                        <button className="btn btn-dark" onClick={() => this.Add()}>
                        <i className="material-icons opacity-10">add</i>
                        <span className="nav-link-text ms-2"> Add User</span>
                      </button>
                      </div>
                    </div>
                    <footer className="footer py-4  ">
                      <div className="container-fluid">
                        <div className="row align-items-center justify-content-lg-between">
                          <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                              © ,
                              made with <i className="fa fa-heart" /> by
                              <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank"> Neilsya Amstrani</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
                </main>
              </div>
              {/* modal admin  */}
              <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton className="bg-gradient-primary">
                        <Modal.Title className="text-white">Form User</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body >
                            <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                <Form.Label className="text-black" >Nama User </Form.Label>
                                <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama}
                                    onChange={e => this.setState({ nama: e.target.value })} required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label className="text-black">Username</Form.Label>
                                <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })} required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="text-black">Password</Form.Label>
                                <Form.Control className="text-dark bg-transparent" type="password" name="password" placeholder="Masukkan Password" value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })} required
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                    <Form.Label className="text-black"> Outlet </Form.Label>
                                    <Form.Select id="mySelect" value={this.state.id_outlet} onChange={e => this.setState({ id_outlet: e.target.value })} required>
                                    <option className="opsitransacd ksi" value="" readOnly={true} hidden={true}>
                                        Pilih outlet
                                    </option>
                                    {this.state.outlets.map((outlet) => (
                                        <option value={outlet.id_outlet}>{outlet.nama}</option>
                                    ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Label className="text-black" >Role </Form.Label>
                                <Form.Select id="mySelect" name="role" value={this.state.role} onChange={e => this.setState({ role: e.target.value })} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Role
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="owner">Owner</option>
                                </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={this.handleClose}>
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

