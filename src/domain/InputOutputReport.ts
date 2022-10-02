import { Producer } from "./Producer";
import { quantity, Quantity, RecipeName, second, Second } from "./Recipe";

type Rational<N extends number, D extends number> = {
  numerator: N;
  denominator: D;
};

type UnitPerSecond = Rational<Quantity, Second>;

export const unitPerSecond = (
  units: number,
  seconds: number
): UnitPerSecond => ({
  numerator: quantity(units),
  denominator: second(seconds),
});

export type InputOutputReport = Readonly<{
  for: RecipeName;
  with: Producer;
  inputs: ReadonlyArray<[RecipeName, UnitPerSecond]>;
  outputs: ReadonlyArray<[RecipeName, UnitPerSecond]>;
}>;
