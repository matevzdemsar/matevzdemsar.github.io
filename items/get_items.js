import { writeFileSync } from 'fs';

(async () => {
    const itemList = (await (await fetch('https://www.dnd5eapi.co/api/equipment')).json()).results;
    console.log("Item list downloaded successfully.");
    const items = await Promise.all(itemList.map(async (i) => await (await fetch('https://www.dnd5eapi.co' + i.url)).json()));
    console.log("Item data downloaded successfully.");

    const itemsForFilter = items.map((i) => {
        const { quantity, unit } = i.cost;
        return 
    })
    writeFileSync('items.json', JSON.stringify(itemsForFilter, null, 2));
}) ();