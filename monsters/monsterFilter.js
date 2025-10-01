import { operatorChoice } from "../motherfunctions.js"

/**
 * 
 * @param {monster[]} monsters 
 * @param {string} name 
 * @param {string} type 
 * @param {int[]} cr 
 * @param {{value: int, operation: ">=", "===", "<="}} ac 
 * @param {{value: int, operation: ">=", "===", "<="}} hp 
 * @param {{
 *      walking: {value: number, operation: ">=", "===", "<="},
 *      swimming: {value: number, operation: ">=", "===", "<="},
 *      flying: {value: number, operation: ">=", "===", "<="},
 *      climbing: {value: number, operation: ">=", "===", "<="},
 *      burrowing: {value: number, operation: ">=", "===", "<="}
 * }} speed - All the speeds must be given, even if they are 0.
 * @param {string[]} vulnerable
 * @param {string[]} resist 
 * @param {string[]} immune 
 * @param {string[]} cond_immune 
 * @param {"Y"|"N"} caster 
 * @param {"Y"|"N"} legendary_actions
 * @param {"Y"|"N"} legendary_resistances
 * @param {{value: number, operation: ">=", "===", "<="}} str 
 * @param {{value: number, operation: ">=", "===", "<="}} dex 
 * @param {{value: number, operation: ">=", "===", "<="}} con 
 * @param {{value: number, operation: ">=", "===", "<="}} int 
 * @param {{value: number, operation: ">=", "===", "<="}} wis 
 * @param {{value: number, operation: ">=", "===", "<="}} cha
 * @returns {monster[]}
 */
const monster_speed = {walk: "speed", swim: "swimSpeed", fly: "flySpeed", climb: "climbSpeed", burrow: "burrowSpeed"}
const hit_dice = {"D1": 1, "D4": 2.5, "D6": 3.5, "D8": 4.5, "D10": 5.5, "D12": 6.5, "D20": 10.5}
export function monsterFilter (
  monsters,
  {name = false,
  type = false,
  challenge_rating = false,
  armor_class = false,
  hit_points = {value: 0, operation: ">="},
  speed = {walk: {value: 0, operation: ">="},
      swim: {value: 0, operation: ">="},
      fly: {value: 0, operation: ">="},
      climb: {value: 0, operation: ">="},
      burrow: {value: 0, operation: ">="}},
  damage_vulnerabilities = [],
  damage_resistances = [],
  damage_immunities = [],
  condition_immunities = [],
  caster = false,
  spells = false,
  legendary_resistances = false,
  legendary_actions = false,
  ability_scores = {strength: {value: 0, operation: ">="},
      dexterity: {value: 0, operation: ">="},
      constitution: {value: 0, operation: ">="},
      intelligence: {value: 0, operation: ">="},
      wisdom: {value: 0, operation: ">="},
      charisma: {value: 0, operation: ">="}}
} = {}) {
return monsters
    .filter((m) => (!name || m.name.toLowerCase().includes(name.toLowerCase())))
    .filter((m) => (!type.length || type.includes(m.type)))
    .filter((m) => (!challenge_rating.length || challenge_rating.includes(m.cr)))
    .filter((m) => (operatorChoice(m.ac, Number(armor_class.armor_class.value),
      armor_class.armor_class.operation)))
    .filter((m) => (operatorChoice(m.hitPoints.average, Number(hit_points.hit_points.value),
      hit_points.hit_points.operation)))
    // .filter((m) => (Object.keys(speed).every((key) => {
    //   let m_speed = 0;
    //   if (Object.keys(m).includes(monster_speed[key])) {m_speed = m[monster_speed[key]]};
    //   return operatorChoice(m_speed, Number(speed[key].value), speed[key].operation);
    //   })))
    .filter((m) => (!damage_vulnerabilities || damage_vulnerabilities.every((v) =>
     !!m.vulnerabilities && m.vulnerabilities.includes(v.toLowerCase()))))
    .filter((m) => (!damage_resistances || damage_resistances.every((r) =>
      !!m.resistances && m.resistances.includes(r.toLowerCase()))))
    .filter((m) => (!damage_immunities || damage_immunities.every((i) =>
      !!m.immunities && m.immunities.includes(i.toLowerCase()))))
    .filter((m) => (!condition_immunities || condition_immunities.every((c) =>
      m.condition_immunities && m.condition_immunities.includes(c.toLowerCase()))))
    .filter((m) => (!caster || (caster === 'Y') ===
      (!!m.abilities?.some(({name}) => name.includes('Spellcasting')))))
    .filter((m) => (!legendary_actions || (m.legendary_actions.list?.length ? 'Y' : 'N' === legendary_actions)))
    .filter((m) => (!legendary_resistances || (legendary_resistances === 'Y') ===
      (!!m.abilities?.some(({name}) => name.includes('Legendary Resistance')))))
    // .filter((m) => (Object.keys(ability_scores).every((key) =>
    //    operatorChoice(m[key], Number(ability_scores[key].value),
    //     ability_scores[key].operation))));
}
