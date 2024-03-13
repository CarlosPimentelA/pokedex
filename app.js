
const divMain = document.getElementById('pokemon');
const divListaPoke = document.getElementById('todos-pokemon');
const botonAvanzar = document.getElementById('mas-pokes');
const botonRetroceder = document.getElementById('menos-pokes');
const inputBuscar = document.getElementById('input-buscar-poke');
const botonBuscar = document.getElementById('boton-buscar-poke');
const totalPagsPan = document.getElementById('total-pags');
const totalPokesPag = 12;
let paginaActual = 1;
const url = "https://pokeapi.co/api/v2/pokemon/";
let datosAPI = [];
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
    verTodosButton.textContent = 'Volver'
    const valueInput = inputBuscar.value 
    datosPokeBusc = []
        const request = await fetch(`${url}${inputBuscar.value}`)
        const response = await request.json();

       datosPokeBusc.push(response)

       datosPokeBusc.forEach((pokemon) => {
        if(valueInput == pokemon.name || valueInput == pokemon.id) {
            divListaPoke.innerHTML = ``;
    
             const divPoke = document.createElement("div");
             divPoke.classList.add("pokemon");
             const divStatPoke = document.createElement('div')
             divStatPoke.classList.add('pokemon-stadisticas')
                const { name, height, types, weight, sprites: { front_default }, id, stats} = pokemon;
    
                const pokeType = types[0];
                const pokeType2 = types[1];
                const ps = stats[0].base_stat;
                const atk = stats[1].base_stat;
                const atkEsp = stats[2].base_stat;
                const def = stats[3].base_stat;
                const defEsp = stats[4].base_stat;
                const speed = stats[5].base_stat;
    
                
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
                    <p class="stat" id="height">${height}m</p>
                    <p class="stat" id="weight">${weight}Kg</p>
                    <p class="stat" id="ps" hidden>Ps: ${ps}</p>
                    <p class="stat" id="atk" hidden>Atk: ${atk}</p>
                    <p class="stat" id="atk-esp" hidden>Atk.Esp: ${atkEsp}</p>
                    <p class="stat" id="def" hidden>Def: ${def}</p>
                    <p class="stat" id="def-esp" hidden>Def.Esp: ${defEsp}</p>
                    <p class="stat" id="speed" hidden>Speed: ${speed}</p>
                    <div class="pokemon-stats"> 
    
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
                        <p class="stat" id="height">${height}m</p>
                        <p class="stat" id="weight">${weight}Kg</p>
                        <p class="stat" id="ps" hidden>Ps: ${ps}</p>
                        <p class="stat" id="atk" hidden>Atk: ${atk}</p>
                        <p class="stat" id="atk-esp" hidden>Atk.Esp: ${atkEsp}</p>
                        <p class="stat" id="def" hidden>Def: ${def}</p>
                        <p class="stat" id="def-esp" hidden>Def.Esp: ${defEsp}</p>
                        <p class="stat" id="speed" hidden>Speed: ${speed}</p>
                        <div class="pokemon-stats"> 
                        
                        </div>
                        </div>
                            </div>`
                            
                            divListaPoke.appendChild(divPoke);
                        }
        }
       })
}
            
botonBuscar.addEventListener('click', botonBusc)
            
            
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
            const { name, height, types, weight, sprites: { front_default }, id, stats} = pokemon;

            const pokeType = types[0];
            const pokeType2 = types[1];
            const ps = stats[0].base_stat;
            const atk = stats[1].base_stat;
            const atkEsp = stats[2].base_stat;
            const def = stats[3].base_stat;
            const defEsp = stats[4].base_stat;
            const speed = stats[5].base_stat;

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
                <p class="stat" id="height">${height}m</p>
                <p class="stat" id="weight">${weight}Kg</p>
                <p class="stat" id="ps" hidden>Ps: ${ps}</p>
                <p class="stat" id="atk" hidden>Atk: ${atk}</p>
                <p class="stat" id="atk-esp" hidden>Atk.Esp: ${atkEsp}</p>
                <p class="stat" id="def" hidden>Def: ${def}</p>
                <p class="stat" id="def-esp" hidden>Def.Esp: ${defEsp}</p>
                <p class="stat" id="speed" hidden>Speed: ${speed}</p>
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
                    <p class="stat" id="height">${height}m</p>
                    <p class="stat" id="weight">${weight}Kg</p>
                    <p class="stat" hidden></p>
                    <p class="stat" id="ps" hidden>Ps: ${ps}</p>
                    <p class="stat" id="atk" hidden>Atk: ${atk}</p>
                    <p class="stat" id="atk-esp" hidden>Atk.Esp: ${atkEsp}</p>
                    <p class="stat" id="def" hidden>Def: ${def}</p>
                    <p class="stat" id="def-esp" hidden>Def.Esp: ${defEsp}</p>
                    <p class="stat" id="speed" hidden>Speed: ${speed}</p>

        </div>
                            </div>
                    </div>`
                        
                        divListaPoke.appendChild(divPoke);
                    }
            
        });
    }

    verTodosButton.addEventListener('click', () => {
        verTodosButton.textContent = "Ver todos"
        renderizar(paginaActual)
    })

    botonStats.addEventListener('click', () => {
        verTodosButton.textContent = 'Volver'
        statsPokeCard()
    })

function statsPokeCard() {
   const ps = document.querySelectorAll('#ps');
   ps.forEach((p) => {
    p.removeAttribute('hidden')
   })
   const atk = document.querySelectorAll('#atk');
   atk.forEach((p) =>{
       p.removeAttribute('hidden')
   })
   const atkEsp = document.querySelectorAll('#atk-esp');
   atkEsp.forEach((p) =>{
    p.removeAttribute('hidden')
})
   const def = document.querySelectorAll('#def');
   def.forEach((p) =>{
    p.removeAttribute('hidden')
})
   const defEsp = document.querySelectorAll('#def-esp');
   defEsp.forEach((p) =>{
    p.removeAttribute('hidden')
})
   const speed = document.querySelectorAll('#speed');
   speed.forEach((p) =>{
    p.removeAttribute('hidden')
})

const weight = document.querySelectorAll('#weight')
weight.forEach((p) => {
    p.remove()
})

const height = document.querySelectorAll('#height')
height.forEach((p) => {
    p.remove()
})
}    

renderizar() 