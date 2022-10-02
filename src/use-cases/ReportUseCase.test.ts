import { recipeName } from "../domain/Recipe";
import { unitPerSecond } from "../domain/InputOutputReport";
import { ReportUseCase } from "./ReportUseCase";

test("When getting a report for iron-plate, then we get its list of inputs", () => {
  const service = new ReportUseCase();

  const report = service.getReportFor(recipeName("iron-plate"));

  expect(report.inputs).toEqual([
    [recipeName("iron-ore"), unitPerSecond(1, 3.2)],
  ]);
});
