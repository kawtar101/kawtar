const prompt = require('prompt-sync')();
const trips = require("./data.js");


let choice  = 1;
const tickets = [];
let nexticketidperson= 1;
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
                break;
             case 2:
    
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
            if (trip === null) // if trip still null then the path isn't found
            {
                console.log("path not found");
                break; // the reuested trip doesn't exist  so it will stop the operation
            }
            if (trip.availableSeats > 0)
            {
                console.log("train found");
                
            }
            else 
            {
                console.log("train full");
                break;
            }
            let seatNumber = 1; 
            let j = 0; // checking from the beegining of tickets arrays
            while (j < tickets.length) // check while there aree still tickets to examine (that exists)
            {
                if (tickets[j].tripId === trip.id) //We only count tickets that belong to the same trip.
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
            break; 

        
          case 3:
    if (tickets.length === 0)
    {
        console.log("no ticket was saved");
        break;
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

    break;

        case 4:
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
                break;
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
            break;

        case 5:
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
                break;
            case 6 :
                let departurecityy = prompt("enter the city : ");
                let tripiindex = 0;
                let foundd = false;
                while(tripiindex < trips.length) 
                {
                    if(trips[tripiindex].departure == departurecityy)
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
                    break;
            case 7:
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
                    break; 
                    
                default:
                }
}