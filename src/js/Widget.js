export default class Widget {
  constructor(popup) {
    this.widget = document.querySelector('.widget');
    this.popup = popup;

    this.addProduct = this.addProduct.bind(this);
  }

  init() {
    this.addButton = document.querySelector('.btn-add');
    this.addButton.addEventListener('click', this.addProduct);
  }

  addProduct() {
    this.popup.show();
  }

  // eslint-disable-next-line class-methods-use-this
  drawProducts(products) {
    const prodList = document.querySelector('.products');
    products.forEach((p) => prodList.appendChild(p.element));
  }
}
