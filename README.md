### Проектная работа 12

## Сервер для проекта [Место](https://github.com/next-ra/prj11)

### v0.0.1

#### Начало работы:

Убедитесь, что у вас установлен `Node.js`.

Скопируйте проект:

```
git clone https://github.com/next-ra/project12_backend.git
```

Установите зависимсости:

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

- В ответ на запрос GET localhost:3000 сервер вернет фронтенд проекта [Место](https://github.com/next-ra/prj11)

- В ответ на запрос GET localhost:3000/users сервер вернёт JSON-объект всех пользователей

- В ответ на запрос GET localhost:3000/cards сервер вернёт JSON-объект всех карточек

- В ответ на запрос GET localhost:3000/users/8340d0ec33270a25f2413b69, сервер вернёт JSON-объект пользователя с переданным после /users идентификатором

- Если пользователя с запрошенным идентификатором нет, API возвращает 404 статус ответа и JSON: { "message": "Нет пользователя с таким id" }

- При запросе на несуществующий адрес, API возвращает 404 статус ответа и JSON: { "message": "Запрашиваемый ресурс не найден" }
