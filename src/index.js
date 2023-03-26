import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import fetchCountries from './country-api'

const DEBOUNCE_DELAY = 300;

const inputEll = document.querySelector('#search-box');
const ulEll = document.querySelector('.country-list');
const divEll = document.querySelector('.country-info');
console.log(inputEll);
console.log(ulEll);
console.log(divEll);


const handleNameCountryInput = event => {
    // event.preventDefault();
    const currentNameCountry = event.target.value;
    console.dir(currentNameCountry);
    divEll.innerHTML = "";
    ulEll.innerHTML = "";
    fetchCountries(currentNameCountry.trim()).then(data => {
        console.log('data---', data);
        console.log('Довжина списку---', data.length);
        if (data.length === 1) {
            console.log('виводь інформацію про країну');
            console.log('країна', data[0].name.common);
            const valuesLanguages = Object.values(data[0].languages);
            console.log("мови", valuesLanguages);    

            divEll.innerHTML = `
            <img class="js_img_flag" src= ${data[0].flags.svg} alt="" width=50>
            <h2 class="js_name_country"> ${data[0].name.common} </h2>
            <p> capital: ${data[0].capital} </p>
            <p> population: ${data[0].population} </p>
            <p> languages: ${valuesLanguages} </p>`
            return
        }
        if (data.length < 11 ) {
            console.log('покажи список країн');
          const markup = data
              .map(({ name, flags }) => `<li class="list-item">
  <img class="js_img_flag" src= ${flags.svg} alt="" width=50>
            <h2 class="js_name_country"> ${name.common} </h2>
              </li>`)
              .join("");
            
            ulEll.innerHTML = markup;

            return
        }
        if (data.length >= 10) {
            console.log('виводь повідомлення про введення більш спицифічної назви країни');
           
            Notify.info('Too many matches found. Please enter a more specific name.')
            return
        }
         Notify.info('Oops, there is no country with that name')

    }).catch((err) => {
        {
            console.warn(err);
            Notify.info('Oops, there is no country with that name')
        }
    })
};


inputEll.addEventListener('input',debounce(handleNameCountryInput,DEBOUNCE_DELAY));

// function fetchCountries(nameCountry) {
//  const BaseUrl = `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,flags,capital,population,languages` 
//    return fetch(BaseUrl)
//         .then(response => {
//         console.log(response);
//             if (!response.ok) {
//     throw new Error(response.status)
// }
//     return response.json()
// })
//     .then((data) => { console.log(data) })
// .catch( (err) => { console.warn(err)})
// };


// fetchCountries('ukr');
