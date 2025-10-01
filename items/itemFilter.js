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
        const priceConversion = {"cp": 0.01, "sp": 0.1, "gp": 1, "pp": 10,
            "copper": 0.01, "silver": 0.1, "gold": 1, "platinum": 10};
        const weightConversion = {"oz": 0.0625, "ounces": 0.0625, "lb": 1, "pounds": 1};
        return items
            .filter((i) => i.name.toLowerCase().includes(name.toLowerCase()))
            .filter((i) => (!type.length || type.map((t) => (t.toLowerCase())).includes(i.type.toLowerCase())))
            .filter((i) => (!rarity.length || rarity.map((r) => (r.toLowerCase())).includes(i.rarity.toLowerCase())))
            .filter((i) => operatorChoice(i.value * priceConversion[i.valueCoin], Number(price.price.value), price.price.operation))
            .filter((i) => operatorChoice(i.weight * weightConversion[i.weightUnit.toLowerCase()],
            Number(weight.weight.value, weight.weight.operation)));
            // .filter((!ammunition || (i.ammunition === ammunition)))
            // .filter((!magic || (i.magic === magic)))
}
