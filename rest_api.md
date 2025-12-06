# REST API

## Общее описание

REST API предоставляет синхронную отправку сообщений в очередь обработки и получение информации о статусах воркеров.

---

## Основные endpoint'ы

### 1. Отправка сообщения в очередь (реализовано)

**POST** `/api/v1/messages/queue`

**Content-Type:** `application/x-www-form-urlencoded`

**Параметры:**
- `content` (string, required): Текст сообщения для отправки
- `user_uuid` (string, required): UUID пользователя
- `preferred_model` (string, optional): Предпочтительная модель для ответа

**Пример запроса:**
```bash
curl -X POST "http://localhost:8000/api/v1/messages/queue" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "content=Привет! Расскажи что-то интересное&user_uuid=123e4567-e89b-12d3-a456-426614174000&preferred_model=gemini-1.5-flash"
```

**Ответ:**
```json
{
  "user_message_id": "686da75d8767ad199b46dd3d",
  "ai_message_id": "686da75d8767ad199b46dd3e",
  "processing_estimate": {
    "estimated_wait_time": 2.0,
    "estimated_processing_time": 12.64,
    "estimated_total_time": 14.64,
    "estimated_start_time": "2025-07-08T23:18:55.868923",
    "confidence": 0.8
  }
}
```

### 2. Получение статусов воркеров (реализовано)

**GET** `/api/v1/messages/worker-statuses`

**Пример запроса:**
```bash
curl -X GET "http://localhost:8000/api/v1/messages/worker-statuses"
```

**Ответ:**
```json
{
  "worker_statuses": {
    "gemini-1.5-flash_0": {
      "status": "idle",
      "worker_id": "gemini-1.5-flash_0",
      "model_name": "gemini-1.5-flash",
      "provider": "gemini",
      "rpm_limit": 120,
      "tpm_limit": 120000,
      "consecutive_failures": 0,
      "last_activity": "2025-07-08T23:18:58.753832",
      "suspended_until": null,
      "last_updated": "2025-07-08T23:18:58.754"
    }
  },
  "description": "📋 Предпочтительная модель для ответа...",
  "last_updated": "2025-07-08T23:18:58.754"
}
```

### 3. Получение списка сообщений с фильтрами (реализовано)

**GET** `/api/v1/messages/`

**Описание:** Возвращает список сообщений пользователя с возможностью фильтрации и пагинации. Включает защиту от перегрузки и детальную информацию о производительности.

**Query параметры:**

**Обязательные:**
- `user_uuid` (UUID, required): UUID пользователя

**Фильтры (опциональные):**
- `chat_uuid` (UUID): UUID чата для фильтрации
- `role` (string): Роль сообщения (`user`, `assistant`, `system`, `tool`)
- `content_search` (string, 1-100 символов): Поиск по содержимому сообщения (регистронезависимый)
- `date_from` (datetime, ISO формат): Начальная дата для фильтрации
- `date_to` (datetime, ISO формат): Конечная дата для фильтрации
- `is_complete` (boolean): Фильтр по статусу завершенности сообщения

**Пагинация:**
- `page` (integer, 1-1000, default=1): Номер страницы
- `page_size` (integer, 1-100, default=20): Количество сообщений на странице
- `order_by` (string, default="created_at"): Поле для сортировки (`created_at`, `updated_at`, `role`)
- `order_direction` (string, default="desc"): Направление сортировки (`asc`, `desc`)

**Ограничения безопасности:**
- Максимум 100 сообщений на страницу
- Максимум 1000 страниц
- Поиск по содержимому ограничен 100 символами
- Автоматическая проверка доступа к чату

**Пример запроса (базовый):**
```bash
curl -X GET "http://localhost:8000/api/v1/messages/?user_uuid=123e4567-e89b-12d3-a456-426614174000"
```

**Пример запроса (с фильтрами):**
```bash
curl -X GET "http://localhost:8000/api/v1/messages/?user_uuid=123e4567-e89b-12d3-a456-426614174000&chat_uuid=760beced-f714-4151-8540-dc59c4671a4c&role=assistant&page=1&page_size=10&order_by=created_at&order_direction=desc"
```

**Пример запроса (поиск по содержимому):**
```bash
curl -X GET "http://localhost:8000/api/v1/messages/?user_uuid=123e4567-e89b-12d3-a456-426614174000&content_search=python&date_from=2025-01-01T00:00:00Z&is_complete=true"
```

**Ответ:**
```json
{
  "messages": [
    {
      "id": "686da75d8767ad199b46dd3e",
      "chat_uuid": "760beced-f714-4151-8540-dc59c4671a4c",
      "user_uuid": "123e4567-e89b-12d3-a456-426614174000",
      "role": "assistant",
      "content": "Полный ответ ИИ...",
      "is_complete": true,
      "created_at": "2025-07-08T23:18:53.865000",
      "updated_at": "2025-07-08T23:18:58.222000"
    }
  ],
  "metadata": {
    "total_count": 150,
    "page": 1,
    "page_size": 20,
    "total_pages": 8,
    "has_next": true,
    "has_previous": false,
    "applied_filters": {
      "user_uuid": "123e4567-e89b-12d3-a456-426614174000",
      "role": "assistant",
      "is_complete": true
    },
    "query_performance": {
      "execution_time_ms": 45.2,
      "database_query_time_ms": 32.1,
      "redis_check_time_ms": 8.7,
      "formatting_time_ms": 4.4
    }
  }
}
```

**Коды ошибок:**
- `400`: Некорректные параметры (например, `date_from > date_to`)
- `403`: Нет доступа к указанному чату
- `500`: Внутренняя ошибка сервера

### 4. Получение сообщения по ID (реализовано)

**GET** `/api/v1/messages/{message_id}`

**Query параметры:**
- `user_uuid` (UUID, required): UUID пользователя

**Пример запроса:**
```bash
curl -X GET "http://localhost:8000/api/v1/messages/686da75d8767ad199b46dd3e?user_uuid=123e4567-e89b-12d3-a456-426614174000"
```

**Ответ:**
```json
{
  "id": "686da75d8767ad199b46dd3e",
  "chat_uuid": "760beced-f714-4151-8540-dc59c4671a4c",
  "user_uuid": "123e4567-e89b-12d3-a456-426614174000",
  "role": "assistant",
  "content": "Полный ответ ИИ...",
  "is_complete": true,
  "created_at": "2025-07-08T23:18:53.865000",
  "updated_at": "2025-07-08T23:18:58.222000"
}
```

---

## Оценка времени обработки

### Описание
При отправке сообщения через `/api/v1/messages/queue` в ответе включается детальная оценка времени обработки.

### Поля оценки времени

| Поле | Тип | Описание |
|------|-----|----------|
| `estimated_wait_time` | number | Время ожидания в очереди (секунды) |
| `estimated_processing_time` | number | Время обработки запроса (секунды) |
| `estimated_total_time` | number | Общее время = wait_time + processing_time |
| `estimated_start_time` | string | ISO timestamp когда начнется обработка |
| `confidence` | number | Уверенность в оценке (0.0-1.0) |

### Факторы оценки
- Статус и доступность воркеров
- Размер очереди задач
- Тип модели (Gemini vs OpenAI)
- Количество токенов в запросе
- Исторические данные обработки

### Примеры оценок для разных моделей

**Gemini Flash (быстрая модель):**
```json
{
  "estimated_wait_time": 2.0,
  "estimated_processing_time": 12.64,
  "estimated_total_time": 14.64,
  "confidence": 0.8
}
```

**Gemini Pro (качественная модель):**
```json
{
  "estimated_wait_time": 2.0,
  "estimated_processing_time": 19.03,
  "estimated_total_time": 21.03,
  "confidence": 0.8
}
```

---

## Коды ошибок

| Код | Описание |
|-----|----------|
| 200 | Успешная обработка |
| 400 | Некорректные параметры запроса |
| 403 | Отсутствие прав доступа |
| 404 | Ресурс не найден |
| 500 | Внутренняя ошибка сервера |

---

## Статусы воркеров

| Статус | Описание |
|--------|----------|
| `idle` | Готов к работе |
| `busy` | Выполняет задачу |
| `suspended` | Приостановлен (проверка через 60сек) |
| `permanently_disabled` | Отключен после 15 неудач |
| `error` | Ошибка воркера |
| `offline` | Недоступен |

---

## Примеры использования

### Отправка простого сообщения
```bash
curl -X POST "http://localhost:8000/api/v1/messages/queue" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "content=Привет!&user_uuid=123e4567-e89b-12d3-a456-426614174000"
```

### Отправка с выбором модели
```bash
curl -X POST "http://localhost:8000/api/v1/messages/queue" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "content=Напиши эссе&user_uuid=123e4567-e89b-12d3-a456-426614174000&preferred_model=gemini-1.5-pro"
```

### Получение всех сообщений пользователя
```bash
curl -X GET "http://localhost:8000/api/v1/messages/?user_uuid=123e4567-e89b-12d3-a456-426614174000" | jq
```

### Получение сообщений конкретного чата с пагинацией
```bash
curl -X GET "http://localhost:8000/api/v1/messages/?user_uuid=123e4567-e89b-12d3-a456-426614174000&chat_uuid=760beced-f714-4151-8540-dc59c4671a4c&page=2&page_size=50" | jq
```

### Поиск сообщений ассистента по содержимому
```bash
curl -X GET "http://localhost:8000/api/v1/messages/?user_uuid=123e4567-e89b-12d3-a456-426614174000&role=assistant&content_search=python&is_complete=true" | jq
```

### Получение сообщений за определенный период
```bash
curl -X GET "http://localhost:8000/api/v1/messages/?user_uuid=123e4567-e89b-12d3-a456-426614174000&date_from=2025-01-01T00:00:00Z&date_to=2025-01-31T23:59:59Z&order_by=created_at&order_direction=asc" | jq
```

### Проверка статусов воркеров
```bash
curl -X GET "http://localhost:8000/api/v1/messages/worker-statuses" | jq
```