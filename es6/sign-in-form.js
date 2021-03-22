'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#sign_in_form'),
    warning = document.querySelector('.profile-form__warning');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if (error === 0) {
      console.log('Logged-in');
    } else {
      addWarning();
    }

    function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];

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

        // Reset warning and error state on input focus
        input.onfocus = function () {
          formRemoveError(input);
          removeWarning();
        };
      }

      return error;
    }

    function formAddError(input) {
      input.classList.add('_error');
    }
    function formRemoveError(input) {
      input.classList.remove('_error');
    }

    function addWarning() {
      warning.classList.add('active');
    }
    function removeWarning() {
      warning.classList.remove('active');
    }

    function emailCheck(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
  }
});

// Password visibility
const passwordToggle = document.querySelector('.password-toggle'),
  password = passwordToggle.previousElementSibling;

passwordToggle.addEventListener('click', function (e) {
  const icon = passwordToggle.firstElementChild;
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  icon.classList.toggle('icon-password-show');
});
