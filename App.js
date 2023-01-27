const express = require('express')
const app = express()
const port = 3000
let pokemons = require('./mock-pokemon.js')
app.get('/',(req,res) => res.send('Hello, Express!!!222'))
app.get('/api/pokemon/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.send(`bonjour pokemons ${pokemon.name} :${id}`)
})
app.get('/api/pokemons', (req,res)=> {
    res.send(` il y a ${pokemons.length} dans le pokedex`)
})
app.listen(port,() =>console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
