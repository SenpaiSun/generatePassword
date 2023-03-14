const mainContainer = document.querySelector('.main__result')
const mainContainerList = document.querySelectorAll('.main__result')
const passwordContainer = document.querySelector('.main__container')
const passwordLabel = mainContainer.querySelector('.main__result-password')
const passwordLabelArray = document.querySelectorAll('.main__result-password')
const pushCopy = mainContainer.querySelector('.main__result-push')
const pushCopyArray = document.querySelectorAll('.main__result-push')
const buttonForm = document.querySelector('.main__form')
const buttonGenerate = buttonForm.querySelector('.main__form-generate')
const checkboxNumber = document.querySelector('#input__number')
const checkboxUpperCase = document.querySelector('#input__upper')
const checkboxLowerCase = document.querySelector('#input__lower')
const checkboxArray = document.querySelectorAll('.main__form-value-checkbox')

let valueInput = buttonForm.querySelector('.main__form-value-input')
// Установка дефолт-значения у инпута
valueInput.value = 12
// Константы чекбоксов
const numberPassword = '0123456789'
const upperCasePassword = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCasePassword = 'abcdefghijklmnopqrstuvwxyz'

// Генератор случайных чисел с помощью crypto.getRandomValues
function getRandomIntInclusive(min, max) {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  let randomNumber = randomBuffer[0] / (0xffffffff + 1);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
}

const addListenerCheckbox = () => {
  checkboxArray.forEach((item) => {
    item.addEventListener('click', function() {
      item.toggleAttribute('checked')
    })
  })
}

addListenerCheckbox()

// Функция по проверке чек-боксов и составления набора символов
function checkCheckbox() {
  let checkboxNumberChecked = checkboxNumber.hasAttribute('checked')
  let checkboxUpperCaseChecked = checkboxUpperCase.hasAttribute('checked')
  let checkboxLowerCaseChecked = checkboxLowerCase.hasAttribute('checked')
  let packPassword = ''
  if(checkboxNumberChecked) {
    packPassword += numberPassword
  }
  if(checkboxUpperCaseChecked) {
    packPassword += upperCasePassword
  }
  if(checkboxLowerCaseChecked) {
    packPassword += lowerCasePassword
  }
  if(checkboxNumberChecked) {
    packPassword += numberPassword
  }
  return packPassword
}

// Функция по созданию случайного пароля
function whilePassword(elm) {
  const valueInputCheck = valueInput.value
  let password = ''
    let i = 0;
    let arrayPassword = checkCheckbox()
    if(valueInputCheck < 20) {
      while(i < valueInputCheck) {
        password += arrayPassword[getRandomIntInclusive(0, arrayPassword.length - 1)]
        i++
      }
      elm.textContent = password
    } else {
      while(i < 20) {
        password += arrayPassword[getRandomIntInclusive(0, arrayPassword.length - 1)]
        i++
      }
      elm.textContent = password
    }

  }

// Функция генерации случайного пароля и добавление в верстку
function createRandomPassword() {
  passwordLabelArray.forEach((item) => {
    whilePassword(item)
})
}

// Сабмит формы-отмена отправки данных, добавления класса на показ блока с паролями
buttonForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  passwordContainer.classList.add('main__container-activate')
  createRandomPassword()
})

// Установка обработчиков на каждый блок с паролем, для отображение пуша о копировании
const renderPassword = (evt) => {
  mainContainerList.forEach((item) => {
    const buttonCopy = item.querySelector('.main__result-copy')
    buttonCopy.addEventListener('click', function (evt) {
      evt.preventDefault()
      item.querySelector('.main__result-push').classList.add('main__result-push-activate')
    })
  })
}

buttonGenerate.addEventListener('click', function(evt) {
  pushCopyArray.forEach((item) => {
    item.classList.remove('main__result-push-activate')
  })
})

renderPassword()
