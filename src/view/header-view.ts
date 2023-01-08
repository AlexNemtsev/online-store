import Cart from '../cart';

class HeaderView {
  private static totalSumCartDisplay = document.querySelector(
    '.header__sum-number',
  ) as HTMLElement;

  private static totalAmountCartDisplay = document.querySelector(
    '.cart-counter',
  ) as HTMLElement;

  public static updateTotalCartDisplay(): void {
    HeaderView.totalSumCartDisplay.textContent = `$${Cart.getCartSum()}`;
    HeaderView.totalAmountCartDisplay.textContent = `${Cart.getTotalAmount()}`;
  }
}

export default HeaderView;
