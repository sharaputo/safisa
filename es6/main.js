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

  if (headerMenu.classList.contains('active')) {
    bodyScrollLock.disableBodyScroll(headerMenu);
  } else {
    bodyScrollLock.enableBodyScroll(headerMenu);
  }
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

// Cart items counter
const countUps = document.querySelectorAll('.counter--up');
const countDowns = document.querySelectorAll('.counter--down');
let count = 1;

for (let i = 0; i < countUps.length; i++) {
  const countUp = countUps[i];
  countUp.addEventListener('click', addItems);

  function addItems() {
    let itemQty = countUp.previousElementSibling;
    count++;
    itemQty.value = count;
  }
}

for (let i = 0; i < countDowns.length; i++) {
  const countDown = countDowns[i];
  countDown.addEventListener('click', removeItems);

  function removeItems() {
    let itemQty = countDown.nextElementSibling;
    if (count > 1) {
      count--;
      itemQty.value = count;
    }
  }
}

// Popups close
const closePopups = document.querySelectorAll('.popup .close');
const popupBackdrop = document.querySelector('.popup__backdrop');

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
if (popupBackdrop) {
  popupBackdrop.addEventListener('click', function () {
    const popups = document.querySelectorAll('.popup');
    for (let i = 0; i < popups.length; i++) {
      const popup = popups[i];
      popup.classList.remove('active');
    }
  });
}

// Cookie close
const cookie = document.querySelector('#cookies');

if (cookie) {
  const cookieBtn = document.querySelector('#cookie_close');
  cookieBtn.addEventListener('click', hideCookie);

  function hideCookie() {
    cookie.classList.add('hidden');
  }
}
