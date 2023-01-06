import Builder from '../builder';

class ProductsBarView {
  static draw(): HTMLElement {
    const barBlock = Builder.createClone('products-bar-template');
    return barBlock;
  }
}

export default ProductsBarView;