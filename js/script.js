function countDown(class_) {
  let a;
  let b;
  let timer = document.querySelector(class_);
  if (localStorage.getItem('sec' + class_) && localStorage.getItem(
    'min' + class_
  )) {
    a = localStorage.getItem('min' + class_);
    b = localStorage.getItem('sec' + class_);
  } else
    a = timer.getAttribute('data-minutes'),
      b = timer.getAttribute('data-seconds');
  const d = setInterval(function () {
    0 <= parseInt(a) && -1 !== parseInt(b) && (
      0 === parseInt(b) && 0 !== parseInt(a) && (a--, b = 59),
        timer.innerText = (
          10 > a
            ? '0' + a
            : a
        ) + ' ' + (
          10 > b
            ? '0' + b
            : b
        ),
      0 === parseInt(b) && 0 === parseInt(a) && (a--, b = 0, timer.innerText = '00 00', clearInterval(d)),
        b--,
        localStorage.setItem(
          'sec' + class_,
          b
        ),
        localStorage.setItem('min' + class_, a)
    );
  }, 1E3);
}

if (parseInt(localStorage.getItem('shown__'))) {
  countDown('.time');
  $('.order').css('display', 'block');
  $('.wheel__wrapper').hide();
}

$('.btn--submit').click(function () {
  countDown('.time');
  $('.order').addClass('shown__');
  localStorage.setItem('shown__', '1');
});

<!-- СКРИПТ РУЛЕТКИ -->
const resultWrapper = document.querySelector('.overlay');
const wheel = document.querySelector('.prize-wheel');
$('.wheel__cursor').click(function () {
  if (!wheel.classList.contains('rotated')) {
    wheel.classList.add('spin');/* класс анимации вращения */
    setTimeout(function () {
      resultWrapper.style.display = 'block';
    }, 8000);
    wheel.classList.add('rotated');
  }
});

<!-- СКРИПТ РУЛЕТКИ -->
$('.close-popup, .btn-popup').click(function (e) {
  e.preventDefault();
  $('.wheel__wrapper').slideUp();/* обертка с барабаном */
  $('.order').slideDown();/* обертка с формой заказа */
  $('.overlay').fadeOut();
});

$('.btn-popup').click(function () {
  $('.bottom-link').attr('href', 'https://pillsenmag.com/click.php?lp=1&place=bottom');
  localStorage.setItem('remember', '1'),
    $('.prize').slideUp(),
    $('.order').slideDown(),
    $('.bottom-link').text('Commander à 50% de réduction'),
    $('.bottom-link').attr('href', 'https://pillsenmag.com/click.php?lp=1&place=bottom'),
    $('.order').addClass('shown__'),
    localStorage.setItem('shown__', '1');
});

hR = Math.random();

localStorage.getItem('remember') && (
  $('.prize').css('display', 'none'),
    $('.order').css('display', 'block'),
    $('.bottom-link').text('Commander à 50% de réduction'),
    $('.bottom-link').attr('href', 'https://pillsenmag.com/click.php?lp=1&place=bottom')
);

function createSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // отключаем стандартный переход

      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth', block: 'start'
        });
      }
    });
  });
}

function checkInputFocus() {
  const inputs = document.querySelectorAll('.field-gkk input');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      const parent = input.closest('.field-gkk');
      if (parent) {
        parent.classList.add('act-gkk');
      }
    });

    input.addEventListener('blur', () => {
      const parent = input.closest('.field-gkk');
      if (parent) {
        parent.classList.remove('act-gkk');
      }
    });
  });
}

function submitForm() {
  const form = document.querySelector('#contactForm');
  const submitButton = document.querySelector('button[type="submit"]');
  const API_URL = 'https://script.google.com/macros/s/AKfycbxFv0_wavPGkKov0_f1-cIBS9gzZb9rUt7d7PkZHaNjQ2fEw0zvRCNe77EPhQI8xEwojg/exec';

  function padString(value) {
    return value < 10 ? `0${value}` : value.toString();
  }

  function showAlert(message) {
    alert(message);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const now = new Date();

    formData.append('date', `${now}`);
    formData.append(
      'time',
      `${padString(now.getUTCHours())}: ${padString(now.getUTCMinutes())}`
    );

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      if (response.status === 200) {
        showAlert('Форма отправлена, смотри таблицу: https://inlnk.ru/yOx2dG');
      } else {
        showAlert('Произошла ошибка при отправке формы');
      }
      submitButton.setAttribute('disabled', 'true');
    } catch (error) {
      showAlert('Submit Error', error.message);
    }
  };

  submitButton.addEventListener('click', submitHandler);
}

checkInputFocus();
createSmoothScroll();
submitForm();
