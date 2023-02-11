const bodyParser = require('body-parser')
//const morgan = require('morgan')
const favicon = require('serve-favicon')
const express = require('express')
const sequelize = require ('./src/db/sequelize.js')

const app = express()
const port = process.env.PORT || 3000

sequelize.initDb()
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    //.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.json({message:'hello heroku'})
})
//  placements des futurs points de terminaisons
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// gestion des erreurs 404
app.use(({res})=>{// si on ne veut pas mettre req
    const message =" Impossible de trouver la resource demandée. Vous pouvez essayer une autre url"
    res.status(404).json({message})
})  
    
app.listen(port,() =>console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))






// const {success, getUniqueId} = require('./helper.js')
// const {Sequelize, DataTypes} = require('sequelize')
// let pokemons = require('./mock-pokemon.js')
// const PokemonModel = require('./src/models/pokemon')

// const sequelize = new Sequelize(
//     'pokedex',
//     'christian',
//     '1997',
//     {
//         host:'localhost',
//         dialect :'mariadb',
//         dialectOptions :{
//             timezone:'Etc/GMT-2'
//         },
//         logging: false
//     }
// )
// const sequelize = new Sequelize(
//     'pokedex',//nom de la bdd
//     'christian',
//     '1997',
//     {
//         host:'localhost',
//         dialect :'mysql',
//         logging: false
//     }
// )
// sequelize.authenticate()
//     .then(() => console.log('la connexion à la bdd  a été établie'))
//     .catch(error => console.error(`impossible de se connecter à la bdd ${error}`))

// const Pokemon = PokemonModel(sequelize,DataTypes)

// sequelize.sync({force:true})
// .then(__=>console.log('la base de données "Pokedex" a bien été synchronisée '))


// console.log(__dirname+'\\favicon.ico')

/*app.use((req,res,next) =>{//middleware
    console.log (`URL: ${req.url}`)
    next()
})*/

// app.post('/api/pokemons',(req,res) => {
//     const id = getUniqueId(pokemons)
//     console.log(typeof req.body)
//     const pokemonCreated = {...req.body,...{id:id,created:new Date()}}
//     pokemons.push(pokemonCreated)
//     const message = `le pokemon ${pokemonCreated} a bien été crée.`
//     res.json(success(message,pokemonCreated))
// })
// app.get('/',(req,res) => res.send('Hello, Express!!!222'))
// app.get('/api/pokemon/:id',(req,res)=>{
//     const id = parseInt(req.params.id)
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     //res.send(`bonjour pokemons ${pokemon.name} :${id}`)
//     res.json(success(message,pokemon))

// })
// app.get('/api/pokemons', (req,res)=> {
//     // res.send(` il y a ${pokemons.length} dans le pokedex`)
//     const message = `il y a ${pokemons.length} dans le pokedex `
//     res.json(success(message,pokemons))
// })

// app.put('/api/pokemons/:id',(req,res)=>{
//     const id = parseInt(req.params.id)
//     const pokemonUpdated = { ...req.body,id:id}
//     pokemons = pokemons.map(pokemon =>{
//         return pokemon.id === id ? pokemonUpdated:pokemon
//     })
//     const message = ` le pokemon ${pokemonUpdated.name} a bien été modifié`
//     res.json(success(message,pokemonUpdated))
// })

// app.delete('/api/pokemons/:id', (req,res) => {
//     const id = parseInt(req.params.id)
//     let pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
//     pokemons = pokemons.filter(pokemon => pokemon.id !==id)
//     const message = `le pokemon ${pokemonDeleted.name} a bien été supprimé`

//     // const message = `le pokemon ${pokemonDeleted} a bien été supprimé`
//     res.json(success(message,pokemonDeleted))
// })

