const mainContainer = document.querySelector('.main__result')
const mainContainerList = document.querySelectorAll('.main__result')
const passwordContainer = document.querySelector('.main__container')
const passwordLabel = mainContainer.querySelector('.main__result-password')
const pushCopy = mainContainer.querySelector('.main__result-push')
const buttonForm = document.querySelector('.main__form')
const buttonGenerate = buttonForm.querySelector('.main__form-generate')
const checkboxNumber = document.querySelector('#input__number')
const checkboxUpperCase = document.querySelector('#input__upper')
const checkboxLowerCase = document.querySelector('#input__lower')

let valueInput = buttonForm.querySelector('.main__form-value-input')
// Установка дефолт-значения у инпута
valueInput.value = 12
// 72 символа
const symbolList = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const letterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

// Генератор случайных чисел с помощью crypto.getRandomValues
function getRandomIntInclusive(min, max) {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  let randomNumber = randomBuffer[0] / (0xffffffff + 1);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
}

// Функция генерации случайного пароля
function createRandomPassword() {
  let checkboxNumberChecked = checkboxNumber.hasAttribute('checked')
  let checkboxUpperCaseChecked = checkboxUpperCase.hasAttribute('checked')
  let checkboxLowerCaseChecked = checkboxLowerCase.hasAttribute('checked')
  let password = ''
  let i = 0;
  const valueInputCheck = valueInput.value
    while(i < valueInputCheck) {
      if(checkboxNumberChecked && checkboxUpperCaseChecked && checkboxLowerCaseChecked) {
        password += symbolList[getRandomIntInclusive(0, 71)]
        i++
      } else if (checkboxNumberChecked && !checkboxUpperCaseChecked && checkboxLowerCaseChecked) {
        password += symbolList[getRandomIntInclusive(0, 71)].toLowerCase()
        i++
      } else if (checkboxNumberChecked && checkboxUpperCaseChecked && !checkboxLowerCaseChecked) {
        password += symbolList[getRandomIntInclusive(0, 71)].toUpperCase()
        i++
      } else if (!checkboxNumberChecked && checkboxUpperCaseChecked && checkboxLowerCaseChecked) {
        password += letterList[getRandomIntInclusive(0, 51)]
        i++
      }
}
return password
}


console.log(createRandomPassword())
createRandomPassword()

// Сабмит формы-отмена отправки данных, добавления класса на показ блока с паролями
buttonForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  passwordContainer.classList.add('main__container-activate')
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

renderPassword()
