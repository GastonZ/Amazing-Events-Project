const containerCards = document.getElementById("card-container")

const contenedorChecks = document.getElementById('checkbox-container')

const searchId = document.getElementById('searchId')


async function otherEvents(){
    try {
        let response = await fetch('https://mind-hub.up.railway.app/amazing')
        let data = await response.json()
        let events = data.events
        let date = data.date
        var eventsF = events.filter(x => x.date > date)

    }catch(err){
        console.log(err)
    }

    eventsF.forEach(createCard)

    const categories = eventsF.reduce((categories, event) => Array.from(new Set([...categories,event.category])), [])

    categories.forEach(createCheckbox)

    let checkBoxId = Array.from(document.querySelectorAll('.checkId'))
   
    checkBoxId.forEach(checkbox => checkbox.addEventListener("click", filterCheckCards))

    searchId.addEventListener('input', filterCheckCards)

    function filterCheckCards(){
        let filteredChecks = checkEvents(eventsF)
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

function createCheckbox(categoria){
    contenedorChecks.innerHTML += `
    <div class="category d-flex p-lg-4 p-md-2 p-sm-1">
                <label class="containers">
                    <input class="checkbox checkBoxClass checkId" value="${[categoria]}" type="checkbox">
                    <div class="checkmark"></div>
                </label>
                <p class="category-text text-dark">${[categoria]}</p>
            </div>
    `
}

// ----------------------------------- CHEKBOX & SEARCH Filtering ----------------------------------------------

function filterCardsBySearch(array,texto){
    let cardsFilterForSearch = array.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()));
/*     if(cardsFilterForSearch.length === 0){
        searchEmpty()
        return []
    }  */
    return cardsFilterForSearch
  }


function createCard(x){
    containerCards.innerHTML += `
    <a href="./details.html?id=${x._id}">
    <div class="card">
                <img src="${x.image}" class="card-img-top" alt="${x.name}">
                <div class="card-body absolute">
                    <h2 class="card-title">${x.name}</h2>
                    <p class="card-text">${x.description}</p>
                </div>
            </div>
    </a>
            `
    
}


otherEvents()