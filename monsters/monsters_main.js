import { monsterFilter } from "./monsterFilter.js";
import { createFilterBox, showPopup, hidePopup } from "../motherfunctions.js";

const fromAPI = await fetch('./monsters.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    };
    return response.json();
  });

const monsters = fromAPI.map((m) => {
  let walk = 0;
  let swim = 0;
  let fly = 0;
  let climb = 0;
  let burrow = 0;
  m.speed.split(", ").forEach((str) => {
      let num = "";
      str.split("").forEach((char) => {
          if ("1234567890".includes(char)) {
              num += char
          };
      });
      if (str.includes("swim")) {swim = Number(num)} else
      if (str.includes("fly")) {fly = Number(num)} else
      if (str.includes("climb")) {climb = Number(num)} else
      if (str.includes("burrow")) {burrow = Number(num)} else
      {walk = Number(num)}
  });
  return {
  ...m,
  speed: {
      "walk": walk,
      "swim": swim,
      "fly": fly,
      "climb": climb,
      "burrow": burrow
  }
}}).map((m) => ({
    ...m,
    ac: Number(m.armorClass.split(" ")[0])
})).map((m) => ({
  ...m,
  alignment: m.alignment.replaceAll("_", " ").toLowerCase()
}));

const types = new Set()
monsters.forEach((m) => {
  types.add(m.race)
});
console.log(types)

const filterChoice = {};

const filterOptions = [
  {title: 'Name:', index: 'name', type: 'search'},
  {title: 'Type:', index: 'type', type: 'checkbox',
    options: ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon',
    'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity',
    'Ooze', 'Plant', 'Swarm', 'Titan', 'Undead']},
  {title: 'Challenge rating:', index: 'challenge_rating', type: 'checkbox',
    options: ['0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
    '22', '23', '24', '25', '26', '27', '28', '29', '30']},
  {title: 'Vulnerabilities:', index: 'damage_vulnerabilities', type: 'checkbox',
    options: ['Bludgeoning', 'Piercing', 'Slashing', 'Fire', 'Cold', 'Lightning',
      'Thunder', 'Acid', 'Poison', 'Necrotic', 'Radiant', 'Psychic', 'Force']},
  {title: 'Resistances:', index: 'damage_resistances', type: 'checkbox',
    options: ['Bludgeoning', 'Piercing', 'Slashing', 'Fire', 'Cold', 'Lightning',
      'Thunder', 'Acid', 'Poison', 'Necrotic', 'Radiant', 'Psychic', 'Force']},
  {title: 'Immunities:', index: 'damage_immunities', type: 'checkbox',
    options: ['Bludgeoning', 'Piercing', 'Slashing', 'Fire', 'Cold', 'Lightning',
      'Thunder', 'Acid', 'Poison', 'Necrotic', 'Radiant', 'Psychic', 'Force']},
  {title: 'Conditional immunities:', index: 'condition_immunities', type: 'checkbox',
    options: ['Blinded', 'Charmed', 'Deafened', 'Exhaustion', 'Frightened',
      'Grappled', 'Incapacitated', 'Paralyzed', 'Petrified', 'Poisoned',
      'Prone', 'Restrained', 'Stunned']},
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
   <i>${monster.size} CR: ${monster.challengeRating.split(" ")[0]}<i>`;

  
  div.addEventListener('click', () => {
    showPopup(popup);
    popup.innerHTML =
    `<div class="monster_header">
      <h3>${monster.name}</h3>
      <span>${monster.size},
      ${monster.alignment ? monster.alignment : 'unaligned'}</span>
    </div>
    <div class="basic_info">
      <div class="image_container">
        <img src=../assets/shield.jpg alt="Shield" width=37.5px>
        <div class="basic_data"> ${monster.ac} </div>
      </div>
      <div class="image_container">
        <img src=../assets/heart.jpg alt="Heart" width=51px class="gray">
        <div class="basic_data"> ${monster.hitPoints.average} </div>
      </div>
      <div class="image_container">
        <img src=../assets/d20.jpg alt="d20" width=43.5px class="gray">
        <div class="basic_data"> ${monster.challengeRating.split(" ")[0]} </div>
      </div>
    </div>
    <hr>
    <div class="ability_scores">
      <div class="score"> STR <br> ${monster.abilityScores.STR.score} (${monster.abilityScores.STR.mod}) </div>
      <div class="score"> DEX <br> ${monster.abilityScores.DEX.score} (${monster.abilityScores.DEX.mod}) </div>
      <div class="score"> CON <br> ${monster.abilityScores.CON.score} (${monster.abilityScores.CON.mod}) </div>
      <div class="score"> INT <br> ${monster.abilityScores.INT.score} (${monster.abilityScores.INT.mod}) </div>
      <div class="score"> WIS <br> ${monster.abilityScores.WIS.score} (${monster.abilityScores.WIS.mod}) </div>
      <div class="score"> CHA <br> ${monster.abilityScores.CHA.score} (${monster.abilityScores.CHA.mod}) </div>
    </div>
    <hr>
    <div class="other_info">
      ${!(monster.savingThrows.length) ? ""
        : `<div class="other_data"><b>Saving throws:</b>
      ${monster.savingThrows.join(", ")} </div>`}
      ${!monster.skills.length ? ""
        : `<div class="other_data"> <b>Skills:</b> ${monster.skills.join(", ")}</div>`}
      ${!(monster.vulnerabilities.length) ? ""
        : `<div class="other_data"> <b>Damage Vulnerabilities:</b> ${monster.vulnerabilities.join(", ")}</div>`}
      ${!(monster.resistances.length) ? ""
        : `<div class="other_data"> <b>Damage Resistances:</b> ${monster.resistances.join(", ")}</div>`}
      ${!(monster.immunities.length) ? ""
        : `<div class="other_data"> <b>Damage Immunities:</b> ${monster.immunities.join(", ")}</div>`}
      ${!(monster.condition_immunities.length) ? ""
        : `<div class="other_data"> <b>Condition Immunities:</b> ${monster.condition_immunities.join(", ")}</div>`}
      ${!(monster.senses) ? ""
        : `<div class="other_data"> <b>Senses:</b> ${monster.senses}</div>`}
      ${!(monster.languages.length) ? ""
        : `<div class="other_data"> <b>Languages:</b> ${monster.languages.join(", ")}</div>`}
      <div class="other_data"><b>Challenge Rating:</b> ${monster.challengeRating}</div>
    </div>
    <hr>
    ${!monster.abilities ? "" : `
      <div class=special_abilities>
      <b>Special abilities:</b><br> ${monster.abilities?.map((sa) =>
        `<div class="ability"><b><i>${sa.name}${!sa.recharge ? "" : " " + sa.recharge}</i></b> ${sa.description.replaceAll('\n', `<br>`)}</div>`).join("")}
      </div><hr>
    `}
    ${!monster.actions && !monster.bonus_actions && !monster.reactions ? "" : `
    <div class="regular_actions">
      ${!monster.actions ? ""
        : `<b>Actions:</b><br> ${monster.actions?.map((a) =>
          `<div class="action"> ${a}</div>`).join("")}`}
    </div><hr>
    `}
    ${!monster.legendary_actions.number ? "" : `
    <div class="legendary_actions">
    <b>Legendary actions: </b> The ${monster.name} can take up to ${monster.legendary_actions.number}
    legendary actions, choosing from the list below: <br>
    ${monster.legendary_actions.list.map((la) =>
      `<div class="legendary_action">${la}</div>`).join("")}
    </div><hr>
    `}
    
    
    <button id="close-popup">Close</button>`;
    const closeButton = document.getElementById('close-popup');
    closeButton.addEventListener('click', () => hidePopup(popup));
});
container.appendChild(div);
});
};

createFilterBox(filterOptions, filterChoice, displayMonsters);
displayMonsters();
