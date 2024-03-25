
const contenedorPokemon = document.getElementById("app");
const nextBtn = document.getElementById("nextBtn");
let sumaPagina = 0;
const prevBtn = document.getElementById("prevBtn");
let urlPokemon =`https://pokeapi.co/api/v2/pokemon/`
let url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${sumaPagina}`;
const searchBtn = document.getElementById('searchBtn')
const selectPkmn = document.getElementById('searchInput')

const obtenerPokemon = async () => {
  const response = await fetch(url);
  const pokemons = await response.json();
  console.log(pokemons)

  const imagesPromises = []

  pokemons.results.map(poke => {
    imagesPromises.push(fetch(urlPokemon+poke.name));
  });

  const responses = await Promise.all(imagesPromises);
  console.log(responses)
  const imagestojson = []
  responses.map(it => imagestojson.push(it.json()))
  const images = await Promise.all(imagestojson)
  console.log(images)

  pintaPokemons(pokemons, images)
}

const pintaPokemons = (pokemons, images) => {
  pokemons.results.forEach((pokemon, i) => {
        
    let ulPokemon = document.createElement("ul");
    let liPokemon = document.createElement("li");
    let nameDOM = document.createElement("h2");
    let img = document.createElement('img');
    img.src = images[i].sprites.other.home.front_default
    
    nameDOM.innerText = pokemon.name.toUpperCase();
    liPokemon.append(img, nameDOM);
    ulPokemon.appendChild(liPokemon);
    contenedorPokemon.appendChild(ulPokemon);
    

    liPokemon.addEventListener('click', ()=> {
        /*liPokemon.styles.backgroundColor = 'orange';
        localStorage(`${pokemon.name}-color`, 'orange')*/

        let favoritos = JSON.parse(localStorage.getItem('favoritos'))|| [];
        favoritos.push(pokemon.name);
        localStorage.setItem('favoritos', JSON.stringify(favoritos))


    })
  })
}

nextBtn.addEventListener("click", () => {
  sumaPagina += 10;
  url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${sumaPagina}`;
  obtenerPokemon(url);
});

prevBtn.addEventListener("click", () => {
  if (sumaPagina > 10) {
    sumaPagina -= 10;
    url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${sumaPagina}`;
    obtenerPokemon(url);
  }
});


searchBtn.addEventListener('click', () => {
    url = `https://pokeapi.co/api/v2/pokemon/${selectPkmn.value}`
    fetch(url).then((response) => {
        if(!response.ok) {
            throw new Error('Pokemon no encontrado')
        }
        return response.json()
    }).then((data) => {
        contenedorPokemon.innerHTML = ''
        let imgPokemon = document.createElement("img");
        imgPokemon.src = data.sprites.other.dream_world.front_default
        let pokemon = selectPkmn.value.toUpperCase()
        let ulPokemon = document.createElement("ul");
        let liPokemon = document.createElement("li");
        let nameDOM = document.createElement("p");
        let nameText = document.createTextNode(pokemon);
        
        nameDOM.appendChild(nameText);
        liPokemon.append(imgPokemon, nameDOM);
        ulPokemon.appendChild(liPokemon);
        contenedorPokemon.appendChild(ulPokemon);
    })
    
       
        
        
})

obtenerPokemon()
