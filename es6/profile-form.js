'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#profile_form'),
    warning = document.querySelector('.profile-form__warning'),
    saveBtn = document.querySelector('#save_data');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if (error === 0) {
      removeWarning();
      saveBtn.innerHTML = 'Saved';
      console.log('Data saved');
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
        } else if (input.classList.contains('_phone')) {
          if (phoneCheck(input)) {
            formAddError(input);
            error++;
          }
        } else if (input.classList.contains('_password')) {
          if (passwordCheck() === false) {
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
          if (!input.classList.contains('_password')) {
            formRemoveError(input);
          }
        };

        // Form reset
        const reset = document.querySelector('#form_reset');
        reset.addEventListener('click', function () {
          formRemoveError(input);
          removeWarning();
          form.reset();
        });
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
    function phoneCheck(input) {
      return !/^[0-9]+$/.test(input.value);
    }
  }

  // Password visibility
  const passwordToggles = document.querySelectorAll('.password-toggle');

  for (let i = 0; i < passwordToggles.length; i++) {
    const passwordToggle = passwordToggles[i];

    passwordToggle.addEventListener('click', function (e) {
      const password = passwordToggle.previousElementSibling;
      const icon = passwordToggle.firstElementChild;
      const type =
        password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      icon.classList.toggle('icon-password-show');
    });
  }
});

// Passwords' match check
const firstPassword = document.querySelector('#profile_password'),
  secondPassword = document.querySelector('#profile_password_confirm');
secondPassword.addEventListener('keyup', passwordCheck);
function passwordCheck() {
  if (firstPassword.value !== secondPassword.value) {
    secondPassword.classList.add('_error');
    return false;
  } else if (secondPassword.value === '') {
    secondPassword.classList.add('_error');
    return false;
  } else {
    secondPassword.classList.remove('_error');
    return true;
  }
}
