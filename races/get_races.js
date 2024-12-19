import { writeFileSync } from 'fs';

(async () => {
    const raceList = (await (await fetch('https://www.dnd5eapi.co/api/races')).json()).results;
    console.log("Race list downloaded successfully.");
    const races = await Promise.all(raceList.map(async (s) => await (await fetch('https://www.dnd5eapi.co' + s.url)).json()));
    console.log("Race data downloaded successfully.");
    writeFileSync('races.json', JSON.stringify(races, null, 2));
}) ();