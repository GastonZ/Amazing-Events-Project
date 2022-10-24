//Table 1

async function getStats1(id) {
    let response = await fetch("https://mind-hub.up.railway.app/amazing?time=past")
    let data = await response.json()
    let events = data.events
    events.map(x => {
        x.gain = x.assistance * x.price
        x.percent = (100 * x.assistance / x.capacity).toFixed(2)
    })

// Se ordena por porcentaje de menor a mayor
    events = events.sort((event1,event2) => event1.percent - event2.percent)
    console.log(events)
    let minPercent = events[0]
    let maxPercent = events[events.length-1]
    events = events.sort((event1,event2)=> event1.capacity - event2.capacity)
    let maxCapacity = events[events.length-1]
    printTable1(minPercent,maxPercent,maxCapacity,id)
}

function printTable1(minP,maxP,maxC,id){
    document.getElementById(`${id}`).innerHTML = 
    `
    <tr class="table-light d-flex justify-content-center">
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3">${maxP.name}</th>
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3">${minP.name}</th>
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3">${maxC.name}</th>
    </tr>
    <tr class="table-light d-flex justify-content-center">
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3">${maxP.percent}%</th>
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3">${minP.percent}%</th>
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3">${maxC.capacity}</th>
    </tr>
    `
}

getStats1('table1')

//Table 2

async function getStats2(id) {
    let response = await fetch(`https://mind-hub.up.railway.app/amazing?time=upcoming`)
    let data = await response.json()
    let events = data.events 
    events.map(x => {
        x.gain = x.estimate * x.price
        x.percent = (100 * x.estimate / x.capacity)
    })
// Quitar los repetidos con new Set
    let categories = new Set(events.map(event => event.category))
// Array de objetos a array comun
    categories = [...categories]
    let stats = categories.map(category =>{
        let filter = events.filter(event => event.category===category)
        return reduceStats1(filter)
    })
    printTable2(stats, id)
}

function printTable2(array, id) {
    array.forEach(x => {
        document.getElementById(`${id}`).innerHTML +=
        `
        <tr class="table-light d-flex justify-content-center">
        <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center">${x.category}</td>
        <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center">$${x.gain}</td>
        <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center">${x.potential}%</td>     
        </tr>
        `
    })
}


function reduceStats1(array){
    let initialStat = {
        category: "",
        gain: 0,
        capacity: 0,
        estimate:0
    }

// Se usa reduce para poder realizar operaciones 
// Aplicandolas a cada elemento del arreglo
    let stats = array.reduce((acc, item) => {
        return {
            category: item.category,
            gain: acc.gain + item.gain,
            capacity: acc.capacity + item.capacity,
            estimate: acc.estimate + item.estimate
        }
    }, initialStat)
    stats.potential = (100 * stats.estimate / stats.capacity).toFixed(2)
    return stats
}

getStats2("table2")

//Table 3

async function getStats3(id) {
    let response = await fetch("https://mind-hub.up.railway.app/amazing?time=past")
    let data = await response.json()
    let events = data.events
    events.map(x => {
        x.gain = x.assistance * x.price
        x.percent = (100 * x.assistance / x.capacity)
    })
    let categories = new Set(events.map(event => event.category))
    categories = [...categories]
    let stats = categories.map(category => {
        let filter = events.filter(event => event.category===category)
        return reduceStats2(filter)
    })
    printTable3(stats,id)
    console.log(events)
}


function printTable3(array,id){
    array.forEach(x =>{
        document.getElementById(`${id}`).innerHTML +=
        `
        <tr class="table-light d-flex justify-content-center">
        <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center">${x.category}</td>
        <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center">$${x.gain}</td>
        <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center">${x.assistance}%</td>     
        </tr>
        `
    })
}


function reduceStats2(array) {
    let initialStat = {
        category: "",
        gain: 0,
        capacity: 0,
        assistance: 0
    }
    let stats = array.reduce((acc, item) => {
        return {
            category: item.category,
            gain: acc.gain + item.gain,
            capacity: acc.capacity + item.capacity,
            assistance: acc.assistance + item.assistance
        }
    }, initialStat)
    stats.assistance = (100 * stats.assistance / stats.capacity).toFixed(2)
    return stats
}

getStats3("table3")

