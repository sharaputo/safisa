'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#sign_up_form'),
    warning = document.querySelector('.profile-form__warning');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if (error === 0) {
      removeWarning();
      console.log('Signed-up');
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

// Passwords' match check
const firstPassword = document.querySelector('#signup_password'),
  secondPassword = document.querySelector('#signup_password_confirm');
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
