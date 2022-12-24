function setImageClickHandler(): void {
  const productImages = document.querySelector('.product__images-list') as HTMLElement;
  const productMainImage = document.querySelector('.product__image--main') as HTMLImageElement;
  
  productImages.addEventListener('click', (event: Event): void => {
    if (event.target instanceof HTMLImageElement) {
      if (productMainImage.src !== event.target.src) {
        productMainImage.src = event.target.getAttribute('src') as string;
      }
    }
  })
}

export default setImageClickHandler;