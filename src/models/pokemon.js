module.exports = (sequelize, Datatypes) =>{
    return sequelize.define('Pokemon',{
        id: {
            type: DataTypes.INTEGER,
            primarykey: true,
            autoIncrement:true
        },
        name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        hp:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        cp:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        picture:{
            type:DataTypes.STRING,
            allowNull:false
        },
        types:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps:true,
        createdAt:'created',
        updateAt:false
    })
}