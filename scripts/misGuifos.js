var recorder; //usada para todo el proceso de grabación

//containers 
const CONTAINER_PARA_CREAR_GUIFOS = document.getElementById("container-etapasCrearGuifo") //container general de todo el proceso de crear guifo
const BOX_ETAPAS_CREAR_GUIFO = document.getElementById("box-etapasCapturarGuifo") //container boxs etapas de captura de video
const BOX_EXITO_GIF_CREADO = document.querySelector("#box-subidoExito") //box final una vez subido el guifo con opción de guardarlo y copiar su link
const BOX_CREAR_GUIFO = document.getElementById("box-crearGuifo") //primer box que aparece al iniciar el proceso


//buttons nav
const FLECHA_NAVBAR = document.getElementById("flechaLogo")
const BUTTON_CREAR_GUIFOS = document.getElementById("buttonCrear")
const ANCHOR_MIS_GUIFOS = document.getElementById("aMisGuifos")
const BUTTON_TEMA = document.getElementById("buttonTema")
const LOGO = document.querySelector(".logo")


//buttons primer box crear guifo
const BUTTON_CANCELAR_CREACION = document.getElementById("buttonCancelarCreación")
const BUTTON_CAPTURAR = document.getElementById("buttonCapturar");


//buttons box etapas crear guifo
// let containerButtonsEtapasCapturando = document.getElementById("container-buttonsEtapaVideo") //container de todos estos botones
const BUTTON_LISTO_GRABACIÓN = document.querySelector(".buttonListo")
const BUTTON_SUBIR_GUIFO = document.querySelector(".buttonSubirGuifo")
const BUTTON_REPETIR_CAPTURA = document.querySelector(".buttonRepetirCaptura")
const BOX_PROGRESS_SUBIENDO_GIF = document.getElementById("progressSubiendo") //cartel cuando se estan subiendo los gifs
const BUTTON_CANCELAR_SUBIDA = document.querySelector("#buttonCancelarSubida")
const BOX_TIMER = document.getElementById("boxTimer") //contenedor del timer
let timer = document.getElementById("timer") //donde muestro los segundos
const TITULO_BOX = document.querySelector(".pTítulo-box") //título que varía en cada box
const CRUZ_CERRAR_BOX_ETAPA = document.getElementById("cruzCerrarEtapa") //Cruz en margen superior derecho de cada box


//buttons ultio box, gif creado con exito

const CRUZ_CERRAR_BOX_EXITO = document.getElementById("cruzCerrarFinal") //cruz en margen derecho superior del box que muestra al gif subido con exito
const BUTTON_LISTO_FINAL_PROCESO = document.querySelector("#buttonListoFinal")
const BUTTON_DESCARGAR = document.querySelector(".buttonDescargarGuifo") //button del box guifo subido con exito
let BUTTON_COPIAR = document.querySelector(".buttonCopiarEnlaceGuifo")





//-----------------CAMBIO DE BOX Y SUS ESTILOS-------------------
//configuración del estilado de las distintas etapas para crear y subir un guifo a medida que el usuario apreta los botones



//muestro el primer box para comenzar a crear mi guifo al clickear en Crear
BUTTON_CREAR_GUIFOS.addEventListener("click", startCreatingGif)

function startCreatingGif() {
    CONTAINER_PARA_CREAR_GUIFOS.classList.remove("hidden")
    BOX_CREAR_GUIFO.classList.remove("hidden")
    BUTTON_CREAR_GUIFOS.classList.add("hidden")
    BUTTON_TEMA.classList.add("hidden")
    ANCHOR_MIS_GUIFOS.classList.add("hidden")
    FLECHA_NAVBAR.classList.remove("hidden")
}


//puedo empezar el proceso de "crear guifos" desde la pagina de inicio al clickear el bootn "crear guifos"
document.addEventListener("DOMContentLoaded", checkCrearGuifos(event));

function checkCrearGuifos() {
    let checkStorageCrearGuifos = localStorage.getItem("checkCrear")
    if (checkStorageCrearGuifos === "crear") { //me fijo al abrir "misGUifos.html" si tiene que mostrarse directamente para crear los Gifs
        startCreatingGif()
        localStorage.removeItem("checkCrear")
    }
}


// --------------------box crear guifos--------------------

//vuelvo a mostrar la pantalla de inicio al apretar cancelar
BUTTON_CANCELAR_CREACION.addEventListener("click", backToMisGuifos)


function backToMisGuifos() {
    CONTAINER_PARA_CREAR_GUIFOS.classList.add("hidden")
    BOX_ETAPAS_CREAR_GUIFO.classList.add("hidden")
    BOX_CREAR_GUIFO.classList.add("hidden")
    BUTTON_CREAR_GUIFOS.classList.remove("hidden")
    BUTTON_TEMA.classList.remove("hidden")
    ANCHOR_MIS_GUIFOS.classList.remove("hidden")
    FLECHA_NAVBAR.classList.add("hidden")

}

//al apretar la cruz de cualquier box también se mustra la pagina de mis guifos
CRUZ_CERRAR_BOX_ETAPA.addEventListener("click", cerrarBox)

function cerrarBox() {
    backToMisGuifos()
    if (typeof(recorder) === "object") {
        try {
            recorder.destroy() //borro el recorder para arrancar de nuevo el proceso
            timer.innerHTML = "";
            BUTTON_LISTO_GRABACIÓN.classList.add("hidden")
            BOX_timer.classList.add("hidden")
            BUTTON_CAPTURAR.classList.remove("hidden")
        } catch (error) { console.log(error) }
    }

}


//comienzo a mostrar las etapas del proceso capturando
buttonComenzar.addEventListener("click", x => {
    BOX_CREAR_GUIFO.classList.add("hidden")
    BOX_ETAPAS_CREAR_GUIFO.classList.remove("hidden")
        //escondo los botones que no corresponden a la siguiente etapa
    BUTTON_LISTO_GRABACIÓN.classList.add("hidden")
    BUTTON_SUBIR_GUIFO.classList.add("hidden")
    BUTTON_REPETIR_CAPTURA.classList.add("hidden")
    BUTTON_CANCELAR_SUBIDA.classList.add("hidden")
})



//-------------------- box un chequeo antes de empezar--------------------


BUTTON_CAPTURAR.addEventListener("click", changeChequeoToCapturando)


//transición de box chequeo a box capturando
function changeChequeoToCapturando() {
    let newTitle = "Capturando Tu Guifo"
    TITULO_BOX.innerHTML = newTitle
    BUTTON_CAPTURAR.classList.add("hidden")
    BUTTON_LISTO_GRABACIÓN.classList.remove("hidden")
    BOX_TIMER.classList.remove("hidden")
    timer.innerHTML = ""; //reseteo
}


// -------------------- box vista previa --------------------

BUTTON_LISTO_GRABACIÓN.addEventListener("click", changeCapturandoToVistaprevia)

//transición de box capturando a box vista previa
function changeCapturandoToVistaprevia() {
    let newTitle = "Vista Previa"
    TITULO_BOX.innerHTML = newTitle
        // este box es el unico que no tiene una cruz para cancelar
    CRUZ_CERRAR_BOX_ETAPA.classList.add("hidden")
    BUTTON_LISTO_GRABACIÓN.classList.add("hidden")
    BUTTON_REPETIR_CAPTURA.classList.remove("hidden")
    BUTTON_SUBIR_GUIFO.classList.remove("hidden")
}


//opción de que el usuario repita la captura
BUTTON_REPETIR_CAPTURA.addEventListener("click", changeVistapreviaToCapturando)

function changeVistapreviaToCapturando() {
    let newTitle = "Un Chequeo Antes De Empezar"
    TITULO_BOX.innerHTML = newTitle
    BUTTON_REPETIR_CAPTURA.classList.add("hidden")
    BUTTON_SUBIR_GUIFO.classList.add("hidden")
    BUTTON_CAPTURAR.classList.remove("hidden")
    CRUZ_CERRAR_BOX_ETAPA.classList.remove("hidden")
    videoFinished.classList.add("hidden")
    videoCaptura.classList.remove("hidden")
    timer.innerHTML = "";
    BOX_TIMER.classList.add("hidden")
}

//opción de subir el guifo
BUTTON_SUBIR_GUIFO.addEventListener("click", changeVistapreviaToSubiendo)

function changeVistapreviaToSubiendo() {
    let newTitle = "Subiendo Guifo"
    TITULO_BOX.innerHTML = newTitle
    BUTTON_REPETIR_CAPTURA.classList.add("hidden")
    BUTTON_SUBIR_GUIFO.classList.add("hidden")
    BOX_TIMER.classList.add("hidden")
    BUTTON_CANCELAR_SUBIDA.classList.remove("hidden")
    videoFinished.classList.add("hidden")
    BOX_PROGRESS_SUBIENDO_GIF.classList.remove("hidden")

}

// -------------------- box subiendo tu guifo--------------------

//cuando el gif se sube aparece el cartel de exito
function changeSubiendoToExito() {
    BOX_EXITO_GIF_CREADO.classList.remove("hidden")
    BOX_ETAPAS_CREAR_GUIFO.classList.add("hidden")
}


//vuelvo a pagina mis guifos mostrando solo los guifos ya creados 

BUTTON_LISTO_FINAL_PROCESO.addEventListener("click", styleFinProcesoCrear)
CRUZ_CERRAR_BOX_EXITO.addEventListener("click", styleFinProcesoCrear)

function styleFinProcesoCrear() {
    BOX_EXITO_GIF_CREADO.classList.add("hidden")
    CONTAINER_PARA_CREAR_GUIFOS.classList.add("hidden")
    BUTTON_CREAR_GUIFOS.classList.remove("hidden")
    BUTTON_TEMA.classList.remove("hidden")
    ANCHOR_MIS_GUIFOS.classList.remove("hidden")
    FLECHA_NAVBAR.classList.add("hidden")
    BOX_PROGRESS_SUBIENDO_GIF.classList.add("hidden")
    videoCaptura.classList.remove("hidden")
    BUTTON_CAPTURAR.classList.remove("hidden")
}



//-----------------GET and RECORD MEDIA-------------------
//funcionalidad del proceso de grabación y subida del gif por parte del usuario

let videoCaptura = document.getElementById("videoCaptura");
let videoFinished = document.getElementById("videoFinished")
const API_KEY = "JdAmttTIE9EASCqQWiNaLJ2QLZV8wejy";


let constraints = {
    audio: false,
    video: {
        width: { min: 1280 },
        height: { min: 720 }
    }
}

//muestro el video en un chequeo antes de empezar
buttonComenzar.addEventListener("click", getAndRecordMedia)

function getAndRecordMedia() {
    getMedia(constraints).then(showMedia).catch(errorGetMedia)
}

var media; //necesito esta varaible para start y stop recording

//obtengo video
function getMedia(constraints) {
    return navigator.mediaDevices.getUserMedia(constraints).then(x => {
        media = x
        return media
    }).catch(err => {
        console.log("erorr tipo " + err)
    });
}

//muestro el video en un chequeo antes de empezar
function showMedia(media) {
    try {
        if (videoCaptura.srcObject !== undefined) {
            videoCaptura.srcObject = media;
        } else {
            videoCaptura.src = media;
        }
        videoCaptura.play()
    } catch (error) {
        alert("error: " + error)
    }

}

function errorGetMedia(error) {
    console.log(error)
}



//comienzo a grabar al apretar capturar
BUTTON_CAPTURAR.addEventListener("click", startRecording)

const REDORD_LIMIT = 7; // seconds
const RECORD_REGISTER_TIME_INTERVAL = 1 // seconds
let recordTimeInterval;
let recordTimeDuration;


//grabo el gif
function startRecording() {

    checkRecorder() //me aseguro que este vacío

    recorder = RecordRTC(media, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() { console.log('started') }
    });

    recorder.startRecording();
    registerRecordTime()
}


function checkRecorder() {
    if (typeof(recorder) === "object") {
        try {
            //borro cualquier cosa que pueda haber en el recorder
            recorder.destroy();
            recorder = null;
        } catch (error) { console.log(error) }
    }

}


//termina de grabar al apretar listo 
BUTTON_LISTO_GRABACIÓN.addEventListener("click", pararGrabación)

function pararGrabación() {
    clearInterval(recordTimeInterval);
    recorder.stopRecording(stopRecordingCallback);
}

function stopRecordingCallback() {
    videoCaptura.classList.add("hidden")
    videoFinished.classList.remove("hidden")

    let blob = recorder.getBlob();
    var url = URL.createObjectURL(blob);
    videoFinished.src = url
}


//función usada para registrar tiempo del timer y para finalización forzada de la grabación
function registerRecordTime() {
    recordTimeDuration = 0;
    console.log(recordTimeDuration)
    recordTimeInterval = setInterval(() => {
        recordTimeDuration++;

        timer.innerHTML = "00:00:0" + recordTimeDuration;
        checkRecordTime(); //chequea cada un segundo si ya llegue al tiempo limite de grabación que le puse
    }, RECORD_REGISTER_TIME_INTERVAL * 1000);
}

//para terminar la grabación si llego al tiempo limite sin que el usario aprete Listo para terminar la grabación
function checkRecordTime() {
    if (recordTimeDuration >= REDORD_LIMIT) {
        pararGrabación();
        changeCapturandoToVistaprevia()
    }
}


// permito que el usuario cancela la subida a giphy al apretar cancelar
let controller = new AbortController()
let signal = controller.signal;

BUTTON_CANCELAR_SUBIDA.addEventListener('click', function() {
    controller.abort();
    controller = new AbortController();
    console.log('Download aborted');
    backToMisGuifos()
    BOX_PROGRESS_SUBIENDO_GIF.classList.add("hidden")
    videoCaptura.classList.remove("hidden")
    BUTTON_CAPTURAR.classList.remove("hidden")
    BOX_EXITO_GIF_CREADO.classList.add("hidden")
});

//-------------------subo el gif a giphy y lo guardo en local storage-----------------
BUTTON_SUBIR_GUIFO.addEventListener("click", x => {
    postGifToGiphy().then((resultado) => { saveGifInLocalStorage(resultado) }) //dentro de esta función llamo a saveGifInLocalStorage()  pero yo querio hacerlo aca con un .then !!!!!!!!!!
})


//subo el gif a giphy
function postGifToGiphy() {
    try {
        //formateo el blob para poder mandarlo a giphy
        let form = new FormData();
        form.append('file', recorder.getBlob());
        form.append('api_key', API_KEY);

        //envio mi gif recién creado junton con mi API_KEY a giphy
        return fetch('https://upload.giphy.com/v1/gifs?' + API_KEY, {
                signal: controller.signal, //para abortar fetch en button canclear
                method: 'POST',
                body: form
            })
            .then(async response => {
                jsonRes = await response.json()
                return jsonRes
            }).catch(e => { if (e.name === "AbortError") { console.log("Fetch cancelado con exito") } })

    } catch (e) { console.log("error tipo: " + e); }
}

let storedGifos = []
let result;
//guardo mi gif en local storage y muestro la preview
async function saveGifInLocalStorage(resultado) {
    if (typeof resultado !== "undefined") {
        result = await resultado
        try {
            let gifosId = (result.data.id)
            showPreview(gifosId) //vista previa del gif en el box de exito
            storedGifos.push(gifosId); //subo el gif a mi array con los ids de todos los gifs subidos a giphy
            localStorage.setItem('misGifos', JSON.stringify(storedGifos));
        } catch (e) {
            console.log("error tipo: " + e);
        } finally {
            changeSubiendoToExito() //cambio del box actual al de exito 
        }
    } else {
        console.log("no hay gif para guardar")
    }
}


//busco gifs en la api
function fetchGifs(url) {
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


//vista previa del gif recién creado en el box de exito
function showPreview(dataId) {
    var gifID = "&ids=" + dataId;
    var url = 'https://api.giphy.com/v1/gifs?api_key=' + API_KEY + gifID;

    fetchGifs(url).then(rta => {
            document.querySelector('.guifoSubido').src = rta.data[0].images.original.url //para mostararlo en el cuadrado del box de exito
            showIDGifs(rta) //para ya sumarlo a todos los que se muestran en mis guifos 
        })
        .catch(() => {
            document.getElementById('.guifoSubido').src = "https://media0.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif?cid=790b7611d6930cac4c17e5da5fc76ea10d221f14cac19d58&rid=giphy.gif"; //imagen a proposito tipo falla
        });
}


//obtengo todos los id guarados en el local storage
function getGifosFromStore() {
    return JSON.parse(localStorage.getItem('misGifos')) || [];

}

//asi mantenlo los gifs creados en otra sesión
document.addEventListener("DOMContentLoaded", x => {
    storedGifos = getGifosFromStore()
});

//siempre meustro los gifs ya creados
getGeneratedGif()


//obtengo los gifs ya guardados en el local storage
function getGeneratedGif() {
    storedGifos = getGifosFromStore()
    if (storedGifos.length > 0) {
        for (let i = 0; i < storedGifos.length; i++) {
            let storage = storedGifos[i]
            var gifID = "&ids=" + storage;
            var url = 'https://api.giphy.com/v1/gifs?api_key=' + API_KEY + gifID;
            fetchGifs(url).then(rta => {
                    // showIDGifs(rta, i);
                    showIDGifs(rta)
                })
                .catch(() => {
                    // showIDGifs(null, i)
                    showIDGifs(null)
                });
        }
    } else {
        // showIDGifs(null, i) 
        console.log("no hay gifs");
    }
}


//muestro gifs creados en container de section "Mis Guifos"
function showIDGifs(data) {
    if (data !== null) {
        let box = document.createElement('div');
        let img = document.createElement('img');

        let ratio = data.data[0].images.downsized.width / data.data[0].images.downsized.height
        if (ratio > 1.54) {
            box.classList.add('gif-item-fromAPI-long');
        } else {
            box.classList.add('gif-item-fromAPI');
        }

        box.appendChild(img);
        document.getElementById("container-misGuifos").appendChild(box); ////// todavía no esta estilado el container pq es el mismo que el de tendencias que tengo q ordenar
        img.src = data.data[0].images.downsized.url;

    } else {
        console.log("no hay gif para mostrar")
    }
}


//guardo el gif al apretar descargar
BUTTON_DESCARGAR.addEventListener("click", downloadGif)

function downloadGif() {
    let urlGuardar = videoFinished.src.split('/').pop()
    recorder.save(urlGuardar)
}


//copio el link del giphy al apretar copiar enlace
BUTTON_COPIAR.addEventListener("click", copyUrl)

function copyUrl() {

    // Crea un campo de texto "oculto"
    var auxCopy = document.createElement("input");

    // Asigna el contenido del elemento especificado al valor del campo
    // auxCopy.setAttribute("value", videoFinished.src);
    auxCopy.setAttribute("value", document.querySelector('.guifoSubido').src)

    // Añade el campo a la página
    document.body.appendChild(auxCopy);

    // Selecciona el contenido del campo
    auxCopy.select();

    // Copia el texto seleccionado
    document.execCommand("copy");

    // Elimina el campo de la página
    document.body.removeChild(auxCopy);
}