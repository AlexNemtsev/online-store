import Cart from '../cart';

class HeaderView {
  private static totalCartDisplay = document.querySelector(
    '.header__sum-number',
  ) as HTMLElement;

  public static updateTotalCartDisplay(): void {
    HeaderView.totalCartDisplay.textContent = `$${Cart.getCartSum()}`;
  }
}

export default HeaderView;
