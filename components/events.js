// SeatGeek fetch functions
async function getEvents(city) {
    try{
        const url = `https://api.seatgeek.com/2/events?client_id=${process.env.SEATGEEK_CLIENT_ID}&q=${city}`; 

        const response = await fetch(url);


        if(!response.ok){
            throw new Error("Events not found");
        }

        const data = await response.json();

        console.log(JSON.stringify(data, null, 2));//prints complete JSON data on console

        return data.events.map(event => {

            const eventDate = new Date(event.datetime_local);//fetch Date & time in variable eventDate

            return {

                title: event.title,

                date: eventDate.toLocaleDateString("en-US", { //separate date
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }),

                time: eventDate.toLocaleTimeString("en-US", { //separate time
                    hour: "numeric",
                    minute: "2-digit"
                }),

                type: event.type,

                venue: event.venue.name,

                indoor:[ "concert", "theater", "comedy", "opera", "cirque_du_soleil"].includes(event.type),

                url: event.url

            };
        });
    }
    catch(err){
        console.log("Events API Error", err.message);
        return null;
    }
}
module.exports = getEvents;