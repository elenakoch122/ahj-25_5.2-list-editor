import editIcon from '../pic/edit-icon.png';
import deleteIcon from '../pic/delete-icon.png';

export default class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id = performance.now();
  }

  static get markup() {
    return `
    <div class="cell product-name"></div>
    <div class="cell product-price"></div>
    <div class="cell product-action">
      <div class="product-action-wrap">
        <img class="product-action-img edit" src="${editIcon}" alt="Редактировать" title="Редактировать">
      </div>
      <div class="product-action-wrap">
        <img class="product-action-img delete" src="${deleteIcon}" alt="Закрыть" title="Закрыть">
      </div>
    </div>
    `;
  }

  create() {
    const product = document.createElement('div');
    product.classList.add('product');
    product.setAttribute('data-id', this.id);

    const productBody = Product.markup;
    product.insertAdjacentHTML('beforeend', productBody);

    const productName = product.querySelector('.product-name');
    productName.textContent = this.name;

    const productPrice = product.querySelector('.product-price');
    productPrice.textContent = this.price;

    return product;
  }

  addToList() {
    this.element = this.create();
    document.querySelector('.products').appendChild(this.element);
  }

  edit() {
    this.element.querySelector('.product-name').textContent = this.name;
    this.element.querySelector('.product-price').textContent = this.price;
  }
}
