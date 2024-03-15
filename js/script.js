
const contenedorPokemon = document.getElementById("app");
const nextBtn = document.getElementById("nextBtn");
let sumaPagina = 0;
const prevBtn = document.getElementById("prevBtn");
let urlPokemon =`https://pokeapi.co/api/v2/pokemon/`
let url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${sumaPagina}`;
const searchBtn = document.getElementById('searchBtn')
const selectPkmn = document.getElementById('searchInput')
const obtenerImg = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then((response) => {
        if(!response.ok) {
            throw new Error('Respuesta no conseguida')
        }
        return response.json()
    }).then((data) => {
        let imgPokemon = document.createElement("img");
        
        imgPokemon.src = data.sprites.other.dream_world.front_default
    
        return imgPokemon 
        
    })
    
}
/*const promesaPokemon = new Promise((resolve)=> {
    resolve(obtenerImg(pokemon))*()
})*/
const obtenerPokemon = async () => {
  contenedorPokemon.innerHTML = "";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Pokemon no encontrado", response.status);
    }

    const data = await response.json();
    console.log(data)
    
    
 
    data.results.sort((a, b) => a.name.localeCompare(b.name));
    
    data.results.forEach((pokemon, i) => {
        
        let ulPokemon = document.createElement("ul");
        let liPokemon = document.createElement("li");
        let nameDOM = document.createElement("p");
        let nameText = document.createTextNode(pokemon.name.toUpperCase());
       
        
        nameDOM.appendChild(nameText);
        liPokemon.appendChild(nameDOM);
        ulPokemon.appendChild(liPokemon);
        contenedorPokemon.appendChild(ulPokemon);
        
        /*let color = localStorage.getItem(`${pokemon.name}-color`);
        if (color) {
            liPokemon.style.backgroundColor = color;
        } */
        
        liPokemon.addEventListener('click', ()=> {
            /*liPokemon.styles.backgroundColor = 'orange';
            localStorage(`${pokemon.name}-color`, 'orange')*/

            let favoritos = JSON.parse(localStorage.getItem('favoritos'))|| [];
            favoritos.push(pokemon.name);
            localStorage.setItem('favoritos', JSON.stringify(favoritos))


        })
        
    })
    
  } catch (error) {
    console.log("Error al obtener los datos", error);
  }
};

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

obtenerPokemon();

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

