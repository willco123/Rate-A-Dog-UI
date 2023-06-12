import type { TableDataGrouped } from "../types";

export function createMockTableData() {
  const mockTableData: TableDataGrouped[] = [];

  for (let i = 0; i < 50; i++) {
    mockTableData.push({
      breed: `breed${i}`,
      subBreed: [`subBreed${i}`],
      averageRating: [i],
      numberOfRates: [i],
    });
  }
  return mockTableData;
}
