import Builder from '../builder';

class ProductsBarView {
  public static draw(): HTMLElement {
    const barBlock = Builder.createClone('products-bar-template');
    return barBlock;
  }

  public static updateProductsCount(count: number): void {
    const foundCount = document.querySelector('.products__found-count') as HTMLElement;
    foundCount.textContent = `${count}`;
  }
}

export default ProductsBarView;