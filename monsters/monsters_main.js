import { monsterFilter } from "./monsterFilter.js";
import { createFilterBox, showPopup, hidePopup } from "../motherfunctions.js";

const names = new Set();
const monsters = [];
const fromAPI = await fetch('./monsters.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json();
  })

fromAPI.map(((m) => {if (!names.has(m.name)) {
  monsters.push(m);
  names.add(m.name);
}}));

const filterChoice = {};

const filterOptions = [
  {title: 'Name:', index: 'name', type: 'search'},
  {title: 'Type:', index: 'type', type: 'checkbox',
    options: ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon',
    'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity',
    'Ooze', 'Plant', 'Undead']},
  {title: 'Challenge rating:', index: 'challenge_rating', type: 'checkbox',
    options: ['0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
    '22', '23', '24', '25', '26', '27', '28', '29', '30']},
  {title: 'Vulnerabilities:', index: 'damage_vulnerabilities', type: 'checkbox',
    options: ['Bludgeoning', 'Piercing', 'Slashing', 'Fire', 'Force',
    'Cold', 'Lightning', 'Thunder', 'Acid', 'Poison', 'Necrotic', 'Radiant', 'Psychic']},
  {title: 'Resistances:', index: 'damage_resistances', type: 'checkbox',
    options: ['Bludgeoning', 'Piercing', 'Slashing', 'Fire', 'Force',
    'Cold', 'Lightning', 'Thunder', 'Acid', 'Poison', 'Necrotic', 'Radiant', 'Psychic']},
  {title: 'Immunities:', index: 'damage_immunities', type: 'checkbox',
    options: ['Bludgeoning', 'Piercing', 'Slashing', 'Fire', 'Force',
    'Cold', 'Lightning', 'Thunder', 'Acid', 'Poison', 'Necrotic', 'Radiant', 'Psychic']},
  {title: 'Conditional immunities:', index: 'condition_immunities', type: 'checkbox',
    options: ['Charmed', 'Frightened', 'Grappled', 'Paralyzed', 'Prone',
    'Grappled', 'Restrained', 'Petrified', 'Stunned', 'Incapacitated',
    'Deafened', 'Blinded', 'Poisoned', 'Exhaustion']},
  {title: 'Spellcaster:', index: 'caster', type: 'radio', options: ['Y', 'N']},
  {title: 'Legendary resistances:', index: 'legendary_resistances', type: 'radio', options: ['Y', 'N']},
  {title: 'Legendary actions:', index: 'legendary_actions', type: 'radio', options: ['Y', 'N']},
  {title: 'Armor class:', index: 'armor_class', type: 'operator', options: [{category: 'armor_class', c_name: ''}]},
  {title: 'Hit points:', index: 'hit_points', type: 'operator', options: [{category: 'hit_points', c_name: ''}]},
  {title: 'Speed:', index: 'speed', type: 'operator', options: [
    {category: 'walk', c_name: 'Walking:'},
    {category: 'swim', c_name: 'Swimming:'},
    {category: 'fly', c_name: 'Flying:'},
    {category: 'climb', c_name: 'Climbing:'},
    {category: 'burrow', c_name: 'Burrowing:'}]},
  {title: 'Ability scores:', index: 'ability_scores', type: 'operator', options: [
    {category: 'strength', c_name: 'STR:'},
    {category: 'dexterity', c_name: 'DEX:'},
    {category: 'constitution', c_name: 'CON:'},
    {category: 'intelligence', c_name: 'INT:'},
    {category: 'wisdom', c_name: 'WIS:'},
    {category: 'charisma', c_name: 'CHA:'}]}
];

function displayMonsters() {
  container.innerHTML = '';

  const popup = document.getElementById('monster_popup');

  popup.className = 'monster_popup';
  popup.style.display = 'none';

  document.body.appendChild(popup);
  const filteredMonsters = monsterFilter(monsters, filterChoice);

  console.log(filteredMonsters)
  filteredMonsters.forEach((monster) => {
  const div = document.createElement('div');
  div.classList.add('monster')
  div.innerHTML = `<b>${monster.name}</b> <br>
   <i>${monster.type} CR: ${monster.challenge_rating}<i>`;

  // TO-DO: Add moster description, image? etc.
  
  
  div.addEventListener('click', () => {
    showPopup(popup);
    popup.innerHTML =
    `<div class="monster_header">
      <h3>${monster.name}</h3>
      <span>${monster.size} ${monster.type.toLowerCase()}${monster.subtype ? ` (${monster.subtype})` : ""},
      ${monster.alignment ? monster.alignment : 'unaligned'}</span>
    </div>
    <div class="basic_info">
      <div class="image_container">
        <img src=../assets/shield.jpg alt="Shield" width=37.5px>
        <div class="basic_data"> ${monster.armor_class} </div>
      </div>
      <div class="image_container">
        <img src=../assets/heart.jpg alt="Heart" width=51px class="gray">
        <div class="basic_data"> ${monster.hit_points} </div>
      </div>
      <div class="image_container">
        <img src=../assets/d20.jpg alt="d20" width=43.5px class="gray">
        <div class="basic_data"> ${monster.challenge_rating} </div>
      </div>
    </div>
    <br>
    <button id="close-popup">Close</button>`;
    const closeButton = document.getElementById('close-popup');
    closeButton.addEventListener('click', () => hidePopup(popup));
})
container.appendChild(div);
})
}

createFilterBox(filterOptions, filterChoice, displayMonsters);
displayMonsters();
