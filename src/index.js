import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
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

    fetchCountries(currentNameCountry.trim()).then(data => {
        console.log('data---', data);
        console.log('Довжина списку---', data.length);
        if (!data.length) {
            console.log('введи назву країни');
            return
        }
        if (data.length === 1) {
            console.log('виводь інформацію про країну')
            return
        }
        if (data.length >= 10) {
            console.log('виводь повідомлення про введення більш спицифічної назви країни');
            return
        }
        console.log('покажи список країн');
        //         const markup = technologies
        //   .map((technology) => `<li class="list-item">${technology}</li>`)
        //   .join("");
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
