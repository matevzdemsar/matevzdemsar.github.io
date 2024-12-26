
import { operatorChoice } from "../motherfunctions.js";

/**
 * 
 * @param {race[]} races 
 * @param {string} name 
 * @param {string[]} asi 
 * @param {{
 *          walking: {value: number, operation: ">=", "===", "<="},
 *          swimming: {value: number, operation: ">=", "===", "<="},
 *          flying: {value: number, operation: ">=", "===", "<="},
 *          climbing: {value: number, operation: ">=", "===", "<="},
 *          burrowing: {value: number, operation: ">=", "===", "<="}
 * }} speed - All the speeds must be given, even if they are 0.
 * @returns {race[]}
 */

export function raceFilter (
    races,
    {name = false,
    asi = false,
    speed = {walk: {value: 0, operation: ">="},
            swim: {value: 0, operation: ">="},
            fly: {value: 0, operation: ">="},
            climb: {value: 0, operation: ">="},
            burrow: {value: 0, operation: ">="}}} = {}) {
    return races
        .filter((r) => !name || r.index.includes(name.toLowerCase().replace("-", " "))
        && (!asi || r.asi.includes(asi))
        && (Object.keys().every(
            key => operatorChoice(r.speed[key].value, speed[key].value, speed[key].operation))));
}