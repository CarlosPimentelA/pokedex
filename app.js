
const divMain = document.getElementById('pokemon');
const divListaPoke = document.getElementById('listaPokemon');
const botonAvanzar = document.getElementById('mas-pokes');
const botonRetroceder = document.getElementById('menos-pokes');
const inputBuscar = document.getElementById('input-buscar-poke');
const botonBuscar = document.getElementById('boton-buscar-poke');
const totalPagsPan = document.getElementById('total-pags');
const totalPokesPag = 12;
let paginaActual = 1;
const url = "https://pokeapi.co/api/v2/pokemon/";
let datosAPI = []
let datosPokeBusc = [];
const verTodosButton = document.getElementById('ver-todos-poke')
const divPoke = document.createElement("div");
divPoke.classList.add("pokemon");
const botonStats = document.getElementById('mas-info');

async function dataFetch() {
    datosAPI = [];
    const offset = (paginaActual - 1) * totalPokesPag;
    const limit = offset + totalPokesPag;
        //  console.log("limit = "  + limit)
        //  console.log("offset = "  + offset)
        for(let i = 1; i <= limit; i++) {
            const response = await fetch(`${url}${i}`);
            const datosJson = await response.json();
            datosAPI.push(datosJson)
        }
        return datosAPI.slice(offset, limit)
    }

    
    function totalPags() {
    const total = Math.ceil(1025 / totalPokesPag);
    return total;
}

function verificarBotones() {
    if(paginaActual === 1) {
        botonRetroceder.setAttribute('disabled', true)
    } else {
        botonRetroceder.removeAttribute('disabled')
    }
}

async function botonBusc() {
    botonStats.textContent = 'Estadisticas'
    verTodosButton.textContent = 'Ver Todo'
    const valueInput = inputBuscar.value 
    
    datosPokeBusc = []

    for(let i = 1 ; i <= 400; i++) {
        const request = await fetch(`${url}${i}`)
        const response = await request.json();
        datosPokeBusc.push(response)
    }
  datosPokeBusc.find((pokemon) => {
    if(valueInput == pokemon.name || valueInput == pokemon.id) {
        divListaPoke.innerHTML = ``;

         const divPoke = document.createElement("div");
         divPoke.classList.add("pokemon");
            const { name, height, types, weight, sprites: { front_default }, id} = pokemon;

            const pokeType = types[0];
            const pokeType2 = types[1];


        if (pokeType && !pokeType2) {
            divPoke.innerHTML = ` 
            <div class="pokemon-img">
            <img src="${front_default}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${id}</p>
                    <h2 class="pokemon-nombre">${name.toUpperCase()}</h2>
                    </div>
                    <div class="pokemon-tipos">
                    <p>${types[0].type.name.toUpperCase()}</p>
                </div>
                <div class="pokemon-stats">
                <p class="stat">${height}m</p>
                <p class="stat">${weight / 10}Kg</p>
                
                <div class="pokemon-stats"> 
                <button type="button" id="mas-info" style="
                margin-left: 30%;
                        border-radius: 99vmax;
                        color: #fff;
                        background-color: rgb(69, 69, 69);
                        cursor: pointer;
                        transition: .2s;">Mas info</button>
                        </div>
                </div>
        </div>`
        divListaPoke.appendChild(divPoke);
    } 
    else if (pokeType && pokeType2) {
            divPoke.innerHTML = ` 
            <div class="pokemon-img">
            <img src="${front_default}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${id}</p>
                    <h2 class="pokemon-nombre">${name.toUpperCase()}</h2>
                    </div>
                    <div class="pokemon-tipos">
                    <p>${types[0].type.name.toUpperCase()}</p>
                    <p>${types[1].type.name.toUpperCase()}</p>
                    </div>
                    <div class="pokemon-stats">
                    <p class="stat">${height}m</p>
                    <p class="stat">${weight / 10}Kg</p>
                    
                    <div class="pokemon-stats"> 
                    <button type="button" id="mas-info-busc" style="
                    margin-left: 30%;
                    border-radius: 99vmax;
                    color: #fff;
                    background-color: rgb(69, 69, 69);
                    cursor: pointer;
                    transition: .2s;">Mas info</button>
                    </div>
                    </div>
                        </div>`
                        
                        divListaPoke.appendChild(divPoke);
                    }
    } 
  })
}
            
botonBuscar.addEventListener('click', () => {
    botonBusc();
})
            
            
function avanzarPag() {
    paginaActual = paginaActual + 1;

    renderizar()
}

function retrocederPag() {
    paginaActual = paginaActual - 1;

    renderizar()
}

botonAvanzar.addEventListener('click', avanzarPag)

botonRetroceder.addEventListener('click', retrocederPag)

    async function renderizar() {
        divListaPoke.innerHTML = ``;
        const datosDataFetch =  await dataFetch(paginaActual);
        verificarBotones();
        const totalPagins = totalPags();
       // console.log(totalPagins)
        totalPagsPan.textContent = `${paginaActual} de ${totalPagins}`;
        datosDataFetch.forEach( function (pokemon) {
            const divPoke = document.createElement("div");
         divPoke.classList.add("pokemon");
            const { name, height, types, weight, sprites: { front_default }, id} = pokemon;

            const pokeType = types[0];
            const pokeType2 = types[1];


        if (pokeType && !pokeType2) {
            divPoke.innerHTML = ` 
            <div class="pokemon-img">
            <img src="${front_default}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${id}</p>
                    <h2 class="pokemon-nombre">${name.toUpperCase()}</h2>
                    </div>
                    <div class="pokemon-tipos">
                    <p>${types[0].type.name.toUpperCase()}</p>
                </div>
                <div class="pokemon-stats">
                <p class="stat">${height}m</p>
                <p class="stat">${weight / 10}Kg</p>
                </div>
        </div>`
        divListaPoke.appendChild(divPoke);
    } else if (pokeType && pokeType2) {
            divPoke.innerHTML = ` 
            <div class="pokemon-img">
            <img src="${front_default}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${id}</p>
                    <h2 class="pokemon-nombre">${name.toUpperCase()}</h2>
                    </div>
                    <div class="pokemon-tipos">
                    <p>${types[0].type.name.toUpperCase()}</p>
                    <p>${types[1].type.name.toUpperCase()}</p>
                    </div>
                    <div class="pokemon-stats">
                    <p class="stat">${height}m</p>
                    <p class="stat">${weight / 10}Kg</p>
                    </div>
                    </div>`
                        
                        divListaPoke.appendChild(divPoke);
                    }
            
        });
    }

    function pag1() {
        paginaActual = 1;
    }

    verTodosButton.addEventListener('click', () => {
        verTodosButton.textContent = "Ver todos"
        renderizar(paginaActual)
    })

    botonStats.addEventListener('click', () => {
        verTodosButton.textContent = 'Volver'
        mostrarEstadisticasPokemon()
    })

    

   async function mostrarEstadisticasPokemon() {
    divListaPoke.innerHTML = ``;
    const datosF = await dataFetch();
    datosF.forEach((statPoke) => {
        const divPokeStat = document.createElement('div');
        divPokeStat.classList.add('pokemon-stadisticas');
        const pokePs = statPoke.stats[0].base_stat;
        const pokeAtk = statPoke.stats[1].base_stat;
        const pokeAtkEsp = statPoke.stats[2].base_stat;
        const pokeDef = statPoke.stats[3].base_stat;
        const pokeDefEsp = statPoke.stats[4].base_stat;
        const pokeSpd = statPoke.stats[5].base_stat;
        const imgPoke = statPoke.sprites.front_default;
        divPokeStat.innerHTML =
            `
            <div class="pokemon-stadisticas">
                <h2>${statPoke.name.toUpperCase()}</h2>
                <img src="${imgPoke}" alt="${statPoke.name.toUpperCase()}">
                <p class="stat" id="ps">Ps: ${pokePs}</p>
                <p class="stat" id="atk">Atk: ${pokeAtk}</p>
                <p class="stat" id="atk-esp">Atk. Esp: ${pokeAtkEsp}</p>
                <p class="stat" id="def">Def: ${pokeDef}</p>
                <p class="stat" id="def-esp">Def. Esp: ${pokeDefEsp}</p>
                <p class="stat" id="speed">Velocidad: ${pokeSpd}</p>
            </div>
           `;
        divListaPoke.appendChild(divPokeStat);
    })
}

function statsBusc() {
    
}

divMain.addEventListener('click', (e) => {
    if (e.target.id == 'mas-info-busc') {
        
    }
})

renderizar() 