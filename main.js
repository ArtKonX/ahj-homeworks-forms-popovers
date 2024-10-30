/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/components/ui/Button/Button.js

class Button {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const btn = document.createElement("button");
    btn.classList.add(...this.params.classes);
    btn.textContent = this.params.text;
    btn.type = this.params.type;
    this.params.data.forEach(dataEl => {
      btn.setAttribute(dataEl.key, dataEl.value);
    });
    return btn;
  }
}
;// ./src/components/ui/Heading/Heading.js

class Heading {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const heading = document.createElement(`h${this.getLevel()}`);
    heading.classList.add(this.params.class);
    heading.textContent = this.params.text;
    return heading;
  }
  getLevel() {
    if (this.params.level in [1, 2, 3, 4, 5, 6]) return this.params.level;
    throw new Error("Вы указали не число или число не входящее в промежутке от 1 до 6");
  }
}
;// ./src/components/ui/Div/Div.js

class Div {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const div = document.createElement("div");
    !Array.isArray(this.params.class) ? div.classList.add(this.params.class) : div.classList.add(...this.params.class);
    return div;
  }
}
;// ./src/components/ui/Tooltip/Tooltip.js



class Tooltip {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const tooltipPopover = new Div({
      class: [this.params.class, this.params.class + "--top"]
    }).element;
    const tooltipArrow = new Div({
      class: "arrow"
    }).element;
    const tooltipHeading = new Heading({
      class: "popover-header",
      level: 3,
      text: this.params.title
    }).element;
    const tooltipBody = new Div({
      class: "popover-body"
    }).element;
    tooltipPopover.role = "tooltip";
    tooltipPopover.id = this.params.id;
    tooltipBody.textContent = this.params.text;
    tooltipPopover.append(tooltipHeading, tooltipBody, tooltipArrow);
    return {
      tooltipPopover,
      tooltipArrow
    };
  }
}
;// ./src/utils/setPosition.js
function setPosition(parent, tooltip, tooltipArrow) {
  const {
    top,
    left
  } = parent.getBoundingClientRect();
  tooltip.style.left = left + parent.offsetWidth / 2 - tooltip.offsetWidth / 2 + "px";
  tooltip.style.top = top - tooltip.offsetHeight + tooltipArrow.offsetHeight - 9 + "px";
  tooltipArrow.style.left = tooltip.offsetWidth / 2 - tooltipArrow.offsetWidth / 2 + "px";
}
;// ./src/components/widget-popover/WidgetPopover.js





class WidgetPopover {
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
    this.container = new Div({
      class: "container"
    }).element;
    this.btn = new Button({
      classes: ["btn", "btn-secondary"],
      text: "Click to toggle popover",
      data: [{
        key: "data-toggle",
        value: "popover"
      }, {
        key: "data-content",
        value: `And here's some amazing content. It's very engaging. Right?`
      }, {
        key: "data-original-title",
        value: "Popover title"
      }],
      type: "button"
    }).element;
    this.heading = new Heading({
      class: "popovers-title",
      text: "Popovers",
      level: 1
    }).element;
    this.parentElem.append(this.container);
    this.container.append(this.heading, this.btn);
    this.container.addEventListener("click", e => {
      const btn = e.target.closest('[data-toggle="popover"]');
      this.tooglePopover(btn);
    });
  }
  pushTooltip(tooltip, id) {
    this.tooltips.push({
      id,
      tooltip
    });
  }
  removeTooltip(id, btn) {
    const removeEl = this.tooltips.find(el => id === el.id);
    removeEl.tooltip.remove();
    btn.removeAttribute("aria-describedby");
    this.tooltips.filter(el => id !== el.id);
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
      id: id
    }).element;
    this.pushTooltip(this.tooltip.tooltipPopover, id);
    document.body.appendChild(this.tooltip.tooltipPopover);
    setPosition(btn, this.tooltip.tooltipPopover, this.tooltip.tooltipArrow);
    btn.setAttribute("aria-describedby", id);
    return id;
  }
}
;// ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const widgetPopovers = new WidgetPopover(document.querySelector("#app"));
  widgetPopovers.bindToDOM();
});
;// ./src/index.js


/******/ })()
;