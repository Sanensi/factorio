#!/usr/bin/env node

import recipes from "../../data/recipes.json";
import { itemName } from "../domain/Recipe";
import { ReportUseCase } from "../use-cases/ReportUseCase";
const [q = ""] = process.argv.slice(2);

const search_result = recipes.filter((recipe) => recipe.name.includes(q));

if (search_result.length === 1) {
  const [recipe] = search_result;
  const report = new ReportUseCase().getReportFor(itemName(recipe.name));
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
} else {
  console.log(search_result.map((result) => result.name).sort());
}
