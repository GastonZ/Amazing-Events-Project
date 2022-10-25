const containerDetails = document.getElementById("details-container");


async function detailsId(){

    let id = location.search.slice(4)
  
    try{
      let response = await fetch(`https://mh-amazing.herokuapp.com/amazing`)
      let events = await response.json()
      var eventsData = await events.events
    
    }catch(error){
      console.log(error)
    }
  
    let eventDetails = eventsData.filter(event => id == event.id)
    eventDetails = eventDetails[0]
    createCardDetail(eventDetails)
  
  }
  
  detailsId()
  
  function createCardDetail(e){
  
    containerDetails.innerHTML =  
    `
    <div id="${e.id}" class="m-5">
             <img class="detail-img" src="${e.image}" alt="${e.name}" height="400">
        </div>
        <div class="text-center">
            <h2>${e.name}</h2>
            <p>${e.description}</p>
            <span>Price : $${e.price}</span>
        </div>
    `
  }