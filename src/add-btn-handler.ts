import Cart from './cart';
import Product from './interfaces/product';
import HeaderView from './view/header-view';

const addBtnHandler = (button: HTMLButtonElement, item: Product): void => {
  button.addEventListener('click', (e) => {
    const thisBtn = e.target as HTMLElement;

    if (!Cart.isProductInCart(item)) {
      Cart.addToCart(item);
      thisBtn.textContent = 'Drop';
    } else {
      Cart.dropFromCart(item);
      thisBtn.textContent = 'Add to cart';
    }

    HeaderView.updateTotalCartDisplay();
  });
};

export default addBtnHandler;
