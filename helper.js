exports.success = (message, data )=>{
    return {
        message,data
    }
}

exports.getUniqueId = (pokemons)=>{
    const pokemonsId = pokemons.map((pokemon)=> pokemon.id)
    const maxId = pokemonsId.reduce((a,b)=> Math.max(a,b))
    const uniqueId = MaxId+1
    return uniqueId
}
