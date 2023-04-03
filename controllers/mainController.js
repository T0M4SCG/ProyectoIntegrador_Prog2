var express = require('express');
var router = express.Router();
let data = require("../data/data")
let main = {
    index:function(req,res) {
      return res.render("index", {productos: data.productos})
    },
    register: function (req,res) {
      return res.render("register")
    },
    login: function (req,res) {
      return res.render("login")
    }
}

module.exports = main;