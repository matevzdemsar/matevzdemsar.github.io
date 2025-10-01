import { itemFilter } from './itemFilter.js';
import { showPopup, hidePopup, createFilterBox } from '../motherfunctions.js';

const fromAPI = await fetch('./items.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json();
  });

const items = Object.values(fromAPI);

// const tmp = new Set();
// items.forEach((i) => tmp.add(i.weightUnit.toLowerCase()));
// console.log(tmp);
//
// Temporary code to help set up filters, delete afterwards

const filterChoice = {}

const filterOptions = [
  {title: 'Name', index: 'name', type: 'search'},
  {title: 'Type', index: 'type', type: 'checkbox',
    options: ['Ammunition', 'Adventuring gear', 'Armor', "Artisan's tools", 'Explosive',
    'Food & Drink', 'Gaming Set', 'Instrument', 'Mount', 'Poison', 'Ring', 'Rod',
    'Spellcasting Focus', 'Scroll', 'Staff', 'Tack & Harness', 'Tool', 'Trade Good',
    'Vehicle (Air)', 'Vehicle (Land)', 'Vehicle (Space)', 'Vehicle (Water)',
    'Wand', 'Weapon', 'Wondrous']},
  {title: 'Rarity', index: 'rarity', type: 'checkbox',
    options: ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact', 'Unknown']},
  {title: 'Price (gp)', index: 'price', type: 'operator',
    options: [{category: 'price', c_name: ''}]},
  {title: 'Weight', index: 'weight', type: 'operator',
    options: [{category: 'weight', c_name: ''}]}
];

function displayItems() {
  container.innerHTML = '';
  document.querySelectorAll('.popup').forEach(popup => popup.remove());
  const filteredItems = itemFilter(items, filterChoice);

  filteredItems.forEach((item) => {
    const div = document.createElement('div');
    div.textContent = item.name;
    container.appendChild(div)
  })
}

createFilterBox(filterOptions, filterChoice, displayItems);
displayItems();
