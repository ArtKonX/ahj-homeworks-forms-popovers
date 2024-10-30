import WidgetPopover from "../components/widget-popover/WidgetPopover";

document.addEventListener("DOMContentLoaded", () => {
  const widgetPopovers = new WidgetPopover(document.querySelector("#app"));
  widgetPopovers.bindToDOM();
});
