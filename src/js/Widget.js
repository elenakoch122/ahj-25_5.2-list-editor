import Popup from './Popup';
import Product from './Product';
import State from './State';

export default class Widget {
  constructor(stateService) {
    this.widget = document.querySelector('.widget');
    this.stateService = stateService;
    this.state = new State();
    this.popup = new Popup(this.state);

    this.showPopup = this.showPopup.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  init() {
    this.addButton = document.querySelector('.btn-add');

    this.addButton.addEventListener('click', this.showPopup);
    this.widget.addEventListener('submit', this.onSaveClick);
    this.widget.addEventListener('click', this.onEditClick);
    this.widget.addEventListener('click', this.onDeleteClick);

    window.addEventListener('beforeunload', () => {
      this.stateService.save(this.state);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const { products } = this.stateService.load();

      if (products.length > 0) {
        this.drawProducts(products);
      }
    });
  }

  showPopup() {
    this.popup.show();
  }

  // eslint-disable-next-line class-methods-use-this
  drawProducts(products) {
    products.forEach((p) => {
      const product = new Product(p.name, p.price);
      this.state.products.push(product);
      product.addToList();
    });
  }

  onSaveClick(e) {
    e.preventDefault();
    this.popup.onButtonSave(e);
  }

  onEditClick(e) {
    if (!e.target.classList.contains('edit')) return;
    const product = e.target.closest('.product');
    const id = Number(product.getAttribute('data-id'));
    this.popup.show(id);
  }

  onDeleteClick(e) {
    if (!e.target.classList.contains('delete')) return;
    const product = e.target.closest('.product');
    const id = Number(product.getAttribute('data-id'));
    this.state.products = this.state.products.filter((p) => p.id !== id);
    product.remove();
  }
}
