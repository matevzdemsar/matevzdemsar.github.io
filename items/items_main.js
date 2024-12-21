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
