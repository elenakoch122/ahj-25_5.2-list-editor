import Product from './Product';

export default class Popup {
  constructor(element) {
    // this.popupBlocks = ['name', 'price'];
    this.parentEl = element;
    this.element = this.create();

    this.onButtonSave = this.onButtonSave.bind(this);
    this.onButtonClose = this.onButtonClose.bind(this);
  }

  static get markup() {
    return `
    <div class="popup-block">
      <label for="input-name">Название</label>
      <input id="input-name" class="input" type="text" placeholder="Например, Samsung S3" required>
    </div>

    <div class="popup-block">
      <label for="input-price">Стоимость</label>
      <input id="input-price" class="input" type="text" placeholder="Например, 15000" required>
    </div>

    <div class="popup-footer">
      <button class="btn-popup btn-popup-save" type="submit">Сохранить</button>
      <button class="btn-popup btn-popup-close" type="button">Отмена</button>
    </div>
    `;
  }

  create() {
    const popup = document.createElement('form');
    popup.classList.add('popup');

    const popupBody = Popup.markup;
    popup.insertAdjacentHTML('beforeend', popupBody);

    return popup;
  }

  show() {
    this.parentEl.appendChild(this.element);

    // const buttonSave = this.element.querySelector('.btn-popup-save');
    const buttonClose = this.element.querySelector('.btn-popup-close');

    this.element.addEventListener('submit', this.onButtonSave);
    buttonClose.addEventListener('click', this.onButtonClose);
  }

  close() {
    this.element.remove();
  }

  onButtonSave(e) {
    e.preventDefault();
    const productName = document.getElementById('input-name').value;
    const productPrice = Number(document.getElementById('input-price').value);

    this.product = new Product(productName, productPrice);
    this.product.addToList();
    this.close();
  }

  onButtonClose() {
    this.close();
  }
}
