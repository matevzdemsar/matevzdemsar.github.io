import { raceFilter } from './raceFilter.js';
import { createFilterBox } from '../motherfunctions.js';

const races = await fetch('./races.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json();
});

const filterChoice = {};
const filterOptions = [];

function displayRaces() {
    container.innerHTML = '';
    document.querySelectorAll('.popup').forEach(popup => popup.remove());
    const filteredRaces = raceFilter(races, filterChoice);
  
    console.log(filteredRaces)
    filteredRaces.forEach((race) => {
      const div = document.createElement('div');
      div.textContent = race.name;
      container.appendChild(div);
    })
}

createFilterBox(filterOptions, filterChoice, displayRaces);
displayRaces();
