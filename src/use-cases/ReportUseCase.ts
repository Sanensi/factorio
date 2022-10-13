import { ItemName } from "../domain/Recipe";
import { InputOutputReport, unitPerSecond } from "../domain/InputOutputReport";
import { JSONRecipeRepository } from "../persistence/JSONRecipeRepository";
import { getDefaultProducerFor, StoneFurnace } from "../domain/Producer";

export class ReportUseCase {
  private readonly recipeRepository = new JSONRecipeRepository();

  getReportFor(recipeName: ItemName): InputOutputReport {
    const recipe = this.recipeRepository.get(recipeName);
    const producer = getDefaultProducerFor(recipe.category);

    return {
      for: recipeName,
      with: producer,
      inputs: recipe.ingredients.map(([name, quantity]) => [
        name,
        unitPerSecond(quantity, recipe.craftingTime / producer.craftingSpeed),
      ]),
      outputs: [
        [
          recipeName,
          unitPerSecond(
            recipe.resultCount,
            recipe.craftingTime / producer.craftingSpeed
          ),
        ],
      ],
    };
  }
}
