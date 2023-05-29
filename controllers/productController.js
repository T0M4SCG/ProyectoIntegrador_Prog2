let data = require('../data/data')
let db = require("../database/models")
let op = db.Sequelize.Op

let product = {
    products: function (req,res) {
        return  res.render("products",{data: data.productos, comentarios:data.comentarios})
      },
    detalle: function (req,res) {
        let id = req.params.id
        for (let i = 0; i < data.productos.length; i++) {
            if(data.productos[i].id == id){
                return res.render("product",{data: data.productos[i], comentarios: data.comentarios})
            }
        }
            return res.send("No existe el producto buscado")
    },
    add:function (req,res) {
        return res.render("product-add",{data: data.usuarios})
    },
    results:function (req,res) {
        db.Producto.findAll({
            where:[{
                producto: {[op.like]: req.params}  
            }]
        })
        .then((resultados)=>{

        })
        return res.render("search-results")
    }
}


module.exports = product;