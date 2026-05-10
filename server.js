const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Прокси для Anthropic API (чтобы скрыть ключ от браузера)
app.post('/api/claude', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'sk-ant-ВАШ_КЛЮЧ_СЮДА') {
    return res.status(500).json({ 
      error: { message: 'API ключ не настроен! Отредактируй файл .env и вставь свой ключ.' }
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    console.error('Ошибка при запросе к API:', err.message);
    res.status(500).json({ error: { message: 'Ошибка соединения с Anthropic API: ' + err.message } });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('');
  console.log('✅ Сервер запущен!');
  console.log(`👉 Открой в браузере: http://localhost:${PORT}`);
  console.log('');
  console.log('Для остановки нажми Ctrl+C');
});
