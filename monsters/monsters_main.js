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

// ToDo: do another map to delete all the monsters that are immune to fatigue.

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
  {title: 'Legendary resistances:', index: 'legendary_resistances', type: 'radio',
    options: ['Y', 'N']},
  {title: 'Legendary actions:', index: 'legendary_actions', type: 'radio',
    options: ['Y', 'N']},
  {title: 'Armor class:', index: 'armor_class', type: 'operator',
    options: [{category: 'armor_class', c_name: ''}]},
  {title: 'Hit points:', index: 'hit_points', type: 'operator',
    options: [{category: 'hit_points', c_name: ''}]},
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

const modifiers = ["-5", "-4", "-3", "-2", "-1", "0", "+1", "+2", "+3", "+4",
  "+5", "+6", "+7", "+8", "+9", "+10"]

function displayMonsters() {
  container.innerHTML = '';

  const popup = document.getElementById('monster_popup');
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape')
      hidePopup(popup);
  });

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
    <hr>
    <div class="ability_scores">
      <div class="score"> STR <br> ${monster.strength} (${modifiers[Math.floor(monster.strength / 2)]}) </div>
      <div class="score"> DEX <br> ${monster.dexterity} (${modifiers[Math.floor(monster.dexterity / 2)]}) </div>
      <div class="score"> CON <br> ${monster.constitution} (${modifiers[Math.floor(monster.constitution / 2)]}) </div>
      <div class="score"> INT <br> ${monster.intelligence} (${modifiers[Math.floor(monster.intelligence / 2)]}) </div>
      <div class="score"> WIS <br> ${monster.wisdom} (${modifiers[Math.floor(monster.wisdom / 2)]}) </div>
      <div class="score"> CHA <br> ${monster.charisma} (${modifiers[Math.floor(monster.charisma / 2)]}) </div>
    </div>
    <hr>
    <div class="other_info">
      ${!(!!monster.strength_save || !!monster.dexterity_save || !!monster.constitution_save
        || !!monster.intelligence_save || !!monster.wisdom_save || !!monster.charisma_save) ? ""
        : `<div class="other_data"><b>Saving throws:</b>
         ${!!monster.strength_save ? `<br><span class=space></span> Strength +${monster.strength_save}` : ""}
         ${!!monster.dexterity_save ? `<br><span class=space></span> Dexterity +${monster.dexterity_save}` : ""}
         ${!!monster.constitution_save ? `<br><span class=space></span> Constitution +${monster.constitution_save}` : ""}
         ${!!monster.intelligence_save ? `<br><span class=space></span> Intellligence +${monster.intelligence_save}` : ""}
         ${!!monster.wisdom_save ? `<br><span class=space></span> Wisdom +${monster.wisdom_save}` : ""}
         ${!!monster.charisma_save ? `<br><span class=space></span> Charisma +${monster.charisma_save}` : ""}
        </div>`}
      ${!Object.keys(monster.skills).length ? ""
        : `<div class="other_data"> <b>Skills:</b> ${Object.keys(monster.skills).map((s) => ` ${s} +${monster.skills[s]}`)}</div>`}
      ${monster.damage_vulnerabilities === "" ? ""
        : `<div class="other_data"> <b>Damage Vulnerabilities:</b> ${monster.damage_vulnerabilities}</div>`}
      ${monster.damage_resistances === "" ? ""
        : `<div class="other_data"> <b>Damage Resistances:</b> ${monster.damage_resistances}</div>`}
      ${monster.damage_immunities === "" ? ""
        : `<div class="other_data"> <b>Damage Immunities:</b> ${monster.damage_immunities}</div>`}
      ${monster.condition_immunities === "" ? ""
        : `<div class="other_data"> <b>Condition Immunities:</b> ${monster.condition_immunities}</div>`}
      ${monster.condition_immunities === "" ? ""
        : `<div class="other_data"> <b>Condition Immunities:</b> ${monster.condition_immunities}</div>`}
      <div class="other_data"><b>Senses:</b> ${monster.senses}</div>
      ${monster.langauges === "" ? ""
        : `<div class="other_data"> <b>Languages:</b> ${monster.languages}</div>`}
      <div class="other_data"><b>Challenge Rating:</b> ${monster.challenge_rating}</div>
    </div>
    <hr>
    <button id="close-popup">Close</button>`;
    const closeButton = document.getElementById('close-popup');
    closeButton.addEventListener('click', () => hidePopup(popup));
})
container.appendChild(div);
})
}

createFilterBox(filterOptions, filterChoice, displayMonsters);
displayMonsters();
