import React from 'react'
import axios from 'axios'
import { Button, Form } from "react-bootstrap";
import "../App.css"

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
            // logged: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        let url = "http://localhost:8080/user/auth"
        axios.post(url, data)
        .then(res => {
            if (res.data.logged) {
                let id_user = res.data.data.id_user
                let nama = res.data.data.nama
                let user = res.data.data
                let role = res.data.data.role
                let id_outlet = res.data.data.id_outlet
                let token = res.data.token
                localStorage.setItem("id_user", id_user)
                localStorage.setItem("nama", nama)
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("role", role)
                localStorage.setItem("outlet", id_outlet)
                localStorage.setItem("token", token)
                window.location = '/'
            }
            else {
                window.alert(res.data.message)
            }
        })
    }

    render() {
        return (
                <div className="maincontainer">
                <div class="container-fluid">
                    <div class="row no-gutter">
                        <div class="col-md-6 d-none d-md-flex bg-images">
                        <img src="https://img.freepik.com/free-vector/promotion-banner-liquid-detergent-laundry-with-washing-machine-soap-bubbles_1441-1627.jpg?t=st=1651277271~exp=1651277871~hmac=344039f80c0c1a7bd7e513ac2d7cf87349ab0a238be90afb46e193a9e2247738&w=740" alt="new"/>
                        </div>
                        <div class="col-md-6 bg-light">
                            <div class="login d-flex align-items-center py-5">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-10 col-xl-7 mx-auto">
                                            <h3 class="display-6">Bunga Laundry</h3>
                                            <p class="text-muted mb-4 ">Terjamin bersihnya!</p>
                                            <form onSubmit={(e) => this.handleLogin(e)}>
                                                <div class="form-group mb-3">
                                                    <input type="text" name="username"  placeholder="Username" value={this.state.username} onChange={this.handleChange} id="typeEmailX" className="form-control rounded-pill border-0 shadow-sm px-4" required />
                                                </div>
                                                <div class="form-group mb-3">
                                                     <input type="password" name="password"  placeholder="Password" value={this.state.password} onChange={this.handleChange} id="typePasswordX" className="form-control rounded-pill border-0 shadow-sm px-4 text-danger" required />
                                                </div>
                                                 <button className="btn bg-gradient-primary mt-4 w-100" type="submit">Login</button>
                                                <div class="text-center d-flex justify-content-between mt-4">
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

