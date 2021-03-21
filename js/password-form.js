'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#password_form');
  const warning = document.querySelector('.form__warning');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    let input = document.querySelector('#password_form input');

    input.onfocus = function () {
      input.classList.remove('_error');
      warning.classList.remove('active');
    };

    let error = formValidate(form);

    if (error === 0) {
      console.log('Email has been sent');
    } else {
      warning.classList.add('active');
    }

    function formValidate(form) {
      let error = 0;
      let formReq = document.querySelector('._req');
      const input = formReq;
      formRemoveError(input);

      if (input.value === '') {
        formAddError(input);
        error++;
      }

      return error;
    }

    function formAddError(input) {
      input.classList.add('_error');
    }

    function formRemoveError(input) {
      input.classList.remove('_error');
    }
  }
});