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
    price = {price: {value: 0, operation: ''}},
    weight = {weight: {value: 0, operation: ''}}} = {}) {
        return items
            .filter((i) => i.index.includes(name.toLowerCase().replace("-", " "))
            && (!type.length || type.includes(i.equipment_category.name))
            && (!rarity.length || rarity.includes(i.rarity))
            && (!ammunition || (i.ammunition === ammunition))
            && (!magic || (i.magic === magic))
            && (operatorChoice(i.weight, Number(weight.weight.value), weight.weight.operation))
            && (operatorChoice(i.cost, Number(price.price.value), price.price.operation)));
}
