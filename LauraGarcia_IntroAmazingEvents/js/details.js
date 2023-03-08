const listEvents=data.events;
const $main = document.getElementById( "eventInfo" );
const params=new URLSearchParams(location.search);
const id= params.get("id")
console.log(id)
let eventT=listEvents.find(element=>element._id===id);
console.log(eventT);
function createCard(eventT){
    return `<img class="imgDetails" src="${eventT.image}" alt="${eventT.name}">
         <div class="sizeInfoDetails">
        <h1>${eventT.name}</h1>
        <ul>
            <li>Date: ${eventT.date}</li>
            <li class="sizeLi">Description: ${eventT.description}</li>
            <li>Category: ${eventT.category}</li>
            <li>Place: ${eventT.place}</li>
            <li>Capacity: ${eventT.capacity}</li>
            <li>Estimate: ${eventT.estimate ? eventT.estimate: "It is not defined"}</li>
            <li>price: $${eventT.price}</li>
        </ul>`
}
function renderCard(eventT, element){
    template='';
    template+=createCard(eventT);
    element.innerHTML=template;
}

renderCard(eventT, $main)