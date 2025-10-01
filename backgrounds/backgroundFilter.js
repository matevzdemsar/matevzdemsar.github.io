import { operatorChoice } from "../motherfunctions.js";

export function backgroundFilter (
  backgrounds,
  {name = false,
  skills = [],
  gold = {value: 0, operation: ">="}
  } = {}) {
  return backgrounds
    .filter((b) => (!name || b.name.toLowerCase().includes(name.toLowerCase())))
    .filter((b) => (!skills.length || skills.every((s) => b.availableSkills.includes(s))))
    .filter((b) => operatorChoice(b.goldPieces, Number(gold.gold.value), gold.gold.operation));
};