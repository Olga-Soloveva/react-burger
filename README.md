# react-burger
Автор: Товстая Ольга

## Описание
Приложение с возможностью сделать заказ из предложенных ингредиентов (десктоп-версия). Работаю над проектом в рамках обучения по программе "React-разработчик" в Яндекс Практикуме.

## Посмотреть проект
[https://olga-soloveva.github.io/react-burger/]

## Функциональность проекта

__Стэк__: HTML/CSS, JavaScript, React, Redux, TypeScript

* Сайт создан через Create React App
* Использованы функциональные компоненты
* Применяются React-хуки, React-dnd 
* Подключено Redux-хранилище (+ Redux-thunk, Redux Toolkit)
* Компоненты и хранилище написаны на TypeScript
* Реализована связка с сервером через Api (ингридиенты) и WebSocket (лента заказов)
* Есть регистрация и авторизация в приложении, а также реализована защита маршрутов от неавторизованных пользователей.


## Будущие доработки
Добавить тесты на Cypress и Jest к приложению.

## Инструкция по развёртыванию и системные требования
`npm install` — установить зависимости   
`npm run start` — запускает проект на локальном сервере. Если проект не запустился автоматически, откройте по ссылке http://localhost:3000/   
`npm run build` — собирает проект для деплоя на сервер (папка build)
