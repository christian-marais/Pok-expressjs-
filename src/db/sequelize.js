const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
const UserModel = require("../models/user")
const bcrypt = require('bcrypt')
  
if(process.env.NODE_ENV ==='production'){
  sequelize = new Sequelize('y4eo0i23xkt75vi0','s207w4ori0tsmqn8','ryppnwaemm9vzc60', {
    host: 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
}else{
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
  
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    console.log("INIT DB")
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('1997', 10).then(hash=>{
      User.create({
        username: "christian",
        email: "christimarais@hotmail.fr",
        password:hash
      }).then(user => console.log(user.toJSON()))
  
    })
   
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}