import { Category } from "./Recipe";

export type Producer = StoneFurnace | AssemblingMachine1;

export const getDefaultProducerFor = (recipeCategory: Category): Producer => {
  switch (recipeCategory) {
    case "smelting":
      return new StoneFurnace();
    default:
      return new AssemblingMachine1();
  }
};

export class StoneFurnace {
  readonly craftingSpeed = 1;
}

export class AssemblingMachine1 {
  readonly craftingSpeed = 0.5;
}
