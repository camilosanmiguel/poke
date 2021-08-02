const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"

const getData = (url) => {
    return fetch(url).then((resp) => resp.json()).then((json) => {
        llenarDatos(json.results),paginacion(json)
    }).catch((error)=>{
        console.log("Error ->",error);
    });
}

const llenarDatos = (datos) => {
    let html = "";
    datos.forEach(pokemon => {
        html += '<div class="col-3 mt-5">';
        html += '<div class="card">';
        html += '<div class="card-body">';
        html += `<h5 class="card-title text-center text-capitalize">${pokemon.name}</h5>`
        html += "</div></div></div>"
    });
    document.getElementById("datosPokemones").innerHTML = html;
}

const paginacion = (json) => {
    let prevDisable = "";
    let nextDisable = "";

    json.previous == null ? (prevDisable = "disabled") : (prevDisable = "");
    json.next == null ? (nextDisable = "disabled") : (nextDisable = "");

    let html = `<li class="page-item ${prevDisable}"><a class="page-link" onclick="getData('${json.previous}')">Previous</a></li>
    <li class="page-item ${nextDisable}"><a class="page-link" onclick="getData('${json.next}')">Next</a></li>`
    
    console.log(html);

    document.getElementById("pagination").innerHTML = html;
}

getData(API);