@echo off
echo.
echo ====================================
echo  Генератор Рукописных Конспектов
echo ====================================
echo.

REM Проверяем наличие Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ОШИБКА: Node.js не установлен!
    echo Скачай и установи с сайта: https://nodejs.org
    echo Выбери версию LTS
    pause
    exit /b 1
)

REM Устанавливаем зависимости если нужно
if not exist "node_modules" (
    echo Первый запуск - устанавливаю зависимости...
    npm install
    echo.
)

REM Запускаем сервер
echo Запускаю сервер...
echo.
node server.js

pause
