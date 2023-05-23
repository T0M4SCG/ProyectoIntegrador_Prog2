let express = require("express")
let db = require("../database/models")
let data = require("../data/data")
let bcrypt = require("bcryptjs")
let session = require("express-session")

let profiles = {
    index: function (req,res) {
        return res.render("profile",{data: data.usuarios, productos:data.productos})
    },
    edit:function (req,res) {
        
        return res.render("profile-edit",{data: data.usuarios})
    },
    formRegister:(req,res)=>{
        return res.render("register")
    },
    register:(req,res)=>{
        let info = req.body
            db.Usuario.create({
                email: info.email,
                nombre: info.name,
                contrasenia: bcrypt.hashSync(info.pass,12),
                dni: info.DNI,
                fechadenacimiento: info.fecha,
                fotodeperfil: info.foto
            })
            res.redirect("/users/login")

    },
    formLogin:(req,res)=>{
        return res.render("login")
    },
    login: (req,res)=>{
        db.Usuario.findOne({where:[{email: req.body.email}]})
        .then((resultado)=>{
            if ((bcrypt.compareSync(req.body.password,resultado.contrasenia)== false)) {
               return res.send("Contraseña incorrecta")
            }
            req.session.nombre = resultado.nombre
            req.session.email = resultado.email
            req.session.foto = resultado.foto
            res.redirect("/")     
        })
        .catch((error)=>{console.log(error);})
    },
    profile: (req,res)=>{
    return res.render("profile",{productos: data.productos})
    }
}

module.exports = profiles;