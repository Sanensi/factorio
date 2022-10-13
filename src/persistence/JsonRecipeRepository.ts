import JSONRecipes from "../../data/recipes.json";

import { Recipe, ItemName, RecipeRepository } from "../domain/Recipe";
import { DefaultValues, RecipeAssembler } from "./RecipeAssembler";

const defaultValues: DefaultValues = {
  category: "crafting",
  craftingTime: 0.5,
  resultCount: 1,
};

export class JSONRecipeRepository implements RecipeRepository {
  private readonly recipes = new Map<ItemName, Recipe>();
  private readonly assembler = new RecipeAssembler(defaultValues);

  constructor(recipes = JSONRecipes) {
    recipes.forEach((jsonRecipe) => {
      const recipe = this.assembler.toRecipe(jsonRecipe);
      this.recipes.set(recipe.name, recipe);
    });
  }

  get(name: ItemName): Readonly<Recipe> {
    const recipe = this.recipes.get(name);

    if (recipe === undefined)
      throw new Error(`No recipe named "${name}" found`);

    return recipe;
  }
}
