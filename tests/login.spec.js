// @ts-check
const { test, expect } = require("@playwright/test");

test("login, has joyride", async ({ page }) => {
	await page.goto("https://pinehopper.onrender.com/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/pinehopper/);

	await page.getByPlaceholder("Username").fill("test");
	await page.getByPlaceholder("Password").fill("secret-password");

	await page.getByRole("button", { name: /Login/i }).click();

	// Expects the URL to be on explore page.
	await expect(page).toHaveURL(/.*explore/);

	// Joyride for first-time users
	await page.getByTitle("Open the dialog").click();
	await expect(page.getByRole("alertdialog")).toBeVisible();
	await page.getByRole("button", { name: "Next" }).click();
	await expect(page.getByRole("alertdialog")).toBeVisible();
	await expect(page.getByRole("button", { name: /Back/i })).toBeVisible();
	await page.getByRole("button", { name: "Next" }).click();
	await expect(page.getByRole("alertdialog")).toBeVisible();
	await expect(page.getByRole("button", { name: /Back/i })).toBeVisible();
	await page.getByRole("button", { name: "Next" }).click();
	await expect(page.getByRole("alertdialog")).toBeHidden();
});
