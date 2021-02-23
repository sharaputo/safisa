// SVG Inline Injection
const mySVGsToInject = document.querySelectorAll('img.inject-me');
SVGInjector(mySVGsToInject);

// Header menu dropdowns
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

const dropMenus = document.querySelectorAll('.header .has-dropdown');

if (isMobile.any()) {
  for (let i = 0; i < dropMenus.length; i++) {
    const dropMenu = dropMenus[i];
    dropMenu.addEventListener('click', function () {
      dropMenu.classList.toggle('opened');
      dropMenu.children[0].classList.toggle('active');
      dropMenu.children[1].classList.toggle('active');
    });
  }
} else {
  console.log('Hover is enabled on PC');
}

// Header burger menu open & close
const menuSwitcher = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__nav');

menuSwitcher.addEventListener('click', function () {
  this.classList.toggle('active');
  headerMenu.classList.toggle('active');
});

// Hero slider
const heroSlider = document.querySelector('.hero__slider');
if (heroSlider) {
  new Splide('.splide.hero__slider', {
    autoplay: true,
    arrows: false,
    cover: true,
    interval: 3000,
    pagination: false,
    pauseOnHover: false,
    perMove: 1,
    perPage: 1,
    rewind: true,
    speed: 1000,
    type: 'fade',
  }).mount();
}

// Feedback slider
const feedbackSlider = document.querySelector('.feedback__slider');
if (feedbackSlider) {
  new Splide('.splide.feedback__slider', {
    arrows: true,
    pagination: false,
    perMove: 1,
    perPage: 1,
    rewind: true,
    speed: 1000,
    type: 'fade',
    width: 940,
    breakpoints: {
      1023: {
        pagination: true,
        width: '100%',
      },
    },
  }).mount();
}

// Product page slider
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
      767: {
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
        767: {
          destroy: false,
        },
      },
    });
    primary.sync(thumbnailControl).mount();
  }
}

// Popups close
const closePopups = document.querySelectorAll('.popup .close');

for (let i = 0; i < closePopups.length; i++) {
  const closePopup = closePopups[i];
  if (closePopup) {
    closePopup.addEventListener('click', function () {
      const popups = document.querySelectorAll('.popup');
      for (let i = 0; i < popups.length; i++) {
        const popup = popups[i];
        popup.classList.remove('active');
      }
    });
  }
}
