let express = require("express")
let data = require("../data/data")

let profiles = {
    index: function (req,res) {
        return res.render("profile",{data: data.usuarios, productos:data.productos})
    },
    edit:function (req,res) {
        
        return res.render("profile-edit",{data: data.usuarios})
    }
}

module.exports = profiles;