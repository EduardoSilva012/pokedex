const listaOl = document.getElementById("lista");
const loadB = document.getElementById("load");
const btn = document.getElementById("btn");
const loadDiv = document.getElementById("loadDiv");
let limit = 10;
let offset = 8;


function criarLista(lista) {
    return `<li class="pokemon ${lista.type}">
    <span class="numberPokemon">#${lista.number}</span>
    <span class="namePokemon">${lista.name}</span>
    <div class="detail">
        <ol class="types">
          ${lista.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
        </ol>
        
        <button class="btn" id="btn" type="button" onclick="log(${lista.number});abrir()"><img src="${lista.photo}" alt="${lista.name}"></button>
    </div>
    
</li>`;
}


function criarDiv(lista) {
    return `
    <div class="modal">
      <div class="modal_content ${lista.types.map((typeSlot) => typeSlot.type.name)[0]}">
    
    
        <div class="btns">
          <button class="btn" type="button" onclick="fechar()"><i class="fa-solid fa-arrow-left"></i></button>
          <button class="btn" type="button" onclick=""><i class="fa-regular fa-heart"></i></button>
        </div>
    
    
        <div class="header">
          
         <div class="subHeader">
            <h1>${lista.name}</h1>
            <ol class="types">
              ${lista.types.map((typeSlot) => `<li class="${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('')}
            </ol>
         </div>
          <span>#${lista.id}</span>  
    
        </div>
    
        <div class="img">
        <img src="${lista.sprites.other.dream_world.front_default}">
        </div>    
    
        <div class="contentModal">
            <span class="title"> About </span>
            <span>abilities: ${lista.abilities.map((abilitySlot) => abilitySlot.ability.name).join(', ')}</span>
            <span>moves: ${lista.moves.map((moveSlot) => moveSlot.move.name)[0]}</span>
        </div>
     
      </div> 
         
    </div>
    `;

}

function log(number) {
    api.getOne(number).then((item) => {
        loadDiv.innerHTML = criarDiv(item);
    });
    

   
   
}


function load(offset, limit) {
    api.get(offset, limit).then((item = []) => {
        const newLista = item.map(criarLista).join("");
        listaOl.innerHTML += newLista;
    });
    
}

load(offset, limit);

loadB.addEventListener('click', () => {
    offset += limit;
    load(offset, limit);
   
})


