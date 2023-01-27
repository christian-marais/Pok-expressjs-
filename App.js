const express = require('express')
const app = express()
const port = 3000
let pokemons = require('./mock-pokemon.js')
const morgan = require('morgan')
const favicon = require('serve-favicon')

app.use(favicon(__dirname+'/favicon.ico'))
app.use(morgan('dev'))


/*app.use((req,res,next) =>{
    console.log (`URL: ${req.url}`)
    next()
})*/
const {success}= require('./helper.js')
app.get('/',(req,res) => res.send('Hello, Express!!!222'))
app.get('/api/pokemon/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = `il y a ${pokemons.length} dans le pokedex `
    //res.send(`bonjour pokemons ${pokemon.name} :${id}`)
    //res.json(success(message,pokemon))
    res.json(success(message,pokemons))
})
app.get('/api/pokemons', (req,res)=> {
    res.send(` il y a ${pokemons.length} dans le pokedex`)
})
app.listen(port,() =>console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
