import Popup from './Popup';

export default class Widget {
  constructor() {
    this.widget = document.querySelector('.widget');
    this.addButton = document.querySelector('.btn-add');
    this.popup = new Popup(this.widget);

    this.addProduct = this.addProduct.bind(this);
  }

  init() {
    this.addButton.addEventListener('click', this.addProduct);
  }

  addProduct() {
    this.popup.show();
  }
}
