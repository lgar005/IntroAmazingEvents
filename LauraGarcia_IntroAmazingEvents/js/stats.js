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
        const rowFirstTable=infoFirstTable.reduce((acc, nameEvent)=>  acc += `
                                                                            <tr>
                                                                                <th>${nameEvent.name1}</th>
                                                                                <td>${nameEvent.name2}</td>
                                                                                <td>${nameEvent.name3}</td>
                                                                            </tr>
                                                                            `
                                            ,'');
                                            $eStatics.innerHTML+=rowFirstTable;
        let informationByCategoryP=[];
        listCategories.map(category=>   
                informationByCategoryP.push({
                category:category,
                events: allUpcomingEvents.filter(eventT=>eventT.category===category)
            }))
        let dataUpcomingEvents=[]
        informationByCategoryP.map(datos=>{
                dataUpcomingEvents.push({
                category:datos.category,
                estimate:datos.events.map(e=>e.estimate),
                capacity:datos.events.map(e=>e.capacity),
                revenue:datos.events.map(e=>e.estimate * e.price)
            })
        }) 
        dataUpcomingEvents.forEach(category=>{
            let estimateUE= 0
            category.estimate.forEach(estimate=>estimateUE+=Number(estimate))
            category.estimate= estimateUE
            let capacityUE=0
            category.capacity.forEach(capacity=>capacityUE += Number(capacity))
            category.capacity=capacityUE
            let revenueUE=0
            category.revenue.forEach(revenue=>revenueUE += revenue)
            category.revenue=revenueUE
            category.attendancePercentage= ((estimateUE*100)/capacityUE).toFixed(2)
        })
        let dataUpcomingtEventsFill= dataUpcomingEvents.filter(element=> !element.attendancePercentage.includes("NaN"))
        const rowSecondTable=dataUpcomingtEventsFill.reduce((acc, eventT)=>  acc += `
                                                                                       <tr>
                                                                                           <th>${eventT.category}</th>
                                                                                           <td>${eventT.revenue}</td>
                                                                                           <td>${eventT.attendancePercentage ? eventT.attendancePercentage:"0" }%</td>
                                                                                       </tr>
                                                                                       `
                                                                           ,'');
                                                                           $uStatics.innerHTML+=rowSecondTable;
       let informationByCategoryU=[];
        listCategories.map(category=>   
                            informationByCategoryU.push({
                            category:category,
                            events: allPastEvents.filter(eventT=>eventT.category===category)
         }))  

         let dataPastEvents=[]
         informationByCategoryU.map(datos=>{
                dataPastEvents.push({
                    category:datos.category,
                    assistance:datos.events.map(e=>e.assistance),
                    capacity:datos.events.map(e=>e.capacity),
                    revenue:datos.events.map(e=>e.assistance * e.price)
                 })
         })
     
         dataPastEvents.forEach(category=>{
             let assistancePE= 0;
             category.assistance.forEach(assistance=>assistancePE +=Number(assistance))
             category.assistance= assistancePE;
             let capacityPE=0;
             category.capacity.forEach(capacity=>capacityPE += Number(capacity))
             category.capacity=capacityPE;
             let revenuePE=0;
             category.revenue.forEach(revenue=>revenuePE += revenue)
             category.revenue=revenuePE;
             category.attendancePercentage= ((assistancePE*100)/capacityPE).toFixed(2)
         })
        
         const rowThirdTable= dataPastEvents.reduce((acc, eventT)=>  acc += `
                                                                            <tr>
                                                                                <th>${eventT.category}</th>
                                                                                <td>${eventT.revenue}</td>
                                                                                <td>${eventT.attendancePercentage}%</td>
                                                                            </tr>
                                                                            `
                                                                            ,'');
                                                                            $pStatics.innerHTML+=rowThirdTable;                                                                                
    }).catch(err=>console.log("err"))