/**
 * 
 * @param {spell[]} spells 
 * @param {string} name 
 * @param {string[]} pclass 
 * @param {int[]} level 
 * @param {('V'|'S'|'M')[]} components
 * @param {('1 action'|'1 bonus action'|'1 reaction'|'1 minute'|'10 minutes'|
 * '1 hour'|'8 hours'|'12 hours'|'24 hours')[]} cast_time 
 * @param {('Self'|'Touch'|'5 feet'|'15 feet'|'30 feet'|'60 feet'|
 * '90 feet'|'100 feet'|'120 feet'|'150 feet'|'300 feet'|'500 feet'
 * |'Sight'|'1 mile'|'500 miles'|'Unlimited'|'Special'|'10 feet'|'1000 feet')[]} range 10 feet and 1000 feet are missing in spells.json.
 * @param {string[]} duration an array of strings, a spell's duration value must be in this array
 * @param {'Y'|'N'} concentration
 * @param {'Y'|'N'} ritual
 * @returns {spell[]}
 */


export function spellFilter (
    spells,
    { name = '',
    pclass = false, 
    level = false,
    components = ['V', 'S', 'M'],
    casting_time = false,
    range = false,
    duration = false,
    concentration = false,
    ritual = false } = {}) {
        return spells.filter((s) =>
            s.index.replace("-", " ").includes(name.toLowerCase())
            &&  (!pclass.length || pclass.some((pc) => s.classes.map((c) => c.name).includes(pc))) // To ni v redu, ker so classi ključi v objectu.
            && (!level.length || level.includes(s.level))
            && (!components || s.components.every((c) => components.includes(c)))
            && (!casting_time.length || casting_time.includes(s.casting_time))
            && (!range.length || range.includes(s.range))
            && (!duration.length || duration.includes(s.duration))
            && (!concentration || (s.concentration === concentration))
            && (!ritual || (s.ritual === ritual))
                );
}

    // Add the option Saving throw / Attack roll / None to the spell filter?
    // Filtering damage type might also be useful.