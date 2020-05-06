### Проектная работа 13

## Сервер для проекта [Место](https://github.com/next-ra/prj11)

### v0.0.3

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

#### Получить список всех пользователей

**GET** /users  

#### Создать пользователя 

**POST** /users
    
*Content-Type: application/json*

```
{
"name": "Zak De La Rocha",
"about": "Musician",
"avatar": "https://praktikum.yandex.ru/"
}
```

#### Поиск пользователя по ID

**GET** /users/:id

* **Пример удачного запроса:**

  * **Code:** 200 <br />
    **Content:** 
`{ 
    id : 12, 
    name : "Zak De La Rocha", 
    about : "Musician", 
    avatar: "https://praktikum.yandex.ru/"
}`
 
* **Ошибка запроса:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Такого пользователя не существует" }`

#### Обновить данные пользователя

**PATCH** 
users/me

*Content-Type: application/json*
```
{
"name": "Hermann Hesse",
"about": "Writer"
}
```
#### Обновить аватар пользователя 

**PATCH**  /users/me/avatar

*Content-Type: application/json*
```
{
"avatar" : "https://yandex.ru"
}
```
#### Удалить пользователя по ID

**DELETE** /users/:id

#### Ошибка 404

**ALL** /abc_xyz
