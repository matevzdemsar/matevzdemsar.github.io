import { createFilterBox, showPopup, hidePopup } from "../motherfunctions.js";
import { backgroundFilter } from "./backgroundFilter.js";

const fromAPI = await fetch('./backgrounds.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    };
    return response.json();
  });

const backgrounds = Object.values(fromAPI).map((back) => ({
    ...back,
    availableSkills: back.skills
      .map((choice) =>
        choice.skillsModels.map((skill) => skill.name))
      .flat()
  })
);

const filterChoice = {};

const filterOptions = [
  {title: 'Name', index: 'name', type: 'search'},
  {title: 'Available skills', index: 'skills', type: 'checkbox', options:
    ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History',
    'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception',
    'Performance','Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'
    ]},
  {title: 'Gold', index: 'gold', type: 'operator', options: [{category: 'gold', c_name: ''}]}
];

function displayBackgrounds() {
  container.innerHTML = '';

  document.querySelectorAll('.popup').forEach(popup => popup.remove());
  const popup = document.getElementById('background_popup');
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape')
      hidePopup(popup);
  });

  popup.className = 'background_popup';
  popup.style.display = 'none';

  document.body.appendChild(popup);

  const filteredBackgrounds = backgroundFilter(backgrounds, filterChoice);
  filteredBackgrounds.forEach((background) => {

    const div = document.createElement('div');
    div.textContent = background.name;
    div.classList.add('background');

    div.addEventListener('click', () => {
        showPopup(popup);
        popup.innerHTML =
        `<div class="background_header">
        <h3>${background.name}</h3>
        </div>`
    });

    container.appendChild(div);
  });
};

createFilterBox(filterOptions, filterChoice, displayBackgrounds);
displayBackgrounds();