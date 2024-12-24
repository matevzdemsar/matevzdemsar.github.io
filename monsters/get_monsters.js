import { writeFileSync } from 'fs';
import { changeInObject, yes_no } from '../motherfunctions.js';

(async () => {
    const monsterList = (await (await fetch('https://www.dnd5eapi.co/api/monsters')).json()).results;
    console.log("Monster list downloaded successfully.");
    const monsters = await Promise.all(monsterList.map(async (s) => await (await fetch('https://www.dnd5eapi.co' + s.url)).json()));
    console.log("Monster data downloaded successfully.");

    const monstersForFilter = monsters
            .map((m) => (
                {...m,
                caster: yes_no(m.special_abilities?.some(obj =>
                    obj.name.includes("Spellcasting")))
                }))
            .map((m) => (
                {...m,
                legendary_resistances: yes_no(m.special_abilities?.some((obj) =>
                    (obj.name === "Legendary Resistance")))
                }))
                .map((m) => changeInObject(m, "legendary_actions", (arr) => yes_no(arr.length)))
        
        // go over the special features and return the things the filter needs.
        // Check if they have "Spellcasting" in their special_abilities list.
        // The structure of the monster object is as follows: {"special_abilities: [{"name": "Spellcasting", "spells": object[]} {"name": "legendary_actions" ...}]"}
        // Make sure the filter can access all necessary information about the monster.
        //
        // What the filter needs from special abilities:
        // caster: "Y"|"N"
        // spells: string[]
        // legendary_resistances: "Y"|"N"

    writeFileSync('monsters.json', JSON.stringify(monstersForFilter, null, 2));
    writeFileSync('monsters_original.json', JSON.stringify(monsters, null, 2));
}) ();