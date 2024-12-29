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
    options: ['Instantaneous', '1 round', '1 minute', '10 minutes', '1 hour', '2 hours',
    '8 hours', '24 hours', '7 days', '30 days', 'Until dispelled', 'Special']},
  {title: 'Concentration:', index: 'concentration',  type: 'radio', options: ['Y', 'N']},
  {title: 'Ritual:', index: 'ritual', type: 'radio', options: ['Y', 'N']}
];

function displaySpells() {

  container.innerHTML = '';
  const filteredSpells = spellFilter(spells, filterChoice);

  const popup = document.getElementById('spell_popup');
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape')
      hidePopup(popup);
  })

  popup.className = 'spell_popup';
  popup.style.display = 'none';

  document.body.appendChild(popup);

  filteredSpells.forEach((spell, index) => {
    const div = document.createElement('div');
    div.classList.add('spell');

    const spell_name = document.createElement('div');
    spell_name.innerHTML = `<br>${spell.name}`;
    div.appendChild(spell_name);

    const spell_info = document.createElement('div');
    spell_info.classList.add('spell_info');
    spell_info.innerHTML =
    `Level: ${spell.level}<br>
    Casting time: ${spell.casting_time}<br>
    Range: ${spell.range}`;
    div.appendChild(spell_info);

    // TO-DO: Add things like spell level, casting time, range etc. to this.

   container.appendChild(div);

   div.addEventListener('click', () => {
    showPopup(popup);
    popup.innerHTML =
    `<div class="spell_header">
      <div>
      <h3>${spell.name}</h3> <span class="space"></span> (level ${spell.level})
      <p>${spell.classes.map((c) => c.name).join(', ')} </p>
      <p>${spell.concentration === 'Y' ? 'Concentration, ' + spell.duration.toLowerCase() : spell.duration}</p>
      </div>
      <div>
      <p>Components: ${spell.components.join(', ')} </p>
      <p>Casting time: ${spell.casting_time} </p>
      <p>Range: ${spell.range} </p>
      </div>
    </div>
    <hr/>
    <p>${spell.desc.join("<br>").replace(/\*\*\*(.*?)\*\*\*/g, '<br><b>$1</b>')}</p>

    <button id="close-popup">Close</button>`;
    const closeButton = document.getElementById('close-popup');
    closeButton.addEventListener('click', () => hidePopup(popup));
  });

  });
}

createFilterBox(filterOptions, filterChoice, displaySpells);
displaySpells();

