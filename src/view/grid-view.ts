import Product from '../interfaces/product';

class GridView {
  private static fillCard(
    item: Product,
    template: HTMLTemplateElement,
    linkHandler: (event: Event) => void,
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
    ) as Element).textContent = `€${item.price}`;
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
    detailsLink.addEventListener('click', linkHandler);

    return card;
  }

  static draw(products: Product[], linkHandler: (e: Event) => void): void {
    const cards = document.querySelector('.cards') as HTMLElement;
    cards.innerHTML = '';
    const template = document.getElementById(
      'card-template',
    ) as HTMLTemplateElement;

    if (template) {
      products.forEach((item) =>
        cards.append(GridView.fillCard(item, template, linkHandler)),
      );
    }
  }
}

export default GridView;
