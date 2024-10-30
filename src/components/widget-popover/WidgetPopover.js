import Button from "../ui/Button/Button";
import Heading from "../ui/Heading/Heading";
import Tooltip from "../ui/Tooltip/Tooltip";
import Div from "../ui/Div/Div";

import setPosition from "../../utils/setPosition";

export default class WidgetPopover {
  constructor(parentElem) {
    this.parentElem = parentElem;

    this._tooltips = [];
    this.tooglePopover = this.tooglePopover.bind(this);
  }

  get tooltips() {
    return this._tooltips;
  }

  getId() {
    return performance.now();
  }

  bindToDOM() {
    this.container = new Div({ class: "container" }).element;
    this.btn = new Button({
      classes: ["btn", "btn-secondary"],
      text: "Click to toggle popover",
      data: [
        { key: "data-toggle", value: "popover" },
        {
          key: "data-content",
          value: `And here's some amazing content. It's very engaging. Right?`,
        },
        { key: "data-original-title", value: "Popover title" },
      ],
      type: "button",
    }).element;
    this.heading = new Heading({
      class: "popovers-title",
      text: "Popovers",
      level: 1,
    }).element;

    this.parentElem.append(this.container);
    this.container.append(this.heading, this.btn);

    this.container.addEventListener("click", (e) => {
      const btn = e.target.closest('[data-toggle="popover"]');
      this.tooglePopover(btn);
    });
  }

  pushTooltip(tooltip, id) {
    this.tooltips.push({
      id,
      tooltip,
    });
  }

  removeTooltip(id, btn) {
    const removeEl = this.tooltips.find((el) => id === el.id);

    removeEl.tooltip.remove();

    btn.removeAttribute("aria-describedby");

    this.tooltips.filter((el) => id !== el.id);
  }

  tooglePopover(btn) {
    if (!btn) return;

    if (btn.hasAttribute("aria-describedby")) {
      const attrBtn = btn.getAttribute("aria-describedby");
      this.removeTooltip(attrBtn, btn);
    } else {
      this.showTooltip(btn);
    }
  }

  showTooltip(btn) {
    const id = "popover" + this.getId();

    this.tooltip = new Tooltip({
      class: "popover",
      title: btn.dataset.originalTitle,
      text: btn.dataset.content,
      parent: btn,
      id: id,
    }).element;

    this.pushTooltip(this.tooltip.tooltipPopover, id);

    document.body.appendChild(this.tooltip.tooltipPopover);

    setPosition(btn, this.tooltip.tooltipPopover, this.tooltip.tooltipArrow);
    btn.setAttribute("aria-describedby", id);

    return id;
  }
}
