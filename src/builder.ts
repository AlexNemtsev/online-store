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
}

export default Builder;