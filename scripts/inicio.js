//------inicio proceso crear guifos desde esta pagina de inicio-------
const BUTTON_CREAR_GUIFOS = document.getElementById("linkCrearGuifos")

BUTTON_CREAR_GUIFOS.addEventListener("mousedown", openCrearGuifos)

function openCrearGuifos() {
    localStorage.setItem("checkCrear", "crear")
}


//  ------------MOSTRAR SUGERENCIAS BUSQUEDA AUTOCOMPLETE--------
const BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA = document.getElementById("container-listaSugerenciasBusqueda");
const BUTTON_INPUT_BUSCAR = document.getElementById("buttonBuscar")
let inputSearch = document.getElementById("search");
const API_KEY = "JdAmttTIE9EASCqQWiNaLJ2QLZV8wejy";
let sectionTitle = document.querySelector('#sectionTitle-gifsFromApi');
const CONTAINER_GIFS_FROM_API = document.querySelector(".container-gifsFromAPI");


//cambio color button si hay un input para buscar
inputSearch.addEventListener("input", ev=>{
    let valueInputSearch = inputSearch.value.trim()

    if(valueInputSearch){
        //cambio estilado buttonBuscar a active
        BUTTON_INPUT_BUSCAR.classList.remove("buttonDisabled")
        BUTTON_INPUT_BUSCAR.classList.add("buttonBuscarActive")
        document.getElementById("spanBuscar").classList.add("spanBuscarActive")
        document.getElementById("spanBuscar").classList.remove("spanBuscarDisabled")
        document.getElementById("lupaBuscar").classList.add("lupaActive")
        document.getElementById("lupaBuscar").classList.remove("lupaDisabled")

    } else{ 
        //cambio estilado buttonBuscar a disabled
        BUTTON_INPUT_BUSCAR.classList.add("buttonDisabled")
        BUTTON_INPUT_BUSCAR.classList.remove("buttonBuscarActive")
        document.getElementById("spanBuscar").classList.remove("spanBuscarActive")
        document.getElementById("spanBuscar").classList.add("spanBuscarDisabled")
        document.getElementById("lupaBuscar").classList.remove("lupaActive")
        document.getElementById("lupaBuscar").classList.add("lupaDisabled")
    }

    //si el usuario escribe al menos tres letras, muestro las sugernecias
    if (valueInputSearch.length > 3) { 
        mostrarSugerenciasBusqueda(valueInputSearch)
    }

    //si borra el contenido del contenedor oculto el box de sugerencias de búsqueda
    if (!valueInputSearch){
        BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.classList.add("NoneDispalyBoxSugerencias")
    }
})


// muestro las sugerencias de la busqueda y armo el container de cada item sugerido de busqueda
async function mostrarSugerenciasBusqueda (value){
    let arraySugerencias =  await getSugerenciasBusqueda(value) 
    
    if (value && arraySugerencias){

        //limpio contenedor
        BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.innerHTML = " ";
        
        //genero los items sugeridos según la busqueda del usuario
        for (let i = 0; i < arraySugerencias.data.length; i++) {
            let divItemSugerencia = document.createElement("div")
            divItemSugerencia.classList.add("itemSugerenciaBusqueda")
            let pTextItemSugerencia = document.createElement("p")
            pTextItemSugerencia.innerText = arraySugerencias.data[i].name
            divItemSugerencia.appendChild(pTextItemSugerencia)
            BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.appendChild(divItemSugerencia)

            // al tocar una sugerencia, su valor aparece como valor del input y la busca
            divItemSugerencia.onmousedown = x => {
                inputSearch.value = divItemSugerencia.innerText
                saveLastSearchs(divItemSugerencia.innerText)
                busqueda()
            };
        }
        BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.classList.remove("NoneDispalyBoxSugerencias")
    } else {
         //si no hay ninguna sugerencia relacionada con la busqueda del usuario muestro tres sugerencias predeterminadas
         let arraySugerenciasPredeterminadas = ["gatitos", "unicornio", "love"]
         BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.innerHTML = "";

         for (let i = 0; i < arraySugerenciasPredeterminadas.length; i++) {
             let divItemSugerencia = document.createElement("div")
             divItemSugerencia.classList.add("itemSugerenciaBusqueda")
             let pTextItemSugerencia = document.createElement("p")
             pTextItemSugerencia.innerHTML = arraySugerenciasPredeterminadas[i]
             divItemSugerencia.appendChild(pTextItemSugerencia)
             BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.appendChild(divItemSugerencia)
 
             // al tocar una sugerencia, su valor aparece como valor del input y la busca
             divItemSugerencia.onmousedown = x => {
                 inputSearch.value = divItemSugerencia.innerText
                 saveLastSearchs(divItemSugerencia.innerText)
                 busqueda()
             };
         }
         BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.classList.remove("NoneDispalyBoxSugerencias")
    } 
}

// esta función devuelva un array de array de sugerencias de busqueda a partir del valor del input con palabras relacionadas
function getSugerenciasBusqueda(value){
    const CANTIDAD_SUGERENCIAS_BUSQUEDA = 3
    let url = 'https://api.giphy.com/v1/tags/related/' + value  + '?api_key=' + API_KEY + '&limit=' + CANTIDAD_SUGERENCIAS_BUSQUEDA
     return fetch(url).then(async response => {
        if (response.ok) {
            rta = response.json()
            return rta
        } else {
            console.log("problema obteniendo sugerencias tipo " + response.status);
        }
    })
    .catch(err => {
        console.error("error al obtener sug" + err);
    });
}


//permite buscar al apretar Enter si tengo un valor en el input
inputSearch.addEventListener("keydown", ev=>{ 
        if (ev.keyCode === 13 && inputSearch.value.trim()){
            busqueda()
            BUTTON_INPUT_BUSCAR.classList.add("buttonDisabled")
            BUTTON_INPUT_BUSCAR.classList.remove("BUTTON_INPUT_BUSCARActive")
            BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.classList.add("NoneDispalyBoxSugerencias")
        }
    })


// desaparece box de sugerencias al clickear en cualquier lugar de la pantalla
inputSearch.addEventListener("blur", ev=>{ 
    BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.classList.add("NoneDispalyBoxSugerencias")  
    BUTTON_INPUT_BUSCAR.classList.add("buttonDisabled")
    BUTTON_INPUT_BUSCAR.classList.remove("BUTTON_INPUT_BUSCARActive")
  })
    

//guardo las ultimas sugerencias de busqueda realizadas
function saveLastSearchs(itemSugerenciaBuscado){
    let sessionStorageLength = sessionStorage.length - 1
    let idSugerenciaGuardada = "busqueda" + sessionStorageLength
    sessionStorage.setItem(idSugerenciaGuardada, itemSugerenciaBuscado)
    showLastSaved(sessionStorageLength)
}

//agrego la ultima busqueda guardada a la lista
function showLastSaved(i) {
    let divBusquedaGuardada = document.createElement("div")
    divBusquedaGuardada.classList.add("itemBusquedaGuardada")
    let pBusquedaGuardada = document.createElement("p")
    let busquedaGuardada = sessionStorage.getItem("busqueda" + i)
    pBusquedaGuardada.innerText = busquedaGuardada
    divBusquedaGuardada.appendChild(pBusquedaGuardada)
    document.getElementById("container-busquedasGuardadas").appendChild(divBusquedaGuardada)
     //si el usuario hace click en esta ultima busqueda, puede volver a busacarla
     divBusquedaGuardada.onmousedown = x => {
        inputSearch.value = pBusquedaGuardada.innerText
        busqueda()
    };
    
}

//muestro siempre todas las busquedas que se hayan guardado
function showSavedSearchs() {
let sessionStorageLength = sessionStorage.length - 1

    for (let i = 0; i < sessionStorageLength; i++) {
        let divBusquedaGuardada = document.createElement("div")
        divBusquedaGuardada.classList.add("itemBusquedaGuardada")
        let pBusquedaGuardada = document.createElement("p")
        let busquedaGuardada = sessionStorage.getItem("busqueda" + i)
        pBusquedaGuardada.innerText = busquedaGuardada
        divBusquedaGuardada.appendChild(pBusquedaGuardada)
        document.getElementById("container-busquedasGuardadas").appendChild(divBusquedaGuardada)

        //si el usuario hace click en una de estas busquedasa guardadas se realiza la busqueda
        divBusquedaGuardada.onmousedown = x => {
            inputSearch.value = pBusquedaGuardada.innerText
            busqueda()
        };
    }}

document.addEventListener("DOMContentLoaded", showSavedSearchs(event))



//vuelvo a mostrar los sugeridos y cargo tendencia si el usuario clickea en el logo (para sacar la busqueda que acaba de hacer)
document.querySelector(".logo").addEventListener("click", x =>{    
    document.getElementById("sectionSugerenciasDiv").classList.remove("hidden")
    sectionTitle.innerHTML = "Tendencias:" //agrego el título de tendencias
    CONTAINER_GIFS_FROM_API.innerHTML = ""; //borra la busqueda  recien hecha
    trending()
}
)


//------------ TRAER GIFS DE API Y MOSTRARLOS -------------



//obtengo los gifs de la api dependiendo el url de busqueda, tendencia u random
function getGifsFromAPI(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log("problema con el servidor de el tipo " + response.status);
            }
        })
        .catch(err => {
            console.error(err);
        });
}

//muestro los gifs que obtengo como resultado del fetch
function showGifsResults(results) {
    if (results.length > 0) {
        let arrayOrdenado = sortGifsArray(results)
        arrayOrdenado.forEach(item => showGifItem(item));  
    } else {
        CONTAINER_GIFS_FROM_API.innerHTML = "NO HAY RESULTADOS DE BUSQUEDA";
        CONTAINER_GIFS_FROM_API.style = "margin-left: 8px; font-weight: 600; font-size: 20px;"
    }
    inputSearch.value = "";
}

//devuevlo un array de objetos gif pero ordenados para manterse en la grilla
function sortGifsArray(copyOfGifsArray) {

    let arrayOrdenado = [];
    let auxiliar = 0
    let group4 = [];

    var i=0
    do {
        let gifData = copyOfGifsArray[i]
        let gifWidth = gifData.images.downsized.width
        let gifHeight = gifData.images.downsized.height
        let ratio = gifWidth / gifHeight;

        let size = 1;
        if (ratio > 1.54){size = 2} //indico que ocupa dos posiciones
        
        if((auxiliar + size) <= 4 ){
            auxiliar += size
            group4.push(gifData)
            copyOfGifsArray.splice(i,1) //saco el elemento que ya procese y sigo revisando los elementos del array            
            
            if (auxiliar === 4){
                group4.forEach(giphy => arrayOrdenado.push(giphy))
                //vacio la fila y reseteo para seguir buscando
                group4 = [] 
                auxiliar = 0
                i = 0
            }
        }

        if((auxiliar + size) > 4){
             i += 1 //recorro el array hasta encontrar uno que si entre en la fila
        }

    } while (copyOfGifsArray.length > 0)
        return arrayOrdenado
}

//muestro cada gif traido desde la api y le agrego las clases correspondientes a su estilado
function showGifItem(item) {
    const div = document.createElement('div');
    const img = document.createElement("img");
    img.src = item.images.downsized.url;

    let gifWidth = parseInt(item.images.downsized.width);
    let gifHeight = parseInt(item.images.downsized.height);
    let ratio = gifWidth / gifHeight;

    //ratio calculado para mantener la calidad de la imagen del gif según su ancho y alto
    if (ratio > 1.54 ) {
        div.classList.add('gif-item-fromAPI-long');
    } else {
        div.classList.add('gif-item-fromAPI');
    }

    div.append(img);
    CONTAINER_GIFS_FROM_API.appendChild(div,item);

    renderIdGifItemOnHover(div, item) //creo la barra de #ID de cada gif que se muestra al hacer hover
}

//creo la barra de #ID de cada gif que se muestra al hacer hover
function renderIdGifItemOnHover(div,item){
    let divIdGifSugerido = document.createElement("div");
    divIdGifSugerido.classList.add('id-gif-sugerido_bottom')
    let span = document.createElement("span");
    span.classList.add('gif-idTitle-fromAPI');
    divIdGifSugerido.insertAdjacentElement("afterbegin", span);
    div.appendChild(divIdGifSugerido)
    if (item.title.length != 0) {
        span.innerHTML = item.title.replace(/(^|\s+)/g,"$1#");
    } else {
        span.innerHTML = "#animated #gif";
    }

    div.addEventListener("mouseover", x => { divIdGifSugerido.style.display = "flex" })
    div.addEventListener("mouseout", x => { divIdGifSugerido.style.display = "none" })
}




//------- GIFS TRAIDOS POR BUSQUEDA DE USUARIO -------

BUTTON_INPUT_BUSCAR.addEventListener("click", busqueda)

//realiza la busqueda según el valor que haya en el input
function busqueda() {
    CONTAINER_GIFS_FROM_API.innerHTML = ""; //borra lo de tendencia o una busqueda previa recien hecha
    const CANTIDAD_GIFS_BUSCADOS = 20; //maxima cantidad de gifs a traer por busqueda
    let valueSearchBusqueda = inputSearch.value.trim().replace(/ /g, "+"); 
    sectionTitle.innerHTML = "Resultados de la búsqueda: " + valueSearchBusqueda.toUpperCase();

    let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + API_KEY + '&limit=' + CANTIDAD_GIFS_BUSCADOS + '&q=' + valueSearchBusqueda;
    getGifsFromAPI(url).then(response => showGifsResults(response.data))

    BOX_CONTAINER_LISTA_SUGERENCIAS_BUSQUEDA.classList.add("NoneDispalyBoxSugerencias")
    BUTTON_INPUT_BUSCAR.classList.add("buttonDisabled")
    BUTTON_INPUT_BUSCAR.classList.remove("BUTTON_INPUT_BUSCARActive")
    document.getElementById("sectionSugerenciasDiv").classList.add("hidden")
}


// ----------GIFS TRAIDOS POR SER TENDENCIA---------------
document.addEventListener("DOMContentLoaded", trending(event));

//obtengo los gifs que son tendencia en giphy. Se actualizan en la api las tendencias 
function trending() {
    const CANTIDAD_GIFS_TENDENCIA = 20; //CANTIDAD_GIFS_TENDENCIA de gifs a traer
    let url = 'https://api.giphy.com/v1/gifs/trending?api_key=' + API_KEY + '&limit=' + CANTIDAD_GIFS_TENDENCIA;
    getGifsFromAPI(url).then(rta =>{ showGifsResults(rta.data) })
}




// ------ TRAER CIERTA CANTIDAD DE GIFS RANDOM PARA MOSTRARSE COMO SUGERIDOS --------

const CANTIDAD_GIFS_SUGERIDOS = 4;

document.addEventListener("DOMContentLoaded", functionGifsSugeridos());

//muestro los gifs sugeridos traidos desde la api
function functionGifsSugeridos() {
    for (let i = 0; i < CANTIDAD_GIFS_SUGERIDOS; i++) {
        renderSugeridos(i)
        getGifSugeridoFromAPI().then(response => showSugeridos(response, i))
    }
}

// crea el contenedor para cada gif sugerido que traiga 
function renderSugeridos(i) {
    let divContainerSugerido = document.createElement("div");
        divContainerSugerido.classList.add('container-itemSugerido');
    let divIdGifSugerido = document.createElement("div");
        divIdGifSugerido.classList.add('id-gif-sugerido');
    let imgCruzClose = document.createElement("img");
        imgCruzClose.src = "./assets/cruz-cerrar.svg"
        imgCruzClose.classList.add('cruzCloseSugerido')
    divIdGifSugerido.appendChild(imgCruzClose)
    let divItemGifSugerido = document.createElement("div");
        divItemGifSugerido.classList.add('item-gifSugerido')
    let verMás = document.createElement("button")
        verMás.classList.add('ver-más')
        verMás.innerHTML = "Ver más..."
    divContainerSugerido.append(divIdGifSugerido, divItemGifSugerido, verMás)
    document.querySelector(".lista-gifs-sugeridos").appendChild(divContainerSugerido)

}

//obtengo gifs random desde la api
function getGifSugeridoFromAPI() {
    let url = 'https://api.giphy.com/v1/gifs/random	?api_key=' + API_KEY;
    return (getGifsFromAPI(url))
}

//muestro los gifs sugeridos
function showSugeridos(response, i) {
    const img = document.createElement("img");
    let span = document.createElement("span");
    img.classList.add('gif-img-fromAPI');
    span.classList.add('gif-idTitle-fromAPI');
    img.src = response.data.images.downsized.url;
    if (response.data.title.length != 0) {
        span.innerHTML = response.data.title.replace(/(^|\s+)/g,"$1#");
    } else {
        span.innerHTML = "#animated #gif"; // si algun gif no tiene title le agrego este como predeterminado
    }
    document.getElementsByClassName("item-gifSugerido")[i].appendChild(img);
    document.getElementsByClassName("id-gif-sugerido")[i].insertAdjacentElement("afterbegin", span);
}


// doy funcionalidad a cada boton "Ver más"
let arrayButtonVerMás = document.getElementsByClassName("ver-más") //array que contiene todos los buttons "Ver Mas" de los gifs sugeridos
for (let i = 0; i < arrayButtonVerMás.length; i++) {
    arrayButtonVerMás[i].addEventListener("click", x => {
        functionVerMás(i)
    })
}

// realiza una busqueda con el titulo del gif sugerido 
function functionVerMás(i) {
    CONTAINER_GIFS_FROM_API.innerHTML = ""; //borra lo de tendencia o una busqueda previa recien hecha
    let searchValueBusquedaVerMás = document.getElementsByClassName("gif-idTitle-fromAPI").item(i).innerText.trim().replace(/#|\s+/g, "+");
    console.log(searchValueBusquedaVerMás)
    sectionTitle.innerHTML = 'Más resultados de: "' + searchValueBusquedaVerMás.replace(/\+/g, " ") + ' "'

    const cant = 20; //cant de gifs a traer
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + API_KEY + '&limit=' + cant + '&q=' + searchValueBusquedaVerMás;
    getGifsFromAPI(url).then(response => showGifsResults(response.data))
}


//muestro nuevo gif sugerido y elimino el que aparecía al apretar la cruz
let arrayCruzCloseSugerido = document.getElementsByClassName("cruzCloseSugerido") //array que contiene todas las cruces de los gifs sugeridos

// // doy funcionalidad a cada cruz de cerrar en los id de los sugeridos
for (let i = 0; i < arrayCruzCloseSugerido.length; i++) {
    arrayCruzCloseSugerido[i].addEventListener("click", x => {
        newSugerido(i)
        getGifSugeridoFromAPI().then(response => showSugeridos(response, i))
    })
}

// remueve el contenido actual de el item sugerido en el que se hizo click a la cruz
function newSugerido(i) {
    let contenedorGif = document.getElementsByClassName("gif-img-fromAPI")[i];
    let contenedorIdGif = document.getElementsByClassName("gif-idTitle-fromAPI")[i];
    contenedorGif.remove()
    contenedorIdGif.remove()
}