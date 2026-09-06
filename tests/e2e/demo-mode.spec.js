import { expect, test } from "@playwright/test";

const customerFixture = [
  {
    id: 101,
    customerName: "Ava Demo",
    gender: "F",
    regularExercises: ["Yoga"],
    approaches: ["Social media"],
    firstLesson: "2026-09-06",
  },
  {
    id: 102,
    customerName: "Ben Demo",
    gender: "M",
    regularExercises: ["Workout"],
    approaches: ["Referral by friend/family"],
    firstLesson: "2024-03-10",
  },
];

async function seedDemoSession(page) {
  await page.addInitScript((customers) => {
    localStorage.setItem("token", "demo-token");
    localStorage.setItem(
      "demoCurrentUser",
      JSON.stringify({ id: 1, username: "demo", email: "" })
    );
    localStorage.setItem("demoCustomers", JSON.stringify(customers));
  }, customerFixture);
}

test("user can sign in with the demo account", async ({ page }) => {
  await page.goto("/auth?mode=login");

  await page.getByLabel("Username").fill("demo");
  await page.getByLabel("Password").fill("Demo1234");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
  await expect(page.getByText("Customer Gender Statistics")).toBeVisible();
});

test("customer list supports search and delete in demo mode", async ({ page }) => {
  await seedDemoSession(page);
  await page.goto("/customer");

  await expect(page.getByText("Ava Demo")).toBeVisible();
  await page.getByPlaceholder("Search by name…").fill("Ben");
  await expect(page.getByText("Ben Demo")).toBeVisible();
  await expect(page.getByText("Ava Demo")).not.toBeVisible();

  await page.getByRole("button", { name: "delete" }).click();
  await expect(page.getByText("Ben Demo")).not.toBeVisible();
});

test("dashboard includes first lesson statistics for 2026 demo customers", async ({
  page,
}) => {
  await seedDemoSession(page);
  await page.goto("/");

  await expect(page.getByText("Customer First Lesson Statistics")).toBeVisible();
  await expect(page.getByText("2026")).toBeVisible();
});
