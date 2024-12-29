import { writeFileSync } from 'fs';
import { yes_no } from '../motherfunctions.js'; // To ne dela, moraš prav napisati pot.
import { changeInObject } from '../motherfunctions.js';

(async () => {
    const spellList = (await (await fetch('https://www.dnd5eapi.co/api/spells')).json()).results;
    console.log("Spell list downloaded successfully.");
    const spells = await Promise.all(spellList.map(async (s) => await (await fetch('https://www.dnd5eapi.co' + s.url)).json()));
    console.log("Spell data downloaded successfully.");

    const spellsForFilter = spells
        .map((s) => changeInObject(s, "concentration", yes_no))
        .map((s) => changeInObject(s, "ritual", yes_no))
        .sort((a, b) => {
            if(a.level !== b.level) {
                return a.level - b.level;
            }
            return a.name.localeCompare(b.name)
        });

    writeFileSync('spells.json', JSON.stringify(spellsForFilter, null, 2));
}) ();
