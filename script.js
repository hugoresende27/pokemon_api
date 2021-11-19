const pokeMain = document.getElementById('poke-main')

const pokeContagem = 150

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_tipos = Object.keys(colors)//main_tipo vai ser uma matriz com index e valores de colors
//console.log(main_tipos)


const fetchPokemons = async () => {
    for(let i=1; i<= pokeContagem; i++)
    {
        await getPoke(i)
    }
}

const getPoke = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const dados = await res.json()
    //console.log(dados)//vai fazer o console log dos arrays de cada pokemon ate 150
    criarCartaPoke(dados)

}

const criarCartaPoke = (pokemon) => {
    const pokeEl = document.createElement('div')
    pokeEl.classList.add('pokemon')

    const nome = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)//para ir buscar o nome à API e colocar tudo em maiúsculas [0]para ser a primeira letra apenas em upperCase e .slice(1)para escrever a partir do index 1 em minusculas
    const id = pokemon.id.toString().padStart(3, '#0')//vai buscar os id's, converte para String e depois padStar(3,'0', vai escrever 001, 002, 003, 004)

    
    const poke_tipos = pokemon.types.map(type => type.type.name) //poke_tipos vai receber o mapa dos tipos do pokemon
    const tipo = main_tipos.find(type=> poke_tipos.indexOf(type)> -1)//tipo vai retornar o tipo , se não retornar tipo retorna -1
    //console.log (poke_tipos)
    //console.log (tipo)
    const habil = pokemon.abilities.ability
    const cor = colors[tipo]
    console.log(habil)
    pokeEl.style.backgroundColor = cor
    
    const pokemonInnerHTML = `
    
            <div class="img-conteudo">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${nome}">
            </div>
            <div class="info">
                <span class="numero">${id}</span>
                <h3 class="nome">${nome}</h3>
                <small class="tipo">Tipo: <span>${tipo}</span></small>
                
            </div>
    `

    pokeEl.innerHTML = pokemonInnerHTML
    pokeMain.appendChild(pokeEl)
}

fetchPokemons()