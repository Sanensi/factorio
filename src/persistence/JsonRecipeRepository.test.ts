import { quantity, Recipe, recipeName, second } from "../domain/Recipe";
import { JSONRecipeRepository } from "./JSONRecipeRepository";
import { JSONRecipe } from "./RecipeAssembler";

describe("Default values", () => {
  test("The default category is crafting", () => {
    const minimalRecipe: JSONRecipe = {
      type: "recipe",
      name: "minimal-recipe",
      ingredients: [],
      result: "anything",
    };
    const repository = new JSONRecipeRepository([minimalRecipe]);

    const recipe = repository.get(recipeName(minimalRecipe.name));

    expect(recipe.category).toBe("crafting");
  });

  test("The default crafting time is 0.5", () => {
    const minimalRecipe: JSONRecipe = {
      type: "recipe",
      name: "minimal-recipe",
      ingredients: [],
      result: "anything",
    };
    const repository = new JSONRecipeRepository([minimalRecipe]);

    const recipe = repository.get(recipeName(minimalRecipe.name));

    expect(recipe.craftingTime).toBe(second(0.5));
  });

  test("The default result count is 1", () => {
    const minimalRecipe: JSONRecipe = {
      type: "recipe",
      name: "minimal-recipe",
      ingredients: [],
      result: "anything",
    };
    const repository = new JSONRecipeRepository([minimalRecipe]);

    const recipe = repository.get(recipeName(minimalRecipe.name));

    expect(recipe.resultCount).toBe(quantity(1));
  });
});

describe(`
  A basic recipe is one that has a name,
  a category,
  the energy required to execute it in seconds,
  a list of ingredients as input
  and the resulting item count as output`, () => {
  test("iron-plate", () => {
    const rawRecipe: JSONRecipe = {
      type: "recipe",
      name: "iron-plate",
      category: "smelting",
      energy_required: 3.2,
      ingredients: [["iron-ore", 1]],
      result: "iron-plate",
    };
    const repository = new JSONRecipeRepository([rawRecipe]);

    const recipe = repository.get(recipeName(rawRecipe.name));

    expect(recipe).toEqual({
      name: recipeName("iron-plate"),
      category: "smelting",
      craftingTime: second(3.2),
      ingredients: [[recipeName("iron-ore"), quantity(1)]],
      resultCount: quantity(1),
    } as Recipe);
  });

  test("automation-science-pack", () => {
    const rawRecipe: JSONRecipe = {
      type: "recipe",
      name: "automation-science-pack",
      energy_required: 5,
      ingredients: [
        ["copper-plate", 1],
        ["iron-gear-wheel", 1],
      ],
      result: "automation-science-pack",
    };
    const repository = new JSONRecipeRepository([rawRecipe]);

    const recipe = repository.get(recipeName(rawRecipe.name));

    expect(recipe).toEqual({
      name: recipeName("automation-science-pack"),
      category: "crafting",
      craftingTime: second(5),
      ingredients: [
        [recipeName("copper-plate"), quantity(1)],
        [recipeName("iron-gear-wheel"), quantity(1)],
      ],
      resultCount: quantity(1),
    } as Recipe);
  });

  test("automation-science-pack", () => {
    const rawRecipe: JSONRecipe = {
      type: "recipe",
      name: "transport-belt",
      ingredients: [
        ["iron-plate", 1],
        ["iron-gear-wheel", 1],
      ],
      result: "transport-belt",
      result_count: 2,
    };
    const repository = new JSONRecipeRepository([rawRecipe]);

    const recipe = repository.get(recipeName(rawRecipe.name));

    expect(recipe).toEqual({
      name: recipeName("transport-belt"),
      category: "crafting",
      craftingTime: second(0.5),
      ingredients: [
        [recipeName("iron-plate"), quantity(1)],
        [recipeName("iron-gear-wheel"), quantity(1)],
      ],
      resultCount: quantity(2),
    } as Recipe);
  });
});

describe(`
  Some recipes have different ingredient list and energy required for the normal and the expensive mode.
  In those case, it defaults to the normal recipe`, () => {
  test("electronic-circuit", () => {
    const rawRecipe: JSONRecipe = {
      type: "recipe",
      name: "electronic-circuit",
      normal: {
        ingredients: [
          ["iron-plate", 1],
          ["copper-cable", 3],
        ],
        result: "electronic-circuit",
      },
      expensive: {
        ingredients: [
          ["iron-plate", 2],
          ["copper-cable", 8],
        ],
        result: "electronic-circuit",
      },
    };
    const repository = new JSONRecipeRepository([rawRecipe]);

    const recipe = repository.get(recipeName(rawRecipe.name));

    expect(recipe).toEqual({
      name: recipeName("electronic-circuit"),
      category: "crafting",
      craftingTime: second(0.5),
      ingredients: [
        [recipeName("iron-plate"), quantity(1)],
        [recipeName("copper-cable"), quantity(3)],
      ],
      resultCount: quantity(1),
    } as Recipe);
  });

  test("burner-mining-drill", () => {
    const rawRecipe = {
      type: "recipe",
      name: "burner-mining-drill",
      normal: {
        energy_required: 2,
        ingredients: [
          ["iron-gear-wheel", 3],
          ["stone-furnace", 1],
          ["iron-plate", 3],
        ],
        result: "burner-mining-drill",
      },
      expensive: {
        energy_required: 4,
        ingredients: [
          ["iron-gear-wheel", 6],
          ["stone-furnace", 2],
          ["iron-plate", 6],
        ],
        result: "burner-mining-drill",
      },
    };
    const repository = new JSONRecipeRepository([rawRecipe]);

    const recipe = repository.get(recipeName(rawRecipe.name));

    expect(recipe).toEqual({
      name: recipeName("burner-mining-drill"),
      category: "crafting",
      craftingTime: second(2),
      ingredients: [
        [recipeName("iron-gear-wheel"), quantity(3)],
        [recipeName("stone-furnace"), quantity(1)],
        [recipeName("iron-plate"), quantity(3)],
      ],
      resultCount: quantity(1),
    } as Recipe);
  });
});
