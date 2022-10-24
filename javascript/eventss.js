const containerCards = document.getElementById("card-container")

const contenedorChecks = document.getElementById('checkbox-container')

const searchId = document.getElementById('searchId')



async function getEvents(){
    try {
        
        let response = await fetch('https://mind-hub.up.railway.app/amazing')
        let events = await response.json()
        var eventsData = await events.events

        console.log(eventsData)
    } catch (error) {
        console.log(error)
    }

    eventsData.forEach(createCard)

    const categories = eventsData.reduce((categories, event) => Array.from(new Set([...categories,event.category])), [])

    categories.forEach(createCheckbox)

    let checkBoxId = Array.from(document.querySelectorAll('.checkId'))
   
    checkBoxId.forEach(checkbox => checkbox.addEventListener("click", filterCheckCards))

    searchId.addEventListener('input', filterCheckCards)

    function filterCheckCards(){
        let filteredChecks = checkEvents(eventsData)
        let filteredSearch = filterCardsBySearch(filteredChecks, searchId.value)
        if (filteredSearch.length !== 0 ){
          containerCards.innerHTML = ``
        }
        filteredSearch.forEach(createCard)
      }

      function checkEvents(array){
        let checkboxChecked = checkBoxId.filter(check => check.checked).map(checkCategory => checkCategory.value)
        if (checkboxChecked.length > 0 ){
            let filteredCheckBox = array.filter(event => checkboxChecked.includes(event.category))
            return filteredCheckBox
        }
        return array
      }

}




// -------------------------------------  CHECKBOX  ----------------------------------------------


function createCheckbox(categoria){
    contenedorChecks.innerHTML += `
    <div class="category bg-glass-check d-flex p-lg-4 p-md-2 p-sm-1">
                <label class="containers">
                    <input class="checkbox checkBoxClass checkId" value="${[categoria]}" type="checkbox">
                    <div class="checkmark"></div>
                </label>
                <p id="${categoria}" class="category-text">${[categoria]}</p>
            </div>
    `
}


// ----------------------------------- CHEKBOX & SEARCH Filtering ----------------------------------------------

function filterCardsBySearch(array,texto){
    let cardsFilterForSearch = array.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()));
    if(cardsFilterForSearch.length === 0){
        searchEmpty()
        return []
    } 
    return cardsFilterForSearch
  }


function createCard(x){
    containerCards.innerHTML += `
    <a href="./details.html?id=${x.id}">
    <div data-aos="fade-up" class="card">
                <img src="${x.image}" class="card-img-top" alt="${x.name}">
                <div class="card-body absolute">
                    <h2 class="card-title">${x.name}</h2>
                    <p class="card-text">${x.description}</p>
                </div>
            </div>
    </a>
            `
    
}


function searchEmpty() {
    containerCards.innerHTML = `
    <article class="text-white d-flex flex-column p-5 justify-content-center align-items-center gap-3">
      <div><img src="../assets/404-Error-amico.svg" alt="error" width="350"></div>
    </article>
    `;
  }



getEvents()
