const listEvents=data.events;
const $main = document.getElementById( "index" );
const $check=document.getElementById("checkBox");
const $search=document.getElementById("search-title");
const $searchInput = document.getElementById("search-input")
function createCard( dataEvents ){
    return `<div class="card colorAliceBlue colorAqua mb-5 " style="width: 18rem;">
    <img src="${dataEvents.image}" class="card-img-top cardImage" alt="music-concert">
    <div class="card-body ">
      <h5 class="card-title">${dataEvents.name}</h5>
      <p class="card-text sizePCards">${dataEvents.description}</p><br/>
      <div class="d-flex justify-content-around" >
        <p>Price: $${dataEvents.price}</p>
        <a href="./details.html?id=${dataEvents._id}" class="btn btn-info">See more</a>
      </div>
    </div>
  </div>` 
}

function paintCard( events, element ){
  let template = ''
  if(events.length===0){
    element.innerHTML =noMatch();
  }else{
    events.forEach(eventT => template+=createCard(eventT));
    element.innerHTML = template
  }
}

const allCards=paintCard(listEvents,$main);

const listCategories=Array.from( new Set(listEvents.map(eventT=>eventT.category)));
console.log(listCategories);
const checkB = listCategories.reduce( (acc, category, index) =>  acc += `<div class="form-check form-check-inline">
                                                                  <input class="form-check-input colorFuchsia" type="checkbox" id="inlineCheckbox${index}" 
                                                                  value="${category}">
                                                                  <label class="form-check-label" for="inlineCheckbox${index}">${category}</label>
                                                                  </div>`, '' )
                                                                  $check.innerHTML+=checkB;  
                                                                
$check.addEventListener('change',e=>{
  paintCard(filtroCruzado(listEvents),$main)
})

function filterCheckBox(events){
  let selected = []; 
  const checkBChecked = document.querySelectorAll( 'input[type="checkbox"]:checked' )
  selected = Array.from(checkBChecked).map(x => x.value)
  console.log("selected: "+selected)
  if(selected.length===0){
    return events;
  }else{
    return events.filter(eventT=>selected.includes(eventT.category))
  }
}
console.log(filterCheckBox(listEvents));
$search.addEventListener("submit",(eventT)  => {
  eventT.preventDefault();
  console.log(eventT);
  console.log($searchInput.value);
  console.log(filtroSearch(listEvents));
  paintCard(filtroCruzado(listEvents), $main);
})
function filtroSearch(events){
  let inputS=$searchInput.value.toLowerCase();
  return events.filter(eventT=> eventT.name.toLowerCase().includes(inputS));
}
function filtroCruzado(listEvents){
  return filterCheckBox(filtroSearch(listEvents));
}
function noMatch(){
  return `<h5>there is no match with the search</h5>`
}
