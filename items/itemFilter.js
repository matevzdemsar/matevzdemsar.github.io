import { operatorChoice } from "../motherfunctions.js";

/**
 *
 * @param {item[]} items list of all items
 * @param {string} name
 * @param {string[]} type 
 * @param {string[]} rarity 
 * @param {'Y'|'N'} ammunition
 * @param {'Y'|'N'} magic
 * @param {{value: number, operation: '>='|'==='|'<='}} price 
 * @param {{value: number, operation: '>='|'==='|'<='}} weight 
 * @returns {item[]}
 * 
 */


export function itemFilter (
    items,
    {name = "",
    type = false,
    rarity = false,
    ammunition = false,
    magic = false,
    price = {value: 0, operation: ''},
    weight = {value: 0, operation: ''}} = {}) {
        return items
            .filter((i) => i.index.includes(name.toLowerCase().replace("-", " "))
            && (!type.length || type.includes(i.equipment_category.name))
            && (!rarity.length || rarity.includes(i.rarity))
            && (!ammunition || (i.ammunition === ammunition))
            && (!magic || (i.magic === magic))
            && (operatorChoice(i.weight, weight.value, weight.operation))
            && (operatorChoice(i.price, price.value, price.operation)));
}
