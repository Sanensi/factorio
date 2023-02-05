import assert from "assert/strict";

declare const itemNameSymbol: unique symbol;
export type ItemName = string & { [itemNameSymbol]: never };
export const itemName = (name: string) => {
  return name as ItemName;
};

declare const secondSymbol: unique symbol;
export type Second = number & { [secondSymbol]: never };
export const second = (second: number) => {
  assert(second >= 0, "Seconds can only be positive");
  return second as Second;
};

declare const quantitySymbol: unique symbol;
export type Quantity = number & { [quantitySymbol]: never };
export const quantity = (quantity: number) => {
  assert(Number.isInteger(quantity), "Quantity can only be integer");
  assert(quantity >= 0, "Quantity can only be positive");
  return quantity as Quantity;
};

export type Category =
  | "crafting"
  | "advanced-crafting"
  | "crafting-with-fluid"
  | "smelting"
  | "oil-processing"
  | "chemistry"
  | "rocket-building"
  | "centrifuging";

export type Ingredient = [ItemName, Quantity];

export type Recipe = Readonly<{
  name: ItemName;
  category: Category;
  craftingTime: Second;
  ingredients: ReadonlyArray<Ingredient>;
  resultCount: Quantity;
}>;

export interface RecipeRepository {
  get(name: ItemName): Recipe;
}
