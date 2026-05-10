# 📝 Notes Generator - Генератор Рукописных Конспектов

> **AI-powered application that transforms text into beautiful handwritten-style notes**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/react-18.2-61DAFB?logo=react)

## ✨ Features (Функции)

- 🤖 **AI-Powered** — использует Claude API для интеллектуального структурирования
- ✍️ **Рукописный стиль** — красивые конспекты в стиле школьной тетради
- 🎨 **Smart Highlighting** — автоматическое выделение ключевых слов
- 📍 **Key Points** — автоматический поиск важных дат и цифр в красных кружках
- 📥 **Export** — скачивание конспектов в PNG для печати
- 📱 **Responsive** — работает на всех устройствах
- 🚀 **Fast** — ультра-быстрая генерация благодаря Vite
- 🔒 **Secure** — API ключ хранится локально, никогда не коммитится

## 🎯 Как Это Работает?

```
1. Вставляешь текст (лекцию, статью, материал)
   ↓
2. Нажимаешь "Создать конспект"
   ↓
3. Claude AI анализирует текст и структурирует его
   ↓
4. На экране появляется красивый рукописный конспект
   ↓
5. Скачиваешь конспект в PNG для печати или использования
```

## 🚀 Быстрый Старт

### Требования
- **Node.js** v16 или выше
- **npm** или **yarn**
- **API ключ от Anthropic** (бесплатно на [console.anthropic.com](https://console.anthropic.com))

### Установка (5 минут)

```bash
# 1. Клонируй репозиторий
git clone https://github.com/твой-username/notes-generator-app.git
cd notes-generator-app

# 2. Установи зависимости
npm install

# 3. Создай .env файл (скопируй .env.example)
cp .env.example .env

# 4. Добавь API ключ в .env
# Открой .env и замени:
# VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Запуск

```bash
# Запусти dev-сервер (откроется на http://localhost:3000)
npm run dev
```

**Готово!** 🎉

## 📦 Структура Проекта

```
notes-generator-app/
├── src/
│   ├── components/
│   │   └── NotesGenerator.jsx      # Основной компонент
│   ├── styles/
│   │   └── main.css                # Все стили
│   ├── App.jsx                     # Root компонент
│   └── index.jsx                   # Entry point
├── public/
│   └── index.html                  # HTML контейнер
├── package.json                    # Зависимости
├── vite.config.js                  # Конфиг Vite
├── .env.example                    # Шаблон переменных
├── .gitignore                      # Файлы, которые не коммитить
└── README.md                       # Этот файл
```

## 🔑 Получение API Ключа

1. Перейди на **[console.anthropic.com](https://console.anthropic.com/)**
2. Создай аккаунт (бесплатно)
3. В левом меню выбери **"API Keys"**
4. Нажми **"Create Key"**
5. Скопируй ключ вида `sk-ant-...`
6. Добавь в файл `.env`:
   ```env
   VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
   ```

⚠️ **ВАЖНО:** Никогда не публикуй ключ в GitHub! Файл `.env` уже добавлен в `.gitignore`

## 📝 Как Использовать

### Базовое использование

```
1. Открой приложение (http://localhost:3000)
2. Вставь текст в левое поле (до 3000 символов)
3. Нажми "✨ Создать конспект"
4. Ждешь 2-5 секунд
5. Конспект появляется в правом окне
6. Скачай конспект кнопкой "📥 Скачать конспект"
```

### Советы для лучших результатов

- ✅ **Используй связные тексты** — лучше работает с лекциями, статьями
- ✅ **Не более 3000 символов** — для качественной генерации
- ✅ **Структурированный текст** — если возможно, раздели на параграфы
- ❌ **Избегай** — случайные наборы слов, шифрованный текст

## 🛠️ Технологический Стек

| Технология | Версия | Зачем |
|-----------|--------|-------|
| React | 18.2 | UI фреймворк |
| Vite | 5.0 | Быстрый dev-сервер и build |
| Claude API | Sonnet 4 | AI для анализа текста |
| Canvas API | Native | Для рисования конспектов |
| CSS3 | Native | Стили и анимации |

## 📱 Браузеры

- ✅ Chrome/Chromium (55+)
- ✅ Firefox (52+)
- ✅ Safari (11+)
- ✅ Edge (79+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Кастомизация

### Изменить цвета

Отредактируй `src/styles/main.css`:

```css
/* Основной цвет */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Или используй свои */
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### Изменить размер конспекта

В `src/components/NotesGenerator.jsx`:

```javascript
// Найди эту строку:
canvas.width = 900    // ← ширина (A4)
canvas.height = 1270  // ← высота (A4)

// Измени на нужные значения
```

### Добавить свой стиль конспекта

Отредактируй функцию `drawWrappedText()` и `ctx.font` в компоненте.

## 🐛 Troubleshooting

### ❌ "Cannot find module 'react'"
```bash
npm install
npm install react react-dom
```

### ❌ "API key not found"
- Проверь, что `.env` файл существует в корне проекта
- Проверь, что `VITE_ANTHROPIC_API_KEY` написан правильно
- Перезагрузи сервер (`npm run dev`)

### ❌ "CORS error" или "403 Forbidden"
- Проверь, что в fetch запросе есть заголовок `x-api-key`
- Убедись, что API ключ действительный

### ❌ "Blank white page"
- Открой DevTools (F12) и проверь консоль на ошибки
- Очисти кэш: `Ctrl+Shift+Del` → Clear browsing data
- Перезагрузи сервер: `npm run dev`

### ❌ "Конспект не появляется"
- Проверь, что текст введен (минимум 10 символов)
- Подожди 5-10 секунд (API может быть медленным)
- Посмотри в консоль (F12 → Console) на ошибки

### ❌ Сервер не запускается
```bash
# Убей процесс на порту 3000
lsof -ti:3000 | xargs kill -9

# Или использй другой порт в vite.config.js:
# port: 3001
```

## 🚢 Развертывание

### Vercel (самый быстрый способ)

```bash
# 1. Установи Vercel CLI
npm install -g vercel

# 2. Развертни
vercel

# 3. Добавь переменную окружения в Vercel Dashboard:
# VITE_ANTHROPIC_API_KEY = sk-ant-xxx
```

### Netlify

```bash
# 1. Собери проект
npm run build

# 2. Загрузи папку `dist/` на Netlify
# или используй GitHub интеграцию
```

### GitHub Pages

```bash
# Добавь в vite.config.js:
# base: '/notes-generator-app/'

npm run build
# Загрузи содержимое dist/ на GitHub Pages
```

## 📊 Производительность

- **First Load**: ~2-3 сек (зависит от интернета)
- **Generate Notes**: 2-5 сек (API ответ)
- **Canvas Render**: <100ms
- **Bundle Size**: ~200KB (gzipped)

## 📄 License

MIT © 2024

Используй в личных и коммерческих проектах свободно.

## 🤝 Contributing

Приветствуются Pull Requests!

```bash
# 1. Fork репозиторий
# 2. Создай ветку (git checkout -b feature/AmazingFeature)
# 3. Закоммить изменения (git commit -m 'Add AmazingFeature')
# 4. Отправить в ветку (git push origin feature/AmazingFeature)
# 5. Открыть Pull Request
```

## 💬 Questions?

Открой Issue или свяжись:

- 📧 Email: your.email@example.com
- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)
- 💼 LinkedIn: [Your Profile](https://linkedin.com)

## 🙏 Благодарности

- [Claude API](https://anthropic.com/) за AI
- [React](https://react.dev/) за UI
- [Vite](https://vitejs.dev/) за быстрый build
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) за рисование

---

**Сделано с ❤️ для студентов и любителей конспектов**

⭐ Если проект помогает — дай ему звезду на GitHub!
