# Приложение для поиска на GitHub

Это простое приложение React, которое позволяет пользователям искать пользователей или репозитории GitHub и отображать соответствующую информацию.

## Возможности

- Поиск пользователей или репозиториев GitHub
- Отображение полного имени и количества репозиториев для пользователей
- Отображение имени и количества звезд для репозиториев
- Предоставление четкой обратной связи в случаях загрузки, ошибки и отсутствия данных

## Используемые технологии

- <b>React</b>
- <b>TypeScript</b>
- <b>Fetch API</b>

## Начало работы

Чтобы запустить приложение, выполните следующие шаги:

1. Клонируйте репозиторий:

git clone https://github.com/your-username/github-search-app.git

2. Установите зависимости:

cd github-search-app
npm install

3. Запустите сервер разработки:

npm start

Приложение будет доступно по адресу http://localhost:3000.

## Компоненты

Приложение разделено на два основных компонента:

1. Компонент Form: Отвечает за отображение поля поиска и выпадающего списка, а также обработку взаимодействия пользователя.
2. Компонент Result: Отвечает за отображение результатов поиска в зависимости от выбранного пункта (пользователь или репозиторий).

Состояние и логика приложения управляются в компоненте App, который передает необходимые пропсы дочерним компонентам.

## Управление состоянием

Это приложение не использует библиотеку управления состоянием, такую как Redux или Context API. Вместо этого оно управляет состоянием с помощью встроенного хука useState в React и передает необходимое состояние и обработчики событий в виде пропсов дочерним компонентам.

## Заключение

Это приложение для поиска на GitHub демонстрирует использование React и TypeScript для создания простого и функционального приложения. Используя встроенное управление состоянием React и Fetch API, приложение обеспечивает плавный пользовательский опыт для поиска пользователей и репозиториев GitHub.</b>