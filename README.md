# Проект nodejs-rabbitmq Демонстрационный Проект
Привет! Этот проект представляет собой демонстрационный проект, созданный с использованием NodeJS и RabbitMQ
[![Node.js](https://img.shields.io/badge/Node.js-v14.17-green)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/Express.js-v4.17-yellow)](https://expressjs.com/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-v3.9-orange)](https://www.rabbitmq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
### Описание проекта:
Проект предусматривает механизм асинхронной обработки HTTP запросов. Предусмотрен следующий алгоритм работы:
• Express.js предоставляет форму для отправки HTTP POST запроса, с последующим его приемом.
• Запрос ретранслируется в microservice-m1, где формирутся задание в очереди RabbitMQ, и поток M1 ставиться на ожидание результата.
• Для обработки заданий RabbitMQ паралельно с сервером Express.js запускается поток M2 из microservice-m2.
• После завершения обработки данных потоком M2 потоку M1 возвращается результат, откуда он возвращается в виде ответа для POST запрос на страницу пользователя.

Проект создан исключительно в учебных и демонстрационных целях. Все данные, используемые в приложении, предназначены исключительно для демонстрации функциональности и не несут ни какой реальной информации.

[Видео демонстрация раздела с новостями](https://youtu.be/uW_1w-UsT6g)

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