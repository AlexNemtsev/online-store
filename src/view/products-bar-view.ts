class ProductsBarView {
  static draw(): HTMLElement {
    const barTemplate = document.getElementById(
      'products-bar-template',
    ) as HTMLTemplateElement;
    const barBlock = barTemplate.content.cloneNode(true) as HTMLElement;
    return barBlock;
  }
}

export default ProductsBarView;