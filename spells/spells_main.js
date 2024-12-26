import { spellFilter } from './spellFilter.js';
import { showPopup, hidePopup, createFilterBox } from '../motherfunctions.js';

const spells = await fetch('./spells.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json();
  });

const filterChoice = {};

const filterOptions = [
  {title: 'Name:', index: 'name', type: 'search'},
  {title: 'Class:', index: 'pclass', type: 'checkbox',
    options: ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Warlock','Wizard']},
  {title: 'Level:', index: 'level', type: 'checkbox', options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {title: 'Components:', index: 'components', type: 'checkbox', options: ['V', 'S', 'M']},
  {title: 'Casting time:', index: 'casting_time', type: 'checkbox',
    options: ['1 action', '1 bonus action',
    '1 reaction', '1 minute', '10 minutes', '1 hour', '8 hours', '12 hours', '24 hours']},
  {title: 'Range:', index: 'range', type: 'checkbox',
    options: ['Self', 'Touch', '5 feet', '10 feet',
    '30 feet', '60 feet', '90 feet', '100 feet', '120 feet', '150 feet', '300 feet',
    '500 feet', '1 mile', '500 miles', 'Unlimited', 'Sight', 'Special']},
  {title: 'Duration:', index: 'duration', type: 'checkbox',
    options: ['Instantaneous', 'Up to 1 round',
    '1 round', 'Up to 1 minute', '1 minute', 'Up to 10 minutes', '10 minutes', 'Up to 1 hour',
    '1 hour', 'Up to 2 hours', 'Up to 8 hours', '8 hours', 'Up to 24 hours', '24 hours',
    '7 days', '30 days', 'Until dispelled', 'Special']},
  {title: 'Concentration:', index: 'concentration',  type: 'radio', options: ['Y', 'N']},
  {title: 'Ritual:', index: 'ritual', type: 'radio', options: ['Y', 'N']}
];

function displaySpells() {

  container.innerHTML = '';
  const filteredSpells = spellFilter(spells, filterChoice);

  const popup = document.getElementById('spell_popup');

  popup.className = 'spell_popup';
  popup.style.display = 'none';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.border = '1px solid black';
  popup.style.padding = '20px';
  popup.style.backgroundColor = 'white';
  popup.style.zIndex = '1000';
  // TO-DO: Move this to the CSS file when you make it.

  document.body.appendChild(popup);

  filteredSpells.forEach((spell, index) => {
    const div = document.createElement('div');
    div.textContent = spell.name;
    div.description = spell.desc;
    // TO-DO: Add things like spell level, classes etc. to this.

   container.appendChild(div);

   div.addEventListener('click', (event) => {
    showPopup(popup);
    popup.innerHTML =
    `<p>${div.description}</p>
    <button id="close-popup">Close</button>`;
    const closeButton = document.getElementById('close-popup');
    closeButton.addEventListener('click', () => hidePopup(popup));
  });

  });
}

createFilterBox(filterOptions, filterChoice, displaySpells);
displaySpells();

