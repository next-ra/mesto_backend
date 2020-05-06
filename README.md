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

#### Реализовано:

### Получить список всех пользователей

GET http://localhost:3000/users

### Создать пользователя

POST http://localhost:3000/users
Content-Type: application/json

{
"name": "Имя пользователя",
"about": "Поле о себе",
"avatar": "https://praktikum.yandex.ru/"
}

### Поиск пользователя по ID

GET http://localhost:3000/users/5eb20071c5bfca31c416c17a

### Обновить данные пользователя

PATCH http://localhost:3000/users/5eb20071c5bfca31c416c17a
Content-Type: application/json

{
"name": "Обновить имя",
"about": "Обновить информацию о себе"
}

### Обновить аватар пользователя по ID

PATCH http://localhost:3000/users/5eb20071c5bfca31c416c17a/avatar
Content-Type: application/json

{
"avatar" : "https://ya.ru"
}

### Удалить пользователя по ID

DELETE http://localhost:3000/users/5eb20071c5bfca31c416c17a

### Ошибка 404

GET http://localhost:3000/abc_xyz
