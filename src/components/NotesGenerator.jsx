import React, { useState, useRef, useEffect } from 'react'
import '../styles/main.css'

export default function NotesGenerator() {
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [notesData, setNotesData] = useState(null)
  const canvasRef = useRef(null)

  const charCount = inputText.length
  const wordCount = inputText.trim().split(/\s+/).filter(w => w.length > 0).length

  const generateNotes = async () => {
    if (!inputText.trim()) {
      setError('Пожалуйста, введите текст')
      return
    }

    // Получаем API ключ из переменных окружения
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey || apiKey.includes('your-api-key')) {
      setError('⚠️ API ключ не найден! Проверь файл .env и добавь VITE_ANTHROPIC_API_KEY')
      console.error('Missing API key. Check .env file')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_MODEL || 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: `Ты специалист по созданию структурированных конспектов для рукописных заметок в стиле школьной тетради.

ТВОЯ ЗАДАЧА:
1. Анализировать входящий текст
2. Выделить главные разделы (максимум 4-5)
3. Выделить ключевые термины для желтого маркера (максимум 3-4 на раздел)
4. Найти важные даты/цифры для красных кружков
5. Создать компактный структурированный JSON

ТРЕБОВАНИЯ:
- Текст должен быть максимально кратким (как настоящий конспект)
- Каждый пункт - не более 15 слов
- Выделить только самое важное
- JSON ДОЛЖЕН БЫТЬ ВАЛИДНЫМ, БЕЗ ОШИБОК

JSON ФОРМАТ (только JSON, ничего больше!):
{
  "title": "Короткий заголовок",
  "subtitle": "Подзаголовок или тема",
  "sections": [
    {
      "title": "Название раздела",
      "icon": "emoji",
      "items": [
        {
          "text": "Текст (максимум 50 символов)",
          "highlights": ["ключевое слово"],
          "redCircles": ["дата или цифра"]
        }
      ]
    }
  ],
  "formula": "Важная формула или вывод (если есть)",
  "keyPoints": ["Главный вывод 1", "Главный вывод 2"]
}`,
          messages: [
            {
              role: 'user',
              content: `Создай структурированный конспект из этого текста. Делай его кратким и понятным:\n\n${inputText.substring(0, 3000)}`
            }
          ]
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error?.message || `API Error: ${response.status}`)
      }

      const data = await response.json()
      let jsonText = data.content[0].text

      // Очищаем от markdown-кода если есть
      jsonText = jsonText.replace(/```json\n?|\n?```/g, '').trim()

      const parsed = JSON.parse(jsonText)
      setNotesData(parsed)
      setSuccess('✅ Конспект готов!')

    } catch (err) {
      setError(`⚠️ Ошибка: ${err.message}`)
      console.error('Notes generation error:', err)
    }

    setLoading(false)
  }

  // Рисуем конспект на canvas
  useEffect(() => {
    if (!notesData || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Устанавливаем размер (A4 пропорции)
    canvas.width = 900
    canvas.height = 1270

    // Фон
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Линованная бумага
    ctx.strokeStyle = '#e8e8e8'
    ctx.lineWidth = 1.5
    const lineSpacing = 40
    for (let y = 100; y < canvas.height - 50; y += lineSpacing) {
      ctx.beginPath()
      ctx.moveTo(70, y)
      ctx.lineTo(canvas.width - 40, y)
      ctx.stroke()
    }

    // Красная линия слева
    ctx.strokeStyle = '#ff9999'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(55, 100)
    ctx.lineTo(55, canvas.height - 50)
    ctx.stroke()

    let y = 70

    // Заголовок
    ctx.font = 'bold 32px "Segoe Print", cursive'
    ctx.fillStyle = '#1a3a52'
    ctx.fillText(notesData.title || 'Конспект', 90, y)
    y += 50

    if (notesData.subtitle) {
      ctx.font = 'italic 16px "Segoe Print", cursive'
      ctx.fillStyle = '#666'
      ctx.fillText(notesData.subtitle, 90, y)
      y += 40
    }

    y += 20

    // Секции
    notesData.sections?.forEach((section) => {
      if (y > canvas.height - 150) return

      // Заголовок раздела с иконкой
      ctx.font = 'bold 20px "Segoe Print", cursive'
      ctx.fillStyle = '#d32f2f'

      const sectionTitle = `${section.icon || '●'} ${section.title}`
      ctx.fillText(sectionTitle, 90, y)
      y += 45

      // Элементы
      section.items?.forEach(item => {
        if (y > canvas.height - 100) return

        // Маркер
        ctx.font = 'bold 16px "Segoe Print", cursive'
        ctx.fillStyle = '#ff9800'
        ctx.fillText('→', 100, y)

        // Текст с выделением
        ctx.font = '15px "Segoe Print", cursive'
        const textX = 130
        const words = item.text.split(' ')
        let line = ''
        let lineY = y
        let xOffset = 0

        words.forEach((word, idx) => {
          const testLine = line + (line ? ' ' : '') + word
          const metrics = ctx.measureText(testLine)

          if (metrics.width > 700) {
            // Рисуем текущую линию
            ctx.fillStyle = '#333'
            ctx.fillText(line, textX, lineY)
            line = word
            lineY += 35
            xOffset = 0
          } else {
            line = testLine
          }

          // Проверяем, нужно ли выделение
          if (item.highlights?.some(h => word.toLowerCase().includes(h.toLowerCase()))) {
            const wordStart = line.lastIndexOf(word)
            const beforeWord = line.substring(0, wordStart)
            const beforeMetrics = ctx.measureText(beforeWord)

            // Желтый маркер
            ctx.fillStyle = '#ffff33'
            ctx.globalAlpha = 0.6
            const wordMetrics = ctx.measureText(word)
            ctx.fillRect(textX + beforeMetrics.width - 2, lineY - 18, wordMetrics.width + 4, 22)
            ctx.globalAlpha = 1
            ctx.fillStyle = '#333'
          }
        })

        if (line) {
          ctx.fillStyle = '#333'
          ctx.fillText(line, textX, lineY)
          y = lineY + 35
        }

        // Красные кружки вокруг цифр
        if (item.redCircles && item.redCircles.length > 0) {
          ctx.font = 'bold 14px "Segoe Print", cursive'
          ctx.strokeStyle = '#ff3333'
          ctx.lineWidth = 2.5
          ctx.fillStyle = 'white'

          item.redCircles.forEach((circle, idx) => {
            const circleX = textX + 600 + idx * 70
            if (circleX < canvas.width - 50) {
              ctx.beginPath()
              ctx.arc(circleX, y - 5, 18, 0, Math.PI * 2)
              ctx.fill()
              ctx.stroke()

              ctx.fillStyle = '#ff3333'
              const text = String(circle).substring(0, 8)
              const textWidth = ctx.measureText(text).width
              ctx.fillText(text, circleX - textWidth / 2, y + 4)
              ctx.fillStyle = '#333'
            }
          })

          y += 10
        }
      })

      y += 15
    })

    // Формула/Вывод
    if (notesData.formula && y < canvas.height - 100) {
      y += 15
      ctx.fillStyle = '#fff9c4'
      ctx.fillRect(80, y - 8, 800, 45)
      ctx.strokeStyle = '#ff9800'
      ctx.lineWidth = 3
      ctx.strokeRect(80, y - 8, 800, 45)

      ctx.font = 'bold 16px "Segoe Print", cursive'
      ctx.fillStyle = '#ff6f00'
      ctx.fillText('⭐ ' + notesData.formula, 100, y + 25)
      y += 60
    }

  }, [notesData])

  const downloadCanvas = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.href = canvasRef.current.toDataURL('image/png')
    link.download = `notes_${Date.now()}.png`
    link.click()
  }

  const clearAll = () => {
    setInputText('')
    setNotesData(null)
    setError('')
    setSuccess('')
  }

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="header">
          <h1>📝 Генератор Рукописных Конспектов</h1>
          <p>Превращайте текст в красивые конспекты в стиле школьной тетради автоматически</p>
        </div>

        <div className="main-grid">
          <div className="input-section">
            <div className="section-title">📌 Введите ваш текст</div>

            <div className="notes-info">
              💡 Вставьте текст любого размера. AI автоматически создаст структурированный конспект с выделениями, маркерами и важными цифрами.
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Вставьте лекцию, статью или учебный материал... Максимум 3000 символов для лучшего результата."
              className="text-input"
            />

            <div className="char-count">
              Символов: {charCount} | Слов: {wordCount}
            </div>

            <div className="button-group">
              <button 
                className="btn-primary" 
                onClick={generateNotes} 
                disabled={loading || !inputText.trim()}
              >
                {loading ? '⏳ Генерирую...' : '✨ Создать конспект'}
              </button>
              <button className="btn-secondary" onClick={clearAll}>
                🗑️ Очистить
              </button>
            </div>

            {error && <div className="error">⚠️ {error}</div>}
            {success && <div className="success">✅ {success}</div>}
          </div>

          <div className="preview-section">
            <div className="section-title">👀 Превью конспекта</div>

            <div className="preview-canvas">
              {loading ? (
                <div className="loading">
                  <div className="spinner">⏳</div>
                  <p>Обработка текста и создание конспекта...</p>
                </div>
              ) : notesData ? (
                <canvas 
                  ref={canvasRef} 
                  className="canvas-output"
                ></canvas>
              ) : (
                <p>Конспект появится здесь после обработки</p>
              )}
            </div>

            {notesData && (
              <div className="download-section">
                <button className="btn-primary btn-download" onClick={downloadCanvas}>
                  📥 Скачать конспект (PNG для печати)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
