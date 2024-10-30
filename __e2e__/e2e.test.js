import puppetteer from "puppeteer";

jest.setTimeout(30000);

describe("Popover", () => {
  let browser = null;
  let page = null;

  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false,
      slowMo: 50,
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Тест отображения и скрытия Popover", async () => {
    await page.goto(baseUrl);

    await page.click(".btn");

    await page.waitForSelector(".popover");

    const id = await page.$eval(".btn", (el) =>
      el.getAttribute("aria-describedby"),
    );
    const title = await page.$eval(".btn", (el) => el.dataset.originalTitle);
    const content = await page.$eval(".btn", (el) => el.dataset.content);

    const idPopover = await page.$eval(".popover", (el) => el.id);
    const titlePopover = await page.$eval(
      ".popover-header",
      (el) => el.textContent,
    );
    const contentPopover = await page.$eval(
      ".popover-body",
      (el) => el.textContent,
    );

    expect(id).toBe(idPopover);
    expect(title).toBe(titlePopover);
    expect(content).toBe(contentPopover);

    await page.click(".btn");

    const idNot = await page.$eval(".btn", (el) =>
      el.getAttribute("aria-describedby"),
    );

    expect(idNot).toBeFalsy();
  });
});
