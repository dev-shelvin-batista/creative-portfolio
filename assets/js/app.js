class RestService {
  constructor() {}
  /**
   * Method for consuming a REST service at a URL
   *
   * @param   {string}  url  URL of the REST service or file from which to obtain the content
   *
   * @return  {Promise<any>} Response from the rest service  
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
   * Generate the portfolio on screen
   *
   * @param   {any[]}  array  List of portfolios to display on screen
   * @param   {string}       type   Display type (Grid or List)
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
    // Iterate through the list to generate each element on screen
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
      
      // Check which column the array items are added to, provided that the display type is Grid; otherwise, a list is generated.
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
let count = 0;

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
 * Generate the next 10 items in the portfolio on screen. It is used in the Show Me More button click event.
 */
async function showMeMore() {
  const list = await filterList(category, false)
  await listPortfolioShow.push(...generateListPortfolio(list))
  Portfolio.printPortfolio(listPortfolioShow, typeSelected)
  count+=10;
}

/**
 * Generate a list of the portfolio by filtering by category or generate the entire list (All): Branding, Web, Photography, App
 *
 * @param   {string}  typeList  Portfolio category
 * @param   {boolean}  show     Allows you to validate whether the filtered list is displayed on screen or returned in the function.
 *
 * @return  {any[]}            Filtered portfolio list. Executed when the show parameter is set to false.
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
 * Scroll the page to the portfolio
 */
function goOurWork() {
  document.getElementById("options").scrollIntoView();
}

/**
 * Function to change the portfolio display type. Grid or List.
 *
 * @param   {[type]}  type  Display type
 */
function changeType (type = "Grid") {
  typeSelected = type;
  const list = filterList(category, true)
  Portfolio.printPortfolio(list, type)  
} 

/**
 * Generate the following 10 items in the portfolio list
 *
 * @param   {any[]}  array  Portfolio list
 */
function generateListPortfolio(array) {
  const list = array.slice(count, count + 10)
  return list;
}

