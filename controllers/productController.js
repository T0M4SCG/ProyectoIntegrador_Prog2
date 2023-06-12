let db = require("../database/models")
let op = db.Sequelize.Op
let product = {
    products: function (req,res) {
        db.Producto.findAll({
            order:[["createdAt", "DESC"],[{model:db.Comentario,as:"commentsProd"},'createdAt','DESC']],
            include:[{association:'commentsProd'}]
          })
          .then((resultado)=>{
            return res.render("products", {productos: resultado})
          })
      },
    detalle: function (req,res) {
        let id = req.params.id
        db.Producto.findOne({
            where:[{id:id}],
            include: [{association:"products"},{association:"commentsProd", include:[{association: "comments"}]}],
            order:[[{model:db.Comentario,as:"commentsProd"},'createdAt','DESC']]
        })
        .then((resultado)=>{
            if(!resultado){
                return res.send("No existe el producto buscado")
            }
            else{
                console.log(resultado.dataValues.commentsProd);
                return res.render('product',{resultado:resultado})
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
    borrar:(req,res)=>{
        db.Producto.destroy({
            where:{
                id:req.body.id
            }
        })
        return res.redirect('/')
    },
    productEditForm:(req,res)=>{
        return res.render("productEdit",{info:{
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            id:req.body.id
        }})
    },
    productEdit:(req,res)=>{
        if(req.body.nombre != ""){
            db.Producto.update({
                producto:req.body.nombre,
            },{
                where:{
                    id: req.body.id
                }
            })}
        if(req.body.descripcion != ""){
            db.Producto.update({
                descripcionProd:req.body.descripcion,
            },{
                where:{
                    id: req.body.id
                }
            })}
        if(req.body.imagen != ""){
            db.Producto.update({
                imagen: req.body.imagen
            },{
                where:{
                    imagen: req.body.imagen
                }
            })
        }
        return res.redirect('/')
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

    },
    addComment:(req,res)=>{
        db.Comentario.create({
            usuario_id: req.body.usuario_id,
            post_id: req.body.post_id,
            comentario: req.body.comentario
        })
        return res.redirect(`/products/detalle/${req.body.post_id}`)
    }
}


module.exports = product;