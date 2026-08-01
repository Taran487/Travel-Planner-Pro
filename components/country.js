// REST Countries API fetch functions
async function getCountry(country){
    try{
        const url = `https://api.restcountries.com/countries/v5/names.common/${country}`;

        const response = await fetch(url, {

            headers: {
                Authorization: `Bearer ${process.env.COUNTRY_API_KEY}`
            }

        }); // Sends request to RestAPI to get country details

        if(!response.ok){
            throw new Error("Country not found.");
        }

        const data = await response.json();

        const countryInfo = data.data.objects[0];

        return{

            name: countryInfo.names.common,
            flag: countryInfo.flag.url_png,
            region: countryInfo.region,
            population: countryInfo.population,
            currency: countryInfo.currencies ? countryInfo.currencies[0].name : "Not available",
            languages: countryInfo.languages ? countryInfo.languages.map(lang => lang.name).join(", ") : "Not available"
        };
    }
    catch(err){
        console.log("country API Error:", err);
        return null;
    }
}
module.exports = getCountry;