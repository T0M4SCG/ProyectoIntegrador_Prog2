let sequelize = require("sequelize")

module.exports= (sequelize,dataTypes)=>{

let alias= "Usuario";
let cols = {
    id:{
        autoIncremet: true,
        primaryKey: true,
        type: dataTypes.INTEGER.UNSIGNED
    },
    email:{
        type: dataTypes.STRING,
        unique:true,
        allowNull: false
    },
    nombre:{
        type: dataTypes.STRING,
        allowNull: false
    },
    contrasenia:{
        type: dataTypes.STRING,
        allowNull: false
    },
    fechadenacimiento:{
        type: dataTypes.DATE
    },
    dni:{
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    fotodeperfil:{
        type: dataTypes.STRING,
        defaultValue: 'https://pbs.twimg.com/media/FkbNNUYXkAMIn3F?format=jpg&name=900x900'
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
let config={
    tableName: "usuarios",
    timestamps: true
}
let Usuario = sequelize.define(alias,cols,config)
Usuario.associate = function(models){
    Usuario.hasMany(models.Producto,{
        as: "products",
        foreignKey: "usuario_id"
    })
    Usuario.hasMany(models.Comentario,{
        as: "comments",
        foreignKey: "usuario_id"
    })
    }
return Usuario
}
