'use strict'

let numberTel = document.querySelector('.number-tel')
let numberLine = 0


let burgerIcon = document.querySelector('.burger-icon');
burgerIcon.onclick = function () {
    console.log('q')
}

;(function () {
    let questions = document.querySelectorAll('.test-question')
    let buttonNextQuestion = document.querySelector('.test-footer .next-question')
    let counterForText = document.querySelector('#counterValue')
    let buttonScrollDown = document.querySelector('.chose-appart')
    let buttonScrollToTest = document.querySelector('.scroll-to-test')
    let slide = 0
    let flag = false

    buttonScrollToTest.onclick = function (event) {
        document.querySelector('.test').scrollIntoView()
    }

    buttonScrollDown.onclick = function (event) {
        document.querySelector('.catalog').scrollIntoView()
    }

    function colorForRightValue() {

        let imgs = questions[slide].querySelectorAll('img')

        let inputs = questions[slide].querySelectorAll('input')
        for (let input of inputs) {
            if (!input.checked) {
                document.querySelector('.next-question').style.color = 'gray'
                document.querySelector('.next-question').style.cursor = 'not-allowed'
            }
        }

        for (let img of imgs) {
            let label = img.parentElement

            label.onclick = function () {
                document.querySelector('.next-question').style.color = '#2A94E2'
                document.querySelector('.next-question').style.cursor = 'pointer'

                console.log(this)
                for (let input of inputs) {
                    input.parentElement.lastElementChild.style.color = 'black'
                    input.nextElementSibling.nextElementSibling.style.backgroundColor = 'transparent'
                }
                this.firstElementChild.checked = true
                if (this.firstElementChild.checked) {
                    this.lastElementChild.style.backgroundColor = '#2A94E2'
                    this.lastElementChild.style.color = 'White'
                }
            }
        }
    }

    colorForRightValue()

    buttonNextQuestion.onclick = function (event) {
        let inputs = questions[slide].querySelectorAll('input')
        for (let elem of inputs) {
            if (elem.checked) {
                questions[slide++].classList.remove('active')
                questions[slide].classList.add('active')
                counterForText.innerHTML = slide + '/5'
                if (slide == 5) {
                    buttonNextQuestion.onclick = null
                }
                colorForRightValue()
            }
        }
    }

})();

function createElement(nameTag) {
    return document.createElement(nameTag)
}


function createApartment(srcF, nameF, lotF, priceF, m2F, squareF, floorF) {
    let div = document.createElement('div')
    div.className = 'apartment';
    let img = document.createElement('img')
    img.src = srcF
    div.append(img)

    let a = createElement('a')
    a.className = 'apartment-block-name'
    let apartmentName = createElement('p');
    apartmentName.className = 'apartment-name'
    apartmentName.innerHTML += nameF
    a.append(apartmentName)
    let lotHTML = createElement('span')
    lotHTML.className = 'lot'
    lotHTML.innerHTML = 'Лот № ' + lotF

    apartmentName.append(lotHTML)
    div.append(a)

    let apartmentBlockInfo = createElement('div')
    apartmentBlockInfo.className = 'apartment-block-info'
    div.append(apartmentBlockInfo)

    let price = createElement('p')
    price.className = 'price'
    price.innerHTML += priceF
    let m2 = createElement('span')
    m2.className = 'price-m2'
    m2.innerHTML += m2F
    price.append(m2)
    apartmentBlockInfo.append(price)

    let square = createElement('p')
    square.className = 'square';
    square.innerHTML = squareF;
    let floor = createElement('p')
    floor.className = 'floor'
    floor.innerHTML = floorF
    square.append(floor)
    apartmentBlockInfo.append(square)

    let button = createElement('button')
    button.className = 'let-meeting'
    button.innerHTML = 'Назначить просмотр'
    div.append(button)
    document.querySelector('.catalog-apartments').append(div)
}

createApartment(
    'img/apartments/Rectangle 2.1 (2).png',
    'Апартаменты в «Neva Towers»',
    '4548',
    '19 000 000 ₽',
    '475 000 ₽ за м²',
    'Площадь 40 м²',
    'Этаж 16'
)
createApartment(
    'img/apartments/Rectangle 2.1 (3).png',
    'Апартаменты в комплексе «Федерация»',
    '4549',
    '59 500 000 ₽',
    '540 909 ₽ за м²',
    'Площадь 110 м²',
    'Этаж 84'
)
createApartment(
    'img/apartments/Rectangle 2.1 (4).png',
    'Апартаменты в «башне ОКО»',
    '4550',
    '34 900 000 ₽',
    '396 590 ₽ за м²',
    'Площадь 88 м²',
    'Этаж 29'
)


;(function () {
    //Переключение кнопок (Переключение цвета при фокусе)
    let catalogBody = document.querySelector('.catalog-body')
    let tabs = document.querySelectorAll('.tab')
    let inputs = document.querySelectorAll('.tab input')
    let labels = document.querySelectorAll('.tab label')
    for (let input of inputs) {
        input.dataset.checked = 'false'
        input.onfocus = function () {
            for (let label of labels) {
                label.style.backgroundColor = 'white'
            }
            let label = this.previousElementSibling
            label.style.backgroundColor = '#2A94E2'
        }
    }

    inputs[0].checked = true // По умолчанию выбранный инпут и цвет
    inputs[0].previousElementSibling.style.backgroundColor = '#2A94E2'

    //Сортировка блоков
    // Показ блоков
    let apartments = document.querySelectorAll('.catalog-apartments .apartment');//Блоки квартир
    for (let input of inputs) {
        input.oninput = function (event) {
            if (this.id == 'catalog-all') {
                document.querySelector('.apartments-more').style.display = 'block'
                for (let apartment of apartments) {
                    apartment.style.display = 'block'
                }
            } else document.querySelector('.apartments-more').style.display = 'none'
            if (this.id == 'catalog-20-30') {
                showBlock(20, 30)
            }
            if (this.id == 'catalog-30-50') {
                showBlock(30, 50)
            }
            if (this.id == 'catalog-50-100') {
                showBlock(50, 100)
            }
            if (this.id == 'catalog-100') {
                showBlock(100, 100)
            }
        }
    }

    function showBlock(firstNum, lastNum) {
        for (let apartment of apartments) {
            apartment.style.display = 'none'
            let price = apartment.querySelector('.price')
            let first = price.textContent[0] + price.textContent[1]
            if (first >= firstNum && first <= lastNum) {
                apartment.style.display = 'block'
            } else {
                apartment.style.display = 'none'
            }
        }
    }

    let buttonApartmentsMore = document.querySelector('.apartments-more')
    //console.log(catalogBody.scrollHeight)
    buttonApartmentsMore.onclick = function hide() {
        catalogBody.style.height = catalogBody.scrollHeight + 'px'
        this.innerHTML = 'Скрыть'
        this.onclick = function () {
            catalogBody.style.height = '1275px'
            this.innerHTML = 'Показать ещё'
            this.onclick = hide
        }
    }
})();


//Работа галереи
;(function () {
    let fullSizeImg = document.querySelectorAll('.gallery-main-img .slide');
    let miniSizeImg = document.querySelectorAll('.gallery-main-miniature .miniature-slide');
    //Основное окно
    let nextButton = document.querySelector('.next')
    let previousButton = document.querySelector('.prev')
    //Миниатюра
    let nextButtonMini = document.querySelector('.nextMini')
    let previousButtonMini = document.querySelector('.prevMini')
    let X = 0
    let miniX = 0
    //Реализация кнопок и таймера
    // let timer = setInterval(function () {
    //     X -= 555
    //
    //     for (let img of fullSizeImg) {
    //         img.style.transform = 'translateX(' + X + 'px)'
    //     }
    //     if (X == -2220) {
    //         X = 555
    //     }
    // }, 2200)

    // nextButton.onclick = function () {
    //     X -= 555
    //     console.log(X)
    //     for (let i = 0; i < fullSizeImg.length; i++) {
    //         fullSizeImg[i].style.transform = 'translateX(' + X + 'px)'
    //     }
    //     if (X == -2220) {
    //         X = 555
    //     }
    //
    // }
    // previousButton.onclick = function () {
    //     console.log(X)
    //     if (X == 0) {
    //         X = -2220
    //     }
    //     X += 555
    //     console.log('prev')
    //     for (let img of fullSizeImg) {
    //         img.style.transform = 'translateX(' + X + 'px)'
    //     }
    //
    // }

    nextButtonMini.onclick = function () {
        if (miniX == -142) {
            console.log('q')
            miniX = 0
        }
        miniX -= 142
        for (let img of miniSizeImg) {
            img.style.transform = 'translateX(' + miniX + 'px)'
        }

    }
    previousButtonMini.onclick = function () {
        for (let img of miniSizeImg) {
            img.style.transform = 'translateX(' + 0 + 'px)'
        }

    }

    //Проставка data-артибута
    let axisX = 0
    let axisMiniX = 0
    for (let i = 1; i < fullSizeImg.length + 1; i++) {
        fullSizeImg[i - 1].dataset.num = i
        miniSizeImg[i - 1].dataset.num = i

        fullSizeImg[i - 1].dataset.axisX = axisX
        miniSizeImg[i - 1].dataset.axisX = axisX
        miniSizeImg[i - 1].dataset.axisMiniX = axisMiniX
        axisMiniX -= 130
        axisX -= 555

    }
    // fullSizeImg[0].style.display = 'block';
    miniSizeImg[0].firstElementChild.style.border = '3px solid #2A94E2'
    for (let miniImg of miniSizeImg) {
        miniImg.onclick = function (event) {
            for (let img of fullSizeImg) {
                if (img.dataset.num == this.dataset.num) {
                    let dataAxisX = this.dataset.axisX
                    X = +dataAxisX
                    for (let img of fullSizeImg) {
                        img.style.transform = 'translateX(' + dataAxisX + 'px)'
                    }

                    for (let img of miniSizeImg) {
                        img.firstElementChild.style.border = 'none'
                    }
                    this.firstElementChild.style.border = '3px solid #2A94E2'

                }
            }
        }
    }

})();

//Работа с модальный окном заявки
;(function () {
    let windowModal = document.querySelector('.catalog-modal')
    let inputName = document.querySelector('#name')
    let inputEmail = document.querySelector('#email')
    let inputPhone = document.querySelector('#phoneNumber')
    let sendButton = document.querySelector('.contact-send')
    let exitButton = document.querySelector('.exit')
    let blockThanks = document.querySelector('.thanks')
    let buttonGetApplication = document.querySelectorAll('.let-meeting')

//-------------------------------
    // Появление модального окна
    for (let button of buttonGetApplication) {
        button.onclick = function buttonGetApplication() {
            windowModal.style.opacity = '1'
            windowModal.style.visibility = 'visible'
        }
    }
    //Выход из модального окна
    sendButton.onclick = function send(event) {
        event.preventDefault()

        function clue() {
            let div = document.createElement('div')
            div.innerHTML = 'Обязательно для заполнения'
            div.className = 'clue'
            return div
        }

        if (inputName.value.length != 0 && inputEmail.value.length != 0 && inputPhone.value.length != 0) {
            ;(function resetBackground() {
                inputName.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
                inputEmail.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
                inputPhone.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            })();
            windowModal.style.opacity = '0'
            blockThanks.style.visibility = 'visible'
            blockThanks.style.opacity = '1'
            setTimeout(function () {
                windowModal.style.visibility = 'hidden'
                blockThanks.style.opacity = '0'
                setTimeout(() => blockThanks.style.visibility = 'hidden', 3000)
            }, 3000)
        } else {
            if (inputName.value.length == 0) {
                inputName.style.backgroundColor = 'rgba(255,0,0, .7)'
            } else inputName.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'

            if (inputEmail.value.length == 0) {
                inputEmail.style.backgroundColor = 'rgba(255,0,0, .7)'

            } else inputEmail.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'

            if (inputPhone.value.length == 0) {
                inputPhone.style.backgroundColor = 'rgba(255,0,0, .7)'
            } else inputPhone.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        }
    }
    exitButton.onclick = function () {
        windowModal.style.opacity = '0'
        setTimeout(() => windowModal.style.visibility = 'hidden', 1000)
    }
    windowModal.onclick = function (event) {

    }
//-------------------------------


    inputPhone.addEventListener('input', function () {
        if (this.value.length == 1 || this.value.length == 2) {
            this.value = '+7'
        }
        if (this.value.length > 12) {
            console.log()
            let arr = [...this.value]
            arr.splice(-1, 1)
            this.value = arr.join('')
        } else {
            let str = this.value
            this.value = str.replace(/[^/+\d]/g, '')}

    })

    /*Старая версия до изучения регулярок*/
//     let justNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+']
//     let inputPhoneDynamic = 'q'
//
//     inputPhone.onclick = function () {
//         if (this.value.length == 0) {
//             this.value = '+7'
//         }
//     }
//     //Проверка на ввод цифр
//     inputPhone.oninput = function (event) {
//         let lastNum = this.value[this.value.length - 1]
//         let flag = false
//         //Проверка ввода цифр
//         for (let num of justNumber) {
//             if (num == this.value[this.value.length - 1]) {
//                 flag = true
//             }
//         }
//         flag != true ? this.value = this.value.split('').splice(0, this.value.length - 1).join('') : false
//
//
//
//         // ------------
//         // let arr = this.value.split('')
//         // console.log(arr)
//         // if (arr.length == 3) {
//         //     arr.push(' ')
//         //     console.log('q')
//         // }
//         // this.value = arr.join('')
//
//         //Удаление цирфры
//     }

}());


//Работа бокового меню
;(function () {
    let menu = document.querySelector('.side-menu')
    let buttonClose = document.querySelector('#menu-close')
    let buttonOpen = document.querySelector('.burger-menu')

    buttonOpen.onclick = function () {
        menu.style.left = '0'
    }
    buttonClose.onclick = function () {
        menu.style.left = '-100%'
    }
}())

//Работа с шапкой
;(function () {
    let header = document.querySelector('.menu')
    console.log(header.clientWidth)
    let flag = true
    let flagForScroll = false
    window.addEventListener('scroll', function checkScroll() {
        let buttonUP = document.querySelector('.scroll-up')
        if (this.scrollY > 301 && flagForScroll === false) {
            console.log(this.scrollY)
            buttonUP.style.visibility = 'visible'
            console.log('q')
            setTimeout(function () {
                buttonUP.style.opacity = '1'
            }, 100)
            flagForScroll = true
            console.log(flagForScroll)
            buttonUP.addEventListener('transitionend', function () {
            })
            // this.removeEventListener('scroll', checkScroll)
        }


        if (this.scrollY < 299 && flagForScroll === true) {
            // header.style.position = 'relative'
            // header.style.backgroundColor = 'transparent'
            buttonUP.style.opacity = '0'
            buttonUP.addEventListener('transitionend', function () {
                this.style.visibility = 'hidden'
                flagForScroll = false
            })
            // setTimeout(function () {
            //     buttonUP.style.visibility = 'hidden'
            // }, 300)
        }
    })

}())

let scrollUp = document.querySelector('.scroll-up')
scrollUp.onclick = function () {
    document.querySelector('html').scrollTo(0, 0)
}


let div = document.createElement('button')
div.innerText = 'Узнать'
div.style.position = 'absolute'
div.style.top = '0'
div.style.left = '0'
console.log(document.querySelector('aside'))
document.querySelector('aside').append(div)

div.onclick = function () {
    console.log(document.documentElement.scrollTop)
}