import Popup from './Popup';

export default class Widget {
  constructor() {
    this.widget = document.querySelector('.widget');
    this.addButton = document.querySelector('.btn-add');

    this.addProduct = this.addProduct.bind(this);
  }

  static products = [];

  static saveProduct(product) {
    Widget.products.push(product);
  }

  init() {
    this.addButton.addEventListener('click', this.addProduct);
  }

  addProduct() {
    // this.popup = new Popup(this.widget);
    this.popup = new Popup(this);
    this.popup.show();
  }

  drawProducts() {
    const prodList = document.querySelector('.products');
    Widget.products.forEach((p) => prodList.appendChild(p.element));
  }
}
