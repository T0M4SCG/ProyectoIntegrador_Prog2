let express = require("express")
let db = require("../database/models")
let data = require("../data/data")
let bcrypt = require("bcryptjs")
let session = require("express-session")

let profiles = {
    index: function (req,res) {
        let id = req.session.idUser
        db.Usuario.findOne({
            where:[{id:id}],
            include:[{association: "products"}],
            order:[[{model:db.Producto,as:"products"},'createdAt','DESC']]
        })
        .then((resultado)=>{
        return res.render("profile",{resultado:resultado})
        })
    },
    edit:function (req,res) {
        
        return res.render("profile-edit",{data: data.usuarios})
    },
    formRegister:(req,res)=>{
        return res.render("register")
    },
    register:(req,res)=>{
        let info = req.body
        db.Usuario.findOne({where:[{email:info.email}]})
        .then((resultado)=>{
            if (resultado) {
                return res.send("Este usuario ya existe")
            }
            if (info.pass.length < 4) {
                return res.send("La contraseña es demasiado corta, ingrese al menos 4 caracteres")
            }
            else{
            db.Usuario.create({
                email: info.email,
                nombre: info.name,
                contrasenia: bcrypt.hashSync(info.pass,12),
                dni: info.DNI,
                fechadenacimiento: info.fecha,
                fotodeperfil: info.foto
            })
            res.redirect("/users/login")}})
        .catch((error)=>{
            console.log(error);
        })
    },
    formLogin:(req,res)=>{
        return res.render("login")
    },
    login: (req,res)=>{
        db.Usuario.findOne({where:[{email: req.body.email}]})
        .then((resultado)=>{
            if(!resultado){
                return res.send("Usuario no encontrado") 
            }
            if ((bcrypt.compareSync(req.body.password,resultado.contrasenia)== false)) {
               return res.send("Contraseña incorrecta")
            }
            else{req.session.nombre = resultado.nombre
            req.session.email = resultado.email
            req.session.foto = resultado.foto
            req.session.idUser = resultado.id
            res.redirect("/")}
        })
        .catch((error)=>{console.log(error);})
    },
    profile: (req,res)=>{
        db.Usuario.findOne({
            where:[{id: req.params.id}],
            include:[{association: "products"}],
            order:[[{model:db.Producto,as:"products"},'createdAt','DESC']]
        })
        .then((resultado)=>{
            return res.render("profileUsers",{info:resultado})
        })
    }
}

module.exports = profiles;