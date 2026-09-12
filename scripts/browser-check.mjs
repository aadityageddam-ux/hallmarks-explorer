import { chromium } from "playwright";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";

const port = process.env.PORT || "3107";
const url = `http://127.0.0.1:${port}`;
// Refuse to test an unrelated server already using the intended port.
let occupied = false;
try {
  await fetch(url, { signal: AbortSignal.timeout(1000) });
  occupied = true;
} catch {}
if (occupied)
  throw new Error(`Port ${port} is in use; set PORT to an unused port.`);
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", port, "-H", "127.0.0.1"],
  { stdio: "pipe", windowsHide: true },
);
let serverLog = "";
server.stdout.on("data", (x) => {
  serverLog += x;
});
server.stderr.on("data", (x) => {
  serverLog += x;
});
let browser;
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error(serverLog);
    try {
      if ((await fetch(url)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  assert(ready, "Production server failed to become ready: " + serverLog);
  browser = await chromium.launch({ headless: true });
  await mkdir("test-results", { recursive: true });
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(url);
    const cards = page.locator('[data-testid^="hallmark-card-"]');
    const waitForCards = (count) =>
      page.waitForFunction(
        (n) =>
          document.querySelectorAll('[data-testid^="hallmark-card-"]')
            .length === n,
        count,
      );
    await cards.first().waitFor();
    assert.equal(await cards.count(), 12);
    assert(await page.title().then((t) => t.includes("HallmarksExplorer")));
    assert(
      await page
        .locator('meta[name="description"]')
        .getAttribute("content")
        .then((t) => t.includes("measurement limits")),
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      "Page overflows horizontally",
    );
    await page
      .getByRole("button", { name: "Human studies included", exact: true })
      .click();
    await waitForCards(2);
    assert.equal(await cards.count(), 2);
    await page.getByRole("button", { name: "Primary", exact: true }).click();
    await waitForCards(1);
    assert.equal(await cards.count(), 1);
    await page
      .getByRole("button", { name: "Clear filters", exact: true })
      .click();
    await waitForCards(12);
    const search = page.getByRole("textbox", {
      name: "Search hallmarks",
      exact: true,
    });
    await search.fill("no-such-hallmark");
    await page.getByText("No hallmarks match your filters").waitFor();
    await waitForCards(0);
    assert.equal(await cards.count(), 0);
    await search.fill("  RAPAMYCIN  ");
    await waitForCards(1);
    assert.equal(await cards.count(), 1);
    await page
      .getByRole("button", { name: "Clear filters", exact: true })
      .click();
    await waitForCards(12);
    const opener = page.getByTestId("hallmark-card-genomic-instability");
    await opener.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    assert.equal(
      await page.getByTestId("panel-title").textContent(),
      "Genomic Instability",
    );
    await page
      .getByRole("button", { name: "Next: Telomere Attrition", exact: true })
      .click();
    assert.equal(
      await page.getByTestId("panel-title").textContent(),
      "Telomere Attrition",
    );
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      assert(
        await page.evaluate(() => !!document.activeElement?.closest("dialog")),
        "Focus escaped the modal",
      );
    }
    await page.getByTestId("panel-title").focus();
    await dialog.locator("[data-panel-scroll]").evaluate(el => { el.scrollTop = 0; });
    await page.screenshot({ path: `test-results/panel-${viewport.width}.png` });
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
    assert(
      await opener.evaluate((el) => el === document.activeElement),
      "Focus did not return to originating card",
    );
    // Every card exposes cited evidence and bounded measurements.
    for (let i = 0; i < 12; i++) {
      await cards.nth(i).click();
      await dialog.waitFor();
      assert(
        await dialog
          .getByText("What researchers measured", { exact: true })
          .isVisible(),
      );
      assert(
        await dialog
          .getByText("Selected research evidence", { exact: true })
          .isVisible(),
      );
      assert(
        (await dialog.getByRole("link", { name: /^Source: PMID/ }).count()) >=
          3,
      );
      assert.equal(
        await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
        true,
        "Dialog overflows horizontally",
      );
      await page
        .getByRole("button", { name: "Close panel", exact: true })
        .click();
    }
    await page.waitForFunction(() => Array.from(document.querySelectorAll('div.transition-opacity.duration-200')).every(el => getComputedStyle(el).opacity === '1'));
    await page.screenshot({
      path: `test-results/page-${viewport.width}.png`,
      fullPage: true,
    });
    // Text enlargement must not create horizontal overflow.
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      "200% text overflows",
    );
    assert.deepEqual(errors, [], "Browser runtime errors");
    await page.close();
    console.log(
      `Passed ${viewport.width}px: filters, search, all 12 entries, citations, modal focus, Escape, layout and text enlargement`,
    );
  }
} finally {
  await browser?.close();
  server.kill();
}
