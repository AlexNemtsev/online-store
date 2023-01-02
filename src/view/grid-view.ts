import product from '../interfaces/product';
import Router from '../router';

class GridView {
  private static fillCard(
    item: product,
    template: HTMLTemplateElement,
  ): HTMLDivElement {
    const card = template.content.cloneNode(true) as HTMLDivElement;
    card.className = 'card';

    const title = card.querySelector('.card__title') as Element;
    title.textContent = item.title;

    const img = card.querySelector('.card__image') as Element;
    img.setAttribute('src', item.thumbnail);
    img.setAttribute('alt', item.title);

    const cardList = card.querySelector('.card__list') as Element;
    (cardList.children[0].querySelector('span') as Element).textContent =
      item.category;
    (cardList.children[1].querySelector('span') as Element).textContent =
      item.brand;
    (cardList.children[2].querySelector(
      'span',
    ) as Element).textContent = `${item.price}`;
    (cardList.children[3].querySelector(
      'span',
    ) as Element).textContent = `${item.discountPercentage}`;
    (cardList.children[4].querySelector(
      'span',
    ) as Element).textContent = `${item.rating}`;
    (cardList.children[5].querySelector(
      'span',
    ) as Element).textContent = `${item.stock}`;

    const detailsLink = card.querySelector('a') as HTMLAnchorElement;
    detailsLink.href = `/product-details/${item.id}`;
    detailsLink.addEventListener('click', Router.setRoute);

    return card;
  }

  static draw(products: product[]): void {
    const parentElement: Element | null = document.querySelector('.main');

    if (parentElement?.children[0]) {
      parentElement?.children[0].remove();
    }

    const container = document.createElement('div');
    container.className = 'cards';
    const template = document.getElementById(
      'card-template',
    ) as HTMLTemplateElement;

    if (template) {
      products.forEach((item) =>
        container.append(GridView.fillCard(item, template)),
      );
    }

    parentElement?.append(container);
  }
}

export default GridView;
