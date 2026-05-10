# 📝 Генератор Рукописных Конспектов - Установка Вариант 2 (Локально)

## ❌ Что Не Хватает?

Проект сейчас **неполный**. Вот что нужно добавить:

| Файл/Папка | Статус | Примечание |
|-----------|--------|-----------|
| `package.json` | ❌ Отсутствует | Нужен для управления зависимостями |
| `.env.example` | ❌ Отсутствует | Шаблон для переменных окружения |
| `.gitignore` | ❌ Отсутствует | Чтобы не загружать node_modules и .env |
| `README.md` | ❌ Отсутствует | Описание проекта |
| Babel конфиг | ❌ Отсутствует | `.babelrc` для транспиляции JSX |
| Webpack конфиг | ❌ Отсутствует | `webpack.config.js` (если нужен build) |
| `src/` папка | ❌ Отсутствует | Структурировать код |
| `.github/workflows` | ❌ Отсутствует | CI/CD для автоматизации |

---

## 🚀 ВАРИАНТ 2: Локальная Установка (React + Node.js)

### Шаг 1️⃣ Подготовка на GitHub

```bash
# 1. Создай новый репозиторий на GitHub
# Назва: "notes-generator-app" или "конспект-генератор"
# Description: "AI-powered handwritten notes generator with Claude API"
# Visibility: Public (если хочешь, чтобы другие видели)

# 2. Клонируй репозиторий локально
git clone https://github.com/твой-username/notes-generator-app.git
cd notes-generator-app
```

---

### Шаг 2️⃣ Инициализация Node.js Проекта

```bash
# 1. Создай package.json
npm init -y

# 2. Установи необходимые зависимости
npm install react react-dom
npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-react @babel/preset-env
npm install --save-dev webpack-dev-server
npm install --save-dev @vitejs/plugin-react vite
npm install dotenv  # для переменных окружения
```

**Что это дает:**
- `react` + `react-dom` — фреймворк
- `webpack` — сборка проекта
- `babel` — транспиляция JSX → JavaScript
- `vite` — быстрый dev-server
- `dotenv` — работа с `.env` файлом для API ключа

---

### Шаг 3️⃣ Структура Проекта

Создай эту структуру папок:

```
notes-generator-app/
├── src/
│   ├── components/
│   │   └── NotesGenerator.jsx      ← Твой компонент отсюда
│   ├── App.jsx                     ← Root компонент
│   ├── index.jsx                   ← Entry point
│   └── styles/
│       └── main.css                ← Стили
├── public/
│   └── index.html                  ← HTML контейнер
├── .env.example                    ← Шаблон переменных
├── .env                            ← (добавить в .gitignore!)
├── .gitignore                      ← Файлы, которые не коммитить
├── package.json                    ← Конфиг зависимостей
├── vite.config.js                  ← Конфиг Vite
├── babel.config.js                 ← Конфиг Babel
├── README.md                       ← Документация
└── LICENSE                         ← Лицензия (MIT)
```

---

### Шаг 4️⃣ Конфигурационные Файлы

#### **4.1 `.env.example`** (коммитить в GitHub)

```env
# Anthropic Claude API Key
# Получи на https://console.anthropic.com/
VITE_ANTHROPIC_API_KEY=your-api-key-here

# (опционально)
VITE_APP_NAME="Notes Generator"
VITE_API_URL="https://api.anthropic.com/v1/messages"
```

#### **4.2 `.gitignore`** (НЕ коммитить конфиденциальное)

```
# Зависимости
node_modules/
package-lock.json
yarn.lock

# Переменные окружения
.env
.env.local
.env.*.local

# Сборка
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Логи
npm-debug.log*
yarn-debug.log*
```

#### **4.3 `package.json`** (основные скрипты)

```json
{
  "name": "notes-generator-app",
  "version": "1.0.0",
  "description": "AI-powered handwritten notes generator",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "vite"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0",
    "@babel/core": "^7.22.0",
    "@babel/preset-react": "^7.22.0",
    "@babel/preset-env": "^7.22.0",
    "babel-loader": "^9.1.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0"
  }
}
```

#### **4.4 `vite.config.js`** (конфиг для dev-сервера)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

---

### Шаг 5️⃣ Переделка Кода для React-проекта

#### **5.1 `src/index.jsx`** (entry point)

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

#### **5.2 `src/App.jsx`** (main component)

```javascript
import NotesGenerator from './components/NotesGenerator'

function App() {
  return (
    <div className="app">
      <NotesGenerator />
    </div>
  )
}

export default App
```

#### **5.3 `src/components/NotesGenerator.jsx`** (твой компонент)

⚠️ **Важно! Нужно обновить:**

```javascript
// БЫЛО:
const response = await fetch("https://api.anthropic.com/v1/messages", {
  headers: {
    "Content-Type": "application/json",
  },

// ДОЛЖНО БЫТЬ:
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
if (!apiKey) {
  throw new Error('API ключ не найден. Проверь .env файл')
}

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,  // ← ДОБАВИТЬ ЭТО!
    "anthropic-version": "2023-06-01"
  },
```

#### **5.4 `public/index.html`** (HTML контейнер)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Генератор Рукописных Конспектов</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
</body>
</html>
```

---

### Шаг 6️⃣ Получение API Ключа от Anthropic

1. Перейди на **https://console.anthropic.com/**
2. Создай аккаунт или войди
3. Перейди в **"API Keys"** → **"Create Key"**
4. Скопируй ключ
5. Создай файл `.env` (НЕ КОММИТИТЬ!):

```env
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
```

⚠️ **НИКОГДА не публикуй настоящий ключ в GitHub!**

---

### Шаг 7️⃣ Локальный Запуск

```bash
# 1. Установи зависимости (только один раз)
npm install

# 2. Запусти dev-сервер (будет работать на http://localhost:3000)
npm run dev

# 3. Открой http://localhost:3000 в браузере
```

**Ожидаемый результат:**
- ✅ Приложение загружается
- ✅ Можешь вводить текст
- ✅ Нажимаешь "Создать конспект"
- ✅ Вызывается Claude API
- ✅ Появляется рукописный конспект на canvas

---

### Шаг 8️⃣ Сборка для Production (опционально)

```bash
# 1. Создай оптимизированную сборку
npm run build

# 2. Проверь результат (dist/ папка)
npm run preview

# 3. Готово к развертыванию на Vercel, Netlify или GitHub Pages
```

---

### Шаг 9️⃣ Загрузка на GitHub

```bash
# 1. Добавь все файлы (кроме .gitignore)
git add .

# 2. Первый коммит
git commit -m "Initial commit: Notes Generator with React and Claude API"

# 3. Загрузи в GitHub
git push -u origin main

# 4. Создай .env файл локально (не в GitHub!)
echo "VITE_ANTHROPIC_API_KEY=sk-ant-xxx" > .env
```

---

### Шаг 🔟 README.md (для GitHub)

Создай файл `README.md`:

```markdown
# 📝 Notes Generator - Генератор Рукописных Конспектов

Приложение на React, которое превращает текст в красивые рукописные конспекты в стиле школьной тетради с помощью Claude AI.

## 🎯 Функции

- ✨ AI-powered структурирование текста
- 📝 Красивые рукописные конспекты на canvas
- 🎨 Выделения, маркеры, красные кружки вокруг цифр
- 📥 Скачивание в PNG
- 📱 Отзывчивый дизайн

## 🚀 Быстрый Старт

### Требования
- Node.js v16+
- npm или yarn

### Установка

\`\`\`bash
git clone https://github.com/твой-username/notes-generator-app.git
cd notes-generator-app

npm install

# Создай .env файл
cp .env.example .env
# Добавь свой API ключ: VITE_ANTHROPIC_API_KEY=sk-ant-xxx

npm run dev
\`\`\`

Приложение откроется на **http://localhost:3000**

## 🔑 API Key

Получи бесплатный API ключ:
1. Перейди на https://console.anthropic.com/
2. Создай аккаунт
3. Сгенерируй API Key
4. Добавь в `.env` файл

## 📦 Tech Stack

- React 18
- Vite
- Canvas API для рисования
- Claude API (Anthropic)

## 📄 License

MIT
```

---

## 📊 Чек-лист Готовности

Перед тем как загружать на GitHub:

- [ ] Папка `src/` с компонентами создана
- [ ] `package.json` с зависимостями написан
- [ ] `vite.config.js` создан
- [ ] `.env.example` создан (БЕЗ реального ключа!)
- [ ] `.gitignore` создан (включает `.env`)
- [ ] `NotesGeneratorApp.jsx` обновлен с API ключом из .env
- [ ] `README.md` написан
- [ ] `npm install` выполнена
- [ ] `npm run dev` работает локально
- [ ] `git push` отправлено в GitHub

---

## ⚡ Самые Частые Ошибки

| Ошибка | Решение |
|--------|---------|
| "Cannot find module 'react'" | `npm install` — установи зависимости |
| "API key not found" | Создай `.env` с `VITE_ANTHROPIC_API_KEY` |
| "CORS error" | Добавь заголовки в fetch запрос (см. Шаг 5.3) |
| "Blank page after npm run dev" | Проверь, что `public/index.html` существует |
| ".env загружен в GitHub" | Добавь `.env` в `.gitignore` немедленно! |

---

## 🤔 Вопросы?

Если что-то не работает:

1. Проверь ошибки в консоли (F12)
2. Убедись, что API ключ валиден на https://console.anthropic.com/
3. Проверь, что все файлы на месте (`npm install`, `package.json`)
4. Очисти кэш: `rm -rf node_modules && npm install`

**Успехов с развертыванием!** 🚀
