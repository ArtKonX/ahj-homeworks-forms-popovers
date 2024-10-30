import "./button.css";

export default class Button {
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
    this.params.data.forEach((dataEl) => {
      btn.setAttribute(dataEl.key, dataEl.value);
    });

    return btn;
  }
}
