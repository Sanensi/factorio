#!/usr/bin/env node

import recipes from "../../data/recipes.json";
import { ItemName, itemName } from "../domain/Recipe";
import { ReportUseCase } from "../use-cases/ReportUseCase";
const [q = ""] = process.argv.slice(2);

const search_result = recipes.filter((recipe) => recipe.name.includes(q));
const exact_search = search_result.filter((recipe) => recipe.name === q);

if (search_result.length === 1) {
  displayInputOutputReport(itemName(search_result[0].name));
} else if (exact_search.length === 1) {
  displayInputOutputReport(itemName(exact_search[0].name));
} else {
  console.log(search_result.map((result) => result.name).sort());
}

function displayInputOutputReport(recipeName: ItemName) {
  const report = new ReportUseCase().getReportFor(recipeName);

  const display = {
    ...report,
    inputs: report.inputs.map(([name, unitPerSecond]) => [
      name,
      unitPerSecond.numerator / unitPerSecond.denominator,
    ]),
    outputs: report.outputs.map(([name, unitPerSecond]) => [
      name,
      unitPerSecond.numerator / unitPerSecond.denominator,
    ]),
  };

  console.log(display);
}
