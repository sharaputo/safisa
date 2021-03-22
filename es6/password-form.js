'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#password_form');
  const warning = document.querySelector('.form__warning');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if (error === 0) {
      removeWarning();
      console.log('Email has been sent');
    } else {
      addWarning();
    }

    function formValidate(form) {
      let error = 0;
      const input = document.querySelector('._req');

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

      // Reset error state on input focus
      input.onfocus = function () {
        formRemoveError(input);
      };

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
