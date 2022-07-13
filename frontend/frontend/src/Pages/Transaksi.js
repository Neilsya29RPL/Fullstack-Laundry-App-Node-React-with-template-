import React from 'react'
import NavbarTransaksi from '../Navbar/NavbarAdmin/NavbarTransaksi';
import NavbarTranKasir from '../Navbar/NavbarKasir/NavbarTransaksiKasir';
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            transaksi: [],
            member: [],
            selectTransaction: [],
            isModalOpen: false,
            id_transaksi: "",
            id_outlet: "",
            nama_outlet:"",
            kode_invoice: "",
            id_member: "",
            nama_member: "",
            dibayar: "",
            status: "",
            tgl: "",
            tgl_bayar: "",
            detail_transaksi: [],
            time: "",
            total: 0
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
            this.state.role = localStorage.getItem("role")
            this.state.id_outlet = localStorage.getItem("outlet")
        } else {
            window.location = "/login"
        }
    }

    details = (item) => {
        let date = new Date(item.waktu)
        let tm = `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
        this.setState({
            selectTransaction: item.detail_transaksi,
            isModalOpen: true,
            id_transaksi: item.id_transaksi,
            kode_invoice:item.kode_invoice,
            id_member: item.member.id_member,
            nama_member: item.member.nama,
            id_outlet: item.outlet.id_outlet,
            nama_outlet: item.outlet.nama,
            time: tm
        })
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
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

    handleEdit = (item) =>{
        this.setState({
            id_transaksi: item.id_transaksi,
            dibayar: item.dibayar,
            status: item.status,
            kode_invoice: item.kode_invoice,
            nama_member: item.member.nama,
            tgl: item.tgl,
            tgl_bayar: item.tgl_bayar,
            action: "update",
            detail_transaksi: item.detail_transaksi,
            total: item.total,
            isModalOpen: true
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        //selecsi status
        let bayar = ""
        if(this.state.status === "diambil"){
            bayar = "dibayar"
        }else{
            bayar = "belum_bayar"
        }

        let form = {
          id_transaksi: this.state.id_transaksi,
          status: this.state.status,
          dibayar: bayar

        }
        let url = ""
        if (this.state.action === "insert") {
          url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
          axios.post(url, form)
            .then(res => {
              this.getTransaction()
              this.handleClose()
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
          axios.put(url, form)
            .then(res => {
              this.getTransaction()
              this.handleClose()
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    

      getTransaction = () => {
        let url = "http://localhost:8080/transaksi/byOutlet/" + this.state.id_outlet 

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    transaksi: res.data,
                })
                console.log(this.state.transaksi)
            })
            .catch(err => {
                console.log(err.message)
            })       
    }

    searching = event => {
      if(event.keyCode === 13){
          // 13 adalah kode untuk tombol enter
          let keyword = this.state.keyword.toLowerCase()
          let tempTransaksi = this.state.transaksi
          let result = tempTransaksi.filter(item => {
              return item.kode_invoice.toLowerCase().includes(keyword) 
          })
          this.setState({transaksi: result})
      }
  }

    detail = id =>{
        localStorage.setItem("id_transaksi", id)
        window.location = '/Detail_Transaksi'
    }

    dropTran = id_transaksi => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = "http://localhost:8080/transaksi/" + id_transaksi
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getTransaction()
                })
                .catch(error => console.log(error))
        }
    }
    
    
    componentDidMount() {
        this.getTransaction()
    }

    render() {
        return (
            <div>
                <link id="pagestyle" href="../assets/css/material-dashboard.css?v=3.0.2" rel="stylesheet" />
                <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
                  {this.state.role == "admin" &&
                              <NavbarTransaksi />
                          }
                  {this.state.role == "kasir" &&
                              <NavbarTranKasir />
                          }
                </aside>
                {/* Navbar */}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true" align="left">
                <div className="container-fluid py-1 px-3">
                  <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                          <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                          <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Transaksi</li>
                      </ol>
                      <h6 className="font-weight-bolder mb-0">Transaksi</h6>
                  </nav>
                  <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div className="input-group input-group-outline">
                            <label className="form-label">Search Transaksi...</label>
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
                          <h6 className="text-white text-capitalize ps-3">Transaksi</h6>
                        </div>
                      </div>
                      <div className="card-body px-0 pb-2">
                        <div className="table-responsive p-0">
                          <table className="table align-items-center mb-0">
                            <thead align="center">
                              <tr>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">No</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Kode Invoice</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Member</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Date</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-3">Deadline</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Payment Date</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">Payment Status</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-3">Status Order</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Option</th>
                              </tr>
                            </thead>
                            <tbody  align="center">
                            {this.state.transaksi.map((item, index) => {
                              return (                    
                              <tr key={index}>
                                  <td>
                                  <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.kode_invoice}</p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.member.nama}</p>
                                </td>
                                  <td>
                                  <p className="text-xs font-weight-bold mb-0">{this.convertTime(item.tgl)}</p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">{this.convertTime(item.batas_waktu)}</p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.tgl_bayar}</p>
                                </td>
                                  <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.dibayar}</p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">{item.status}</p>
                                </td>
                                <td>{item.dibayar === "dibayar" ? (
                                             <button className="btn btn-sm btn-primary m-1"  onClick={() => this.handleEdit(item)} disabled>
                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                             <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                             </svg>
                                             </button>
                                        ):(
                                            <button className="btn btn-sm btn-primary m-1"  onClick={() => this.handleEdit(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                            </button>
                                        )}
                                         <button className="btn btn-sm btn-danger m-1"  onClick={() => this.dropTran(item.id_transaksi)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            </button>
                                            <button className="btn btn-sm btn-success m-1" href="/Detail_Transaksi"  onClick={() => this.detail(item.id_transaksi)}>
                                            Detail
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
                     {/* modal admin  */}
                     <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton className="bg-gradient-primary">
                            <Modal.Title className="text-white">Transaction</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                    <Form.Label className="text-black" >Invoice Code </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="kode_invoice" disabled value={this.state.kode_invoice}  required/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                    <Form.Label className="text-black" >Transaction Date </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="tgl" disabled value={this.convertTime(this.state.tgl)}  required/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                    <Form.Label className="text-black" >Member Name </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama_member" disabled value={this.state.nama_member}  required/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-dark bg-transparent">
                                <Form.Label className="text-black" > Status Order </Form.Label>
                                <Form.Select id="mySelect" value={this.state.status} onChange={(ev) => this.setState({ status: ev.target.value })}>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Status
                                    </option>
                                    <option value="baru">Baru</option>
                                    <option value="proses">Proses</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="diambil">Diambil</option>
                                </Form.Select>
                            </Form.Group>
                            <br></br>
                            <div className="card col-12 mt-2">
                                <div className="bg-gradient-primary border-radius-lg pt-4 pb-3">
                                    <h5  className="text-white text-capitalize ps-3">Detail Laundry</h5>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Paket</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.state.detail_transaksi.map( (item, index) => (
                                            <tr key={index}>
                                                <td>{item.paket.nama_paket}</td>
                                                <td>Rp {item.paket.harga}</td>
                                                <td>{item.qty}</td>
                                                <td className="text-right">
                                                Rp { item.paket.harga * item.qty }
                                                </td>
                                            </tr>
                                            ) ) }
                                            <tr className="bg-light text-danger">
                                                <td colSpan="3" >Total + Biaya Tambahan</td>
                                                <td className="text-right">Rp {this.state.total}</td> 
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>                               
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
                </main>
            </div>
        )
    }
}