import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import NavbarPaket from '../Navbar/NavbarAdmin/NavbarPaket';
export default class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            pakets: [],
            id_paket: "",
            outlets: [],
            id_outlet: "",
            jenis: "",
            nama_paket: "",
            harga: "",
            image: null,
            isModalOpen: false,
            action: ""
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
            this.state.id_outlet = localStorage.getItem("outlet")
        } else {
            window.location = "/login"
        }

    }

    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
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

    getPaket = () => {
        let paket = (localStorage.getItem("nama_paket"))
        let url = "http://localhost:8080/paket/byOutlet/" + this.state.id_outlet 

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    pakets: res.data.paket,
                })
            })
            .catch(err => {
                console.log(paket)
            })       
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

    addPaket = () => {
        this.setState({
            isModalOpen: true,
            id_paket: "",
            id_outlet: this.state.id_outlet,
            jenis: "",
            nama_paket: "",
            harga: "",
            image: null,
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_paket: item.id_paket,
            id_outlet: item.id_outlet,
            jenis: item.jenis,
            nama_paket: item.nama_paket,
            harga: item.harga,
            image: item.image,
            action: "update"
        })
        
    }

    handleSave = (e) => {
        e.preventDefault()
        let form =  new FormData()//
        form.append("id_outlet",this.state.id_outlet)
        form.append("jenis",this.state.jenis)
        form.append("nama_paket",this.state.nama_paket)
        form.append("harga",this.state.harga)
        form.append("image",this.state.image)
       
        let url = ""
        if (this.state.action === "insert"){
            url = "http://localhost:8080/paket"
            axios.post(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getPaket()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
            }else if (this.state.action === "update") {
            url = "http://localhost:8080/paket/" + this.state.id_paket
            axios.put(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getPaket()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    handleDel = (id_paket) => {
        let url = "http://localhost:8080/paket/" + id_paket
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getPaket()
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
            let tempPaket = this.state.pakets
            let result = tempPaket.filter(item => {
                return item.nama_paket.toLowerCase().includes(keyword) 

            })
            this.setState({pakets: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getPaket()
        this.getOutlet()
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []
        // cek eksistensi dari data cart pada localStorage
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }
        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
        if(existItem){
            // jika item yang dipilih ada pada keranjang belanja
            window.alert(`Anda telah memilih ${selectedItem.nama_paket}`)
        }else{
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.nama_paket} yang beli`,"")
            if(promptJumlah !== null && promptJumlah !== ""){
                // jika user memasukkan jumlah item yg dibeli
                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.qty = promptJumlah
                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)
                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    render() {
        return (
            <div>
                {/* CSS Files */}
            <link id="pagestyle" href="../assets/css/material-dashboard.css?v=3.0.2" rel="stylesheet" />
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
                    <NavbarPaket/>
            </aside>
            {/* Navbar */}
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
              <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true" align="left">
                <div className="container-fluid py-1 px-3">
                  <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                          <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                          <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Paket</li>
                      </ol>
                      <h6 className="font-weight-bolder mb-0">Paket</h6>
                  </nav>
                  <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div className="input-group input-group-outline">
                            <label className="form-label">Search Paket...</label>
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
                <div className="container">
                <br></br>
                    <div className="back">
                <div className="container">
                    <div className="row">
                        {this.state.pakets.map((item, index) => {
                            return (
                                <div className="col-lg-6 col-sm-12 p-2" >
            <div className="card">
                <div className="card-body row" >
                    {/* menampilkan Gambar / cover */}
                    <div className="col-6">
                        <img src={"http://localhost:8080/image/paket/" + item.image} className="image" height="150" />
                        
                    </div>
                    {/* menampilkan deskripsi */}
                    <div className="col-6">
                        <h5 className="text-info">
                        {item.nama_paket}
                        </h5>
                        <h6 className="text-dark">
                            Jenis     : {item.jenis}
                        </h6>
                        <h6 className="text-dark">
                            Harga    : {item.harga}
                        </h6>
                        {/* button untuk mengedit */}
                        <button className="btn btn-sm btn-primary m-1"  onClick={() =>  this.handleEdit(item)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        </button>
                        {/* button untuk menghapus */}
                        <button className="btn btn-sm btn-dark m-1"  onClick={() => this.handleDel(item.id_paket)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
                            )
                        })}
                    </div>
                    <br/>
                    <button className="btn btn-dark" onClick={() => this.addPaket()}>
                    <i className="material-icons opacity-10">add</i>
                    <span className="nav-link-text ms-2"> Add Paket</span>
                    </button><br />

                    <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton className="bg-gradient-primary">
                            <Modal.Title  className="text-white">Form Paket</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-2">
                                    <Form.Label className="text-black">Id  Outlet </Form.Label>
                                    <Form.Control type="text" className="form-control mb-1" disabled value={this.state.id_outlet} required/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama_paket">
                                    <Form.Label className="text-black" >Nama Paket </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama_paket" placeholder="Masukkan Nama Paket" value={this.state.nama_paket} onChange={this.handleChange} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="jenis">
                                    <Form.Label className="text-black">Jenis</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="jenis" placeholder="Masukkan Jenis" value={this.state.jenis} onChange={this.handleChange} />
                                </Form.Group> */}
                                <Form.Group  className="mb-3">
                                <Form.Label className="text-black" >Jenis Paket</Form.Label>
                                <Form.Select id="mySelect"name="jenis" value={this.state.jenis} onChange={this.handleChange} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Jenis Paket
                                    </option>
                                    <option value="kiloan">Kiloan</option>
                                    <option value="selimut">Selimut</option>
                                    <option value="bed_cover">Bed Cover</option>
                                    <option value="kaos">Kaos</option>
                                    <option value="kain">Kain</option>
                                </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="harga">
                                    <Form.Label className="text-black">Harga</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="harga" placeholder="Masukkan Harga" value={this.state.harga} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="text-black">Image </Form.Label>
                                    {/* image tidak peru value  */}
                                    <Form.Control className="text-dark bg-transparent" type="file" name="image" placeholder="Masukkan Foto Customer" value={this.state.Image} onChange={this.handleFile} />
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
                </div>
                </div>
                </main>
                </div>
                
        )
    }

}