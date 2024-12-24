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

// Add a filter for legendary actions


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
      burrow: {value: 0, operation: ">="}} = {},
  damage_vulnerabilities = [],
  damage_resistances = [],
  damage_immunities = [],
  condition_immunities = [],
  caster = false,
  spells = false,
  legendary_actions = false,
  ability_scores = {str: {value: 0, operation: ">="},
      dex: {value: 0, operation: ">="},
      con: {value: 0, operation: ">="},
      int: {value: 0, operation: ">="},
      wis: {value: 0, operation: ">="},
      cha: {value: 0, operation: ">="}} = {}
} = {}) {
return monsters
    .filter((m) => !name || m.index.includes(name.toLowerCase().replace("-", " ")))
    && !type || (m.type === type)
    && (!challenge_rating || challenge_rating.includes(m.challenge_rating))
    && (!armor_class || operatorChoice(m.armor_class, armor_class.value, armor_class.operation))
    && (!hit_points || operatorChoice(m.hit_points, hit_points.value, hit_points.operation))
    && (Object.keys(speed).every((key) =>
      operatorChoice(m.speed[key].value, speed[key].value, speed[key].operation)))
    && (!damage_vulnerabilities || damage_vulnerabilities.every((v) =>
      m.damage_vulnerabilities.includes(v)))
    && (!damage_resistances || damage_resistances.every((r) =>
      m.damage_resistances.includes(r)))
    && (!damage_immunities || damage_immunities.every((i) =>
      m.damage_immunities.includes(i)))
    && (!condition_immunities || condition_immunities.every((c) =>
      m.condition_immunities.includes(c)))
    && (!caster || (m.caster === caster))
    && (!legendary_actions || (m.legendary_actions === legendary_actions))
    && (!legendary_resistances || (m.legendary_resistances === legendary_resistances))
    && (Object.keys(ability_scores).every((key) =>
      operatorChoice(m.ability_scores[key].value, ability_scores[key].value,
        ability_scores[key].operation)));
}
