import Widget from './Widget';

const widget = new Widget();
widget.init();

window.addEventListener('beforeunload', () => {
  const { products } = Widget;
  localStorage.setItem('products', JSON.stringify(products));
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
    products.forEach((p) => Widget.saveProduct(p));
    widget.drawProducts();
  }
});
