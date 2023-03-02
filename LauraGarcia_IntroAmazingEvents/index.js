const eventos=data.events[0];
const $main = document.getElementById( "index" )
function createCard( dataEvents ){
    return `<div class="card colorAliceBlue colorAqua mb-5 " style="width: 18rem;">
    <img src="${dataEvents.image}" class="card-img-top cardImage" alt="music-concert">
    <div class="card-body ">
      <h5 class="card-title">${dataEvents.name}</h5>
      <p class="card-text">${dataEvents.description}</p><br/>
      <div class="d-flex justify-content-around" >
        <p>Price: ${dataEvents.price}</p>
        <a href="./details.html" class="btn btn-info">See more</a>
      </div>
    </div>
  </div>` 
}

function paintCard( data, element ){
    let template = ''
    for( let d of data.events ){
        template += createCard( d )
    }
    element.innerHTML = template
}

const allCards=paintCard(data,$main)

