import { itemFilter } from './itemFilter';
import { showPopup, hidePopup, createFilterBox } from '../motherfunctions';

const items = await fetch('./items.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json()
  })

const filterChoice = {}

function displayItems() {
  container.innerHTML = '';
  document.querySelectorAll('.popup').forEach(popup => popup.remove());
  const filteredItems = spellFilter(items, filterChoice);

  filteredSpells.forEach((item) => {
    const div = document.createElement('div');
    div.textContent = item.name;
  })
}