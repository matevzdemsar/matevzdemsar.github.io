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
const utilitySet = new Set();

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
    .filter((m) => (!name || m.name.toLowerCase().includes(name.toLowerCase()))
    && (!type.length || type.includes(m.type))
    && (!challenge_rating.length || challenge_rating.includes(m.challenge_rating))
    && (operatorChoice(m.armor_class.value, Number(armor_class.armor_class.value),
        armor_class.armor_class.operation))
    && (operatorChoice(m.hit_points, Number(hit_points.hit_points.value),
        hit_points.hit_points.operation))
    && (Object.keys(speed).every((key) => {
        if (!Object.keys(m.speed).includes(key)) {m.speed[key] = 0};
      return operatorChoice(Number(m.speed[key]), Number(speed[key].value), speed[key].operation);
      }))
    && (!damage_vulnerabilities.length || damage_vulnerabilities.every((v) =>
      m.damage_vulnerabilities.includes(v.toLowerCase())))
    && (!damage_resistances.length || damage_resistances.every((r) =>
      m.damage_resistances.includes(r.toLowerCase())))
    && (!damage_immunities.length || damage_immunities.every((i) =>
      m.damage_immunities.includes(i.toLowerCase())))
    && (!condition_immunities.length || condition_immunities.every((c) =>
        m.condition_immunities.includes(c.toLowerCase())))
    && (!caster || (caster === 'Y') ===
      (!!m.special_abilities?.some(({name}) => name.includes('Spellcasting'))))
    && (!legendary_actions || (m.legendary_actions.length ? 'Y' : 'N' === legendary_actions))
    && (!legendary_resistances || (legendary_resistances === 'Y') ===
      (!!m.special_abilities?.some(({name}) => name.includes('Legendary Resistance'))))
    && (Object.keys(ability_scores).every((key) =>
       operatorChoice(m[key], Number(ability_scores[key].value),
        ability_scores[key].operation))));
}
