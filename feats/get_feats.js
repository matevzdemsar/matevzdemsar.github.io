import { writeFileSync } from 'fs';

(async () => {
    const featList = (await (await fetch('https://www.dnd5eapi.co/api/feats')).json()).results;
    console.log("Feat list downloaded successfully.");
    const feats = await Promise.all(featList.map(async (s) => await (await fetch('https://www.dnd5eapi.co' + s.url)).json()));
    console.log("Feat data downloaded successfully.");
    writeFileSync('feats.json', JSON.stringify(feats, null, 2));
}) ();
