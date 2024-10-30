import { JSDOM } from "jsdom";

import WidgetPopover from "../../components/widget-popover/WidgetPopover";

describe("Виджет Popover", () => {
  let widgetPopover;
  let btn;

  beforeEach(() => {
    const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
    global.document = dom.window.document;
    global.window = dom.window;

    document.body.innerHTML = `
        <div id="app">
            <div class="container">
                <h1 class="popovers-title">Popovers</h1>
                <button class="btn btn-secondary" type="button" data-toggle="popover" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="Popover title">Click to toggle popover</button>
            </div>
            </div>
        `;

    widgetPopover = new WidgetPopover(document.querySelector("#app"));
    btn = document.querySelector(".btn");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("Тест метода showTooltip", () => {
    const id = widgetPopover.showTooltip(btn);
    const popover = widgetPopover.tooltips.find((p) => p.id === id);

    expect(popover.id).toBe(id);
    expect(btn.hasAttribute("aria-describedby")).toBeTruthy();
    expect(btn.getAttribute("aria-describedby")).toBe(id);
    expect(popover.tooltip.className).toBe("popover popover--top");
    expect(popover.tooltip.children[0].className).toBe("popover-header");
    expect(popover.tooltip.children[1].className).toBe("popover-body");
    expect(popover.tooltip.children[2].className).toBe("arrow");
  });

  test("Тест метода removeTooltip", () => {
    widgetPopover.showTooltip(btn);
    const id = btn.getAttribute("aria-describedby");

    widgetPopover.removeTooltip(id, btn);

    expect(btn.hasAttribute("aria-describedby")).toBeFalsy();
  });

  describe("Тест метода tooglePopover", () => {
    test("Тест метода tooglePopover на добавление", () => {
      btn.removeAttribute("aria-describedby");
      widgetPopover.tooglePopover(btn);

      expect(btn.hasAttribute("aria-describedby")).toBeTruthy();
    });

    test("Тест метода tooglePopover на удаление", () => {
      btn.setAttribute("aria-describedby", "popover1234");
      widgetPopover.showTooltip(btn);
      widgetPopover.tooglePopover(btn);

      expect(btn.hasAttribute("aria-describedby")).toBeFalsy();
    });
  });
});
