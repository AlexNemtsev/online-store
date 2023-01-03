class Builder {
  static createBlock(tag: string, classes: string[]): HTMLElement {
    const block = document.createElement(tag);
    block.classList.add(...classes);
    return block;
  }
}

export default Builder;