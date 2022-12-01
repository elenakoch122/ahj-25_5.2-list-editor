import ProductList from './ProductList';
import Popup from './Popup';
import Widget from './Widget';

const productList = new ProductList();
const popup = new Popup(productList);
const widget = new Widget(popup);

widget.init();

window.addEventListener('beforeunload', () => {
  localStorage.setItem('products', JSON.stringify(productList.products));
});

document.addEventListener('DOMContentLoaded', () => {
  const json = localStorage.getItem('products');
  let products;

  try {
    products = JSON.parse(json);
  } catch (e) {
    console.log(e);
  }

  if (products) {
    productList.products = products;
    widget.drawProducts(products);
  }
});
