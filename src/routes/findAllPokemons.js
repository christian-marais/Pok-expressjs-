const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){
      const name = req.query.name
      return Pokemon.findAndCountAll({
        where:{
          name:{// 'name' est le nom de la propriété du modèle pokemon
            [Op.like]:`%${name}%` // 'name' est le critere de la recherche
          }
        },
        limit:5
      })
      .then(({count,rows})=>{// les deux 
        const message = `Il y a ${count} qui correspondent à la recherche ${name}`
        res.json({message,data:rows})
      })
      // .then(pokemons=>{
      //   const message = `Il y a ${pokemons.length} qui correspondent à la recherche ${name}`
      //   res.json({message,data:pokemons})
      // })
    }else{
      Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })// méthode fournie par express
      })
      .catch(error => {
        const message="la liste des pokemons n'a pas pu être récupérée. Réessayer dans quelques instants"
        res.status(500).json({message,data:error})
        console.log(error)
      })
    }
  })
}