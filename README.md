# DeleGo

<img src="https://github.com/karol-jedrzejak/karol-jedrzejak.github.io/blob/master/src/assets/projects/14.jpg" height="400">

## Tech Stack
![Laravel](https://img.shields.io/badge/Laravel-EF3B2D?style=flat&logo=laravel&logoColor=white) ![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![API](https://img.shields.io/badge/API-REST-0A66C2?style=flat) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

## Description
Full-stack application with a separate backend built in Laravel 12 API with MySQL, Redis and Docker, and a frontend developed in React, TypeScript, and Tailwind CSS. Application designed to simplify and automate the calculation of business trip expenses. The app ensures accurate reimbursement amounts and saves time for employees and finance teams. Each employee can have different permissions and use selected application modules.

## Installation & Run

To be updated..

To Setup backend:
```
cd backend-laravel
cp .env.example .env
php artisan key:generate
composer install
npm install
docker compose up -d --build  
```
To enter tinker and seed database:
```
docker exec -it laravel_app php artisan tinker
php artisan migrate
php artisan db:seed
```

To start Server:
```
cd frontend-react
npm install
npm run dev  
```



