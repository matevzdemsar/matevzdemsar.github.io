import { spellFilter } from './spellFilter.js';
import { showPopup, hidePopup, closeAllPopups, createFilterBox } from '../motherfunctions.js';

const spells = await fetch('./spells.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json()
  });

const filterChoice = {}

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
  document.querySelectorAll('.popup').forEach(popup => popup.remove());
  const filteredSpells = spellFilter(spells, filterChoice);

  filteredSpells.forEach((spell, index) => {
    const div = document.createElement('div');
    div.textContent = spell.name;

    div.addEventListener('click', () => {
      showPopup(index);
    });

    container.appendChild(div);

    const popup = document.createElement('div');
    popup.id = `popup-${index}`;
    popup.className = 'popup';
    popup.style.display = 'none'; // Start as hidden
    popup.style.position = 'fixed'; // Stay fixed in one place
    popup.style.top = '50%'; // Center vertically
    popup.style.left = '50%'; // Center horizontally
    popup.style.transform = 'translate(-50%, -50%)'; // Center alignment
    popup.style.border = '1px solid black'; // Add a border for visibility
    popup.style.padding = '20px'; // Add spacing
    popup.style.backgroundColor = 'white'; // Make it stand out
    popup.style.zIndex = '1000'; // Ensure it appears above other elements

    const description = spell.desc.join(' ')

    popup.innerHTML = `
    <p>${description}</p>
    <button id="close-${index}">Close</button>
    `;

    const closeButton = popup.querySelector(`#close-${index}`);
    closeButton.addEventListener('click', () => hidePopup(index));

    document.body.appendChild(popup);
  });
}

createFilterBox(filterOptions, filterChoice, displaySpells);
displaySpells();

