### Проектная работа 15

### v0.1.2

## Проект [mesto-praktikum.ga](https://mesto-praktikum.ga/)

## IP-адрес: http://84.201.143.63/

### Используемые технологии:

JS, GIT, node.js, express.js, mongoose, mongoDB

#### Начало работы:

Убедитесь, что у вас установлен `Node.js`.

Скопируйте проект:

```
git clone https://github.com/next-ra/project12_backend.git
```

Установите зависимости:

```
npm i
```

#### Используйте следующие команды:

Запуск сервера:

```
 npm run start
```

Запуск сервера с функцией "hot reload":

```
npm run dev
```

### Реализовано:

#### Создать пользователя

**POST** /signup

_Content-Type: application/json_

```
{
"name": "Zak De La Rocha",
"about": "Musician",
"avatar": "https://praktikum.yandex.ru/",
"email": "Zak@yandex.ru",
"password": "password123"
}
```

#### Авторизация пользователя

**POST** /signin

_Content-Type: application/json_

```
{
  "email": "Zak@yandex.ru",
  "password": "password123"
}
```

#### Получить список всех пользователей

**GET** /users

#### Поиск пользователя по ID

**GET** /users/:id

- **Пример удачного запроса:**

  - **Code:** 200 <br />
    **Content:**
    `{ id : 12, name : "Zak De La Rocha", about : "Musician", avatar: "https://praktikum.yandex.ru/", email: "Zak@yandex.ru", password: "password123" }`

- **Ошибка запроса:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Такого пользователя не существует" }`

#### Обновить данные пользователя

**PATCH**
users/me

_Content-Type: application/json_

```
{
"name": "Hermann Hesse",
"about": "Writer"
}
```

#### Обновить аватар пользователя

**PATCH** /users/me/avatar

_Content-Type: application/json_

```
{
"avatar" : "https://yandex.ru"
}
```

#### Удалить пользователя по ID

**DELETE** /users/:id

#### Ошибка 404

**ALL** /abc_xyz
