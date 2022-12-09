import Product from './Product';
import Validator from './Validator';

export default class Popup {
  constructor(state) {
    this.state = state;
    this.parentEl = document.querySelector('.widget');
    this.element = this.create();
    this.inputName = this.element.querySelector('#input-name');
    this.inputPrice = this.element.querySelector('#input-price');
    this.validator = new Validator();

    this.onButtonSave = this.onButtonSave.bind(this);
    this.onButtonCancel = this.onButtonCancel.bind(this);
  }

  static get markup() {
    return `
    <div class="popup-block">
      <label for="input-name">Наименование</label>
      <input id="input-name" class="input" name="name" type="text" placeholder="Например, Samsung S3" required>
    </div>

    <div class="popup-block">
      <label for="input-price">Стоимость</label>
      <input id="input-price" class="input" name="price" type="number" placeholder="Например, 15000" required min="1">
    </div>

    <div class="popup-footer">
      <button class="btn-popup btn-popup-save" type="submit">Сохранить</button>
      <button class="btn-popup btn-popup-close" type="button">Отмена</button>
    </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  create() {
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.setAttribute('novalidate', '');

    const popupBody = Popup.markup;
    popup.insertAdjacentHTML('beforeend', popupBody);

    return popup;
  }

  show(id = null) {
    this.parentEl.appendChild(this.element);

    const buttonCancel = this.element.querySelector('.btn-popup-close');
    this.inputArr = this.element.querySelectorAll('.input');

    if (id) {
      this.editProduct = this.state.products.find((p) => p.id === id);

      this.inputName.value = this.editProduct.name;
      this.inputPrice.value = this.editProduct.price;
    }

    buttonCancel.addEventListener('click', this.onButtonCancel);
    this.inputArr.forEach((i) => i.addEventListener('input', this.validator.onCheck));
  }

  hide() {
    this.inputName.value = '';
    this.inputPrice.value = '';
    this.editProduct = null;
    this.element.remove();
  }

  onButtonSave(e) {
    if (e.target.checkValidity()) {
      if (this.editProduct) {
        this.editProduct.name = this.inputName.value;
        this.editProduct.price = Number(this.inputPrice.value);
        this.editProduct.edit();
      } else {
        const product = new Product(this.inputName.value, Number(this.inputPrice.value));
        product.addToList();
        this.state.products.push(product);
      }

      this.hide();
    } else {
      this.inputArr.forEach((input) => this.validator.check(input));
    }
  }

  onButtonCancel() {
    this.hide();
  }
}
