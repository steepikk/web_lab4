# Лабораторная работа 4



## Описание

Приложение было переписано с предыдущей лабораторной работы с использованием следующих технологий:

- **Back-end**: Spring Boot.
- **Front-end**: React + TypeScript.

### Архитектура

- Взаимодействие между back-end и front-end происходит через REST API.
- Приложение включает 2 страницы: стартовую и основную.

### Адаптация под различные устройства

- **Десктопный режим**: для экранов шириной ≥ 1210 пикселей.
- **Планшетный режим**: для экранов шириной ≥ 842 пикселей, но < 1210 пикселей.
- **Мобильный режим**: для экранов шириной < 842 пикселей.

---

## Стартовая страница

### Элементы:

1. **"Шапка"**: отображает ФИО студента, номер группы и номер варианта.
2. **Форма авторизации**: включает поля для ввода логина и пароля. Пользователи хранятся в базе данных с хэшированными паролями. Доступ на основную страницу запрещен для неавторизованных пользователей.

---

## Основная страница

### Элементы:

1. **Поля ввода**:
   - Кнопка выбора координаты X (-4, -3, -2, -1, 0, 1, 2, 3, 4).
   - Текстовое поле для ввода координаты Y (-3 ... 3).
   - Кнопка выбора радиуса (-4, -3, -2, -1, 0, 1, 2, 3, 4).

2. **Валидация**: предотвращает ввод некорректных данных (например, буквы вместо чисел, отрицательные значения радиуса).

3. **Картинка области**: отображает координатную плоскость в зависимости от номера варианта и введенных координат. Клик по картинке отправляет координаты на сервер для проверки попадания в область. Цвет точек изменяется в зависимости от попадания.

4. **Таблица результатов**: отображает список предыдущих проверок.

5. **Кнопка выхода**: позволяет пользователю завершить сессию и вернуться на стартовую страницу.

# Как запустить? Руководство по установке и запуску Point Checker

## Содержание
- [Необходимое ПО](#необходимое-по)
- [Структура проекта](#структура-проекта)
- [Docker-конфигурация](#docker-конфигурация)
- [Запуск проекта](#запуск-проекта)
- [Разработка](#разработка)
- [Решение проблем](#решение-проблем)

## Необходимое ПО

### Обязательные компоненты
1. **Git**
   ```bash
   # Проверка установки
   git --version
   ```
   📥 [Скачать Git](https://git-scm.com/downloads)

2. **Docker Desktop**
   ```bash
   # Проверка установки
   docker --version
   docker-compose --version
   ```
   📥 [Скачать Docker Desktop](https://www.docker.com/products/docker-desktop)

### Опциональные компоненты (для локальной разработки)
1. **Node.js** (LTS версия)
   ```bash
   # Проверка установки
   node --version
   npm --version
   ```
   📥 [Скачать Node.js](https://nodejs.org/)

2. **JDK 17**
   ```bash
   # Проверка установки
   java --version
   ```
   📥 [Скачать OpenJDK](https://adoptium.net/)

3. **PostgreSQL**
   ```bash
   # Проверка установки
   psql --version
   ```
   📥 [Скачать PostgreSQL](https://www.postgresql.org/download/)

## Структура проекта

```
lab4/
├── web_server/              # Backend (Spring Boot)
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   └── pom.xml
├── point-checker-frontend/  # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   └── package.json
└── docker-compose.yml
```

## Docker-конфигурация

1. **Backend Dockerfile** (`web_server/Dockerfile`):
```dockerfile
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
CMD ["./mvnw", "spring-boot:run"]
```

2. **Frontend Dockerfile** (`point-checker-frontend/Dockerfile`):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
```

3. **Docker Compose** (`docker-compose.yml`):
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: point_checker
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./web_server
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/point_checker
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: postgres

  frontend:
    build: ./point-checker-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    environment:
      VITE_API_URL: http://localhost:8080/api

volumes:
  postgres_data:
```

## Запуск проекта

### Через Docker (рекомендуется)

1. Клонируйте репозиторий:
   ```bash
   git clone <url-репозитория>
   cd lab4
   ```

2. Запустите контейнеры:
   ```bash
   docker-compose up --build
   ```

3. Откройте приложение:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api

### Локальная разработка

1. **Backend**:
   ```bash
   cd web_server
   ./mvnw spring-boot:run
   ```

2. **Frontend**:
   ```bash
   cd point-checker-frontend
   npm install
   npm run dev
   ```

# Краткое мнение

Достаточно интересная лабораторная работа. Даже с кайфом делал.
