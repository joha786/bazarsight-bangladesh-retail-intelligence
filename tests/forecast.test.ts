import assert from "node:assert/strict";
import test from "node:test";
import { assessDataQuality, forecastSales, generateDemoSales, parseSales } from "../lib/forecast";

test("generated Bangladesh retail data supports a forecast", () => {
  const sales = generateDemoSales();
  const result = forecastSales(sales, 30);
  assert.ok(sales.length > 5000);
  assert.ok(result);
  assert.equal(result.points.length, 60);
  assert.equal(result.models.length, 3);
  assert.ok(result.selected.mae >= 0);
  assert.ok(result.points.at(-1)!.upper >= result.points.at(-1)!.forecast);
});

test("CSV column aliases are parsed into valid sales records", () => {
  const sales = parseSales([{ date: "2026-01-01", store: "Dhaka", sku: "SKU-1", product: "Test item", quantity: "20", price: "500", promotion: "yes" }]);
  assert.equal(sales.length, 1);
  assert.equal(sales[0].unitPrice, 500);
  assert.equal(sales[0].promotion, true);
});

test("quality report recognizes clean generated data", () => {
  const report = assessDataQuality(generateDemoSales());
  assert.ok(report.totalRows > 0);
  assert.ok(report.uniqueDays > 500);
  assert.ok(report.score >= 80);
});
