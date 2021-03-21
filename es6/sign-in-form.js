'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#sign_in_form');
  const warning = document.querySelector('.profile-form__warning');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let inputs = document.querySelectorAll('#sign_in_form input');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];

      input.onfocus = function () {
        input.classList.remove('_error');
        warning.classList.remove('active');
      };
    }

    let error = formValidate(form);

    if (error === 0) {
      console.log('Logged-in');
    } else {
      warning.classList.add('active');
    }

    function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
          if (emailCheck(input)) {
            formAddError(input);
            error++;
          }
        } else {
          if (input.value === '') {
            formAddError(input);
            error++;
          }
        }
      }

      return error;
    }
    function formAddError(input) {
      input.classList.add('_error');
    }
    function formRemoveError(input) {
      input.classList.remove('_error');
    }
    function emailCheck(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
  }
});

// Password visibility
const passwordToggle = document.querySelector('.password-toggle');
const password = passwordToggle.previousElementSibling;

passwordToggle.addEventListener('click', function (e) {
  const icon = passwordToggle.firstElementChild;
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  icon.classList.toggle('icon-password-show');
});
