let express = require("express")
let db = require("../database/models")
let bcrypt = require("bcryptjs")
let session = require("express-session")
let op = db.Sequelize.Op

let profiles = {
    index: function (req,res) {
        let id = req.session.idUser
        db.Usuario.findOne({
            where:[{id:id}],
            include:[{association: "products",include:[{association:"commentsProd"}]},
                     {association:"comments"}],
            order:[[{model:db.Producto,as:"products"},'createdAt','DESC']]
        })
        .then((resultado)=>{
        return res.render("profile",{resultado:resultado})
        })
    },
    formEdit:function (req,res) {
        let id = req.session.idUser
        db.Usuario.findOne({
            where:[{id:id}],
            include:[{association: "products"}],
            order:[[{model:db.Producto,as:"products"},'createdAt','DESC']]
        })
        .then((resultado)=>{
        return res.render("profile-edit",{data:resultado.dataValues, error:""})
        })
    },
    edit:(req,res)=>{
        let id = req.session.idUser
        if (req.body.name != "") {
            db.Usuario.update({
                nombre: req.body.name
            },{
                where:{
                    id:id
                }
            })
        }
        if (req.body.email != "") {
            db.Usuario.update({
                email: req.body.email
            },{
                where:{
                    id:id
                }
            })
        }
        if (req.body.DNI != "") {
            db.Usuario.update({
                dni: req.body.DNI
            },{
                where:{
                    id:id
                }
            })
        }
        if (req.body.fecha != "") {
            db.Usuario.update({
                fechadenacimiento: req.body.fecha
            },{
                where:{
                    id:id
                }
            })
        }
        if (req.body.pass != "") {
            db.Usuario.update({
                contrasenia: bcrypt.hashSync(req.body.pass,12)
            },{
                where:{
                    id:id
                }
            })
            req.session.destroy()
            return res.redirect("/users/login")
        }
        return res.redirect("/")
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
            if (req.body.remember == "on") {
                res.cookie("nombre",resultado.nombre,{maxAge: 1000*60*5})
                res.cookie("email",resultado.email,{maxAge: 1000*60*5})
                res.cookie("foto",resultado.fotodeperfil,{maxAge: 1000*60*5})
                res.cookie("id",resultado.id,{maxAge: 1000*60*5})
                req.session.nombre = req.cookies.nombre
                req.session.email = req.cookies.email
                req.session.foto = req.cookies.fotodeperfil
                req.session.idUser = req.cookies.id
                console.log(req.cookies.id);
                console.log(req.session.idUser);
                res.redirect("/")
            }
            else{
            req.session.nombre = resultado.nombre
            req.session.email = resultado.email
            req.session.foto = resultado.fotodeperfil
            req.session.idUser = resultado.id
            res.redirect("/")}
        })
        .catch((error)=>{console.log(error);})
    },
    profile: (req,res)=>{
        db.Usuario.findOne({
            where:[{id: req.params.id}],
            include:[{association: "products",include:[{association:"commentsProd"}]},{association:"comments"}],
            order:[[{model:db.Producto,as:"products"},'createdAt','DESC']]
        })
        .then((resultado)=>{
            return res.render("profileUsers",{info:resultado})
        })
    },
    results:(req,res)=>{
        db.Usuario.findAll({
            where:[{
                [op.or]:[
                    {email: {[op.like]: `%${req.query.search}%`}},
                    {nombre:{[op.like]: `%${req.query.search}%`}}]
            }],
            order:[['createdAt','DESC']]
        })
        .then((resultado)=>{
            let error = null
            if (resultado.length == 0) {
                error = "No se encontraron resultados"
                return res.render("search-results-users",{error: error})
            }
            else{
                return res.render("search-results-users",{error: error, resultado:resultado})
            }  
        })
    }
}

module.exports = profiles;