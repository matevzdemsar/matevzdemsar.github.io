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
    // console.log(legendary_actions);
    // console.log(legendary_resistances);
    // console.log(speed);
return monsters
    .filter((m) => (!name || m.index.includes(name.toLowerCase().replace("-", " ")))
    && (!type.length || type.includes(m.type))
    && (!challenge_rating.length || challenge_rating.map((cr) => eval(cr)).includes(m.challenge_rating))
    && (operatorChoice(m.armor_class[0].value, Number(armor_class.armor_class.value),
        armor_class.armor_class.operation))
    && (operatorChoice(m.hit_points, Number(hit_points.hit_points.value),
        hit_points.hit_points.operation))
    && (Object.keys(speed).every((key) => {
        if (!Object.keys(m.speed).includes(key)) {m.speed[key] = "0 ft."};
      return operatorChoice(Number(m.speed[key].split(' ')[0]), Number(speed[key].value), speed[key].operation);
      }))
    && (!damage_vulnerabilities.length || damage_vulnerabilities.every((v) =>
      m.damage_vulnerabilities.join("").includes(v.toLowerCase())))
    && (!damage_resistances.length || damage_resistances.every((r) =>
      m.damage_resistances.join("").includes(r.toLowerCase())))
    && (!damage_immunities.length || damage_immunities.every((i) =>
      m.damage_immunities.join("").includes(i.toLowerCase())))
    && (!condition_immunities.length || condition_immunities.every((c) =>
        m.condition_immunities.map((obj) => obj.index).includes(c.toLowerCase()))) // Immunities are stored in object under the property "index" because of course they are.
    && (!caster || (m.caster === caster))
    && (!legendary_actions || (m.legendary_actions === legendary_actions))
    && (!legendary_resistances || (m.legendary_resistances === legendary_resistances))
    && (Object.keys(ability_scores).every((key) =>
       operatorChoice(m[key], Number(ability_scores[key].value),
        ability_scores[key].operation))));
}

// There used to be an error in get_monsters that set every monster's legendary_actions to 'Y'
// and every monster's legendary_resistances to 'N'. If there's a problem with these filters, that might be why.
//
// Speed doesn't work: number >= undefined always returns false, so all categories of speed must be set to 0.
// This is probably a job for createFilterBox