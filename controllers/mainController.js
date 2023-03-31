var express = require('express');
var router = express.Router();
let data = require("../data/data")
let main = {
    index:function(req,res) {
        return res.render("index")
    },
    products: function (req,res) {
      return  res.render("products",{data: data.productos, comentarios:data.comentarios})
    }
}

module.exports = main;