import { RecipeName } from "../domain/Recipe";
import { InputOutputReport, unitPerSecond } from "../domain/InputOutputReport";
import { JSONRecipeRepository } from "../persistence/JSONRecipeRepository";

export class ReportUseCase {
  private readonly recipeRepository = new JSONRecipeRepository();

  getReportFor(recipeName: RecipeName): InputOutputReport {
    const recipe = this.recipeRepository.get(recipeName);

    return {
      for: recipeName,
      with: undefined,
      inputs: recipe.ingredients.map(([name, quantity]) => [
        name,
        unitPerSecond(quantity, recipe.craftingTime),
      ]),
      outputs: [],
    };
  }
}
