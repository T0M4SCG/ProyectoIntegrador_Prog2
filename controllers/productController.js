let data = require('../data/data')
let db = require("../database/models")
let op = db.Sequelize.Op

let product = {
    products: function (req,res) {
        return  res.render("products",{data: data.productos, comentarios:data.comentarios})
      },
    detalle: function (req,res) {
        let id = req.params.id
        db.Producto.findOne({
            where:[{id:id}]
        })
        .then((resultado)=>{
            if(!resultado){
                return res.send("No existe el producto buscado")
            }
            else{
                return res.render('product',{resultado:resultado,comentarios:data.comentarios})
            }
        })
        },
    formAdd:function (req,res) {
        return res.render("product-add")
    },
    add:(req,res)=>{
        db.Producto.create({
            usuario_id: req.session.idUser,
            producto: req.body.nombreProducto,
            imagen: req.body.archivo,
            descripcionProd: req.body.descripcion
        })
        return res.redirect("/")
    },
    results:function (req,res) {
        db.Producto.findAll({
            where:[{
                [op.or]:[
                {producto: {[op.like]: `%${req.query.search}%`}},
                {descripcionProd:{[op.like]: `%${req.query.search}%`}}]
            }],
            order:[['createdAt','DESC']],
            include:[{association:'products'}]
        })
        .then((resultado)=>{
            let error = null
            if (resultado.length == 0) {
                error = "No se encontraron resultados"
                return res.render("search-results",{error: error})
            }
            else{
                return res.render("search-results",{error: error, resultado:resultado})
            }  
        })

    }
}


module.exports = product;