const prompt = require('prompt-sync')();
const trips = require("./data.js");
console.log(trips);

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
            let i = 0 ;
            while(i < trips.length)
            {
            console.log("#" + trips[i].id + " " + trips[i].departure + " → " + trips[i].destination);
            console.log("Départ : " + trips[i].departureTime);
            console.log("Arrivée : " + trips[i].arrivalTime);
            console.log("Prix : " + trips[i].price + " DH");
            console.log("Places disponibles : " + trips[i].availableSeats);
            console.log("");
            i++;   
            }
                break;
             case 2:
    
            let passengername = prompt ("passanger name");
            let tripID = Number(prompt ("trajet identifier"));
            let tripindex = 0;
            let trip = null;

           while (tripindex < trips.length)   // 1 research if the path correspondant 
           {
                if (trips[tripindex].id === tripID) // check the the ID enterd by the user and compare it with the trips _((trips[tripindex].id))_
                 {
                    trip = trips[tripindex];
                    break; 
                }
           
            tripindex++;
           }
            if (trip === null) // if trip still null then the path isn't found
            {
                console.log("path not found");
                break;
            }
            if (trip.availableSeats > 0)
            {
                console.log("place found");
                
            }
            else 
            {
                console.log("place full");
                break;
            }
            let seatNumber = 1;
            let j = 0;

            while (j < tickets.length) // this for the tickets how many tickets are there already
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
                console.log ("no ticket was saved");
                break;
            }
            console.log ("=== TICKETS ===");
            let ticketIndex = 0 ;
            while (ticketIndex < tickets.length) //Keep going while there are still tickets that haven't been displayed.
            {
                let ticket = tickets[ticketIndex];
                let tripIndex = 0;
                let trip =null;
                while (tripIndex < trips.length)
                {
                    if (trips [tripIndex].id === ticket.tripId)
                    {
                        trip = trips[tripIndex];
                        break;
                    }
                    tripIndex++;
                }
                   console.log("Ticket #" + ticket.id);
        console.log("Passanger : " + ticket.passengerName);
        console.log("path : " + trip.departure + " → " + trip.destination);
        console.log("Place : " + ticket.seatNumber);
        console.log("Price : " + ticket.price + " DH");

        ticketIndex++;
            }
            break;
        case 4:
            
            break;

        case 5:
            console.log("Search for a ticket");
            break;

        case 6:
            console.log("Filter trips");
            break;

        case 7:
            console.log("Sort trips");
            break;

        case 0:
            console.log("Goodbye!");
            break;

        default:
            console.log("Invalid option");
    }
   

}
