import { writeFileSync } from 'fs';
import { changeInObject, yes_no } from '../motherfunctions.js';

(async () => {
    let page = 1;
    let results = [];
    let next = true;

    while (next) {
      try {
      const spellsJson = await fetch(`https://api.open5e.com/spells?limit=1&page=${page}`);
      const spells = await spellsJson.json();
      results = results.concat(spells.results);
      if (!(page % 100)) {console.log(`Page ${page}`)}
      if (spells.next !== null) {
        page += 1
      } else {
        next = false
      }
    } catch (error) {
      console.log(`Page ${page} doesn't exist.`);
      page += 1;
    }
    }

    console.log("Spell list downloaded successfully.");
    const count = {}
    results.map(({document__title: title}) => {
      count[title] = (count[title] ?? 0) + 1; 
    })

    const spellsForFilter = results.filter((m) =>
        ['5e Core Rules', 'Level Up Advanced 5e'].includes(m.document__title))

    console.log(count);
    writeFileSync('spells_new.json', JSON.stringify(spellsForFilter, null, 2));
    // writeFileSync('monsters_original.json', JSON.stringify(monsters, null, 2));
}) ();