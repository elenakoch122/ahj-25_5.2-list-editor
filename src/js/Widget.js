import Popup from './Popup';

export default class Widget {
  constructor() {
    this.widget = document.querySelector('.widget');
    this.addButton = document.querySelector('.btn-add');

    this.addProduct = this.addProduct.bind(this);
  }

  init() {
    this.addButton.addEventListener('click', this.addProduct);
  }

  addProduct() {
    this.popup = new Popup(this.widget);
    this.popup.show();
  }
}
