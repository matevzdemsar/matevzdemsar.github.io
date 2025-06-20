import { readFileSync, writeFileSync, readdirSync, read } from 'fs';

const folders = ['backgrounds', 'dndclasses', 'feats', 'items', 'monsters', 'races']
const data = {};

folders.forEach(folder => {
  data[folder] = {};
  readdirSync(folder).map((file) => {
    const item = readFileSync(`${folder}/${file}`, 'utf-8');
    data[folder][file.split('.')[0]] = JSON.parse(item);
  });
  writeFileSync(`${folder}.json`, JSON.stringify(data[folder], null, 2));
  console.log(`${folder}`, Object.keys(data[folder]).length)
});