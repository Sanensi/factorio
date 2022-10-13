import { unitPerSecond } from "../domain/InputOutputReport";
import { AssemblingMachine1, StoneFurnace } from "../domain/Producer";
import { itemName } from "../domain/Recipe";
import { ReportUseCase } from "./ReportUseCase";

describe("An input/output report is a simple balance sheet of what goes in and out of a producer for a given recipe", () => {
  test("iron-plate", () => {
    const service = new ReportUseCase();

    const report = service.getReportFor(itemName("iron-plate"));

    expect(report).toEqual({
      for: itemName("iron-plate"),
      with: new StoneFurnace(),
      inputs: [[itemName("iron-ore"), unitPerSecond(1, 3.2)]],
      outputs: [[itemName("iron-plate"), unitPerSecond(1, 3.2)]],
    });
  });

  test("iron-gear-wheel", () => {
    const service = new ReportUseCase();

    const report = service.getReportFor(itemName("iron-gear-wheel"));

    expect(report).toEqual({
      for: itemName("iron-gear-wheel"),
      with: new AssemblingMachine1(),
      inputs: [[itemName("iron-plate"), unitPerSecond(2, 1)]],
      outputs: [[itemName("iron-gear-wheel"), unitPerSecond(1, 1)]],
    });
  });

  test("automation-science-pack", () => {
    const service = new ReportUseCase();

    const report = service.getReportFor(itemName("automation-science-pack"));

    expect(report).toEqual({
      for: itemName("automation-science-pack"),
      with: new AssemblingMachine1(),
      inputs: [
        [itemName("copper-plate"), unitPerSecond(1, 10)],
        [itemName("iron-gear-wheel"), unitPerSecond(1, 10)],
      ],
      outputs: [[itemName("automation-science-pack"), unitPerSecond(1, 10)]],
    });
  });
});
