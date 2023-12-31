# Проект nodejs-rabbitmq Демонстрационный Проект
Привет! Этот проект представляет собой демонстрационное решение, созданное с использованием NodeJS и RabbitMQ

[![Node.js](https://img.shields.io/badge/Node.js-v20.10-green)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18-yellow)](https://expressjs.com/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-v3.12-orange)](https://www.rabbitmq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Описание проекта:
Проект предусматривает механизм асинхронной обработки HTTP запросов. Предусмотрен следующий алгоритм работы:

• Express.js предоставляет форму для отправки HTTP POST запроса, с последующим его приемом.

• Запрос ретранслируется в microservice-m1, где формируется задание в очереди RabbitMQ, и поток M1 ставиться на ожидание результата.

• Для обработки заданий RabbitMQ паралельно с сервером Express.js запускается поток M2 из microservice-m2.

• После завершения обработки данных потоком M2 результат направляется в очередь RabbitMQ

• Поток M1, находящийся на ожидании результата, откуда он возвращается в виде ответа для POST запрос на страницу пользователя.

Проект создан исключительно в учебных и демонстрационных целях. Все данные, используемые в приложении, предназначены исключительно для демонстрации функциональности и не несут ни какой реальной информации.

[Видео демонстрация](https://youtu.be/FgBYzhxPQTY)

### Как запустить проект локально:

1. Убедитесь, что у вас установлен [Node.js](https://nodejs.org/en), [Erlang](https://www.erlang.org/downloads) и [RabbitMQ](https://www.rabbitmq.com/download.html)
2. Склонируйте репозиторий: 
```git clone https://github.com/MTMdasboard/nodejs-rabbitmq.git```
3. Перейдите в каталог проекта: 
```cd nodejs-rabbitmq```
4. Установите зависимости для основного проекта: 
```npm install```
5. Запустите проект 
```npm run start```
6. Откройте страницу в браузере `http://localhost:3000/` и выполните запрос

### Дополнительная информация:

Более подробные инструкции по настройке и запуску проекта можно найти в документации [Erlang](https://www.erlang.org) и [RabbitMQ](https://rabbitmq.com).

### Лицензия:

Этот проект распространяется под лицензией MIT. Подробную информацию можно найти в файле `LICENSE`.
