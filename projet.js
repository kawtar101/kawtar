const prompt = require('prompt-sync')();
const trips = require("./data.js");


let choice  = 1;
const tickets = [];
let nexticketidperson= 1;
function displaytrips(trips)
{
      console.log("=== TRAJETS DISPONIBLES ===");
            for(let i = 0; i<trips.length;i++)
            {
            console.log("#" + trips[i].id + " " + trips[i].departure + " → " + trips[i].destination);
            console.log("Départ : " + trips[i].departureTime);
            console.log("Arrivée : " + trips[i].arrivalTime);
            console.log("Prix : " + trips[i].price + " DH");
            console.log("Places disponibles : " + trips[i].availableSeats);
            console.log("");
            }
}
function buytickets(trips,tickets)
{
     let passengername = prompt ("passanger name");
            let tripId = Number(prompt ("path identifier : "));
            let trip = null;

           for (let tripindex = 0;tripindex < trips.length; tripindex++)    
           {
                if (trips[tripindex].id === tripId) // check the the ID enterd by the user and compare it with the trips _((trips[tripindex].id))_
                 {
                    trip = trips[tripindex];
                    break; 
                }
           }
            if (trip === null) 
            {
                console.log("path not found");
                return;
               
            }
            if (trip.availableSeats > 0)
            {
                console.log("train found");
                
            }
            else 
            {
                console.log("train full");
                return;
            }
            let seatNumber = 1; 
            let j = 0; 
            while (j < tickets.length)  
            {
                if (tickets[j].tripId === trip.id) 
                {
                    seatNumber++;
                }
                    j++;
            }

            let newticket = {

                id : nexticketidperson,
                passengerName : passengername,
                tripId: trip.id,
                seatNumber : seatNumber,
                price :trip.price
            };

            trip.availableSeats--;
            tickets.push(newticket);
            nexticketidperson++;
            console.log("ticket bought with success");
}
function displaytickets(tickets,trips)
{
    if (tickets.length === 0)
    {
        console.log("no ticket was saved");
        return;
    }

    console.log("=== TICKETS ===");

    let ticketIndex = 0;

    while (ticketIndex < tickets.length)
    {
        let ticket = tickets[ticketIndex];

        let tripsIndex = 0;
        let tripticket = null; 

        while (tripsIndex < trips.length) 
        {
            if (trips[tripsIndex].id === ticket.tripId) 
            {
                tripticket = trips[tripsIndex];
                break;
            }
            tripsIndex++;
        }

        console.log("Ticket #" + ticket.id);
        console.log("Passanger : " + ticket.passengerName);
        console.log("path : " + tripticket.departure + " → " + tripticket.destination);
        console.log("seatnumber: " + ticket.seatNumber);
        console.log("Price : " + ticket.price + " DH");
        ticketIndex++;
    } 
}
function cacelticket(tickets,trips)
{
     let ticketID = Number(prompt("ticket's identifier : "));
         let ticketindex ;
        
           for (ticketindex = 0; ticketindex < tickets.length;ticketindex++)
           {
            if(tickets[ticketindex].id === ticketID)
            {
                break;
            }
           }
            if(ticketindex === tickets.length)
            {
                console.log("ticket not found.");
                return;
            }
            
            let tripIndex = 0;
            while(tripIndex < trips.length)
                {
                    if (trips[tripIndex].id === tickets[ticketindex].tripId)
                    {
                        break;
                    }
                    tripIndex++
                } 
                tickets.splice(ticketindex,1);
                trips[tripIndex].availableSeats++;
                console.log("ticket cancelled successfully");
}
function searchforaticket(tickets,trips)
{
     let passengerNAME = prompt("passenger name : ");
    let ticketiindex = 0;
                let found = false;
                while(ticketiindex < tickets.length)
                {
                    if(tickets[ticketiindex].passengerName === passengerNAME )
                    {
                        found = true;
                        let ticket = tickets[ticketiindex];
                        let tripIndex = 0;
                        let trip =  null;
                        while(tripIndex < trips.length)
                        {
                            if (trips[tripIndex].id === ticket.tripId)
                            {
                                trip = trips[tripIndex];
                                break;
                            }
                            tripIndex++;
                        }
                         console.log("Ticket #" + ticket.id);
                         console.log("Passager : " + ticket.passengerName);
                           console.log("Trajet : " + trip.departure + " → " + trip.destination);
                              console.log("Place : " + ticket.seatNumber);
                          console.log("Prix : " + ticket.price + " DH");
                              console.log("");
                    }
                    ticketiindex++;

                }
                if (found === false )
                {
                    console.log("no ticket was found");
                }
}
function filterthepaths(trips)
{
        let departurecityy = prompt("enter the city : ");
                let tripiindex = 0;
                let foundd = false;
                while(tripiindex < trips.length) 
                {
                    if(trips[tripiindex].departure === departurecityy)
                    {
                        foundd = true;
                        console.log(
                            trips[tripiindex].departure + " → " +
                            trips[tripiindex].destination + ":" +
                            trips[tripiindex].price + "DH"
                        );
                    }
                    tripiindex++;
                }
                if (foundd === false )
                {
                    console.log("no trip was found");
                }
}
function sorttrips(trips)
{
      let round = 0;
                while(round < trips.length - 1)
                {
                    let j = 0;
                    while(j < trips.length - round - 1)
                    {
                        if (trips[j].price > trips[j + 1].price)
                        {
                            let swap = trips[j];
                            trips[j] = trips[j+1];
                            trips[j + 1] = swap;
                        }
                        j++;
                    }
                    round++;
                }
                console.log("++++++++++ ");
                 round = 0; 
                 while(round < trips.length)
                 {
                     console.log(trips[round].departure + " → " + trips[round].destination + " : " + trips[round].price + " DH"); 
                     round++; 
                    } 
}
while(choice !== 0)
{
    console.log ("=================================");
    console.log("RAILWAY MANAGER");
    console.log("=================================");
     console.log("1. Display trips");
    console.log("2. Buy a ticket");
    console.log("3. Display tickets");
    console.log("4. Cancel a ticket");
    console.log("5. Search for a ticket");
    console.log("6. Filter trips");
    console.log("7. Sort trips");
    console.log("0. Exit");
    choice = Number(prompt("choose your option : "))
    switch (choice) {
        case 1:
            displaytrips(trips);
                break;
             case 2:
            buytickets(trips,tickets);
            break;
        
          case 3:
        displaytickets(tickets,trips);
        break;

        case 4:
        cacelticket(tickets,trips);
        break;

        case 5:
            searchforaticket(tickets,trips);
                break;
            case 6 :
              filterthepaths(trips);
                    break;
            case 7:
            sorttrips(trips);
                    break; 
                    
                default:
                }
}