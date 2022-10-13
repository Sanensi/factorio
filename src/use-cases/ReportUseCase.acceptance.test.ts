import { unitPerSecond } from "../domain/InputOutputReport";
import { itemName } from "../domain/Recipe";
import { ReportUseCase } from "./ReportUseCase";

describe("An input/output report is a simple balance sheet of what goes in and out of a producer for a given recipe", () => {
  test("iron-plate", () => {
    const service = new ReportUseCase();

    const report = service.getReportFor(itemName("iron-plate"));

    expect(report.inputs).toEqual([
      [itemName("iron-ore"), unitPerSecond(1, 3.2)],
    ]);
  });
});
