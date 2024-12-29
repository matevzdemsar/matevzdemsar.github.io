import { writeFileSync } from 'fs';

function convertToGP(unit) {
    switch (unit) {
        case 'cp':
            return 0.01;
        case 'sp':
            return 0.1;
        case 'ep':
            return 0.5;
        case 'gp':
            return 1;
        case 'pp':
            return 10;
    }
}

(async () => {
    const itemList = (await (await fetch('https://www.dnd5eapi.co/api/equipment')).json()).results;
    console.log("Item list downloaded successfully.");
    const items = await Promise.all(itemList.map(async (i) => await (await fetch('https://www.dnd5eapi.co' + i.url)).json()));
    console.log("Item data downloaded successfully.");

    const itemsForFilter = items.map((i) => {
        const { quantity, unit } = i.cost;
        i.cost = quantity * convertToGP(unit);
        return i;
    })
    writeFileSync('items.json', JSON.stringify(itemsForFilter, null, 2));
}) ();
