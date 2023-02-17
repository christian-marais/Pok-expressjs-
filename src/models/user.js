module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: {
            msg:"le nom est déjà pris"
        }
      },
      email:{
        type: DataTypes.STRING,
        unique:{
            msg: "le mail est déjà pris"
        },
        validate:{
            isEmail:{msg:"L'Email est déjà pris"}
        }

      },
      password: {
        type: DataTypes.STRING
      }
    })
  }