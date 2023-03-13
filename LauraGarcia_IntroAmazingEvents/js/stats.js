const $eStatics=document.getElementById("eventStatics")
const $uStatics=document.getElementById("upcomingEvenstStatics")
const $pStatics=document.getElementById("pastEventsStatistic")

function filterPastEvents(events, dateActual){
    let listPastEventsFil=events.filter(eventT=> dateActual> new Date(eventT.date));
    return listPastEventsFil;
}

function filterUpcomingEvents(events, dateActual){
    let listUpcomingEventsFil=events.filter(eventT=> dateActual< new Date(eventT.date));
    return listUpcomingEventsFil;
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
        const listCategories=Array.from( new Set(listEvents.map(eventT=>eventT.category)));
        console.log(listCategories);
        const dateActual=new Date(datos.currentDate);
        const allPastEvents=filterPastEvents(listEvents, dateActual);
        const allUpcomingEvents=filterUpcomingEvents(listEvents, dateActual);
        console.log(dateActual)
        const eventAttendancePercentage=[];
        allPastEvents.forEach(eventT=>{
            eventAttendancePercentage.push({   
                nameEvent: eventT.name,
                percentage:(eventT.assistance*100)/eventT.capacity,
            })
        })
        console.log("porcentajes"+eventAttendancePercentage)
        for(let elementos of eventAttendancePercentage){
            console.log(elementos);
        }
        eventAttendancePercentage.sort((x,y)=>y.percentage-x.percentage)
        console.log("despues")
        for(let elementos of eventAttendancePercentage){
            console.log(elementos);
        }
        const eventLargeCapacity= allPastEvents.sort((x,y)=>y.capacity-x.capacity)
        console.log("capacidad")
        for(let elementos of eventLargeCapacity){
            console.log(elementos);

        }
        const infoFirstTable= [];
        console.log(eventAttendancePercentage[0].nameEvent)
        console.log(eventAttendancePercentage[eventAttendancePercentage.length-1].nameEvent)
        console.log(eventLargeCapacity[0].name)
        infoFirstTable.push({
                            name1:eventAttendancePercentage[0].nameEvent, 
                            name2:eventAttendancePercentage[eventAttendancePercentage.length-1].nameEvent, 
                            name3:eventLargeCapacity[0].name})
        console.log("info first table"+infoFirstTable)              
        const rowFirstTable=infoFirstTable.reduce((acc, nameEvent)=>  acc += `
                                                                            <tr>
                                                                                <th>${nameEvent.name1}</th>
                                                                                <td>${nameEvent.name2}</td>
                                                                                <td>${nameEvent.name3}</td>
                                                                            </tr>
                                                                            `
                                            ,'');
                                            $eStatics.innerHTML+=rowFirstTable;
        let assistanceFoodPE=0;
        let assistanceMuseumPE=0;
        let assistanceConcertPE=0;
        let assistanceRacePE=0;
        let assistanceBooksPE=0;
        let assistanceCinemaPE=0;
        let assistancePartyPE=0;
        let capacityFoodPE=0;
        let capacityMuseumPE=0;
        let capacityConcertPE=0;
        let capacityRacePE=0;
        let capacityBooksPE=0;
        let capacityCinemaPE=0;
        let capacityPartyPE=0;
        let revenuesFoodPE=0;
        let revenuesMuseumPE=0;
        let revenuesConcertPE=0;
        let revenuesRacePE=0;
        let revenuesBooksPE=0;
        let revenuesCinemaPE=0;
        let revenuesPartyPE=0;
        console.log("pas events")
        allPastEvents.map(up=> console.log(up))
        allPastEvents.forEach(eventT=>{
               if(eventT.category==="Food"){
                    assistanceFoodPE+=eventT.assistance;                    ;
                    capacityFoodPE+=eventT.capacity;
                    revenuesFoodPE+=eventT.assistance*eventT.price;
                }
                else if(eventT.category==='Museum'){
                    assistanceMuseumPE+=eventT.assistance;
                    capacityMuseumPE+=eventT.capacity;
                    revenuesMuseumPE+=eventT.assistance*eventT.price;
                }
                else if(eventT.category==='Concert'){
                    assistanceConcertPE+=eventT.assistance;
                    capacityConcertPE+=eventT.capacity;
                    revenuesConcertPE+=eventT.assistance*eventT.price;
                }
                else if(eventT.category==='Race'){
                    assistanceRacePE+=eventT.assistance;
                    capacityRacePE+=eventT.capacity;
                    revenuesRacePE+=eventT.assistance*eventT.price
                }
                else if(eventT.category==='Books'){
                    assistanceBooksPE+=eventT.assistance;
                    capacityBooksPE+=eventT.capacity;
                    revenuesBooksPE+=eventT.assistance*eventT.price;
                }
                else if(eventT.category==='Cinema'){
                    assistanceCinemaPE+=eventT.assistance;
                    capacityCinemaPE+=eventT.capacity;
                    revenuesCinemaPE+=eventT.assistance*eventT.price;
                }
                else if(eventT.category==='Party'){
                    assistancePartyPE+=eventT.assistance;
                    capacityPartyPE+=eventT.capacity;
                    revenuesPartyPE+=eventT.assistance*eventT.price;
                }
            })
            let infoPastEventsStatics=[    
                    {
                        nameCategory: "Food",
                        revenuesTC: revenuesFoodPE,
                        percentagePE: (assistanceFoodPE*100)/capacityFoodPE,
                    },
                    {
                        nameCategory: "Museum",
                        revenuesTC: revenuesMuseumPE,
                        percentagePE: (assistanceMuseumPE*100)/capacityMuseumPE,
                    },
                    {
                        nameCategory: "Concert",
                        revenuesTC: revenuesConcertPE,
                        percentagePE: (assistanceConcertPE*100)/capacityConcertPE,
                    },
                    {
                        nameCategory: "Race",
                        revenuesTC: revenuesRacePE,
                        percentagePE: (assistanceRacePE*100)/capacityRacePE,
                    },
                    {
                        nameCategory: "Books",
                        revenuesTC: revenuesBooksPE,
                        percentagePE: (assistanceBooksPE*100)/capacityBooksPE,
                    },
                    {
                        nameCategory: "Cinema",
                        revenuesTC: revenuesCinemaPE,
                        percentagePE: (assistanceCinemaPE*100)/capacityCinemaPE,
                    },
                    {
                        nameCategory: "Party",
                        revenuesTC: revenuesPartyPE,
                        percentagePE: (assistancePartyPE*100)/capacityPartyPE,
                    }
                ]
    
            const rowThirdTable=infoPastEventsStatics.reduce((acc, eventT)=>  acc += `
                                                                                    <tr>
                                                                                        <th>${eventT.nameCategory}</th>
                                                                                        <td>${eventT.revenuesTC}</td>
                                                                                        <td>${eventT.percentagePE}</td>
                                                                                    </tr>
                                                                                    `
                                                                        ,'');
                                                                        $pStatics.innerHTML+=rowThirdTable;

    }).catch(err=>console.log("err"))