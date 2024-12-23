import { itemFilter } from './itemFilter.js';
import { showPopup, hidePopup, createFilterBox } from '../motherfunctions.js';

const items = await fetch('./items.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json()
  });

const filterChoice = {}

const filterOptions = [
  {title: 'Name', index: 'name', type: 'search'},
  {title: 'Type', index: 'type', type: 'checkbox', options: ['Adventuring Gear',
    'Tools', 'Mounts and Vehicles', 'Weapon', 'Armor']},
  {title: 'Price', index: 'price', type: 'operator', options: [""]}
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