const listEvents=data.events;
const dateActual=new Date(data.currentDate);
const $main = document.getElementById( "pastEvents");
function createCard( dataEvents ){
    return `<div class="card colorAliceBlue colorAqua mb-5 " style="width: 18rem;">
    <img src="${dataEvents.image}" class="card-img-top cardImage" alt="music-concert">
    <div class="card-body ">
      <h5 class="card-title">${dataEvents.name}</h5>
      <p class="card-text sizePCards">${dataEvents.description}</p><br/>
      <div class="d-flex justify-content-around" >
        <p>Price: $${dataEvents.price}</p>
        <a href="./details.html" class="btn btn-info">See more</a>
      </div>
    </div>
  </div>` 
}

function paintCard( events, element ){
    let template = ''
    for( let event of events ){
        template += createCard( event )
    }
    element.innerHTML = template
}
function filterPastEvents(events){
    let listPastEvents=[ ];
    for(let event of events){
        const dateEvent=new Date(event.date);
        if(dateActual>dateEvent){
            listPastEvents.push(event);
        }
    }
    return listPastEvents;
}

const allPastEvents=filterPastEvents(listEvents);
const allCardsPastEvents=paintCard(allPastEvents,$main);