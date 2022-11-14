import Product from './Product';
import Validator from './Validator';
import Widget from './Widget';

export default class Popup {
  constructor(element) {
    // this.parentEl = element;
    this.parentEl = element.widget;
    this.element = this.create();
    this.validator = new Validator();

    this.onButtonSave = this.onButtonSave.bind(this);
    this.onButtonClose = this.onButtonClose.bind(this);
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

  show() {
    this.parentEl.appendChild(this.element);

    const buttonClose = this.element.querySelector('.btn-popup-close');
    this.inputArr = this.element.querySelectorAll('.input');

    this.element.addEventListener('submit', this.onButtonSave);
    buttonClose.addEventListener('click', this.onButtonClose);
    this.inputArr.forEach((i) => i.addEventListener('input', this.validator.onCheck));
  }

  hide() {
    this.element.remove();
  }

  onButtonSave(e) {
    e.preventDefault();

    if (e.target.checkValidity()) {
      const newName = document.getElementById('input-name').value;
      const newPrice = Number(document.getElementById('input-price').value);

      if (this.product) {
        this.product.name = newName;
        this.product.price = newPrice;
        this.product.edit();
      } else {
        this.product = new Product(newName, newPrice, this);
        this.product.addToList();
        Widget.saveProduct(this.product);
      }

      this.hide();
    } else {
      this.inputArr.forEach((input) => this.validator.check(input));
    }
  }

  onButtonClose() {
    this.hide();
  }
}
