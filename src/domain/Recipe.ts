import assert from "assert/strict";

const recipeNameSymbol = Symbol("Recipe Name");
const secondSymbol = Symbol("Second");
const quantitySymbol = Symbol("Quantity");

export type RecipeName = string & { [recipeNameSymbol]: never };
export type Category =
  | "crafting"
  | "advanced-crafting"
  | "crafting-with-fluid"
  | "smelting"
  | "oil-processing"
  | "chemistry"
  | "rocket-building"
  | "centrifuging";
export type Second = number & { [secondSymbol]: never };
export type Quantity = number & { [quantitySymbol]: never };
export type Ingredient = [RecipeName, Quantity];

export const recipeName = (name: string) => {
  return name as RecipeName;
};

export const second = (second: number) => {
  assert(second >= 0, "Seconds can only be positive");
  return second as Second;
};

export const quantity = (quantity: number) => {
  assert(Number.isInteger(quantity), "Quantity can only be integer");
  assert(quantity >= 0, "Quantity can only be positive");
  return quantity as Quantity;
};

export type Recipe = Readonly<{
  name: RecipeName;
  category: Category;
  craftingTime: Second;
  ingredients: ReadonlyArray<Ingredient>;
  resultCount: Quantity;
}>;

export interface RecipeRepository {
  get(name: RecipeName): Recipe;
}
