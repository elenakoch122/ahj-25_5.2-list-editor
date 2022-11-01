import editIcon from '../pic/edit-icon.png';
import deleteIcon from '../pic/delete-icon.png';

export default class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  static get markup() {
    return `
    <div class="cell product-name">${this.name}</div>
    <div class="cell product-price">${String(this.price)}</div>
    <div class="cell product-action">
      <img class="product-action-img edit" src="${editIcon}" alt="Редактировать" title="Редактировать">
      <img class="product-action-img delete" src="${deleteIcon}" alt="Закрыть" title="Закрыть">
    </div>
    `;
  }

  create() {
    const product = document.createElement('div');
    product.classList.add('product');

    const productBody = Product.markup;
    product.insertAdjacentHTML('beforeend', productBody);

    return product;
  }

  addToList() {
    this.element = this.create();
    document.querySelector('.products').appendChild(this.element);

    const editBtn = this.element.querySelector('.edit');
    const deleteBtn = this.element.querySelector('.delete');

    editBtn.addEventListener('click', this.edit);
    deleteBtn.addEventListener('click', this.delete);
  }

  edit() {

  }

  delete() {

  }
}
