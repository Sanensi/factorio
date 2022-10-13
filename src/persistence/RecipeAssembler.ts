import assert from "assert";
import {
  Recipe,
  itemName,
  Category,
  Second,
  second,
  Ingredient,
  quantity,
  Quantity,
} from "../domain/Recipe";
import JSONRecipes from "../../data/recipes.json";

export type JSONRecipe = typeof JSONRecipes[number];

type ExtractNormalIngredients<R extends JSONRecipe> = R extends {
  normal: { ingredients: infer I };
}
  ? I
  : R["ingredients"];

type JSONIngredient = ExtractNormalIngredients<JSONRecipe>[number];

export type DefaultValues = {
  category: Category;
  craftingTime: number;
  resultCount: number;
};

export class RecipeAssembler {
  constructor(private readonly defaults: DefaultValues) {}

  public toRecipe(recipe: JSONRecipe): Recipe {
    return {
      name: itemName(recipe.name),
      category: this.toCategory(recipe.category),
      craftingTime: this.toCraftingTime(recipe),
      ingredients: this.toIngredients(recipe),
      resultCount: this.toResultCount(recipe),
    };
  }

  private toCategory(category?: string): Category {
    assert(
      category === "crafting" ||
        category === "advanced-crafting" ||
        category === "crafting-with-fluid" ||
        category === "smelting" ||
        category === "oil-processing" ||
        category === "chemistry" ||
        category === "rocket-building" ||
        category === "centrifuging" ||
        category === undefined,
      `AssertionError: ${category} is not a valid recipe category`
    );

    return category ?? this.defaults.category;
  }

  private toCraftingTime(recipe: JSONRecipe): Second {
    return second(
      recipe.energy_required ??
        recipe.normal?.energy_required ??
        this.defaults.craftingTime
    );
  }

  private toIngredients(recipe: JSONRecipe): Ingredient[] {
    return (recipe.ingredients ?? recipe.normal.ingredients).map(
      this.toIngredient
    );
  }

  private toIngredient(ingredient: JSONIngredient): Ingredient {
    if (Array.isArray(ingredient)) {
      assert(
        typeof ingredient[0] === "string" && typeof ingredient[1] === "number"
      );

      return [itemName(ingredient[0]), quantity(ingredient[1])];
    } else {
      return [itemName(ingredient.name), quantity(ingredient.amount)];
    }
  }

  private toResultCount(recipe: JSONRecipe): Quantity {
    return quantity(
      recipe.result_count ??
        recipe.normal?.result_count ??
        this.defaults.resultCount
    );
  }
}
