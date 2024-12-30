import { writeFileSync } from 'fs';
import { changeInObject, yes_no } from '../motherfunctions.js';

(async () => {
    let page = 1;
    let results = [];
    let next = true;

    while (next) {
      try {
      const monsterJson = await fetch(`https://api.open5e.com/v1/monsters?limit=1&page=${page}`);
      const monsters = await monsterJson.json();
      results = results.concat(monsters.results);
      if (!(page % 100)) {console.log(`Page ${page}`)}
      if (monsters.next !== null) {
        page += 1
      } else {
        next = false
      }
    } catch (error) {
      console.log(`Page ${page} doesn't exist.`);
      page += 1;
    }
    }

    console.log("Monster list downloaded successfully.");
    const count = {}
    results.map(({document__title: title}) => {
      count[title] = (count[title] ?? 0) + 1; 
    })

    const monstersForFilter = results.filter((m) =>
        ['5e Core Rules', 'Level Up Advanced 5e Monstrous Menagerie'].includes(m.document__title))

    console.log(count);
    writeFileSync('monsters.json', JSON.stringify(monstersForFilter, null, 2));
    // writeFileSync('monsters_original.json', JSON.stringify(monsters, null, 2));
}) ();
