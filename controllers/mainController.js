var express = require('express');
let data = require("../data/data")
let main = {
    index:function(req,res) {
      return res.render("index", {productos: data.productos})
    }
}

module.exports = main;