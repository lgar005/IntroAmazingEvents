//const listEvents=data.events;
const $main = document.getElementById( "eventInfo" );
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
const url='https://mindhub-xj03.onrender.com/api/amazing';
fetch(url)
      .then(response=>{
        console.log("entre al then de la url")
        return response.json()
      }).then(datos=>{
        console.log("Datos")
        console.log(datos)
        console.log("eventos")
        console.log(datos.events)
        const listEvents= datos.events;
        const params=new URLSearchParams(location.search);
        console.log("params "+params)
        const id= params.get("id")
        console.log(id)
        const eventT=listEvents.find(event=>event._id.toString()===id);
        console.log("event "+eventT);
        renderCard(eventT, $main)
      })
    .catch(err=> console.log("err"))