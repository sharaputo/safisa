'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#contact_form');
  const successPopup = document.querySelector('#success_popup');
  const warning = document.querySelector('.contact__warning');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let inputs = document.querySelectorAll('#contact_form input');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];

      input.onfocus = function () {
        input.classList.remove('_error');
        warning.classList.remove('active');
      };
    }

    let error = formValidate(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        form.reset();
        form.classList.remove('_sending');
        successPopup.classList.add('active');
      } else {
        alert('Error!');
      }
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
        } else if (input.classList.contains('_phone')) {
          if (phoneCheck(input)) {
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
    function phoneCheck(input) {
      return !/^[0-9]+$/.test(input.value);
    }
  }
});
