let data = require('../data/data')

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
    }}


module.exports = product;