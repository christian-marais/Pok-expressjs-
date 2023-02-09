const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = 'Le pokemon demandé n\'existe pas.'
          return res.json({ message, data: pokemon })  
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })  
      })
      .catch(error =>{
        const message = ` le pokemon n'a pas pu être récupéré. Réessayer dans quelques instants`
        res.status(500).json({message,data:error})
      })
  })
}