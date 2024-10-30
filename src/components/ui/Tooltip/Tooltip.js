import "./tooltip.css";
import Heading from "../Heading/Heading";
import Div from "../Div/Div";

export default class Tooltip {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    const tooltipPopover = new Div({
      class: [this.params.class, this.params.class + "--top"],
    }).element;
    const tooltipArrow = new Div({ class: "arrow" }).element;
    const tooltipHeading = new Heading({
      class: "popover-header",
      level: 3,
      text: this.params.title,
    }).element;
    const tooltipBody = new Div({ class: "popover-body" }).element;

    tooltipPopover.role = "tooltip";
    tooltipPopover.id = this.params.id;
    tooltipBody.textContent = this.params.text;

    tooltipPopover.append(tooltipHeading, tooltipBody, tooltipArrow);

    return { tooltipPopover, tooltipArrow };
  }
}
