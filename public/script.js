document.addEventListener('DOMContentLoaded', () => {
    const pokemonListElement = document.getElementById('pokemonList');

    // Fetch data from the API
    fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(data => {
            console.log(data)//
            data.results.forEach(data => {
                fetch(data.url)
                    .then(response => response.json())
                    .then(data2 => {
                        pokemonListElement.innerHTML += `
                        <li>
                            <a href="/detail/${data2.id}">
                                ${data2.name}
                                <div style="margin-bottom:10px;"> <a name="click to enlarge" target="_blank"><img src="${data2.sprites.front_default}" class="preview-image" width="20%"/></a> </div>
                            </a>
                        </li>`;
                    })
                    .catch(error => {
                        console.error('Error fetching Pokemon data:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching Pokemon data:', error);
        });
});
