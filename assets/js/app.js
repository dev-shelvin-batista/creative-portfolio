class RestService {
  constructor() {}
  /**
   * Metodo para consumir servicio rest a una url
   *
   * @param   {string}  url  URL del servicio rest o archivo a obtener el contenido
   *
   * @return  {Promise<any>} Respuesta del servicio rest      
   */
  getRest(url){
    return new Promise(resolve => {
      fetch(url)
      .then((response) => response.json())
      .then((data) => resolve({error: false, data}))
      .catch(error => resolve({error: false, error}))
    });
  }
}


class Portfolio {
  constructor() {}
  
  /**
   * Generar en pantalla el portafolio
   *
   * @param   {any[]}  array  Listado de portafolio a mostrar en pantalla
   * @param   {string}       type   Tipo de visualizacion (Grid o List)
   */
  static printPortfolio(array = [], type = "Grid") {
    let portfolio = document.getElementById("portfolio")
    portfolio.innerHTML = '';
  
    const firstOption = document.createElement("div");
    firstOption.setAttribute("class", type == "Grid" ? "option option-grid" : "option option-list")
  
    const secondOption = document.createElement("div");
    secondOption.setAttribute("class", type == "Grid" ? "option option-grid" : "option option-list")
  
    const thirdOption = document.createElement("div");
    thirdOption.setAttribute("class", type == "Grid" ? "option option-grid" : "option option-list") 
  
    let firstColumValue = 0;
    // Iterar el listado para generar cada elemento en pantalla
    array.map((value, index) => {
      const info = document.createElement("div");
      info.setAttribute("class", "info")
      info.setAttribute("title", value.title)
  
      const img = document.createElement("img");
      img.setAttribute("src", value.image)
      info.appendChild(img);
  
      const textCenter = document.createElement("div");
      textCenter.setAttribute("class", "text-center");
  
      const title = document.createElement("p");
      title.innerText = value.title;
      const line = document.createElement("hr");
      const subtitle = document.createElement("small");
      subtitle.innerText = value.type;
      textCenter.appendChild(title);
      textCenter.appendChild(line);
      textCenter.appendChild(subtitle);
  
      info.appendChild(textCenter);
      
      // Verificar en cual columna se agregan los items del array, 
      // siempre y cuando el tipo de visualizacion es Grid, 
      // sino se genera un listado
      if(type == "Grid") {
        if(index % 3 == 0) {
          firstOption.appendChild(info);
          firstColumValue = index;
        } else {    
          if((index - firstColumValue) == 1) {
            secondOption.appendChild(info);  
          } else {
            thirdOption.appendChild(info);
          }
        } 
      } else {
        firstOption.appendChild(info);
      }    
    });
    portfolio.appendChild(firstOption);
  
    if(type == "Grid") {
      portfolio.appendChild(secondOption);
      portfolio.appendChild(thirdOption);
    }  
    
  } 
}
let listPortfolio = []
let listPortfolioShow = []
let typeSelected = "Grid"
let category = "All"
count = 0;

(async () => {
  const restService = new RestService();
  const response = await restService.getRest('./assets/data/portfolio.json')

  listPortfolio = [...response.data]
  if(listPortfolio.length < 10){
    const btnShowMore = document.getElementsByClassName("option-more")
    
    if(btnShowMore.length > 0){
      btnShowMore[0].setAttribute("class", "hide")
    }    
  }
  listPortfolioShow.push(...generateListPortfolio(listPortfolio));
  Portfolio.printPortfolio(listPortfolioShow, "Grid")
})()

/**
 * Generar los 10 siguientes items del portafolio en pantalla.
 * Es usado en el evento click del boton Show Me More
 */
async function showMeMore() {
  const list = await filterList(category, false)
  await listPortfolioShow.push(...generateListPortfolio(list))
  Portfolio.printPortfolio(listPortfolioShow, typeSelected)
  count+=10;
}

/**
 * Generar un listado del portafolio filtrando por sus categorias o 
 * generar todo el listado (All): Branding, Web, Photography, App
 *
 * @param   {string}  typeList  Categoria del portafolio
 * @param   {boolean}  show     Permite validar si el listado filtrado se muestra en pantalla o se retorna en la funcion
 *
 * @return  {any[]}            Listado filtrado del portafolio. Se ejecuta cuando el parametro show es igual a false
 */
function filterList(typeList, show = true) {
  count = show ? 0 : count;
  let list = [];
  category = typeList;
  const navBar = document.getElementsByClassName("navbar-nav")
  
  for (let index = 0; index < navBar.length; index++) {
    const elements = navBar[index].children;
    const selected = navBar[index].getElementsByClassName("active")[0];
    selected.removeAttribute("class")

    for (let j = 0; j < elements.length; j++) {
      
      if (elements[j].textContent == typeList) {
        elements[j].setAttribute("class", "active")
      }
    }
    
  }
  
  if(typeList == "All") {
    list = listPortfolio;
  } else {
    list = listPortfolio.filter(data => data.type == typeList)
  }
  
  if(show) {
    listPortfolioShow = [...generateListPortfolio(list)];
    Portfolio.printPortfolio(listPortfolioShow, typeSelected)
    goOurWork();
  }else{
    count+=10;
  }  
  
  return list;
}

/**
 * Dirigir el scroll de la pagina hacia el portafolio
 */
function goOurWork() {
  document.getElementById("options").scrollIntoView();
}

/**
 * Funcion para cambiar el tipo de visualizacion del portafolio. Cuadricula (Grid) o Listado (List)
 *
 * @param   {[type]}  type  Tipo de visualización
 */
function changeType (type = "Grid") {
  typeSelected = type;
  const list = filterList(category, true)
  Portfolio.printPortfolio(list, type)  
} 

/**
 * Generar los 10 siguientes items en el listado del portafolio
 *
 * @param   {any[]}  array  Listado del portafolio
 */
function generateListPortfolio(array) {
  const list = array.slice(count, count + 10)
  return list;
}

