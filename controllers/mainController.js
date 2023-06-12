var express = require('express');
let db = require("../database/models")
let main = {
    index:function(req,res) {
      db.Producto.findAll({
        order:[["createdAt", "DESC"],[{model:db.Comentario,as:"commentsProd"},'createdAt','DESC']],
        include:[{association:'commentsProd'}]
      })
      .then((resultado)=>{
        return res.render("index", {productos: resultado})
      })
    }
}

module.exports = main;