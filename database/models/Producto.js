let sequelize = require("sequelize")
const data = require("../../data/data")

module.exports = (sequelize,dataTypes)=>{
    let alias = "Producto"
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey:true 
        },
        usuario_id:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        producto:{
            type: dataTypes.STRING,
            allowNull: false
        },
        descripcionProd:{
            type: dataTypes.STRING,
            allowNull: false
        },
        imagen:{
            type: dataTypes.STRING,
            allowNull: false 
        },
        likes:{
            type:dataTypes.INTEGER,
            default: 0
        },
        createdAt:{
            type: dataTypes.DATE
        },
        updatedAt:{
            type: dataTypes.DATE
        },
        deletedAt:{
            type: dataTypes.DATE,
            allowNull: true
        }
    }
    let config = {
        tableName: "productos",
        timestamps: true
    }
    let Producto = sequelize.define(alias,cols,config)
    Producto.associate = function(models){
        Producto.belongsTo(models.Usuario,{
            as:"products",
            foreignKey: "usuario_id"
        })
        Producto.hasMany(models.Comentario,{
            as:"commentsProd",
            foreignKey: "post_id"
        })
    }
    return Producto
}