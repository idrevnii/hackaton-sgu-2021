# Запуск

Для запуска этого проекта необходимо иметь установленный NodeJS.

1. Запустить в корневой папке проекта, в командной строке: `npm install`
2. Инициализировать базу данных: `npx prisma migrate dev --name init`
3. Запустить проект: `npm run start`
4. Подождать пока в консоли не выйдет `Ended!`. После окончания результат можно посмотреть в `/prisma/db.db`
