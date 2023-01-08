import Product from './interfaces/product';

class Builder {
  static createBlock(tag: string, classes: string[]): HTMLElement {
    const block = document.createElement(tag);
    block.classList.add(...classes);
    return block;
  }

  static createClone(id: string): HTMLElement {
    const template = document.getElementById(id) as HTMLTemplateElement;
    const block = template.content.cloneNode(true) as HTMLElement;
    return block;
  }

  static fillTextBlock(parentBlock: Element, selector: string, content: string, isPrice = false): void {
    const block = parentBlock.querySelector(selector) as Element;
    block.textContent = isPrice ? `$${content}` : content;
  }

  static fillDataFields(parentBlock: Element, product: Product): void {
    const keys: string[] = Object.keys(product);
    keys.forEach((key) => {
      const block: Element | null = parentBlock.querySelector(`[data-field="${key}"]`);
      if (block instanceof HTMLImageElement) {
        block.src = product[key as keyof Product].toString();
      } else if (block instanceof Element) {
        block.textContent = key === 'price' ? `$${product[key as keyof Product].toString()}` : product[key as keyof Product].toString();
      }
    })
  }
}

export default Builder;