import { test, expect, type Page, BrowserContext } from "@playwright/test";

const mainPage = "http://localhost:3000/";
const testUser = "newuser";
const testPass = "newpass";

test.beforeEach(async ({ page, context }) => {
  await mockStoreAllApi(context);
  await page.goto(mainPage);
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Rate a Dog/);
});

test("Navigates to correct Page", async ({ page }) => {
  await page.getByText("All Ratings").click();
  await expect(page).toHaveURL(/.*sorted/);
});
test("Logs in and out", async ({ page }) => {
  await page.getByText("Login").click();
  await expect(page).toHaveURL(/.*login/);

  const inputUser = page.getByPlaceholder("Username");
  const inputPass = page.getByPlaceholder("Password");

  await inputUser.type(testUser);
  await inputPass.type(testPass);
  await page.getByRole("button", { name: "submit-login-button" }).click();
  await page.waitForFunction(() => {
    return sessionStorage.getItem("Authorization") !== null;
  });
  let isToken = await checkTokenInSessionStorage(page);
  expect(isToken).toBe(true);

  await page.getByText("Logout").click();
  await page.waitForFunction(() => {
    return sessionStorage.getItem("Authorization") === null;
  });
  isToken = await checkTokenInSessionStorage(page);
  expect(isToken).toBe(false);
});

// test("Drags carousel and snaps", async ({ page }) => {
//   const carousel = page.locator(".two-way-carousel-container").first();
//   const initialPosition = await carousel.boundingBox();
//   if (!initialPosition) throw new Error("Can't get Carousel bounds");
//   const initialX = initialPosition.x;
//   console.log(initialPosition, "initial position");
//   await carousel.scrollIntoViewIfNeeded();

//   await carousel.dragTo(carousel, {
//     force: true,
//     targetPosition: {
//       // moving the slider to the target value in %
//       x: 1000,
//       y: 0,
//     },
//   });
//   const finalPosition = await carousel.boundingBox();
//   console.log("final position: ", finalPosition);
// });

async function checkTokenInSessionStorage(page: Page) {
  return await page.evaluate(() => {
    return sessionStorage.getItem("Authorization") !== null;
  });
}

async function getSessionStorage(page: Page) {
  return await page.evaluate(() => {
    const sessionStorageData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key != null) {
        const value = sessionStorage.getItem(key);
        sessionStorageData[key] = value;
      }
    }
    return sessionStorageData;
  });
}

//Expensive function that should never be called in a test
async function mockStoreAllApi(context: BrowserContext) {
  const sortedRoute = "http://localhost:3005/admin/storeallbreeds";
  await context.route(sortedRoute, (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Mocked response" }),
    });
  });
}
