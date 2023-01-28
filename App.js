const express = require('express')
const app = express()
const {success, getUniqueId} = require('./helper.js')
const port = 3000
let pokemons = require('./mock-pokemon.js')
const morgan = require('morgan')
const favicon = require('serve-favicon')

app 
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
console.log(__dirname+'\\favicon.ico')

/*app.use((req,res,next) =>{
    console.log (`URL: ${req.url}`)
    next()
})*/
app.post('/api/pokemons',(req,res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body,...{id:id,created:new Date()}}
    const message = `le pokemon ${pokemonCreated} a bien été crée.`
    res.json(success(message,pokemonCreated))
})
app.get('/',(req,res) => res.send('Hello, Express!!!222'))
app.get('/api/pokemon/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    //res.send(`bonjour pokemons ${pokemon.name} :${id}`)
    res.json(success(message,pokemon))
    
})
app.get('/api/pokemons', (req,res)=> {
    // res.send(` il y a ${pokemons.length} dans le pokedex`)
    const message = `il y a ${pokemons.length} dans le pokedex `
    res.json(success(message,pokemons))
})

app.listen(port,() =>console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
