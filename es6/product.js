// Product page mobile slider
const thumbnailSlider = document.querySelector('.splide.control');
if (thumbnailSlider) {
  const thumbnailControl = new Splide('.splide.control', {
    arrows: false,
    destroy: true,
    fixedWidth: 53,
    fixedHeight: 80,
    isNavigation: true,
    gap: 5,
    pagination: false,
    cover: true,
    breakpoints: {
      1023: {
        destroy: false,
      },
    },
  }).mount();

  const primarySlider = document.querySelector('.splide.thumbnails');
  if (primarySlider) {
    const primary = new Splide('.splide.thumbnails', {
      arrows: false,
      destroy: true,
      pagination: false,
      perPage: 1,
      type: 'fade',
      breakpoints: {
        1023: {
          destroy: false,
        },
      },
    });
    primary.sync(thumbnailControl).mount();
  }
}

// "Added to cart" popup notification
const addToCart = document.querySelector('#add_to_cart');
const itemsCounter = document.querySelector('#items_counter');
const cartPopup = document.querySelector('#cart_popup');
const cartCounter = document.querySelector('#cart_counter');

addToCart.addEventListener('click', showPopup);

function showPopup() {
  let count = 0;
  count++;
  cartCounter.innerHTML = count;
  cartPopup.classList.add('active');
  getThumb();
  getTitle();
  getPrice();

  addToCart.disabled = true;
  itemsCounter.disabled = true;
}

function getThumb() {
  const thumb = document.querySelector('.splide__slide img');
  const popupThumb = document.querySelector('#popup_thumb');
  popupThumb.src = thumb.src;
}

function getTitle() {
  const productTitle = document.querySelector('#product_title');
  const popupTitle = document.querySelector('#popup_title');
  popupTitle.innerHTML = productTitle.textContent;
}

function getPrice() {
  const productPrice = document.querySelector('#product_price');
  const popupPrice = document.querySelector('#popup_price');
  popupPrice.innerHTML = productPrice.textContent;
}
