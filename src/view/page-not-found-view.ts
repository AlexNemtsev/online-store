class PageNotFoundView {
  static draw(): void {
    const mainElement = document.querySelector('.main') as HTMLElement;

    if (mainElement.children.length) {
      mainElement.children[0].remove();
    }

    const errorMsgHeader = document.createElement('h1');
    errorMsgHeader.textContent = 'Error 404. Page not found!';

    mainElement.append(errorMsgHeader);
  }
}

export default PageNotFoundView;
