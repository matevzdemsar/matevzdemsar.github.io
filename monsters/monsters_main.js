import { monsterFilter } from "./monsterFilter.js";
import { createFilterBox } from "../motherfunctions.js";

const monsters = await fetch('./monsters.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json();
});

const filterChoice = {};

const filterOptions = [
  {title: 'Name:', index: 'name', type: 'search'},
  {title: 'Type:', index: 'type', type: 'checkbox',
    options: ['aberration', 'beast', 'celestial', 'construct', 'dragon',
    'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity',
    'ooze', 'plant', 'undead']},
  {title: 'Challenge rating:', index: 'challenge_rating', type: 'checkbox',
    options: [0, 1/8, 1/4, 1/2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
      14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]},
  {title: 'Vulnerabilities:', index: 'damage_vulnerabilities', type: 'checkbox',
    options: ['bludgeoning', 'piercing', 'slashing', 'fire', 'force',
    'cold', 'lightning', 'thunder', 'acid', 'poison', 'necrotic', 'radiant', 'psychic']},
  {title: 'Resistances:', index: 'damage_resistances', type: 'checkbox',
    options: ['bludgeoning', 'piercing', 'slashing', 'fire', 'force',
    'cold', 'lightning', 'thunder', 'acid', 'poison', 'necrotic', 'radiant', 'psychic']},
  {title: 'Immunities:', index: 'damage_immunities', type: 'checkbox',
    options: ['bludgeoning', 'piercing', 'slashing', 'fire', 'force',
    'cold', 'lightning', 'thunder', 'acid', 'poison', 'necrotic', 'radiant', 'psychic']},
  {title: 'Conditional immunities:', index: 'condition_immunities', type: 'checkbox',
    options: ['charmed', 'frightened', 'grappled', 'paralyzed', 'prone',
    'grappled', 'restrained', 'petrified', 'stunned', 'incapacitated',
    'deafened', 'blinded', 'poisoned', 'exhaustion']},
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
  document.querySelectorAll('.popup').forEach(popup => popup.remove());
  const filteredMonsters = monsterFilter(monsters, filterChoice);

  console.log(filteredMonsters)
  filteredMonsters.forEach((monster) => {
    const div = document.createElement('div');
    div.textContent = monster.name;
    container.appendChild(div);
  })
}

createFilterBox(filterOptions, filterChoice, displayMonsters);
displayMonsters();