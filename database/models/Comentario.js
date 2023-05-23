module.exports = (sequelize,dataTypes)=>{
let alias = "Comentario"
let cols = {
    id:{
        type: dataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey:true 
    },
    post_id:{
        type:dataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    usuario_id:{
        type:dataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    comentario:{
        type:dataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type: dataTypes.DATE
    },
    updateAt:{
        type: dataTypes.DATE
    },
    deletedAt:{
        type: dataTypes.DATE,
        allowNull: true
    }
}
let config = {
    tableName: "comentarios",
    timestamps: true,
    underscored: true

}
let Comentario = sequelize.define(alias,cols,config)
Comentario.associate= (models)=>{
    Comentario.belongsTo(models.Usuario,{
        as:"comments",
        foreignKey:"usuario_id"
    })
    Comentario.belongsTo(models.Producto,{
        as:"commentsProd",
        foreignKey:"post_id"
    })
}
return Comentario
}