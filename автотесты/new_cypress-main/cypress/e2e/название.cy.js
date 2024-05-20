describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/');// Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // цвет кнопки восст.пароля

         cy.get('#mail').type('german@dolnikov.ru') // Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1') // Ввели верный пароль
         cy.get('#loginButton').click(); // Нажать Войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // После авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден для пользователя
     })


        it('проверка логики восстановления пароля', function () {
             cy.visit('https://login.qa.studio/');// Зашли на сайт
             cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // цвет кнопки восст.пароля
    
             cy.get('#forgotEmailButton').click(); // Нажать «Забыли пароль»
             cy.get('#mailForgot').type('vikaprokopeva@yandex.ru') // Ввести любой имейл
             cy.get('#restoreEmailButton').click(); // нажать на кнопку Отправить код
             cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //Проверка, что получили нужный текст
             cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
             cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден для пользователя
            })

            it('проверка на негативный кейс авторизации', function () {
                cy.visit('https://login.qa.studio/');// Зашли на сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // цвет кнопки восст.пароля
       
                cy.get('#mail').type('german@dolnikov.ru') // Ввести правильный логин
                cy.get('#pass').type('12345') // Ввести НЕ правильный пароль
                cy.get('#loginButton').click(); // Нажать войти
                cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Проверка, что получили нужный текст
                cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден для пользователя
               })

               it('проверка на негативный кейс авторизации 2', function () {
                cy.visit('https://login.qa.studio/');// Зашли на сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // цвет кнопки восст.пароля
       
                cy.get('#mail').type('vikaprokopeva@yandex.ru') // Ввести НЕ правильный логин
                cy.get('#pass').type('iLoveqastudio1') // Ввести правильный пароль
                cy.get('#loginButton').click(); // Нажать войти
                cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Проверка, что получили нужный текст
                cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден для пользователя
               })

               it('проверка на негативный кейс валидации', function () {
                cy.visit('https://login.qa.studio/');// Зашли на сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // цвет кнопки восст.пароля
       
                cy.get('#mail').type('germandolnikov.ru') // Ввести логин без @
                cy.get('#pass').type('iLoveqastudio1') // Ввести правильный пароль
                cy.get('#loginButton').click(); // Нажать войти
                cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); //Проверка, что получили нужный текст
                cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден для пользователя
               })

               it('проверку на приведение к строчным буквам в логине', function () {
                cy.visit('https://login.qa.studio/');// Зашли на сайт
                cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // цвет кнопки восст.пароля
       
                cy.get('#mail').type('GerMan@Dolnikov.ru') // Ввести логин GerMan@Dolnikov.ru
                cy.get('#pass').type('iLoveqastudio1') // Ввести правильный пароль
                cy.get('#loginButton').click(); // Нажать войти
                cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Проверка, что получили нужный текст
                cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден для пользователя
               })



             describe('Покупка аватара', function () {                               // название набора тестов
                it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
                     cy.visit('https://pokemonbattle.me/');                          // переходим на сайт https://pokemonbattle.me/
                     cy.get('input[type="email"]').type('vikaprokopeva@yandex.ru');      // вводим логин
                     cy.get('input[type="password"]').type('Qwedx54');    // вводим пароль
                     cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
                     cy.get('.header__btns > [href="/shop"]').click();               // нажимаем кнопку Магазин
                     cy.get('.available > button').first().click();                   // кликаем по кнопке Купить у первого доступного аватара
                     cy.get('.credit').type('4620869113632996');                     // вводим номер карты
                     cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
                     cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
                     cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
                     cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
                     cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
                     cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
                     cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
                 });
             });
             
            }) 

