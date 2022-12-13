import Widget from '../Widget';
import Product from '../Product';

document.body.innerHTML = `
<section class="widget">
  <header class="header">
    <h2 class="widget-title">Товары</h2>
    <button class="btn-add">+</button>
  </header>

  <div class="product-list">

    <div class="list-header">
      <div class="cell product-name">Название</div>
      <div class="cell product-price">Стоимость</div>
      <div class="cell product-action">Действия</div>
    </div>

    <div class="products"></div>
  </div>
</section>
`;

const widget = new Widget();
const product = new Product('phone', 15000);
product.id = 15;
widget.state.products.push(product);

describe('Popup', () => {
  widget.popup.show(15);

  test('should render the name of the edited product', () => {
    expect(widget.popup.inputName.value).toBe('phone');
  });

  test('should render the price of the edited product', () => {
    expect(widget.popup.inputPrice.value).toBe('15000');
  });
});
