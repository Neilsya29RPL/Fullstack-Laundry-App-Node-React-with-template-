
//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//import express
const express = require("express")
const app = express()
app.use(express.json())

// import md5
const md5 = require("md5")

//import model
const models = require("../models/index")
const member = models.member

//menampilkan semua data member
app.get("/", (req, res) =>{
    member.findAll()
        .then(result => {
            res.json({
                member: result,
                count : result.length
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })  
})

//menampilkan data member berdasarkan id
app.get("/:id_member", (req, res) =>{
    member.findOne({ where: {id_member: req.params.id_member}})
    .then(result => {
        res.json({
            member: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//menambahkan data member baru
app.post("/",(req, res) =>{ 
        let data = {
            nama: req.body.nama,
            alamat: req.body.alamat,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp,
        }
        member.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//mengubah data member berdasarkan id
app.put("/:id", (req, res) =>{
    let param = { id_member: req.params.id}
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }

    member.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//menghapus data member berdasarkan id
app.delete("/:id", async (req, res) =>{
        let param = { id_member: req.params.id}
        // delete data
        member.destroy({where: param})
        .then(result => {
           
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//login
app.post("/auth", async (req,res) => {
    let data= {
        nama: req.body.nama,
        tlp: req.body.tlp                 
    }

    let result = await member.findOne({where: data})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app



