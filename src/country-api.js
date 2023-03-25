
function fetchCountries(nameCountry) {
 const BaseUrl = `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,flags,capital,population,languages` 
   return fetch(BaseUrl)
        .then(response => {
        console.log(response);
            if (!response.ok) {
    throw new Error(response.status)
}
    return response.json()
})
       .then((data) => {
           console.log('then 2---', data);
           return data;
       })
.catch( (err) => { console.warn(err)})
};

export default (fetchCountries);

