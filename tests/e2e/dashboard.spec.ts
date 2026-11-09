import { expect, test } from "@playwright/test";

test("streams data and customizes the dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "System pulse" })).toBeVisible();
  await expect(page.getByText("Live", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Customize view" }).click();
  await page.getByRole("checkbox", { name: "Real-time chart" }).uncheck();
  await expect(page.getByRole("heading", { name: "Request volume" })).toBeHidden();
});

test("filters a virtualized dataset", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Filter events…").fill("billing");
  await expect(page.getByText("20,000 events", { exact: false })).toBeVisible();
});

