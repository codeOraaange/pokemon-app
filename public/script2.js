document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the API
    // console.log($("#pokemon_id").val(""))//
    console.log(document.getElementById("pokemon_id").value)//
    fetch('https://pokeapi.co/api/v2/pokemon/' + document.getElementById("pokemon_id").value)
        .then(response => response.json())
        .then(data => {
            const pokemonTypes = data.types.map(pokemon => pokemon.type.name);
            const typesString = pokemonTypes.join(', ')
            const pokemonMoves = data.moves.map(pokemon => pokemon.move.name);
            const movesString = pokemonMoves.join(', ')
            console.log('12', data)//
            console.log('13', typesString)
            console.log('14',data.sprites.front_default)


            document.getElementById("name").innerHTML = data.name
            document.getElementById("image").src = data.sprites.front_default
            document.getElementById("moves").innerHTML = movesString
            document.getElementById("types").innerHTML = typesString
            document.getElementById("base_experience").innerHTML = data.base_experience
            document.getElementById("height").innerHTML = data.height
            document.getElementById("weight").innerHTML = data.weight
        })
        .catch(error => {
            console.error('Error fetching Pokemon data:', error);
        });
});
