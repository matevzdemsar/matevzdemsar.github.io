import { monsterFilter } from "./monsterFilter.js";
import { createFilterBox } from "../motherfunctions.js";

const monsters = await fetch('./monsters.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load JSON:', response.statusText);
    }
    return response.json()
  });
