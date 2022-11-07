export default class Tooltip {
  constructor(elem, message) {
    this.relatedEl = elem;
    this.message = message;
    this.tooltipEl = this.create();
  }

  create() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = this.message;
    return tooltip;
  }

  show() {
    this.relatedEl.parentElement.appendChild(this.tooltipEl);

    const { offsetTop: top, offsetLeft: left, offsetHeight: height } = this.relatedEl;
    this.tooltipEl.style.left = `${left}px`;
    this.tooltipEl.style.top = `${top + height + 5}px`;
  }

  remove() {
    this.tooltipEl.remove();
  }
}
