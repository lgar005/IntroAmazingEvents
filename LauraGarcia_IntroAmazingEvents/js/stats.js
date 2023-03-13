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
        return response.json()
      }).then(datos=>{
        const listEvents= datos.events;
        const listCategories=Array.from( new Set(listEvents.map(eventT=>eventT.category)));
        const dateActual=new Date(datos.currentDate);
        const allPastEvents=filterPastEvents(listEvents, dateActual);
        const allUpcomingEvents=filterUpcomingEvents(listEvents, dateActual);
        const eventAttendancePercentage=[];
        allPastEvents.forEach(eventT=>{
            eventAttendancePercentage.push({   
                nameEvent: eventT.name,
                percentage:(eventT.assistance*100)/eventT.capacity,
            })
        })
        eventAttendancePercentage.sort((x,y)=>y.percentage-x.percentage)
        const eventLargeCapacity= allPastEvents.sort((x,y)=>y.capacity-x.capacity)
        const infoFirstTable= [];
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
                        percentagePE: parseFloat((assistanceFoodPE*100)/capacityFoodPE).toFixed(2),
                    },
                    {
                        nameCategory: "Museum",
                        revenuesTC: revenuesMuseumPE,
                        percentagePE: parseFloat((assistanceMuseumPE*100)/capacityMuseumPE).toFixed(2),
                    },
                    {
                        nameCategory: "Concert",
                        revenuesTC: revenuesConcertPE,
                        percentagePE: parseFloat((assistanceConcertPE*100)/capacityConcertPE).toFixed(2),
                    },
                    {
                        nameCategory: "Race",
                        revenuesTC: revenuesRacePE,
                        percentagePE: parseFloat((assistanceRacePE*100)/capacityRacePE).toFixed(2),
                    },
                    {
                        nameCategory: "Books",
                        revenuesTC: revenuesBooksPE,
                        percentagePE: parseFloat((assistanceBooksPE*100)/capacityBooksPE).toFixed(2),
                    },
                    {
                        nameCategory: "Cinema",
                        revenuesTC: revenuesCinemaPE,
                        percentagePE: parseFloat((assistanceCinemaPE*100)/capacityCinemaPE).toFixed(2),
                    },
                    {
                        nameCategory: "Party",
                        revenuesTC: revenuesPartyPE,
                        percentagePE: parseFloat((assistancePartyPE*100)/capacityPartyPE).toFixed(2),
                    }
                ]
    
            const rowThirdTable=infoPastEventsStatics.reduce((acc, eventT)=>  acc += `
                                                                                    <tr>
                                                                                        <th>${eventT.nameCategory}</th>
                                                                                        <td>${eventT.revenuesTC}</td>
                                                                                        <td>${eventT.percentagePE}%</td>
                                                                                    </tr>
                                                                                    `
                                                                        ,'');
                                                                        $pStatics.innerHTML+=rowThirdTable;
           //TABLA UPCOMING EVENTS                                                                
           let estimateFoodUE=0;
           let estimateMuseumUE=0;
           let estimateConcertUE=0;
           let estimateRaceUE=0;
           let estimateBooksUE=0;
           let estimateCinemaUE=0;
           let estimatePartyUE=0;
           let capacityFoodUE=0;
           let capacityMuseumUE=0;
           let capacityConcertUE=0;
           let capacityRaceUE=0;
           let capacityBooksUE=0;
           let capacityCinemaUE=0;
           let capacityPartyUE=0;
           let revenuesFoodUE=0;
           let revenuesMuseumUE=0;
           let revenuesConcertUE=0;
           let revenuesRaceUE=0;
           let revenuesBooksUE=0;
           let revenuesCinemaUE=0;
           let revenuesPartyUE=0;
           console.log("upc events")
           allUpcomingEvents.map(up=> console.log(up))
           allUpcomingEvents.forEach(eventT=>{
                  if(eventT.category==="Food"){
                       estimateFoodUE+=eventT.estimate;                    ;
                       capacityFoodUE+=eventT.capacity;
                       revenuesFoodUE+=eventT.estimate*eventT.price;
                   }
                   else if(eventT.category==='Museum'){
                        estimateMuseumUE+=eventT.estimate;
                       capacityMuseumUE+=eventT.capacity;
                       revenuesMuseumUE+=eventT.estimate*eventT.price;
                   }
                   else if(eventT.category==='Concert'){
                        estimateConcertUE+=eventT.estimate;
                       capacityConcertUE+=eventT.capacity;
                       revenuesConcertUE+=eventT.estimate*eventT.price;
                   }
                   else if(eventT.category==='Race'){
                        estimateRaceUE+=eventT.estimate;
                       capacityRaceUE+=eventT.capacity;
                       revenuesRaceUE+=eventT.estimate*eventT.price
                   }
                   else if(eventT.category==='Books'){
                        estimateBooksUE+=eventT.estimate;
                       capacityBooksUE+=eventT.capacity;
                       revenuesBooksUE+=eventT.estimate*eventT.price;
                   }
                   else if(eventT.category==='Cinema'){
                        estimateCinemaUE+=eventT.estimate;
                       capacityCinemaUE+=eventT.capacity;
                       revenuesCinemaUE+=eventT.estimate*eventT.price;
                   }
                   else if(eventT.category==='Party'){
                        estimatePartyUE+=eventT.estimate;
                       capacityPartyUE+=eventT.capacity;
                       revenuesPartyUE+=eventT.estimate*eventT.price;
                   }
               })

               let infoUpcomingEventsStatics=[    
                       {
                           nameCategory: "Food",
                           revenuesTC: revenuesFoodUE,
                           percentageUE: parseFloat((estimateFoodUE*100)/capacityFoodUE).toFixed(2),
                       },
                       {
                           nameCategory: "Museum",
                           revenuesTC: revenuesMuseumUE,
                           percentageUE: parseFloat((estimateMuseumUE*100)/capacityMuseumUE).toFixed(2),
                       },
                       {
                           nameCategory: "Concert",
                           revenuesTC: revenuesConcertUE,
                           percentageUE: parseFloat((estimateConcertUE*100)/capacityConcertUE).toFixed(2),
                       },
                       {
                           nameCategory: "Race",
                           revenuesTC: revenuesRaceUE,
                           percentageUE: parseFloat((estimateRaceUE*100)/capacityRaceUE).toFixed(2),
                       },
                       {
                           nameCategory: "Books",
                           revenuesTC: revenuesBooksUE,
                           percentageUE: parseFloat((estimateBooksUE*100)/capacityBooksUE).toFixed(2),
                       },
                       {
                           nameCategory: "Cinema",
                           revenuesTC: revenuesCinemaUE,
                           percentageUE:(estimateCinemaUE*100)/capacityCinemaUE,
                       },
                       {
                           nameCategory: "Party",
                           revenuesTC: revenuesPartyUE,
                           percentageUE: parseFloat((estimatePartyUE*100)/capacityPartyUE).toFixed(2),
                       }
                   ]
       
               const rowSecondTable=infoUpcomingEventsStatics.reduce((acc, eventT)=>  acc += `
                                                                                       <tr>
                                                                                           <th>${eventT.nameCategory}</th>
                                                                                           <td>${eventT.revenuesTC}</td>
                                                                                           <td>${eventT.percentageUE ? eventT.percentageUE :"0"}%</td>
                                                                                       </tr>
                                                                                       `
                                                                           ,'');
                                                                           $uStatics.innerHTML+=rowSecondTable;        
    }).catch(err=>console.log("err"))