# План атомарных коммитов

Ниже — рекомендуемая последовательность. Каждый пункт должен оставлять
собираемое состояние и включать только перечисленные изменения. Перед каждым
коммитом запускаются относящиеся к нему проверки. Коммиты создаёт разработчик,
не агент.

## Веха 1 — каркас и окружение

1. `chore(repo): initialize TypeScript workspaces`
   - Root package manager/workspaces, `apps/web`, `apps/api`, базовые tsconfig и
     общие команды.
   - Проверка: typecheck пустых приложений.
2. `chore(tooling): add linting formatting and test configuration`
   - ESLint, Prettier, тестовый раннер и scripts без прикладного кода.
   - Проверка: lint, format check, test.
3. `chore(infra): add local PostgreSQL compose configuration`
   - `compose.yaml`, `.env.example` и безопасные переменные БД.
   - Проверка: PostgreSQL стартует и принимает подключение.
4. `docs(readme): document local development workflow`
   - Предварительная инструкция запуска и команды проверок.
   - Проверка: выполнить инструкцию в чистом окружении.

## Веха 2 — данные и API

5. `feat(database): add task schema and initial migration`
   - Prisma schema, enum статусов/приоритетов, миграция и database client.
   - Проверка: миграция применяется к пустой БД.
6. `feat(tasks): add validated task domain service`
   - Модели, DTO-схемы, чистые helpers и сервис создания, чтения, обновления,
     удаления и смены статуса.
   - Проверка: unit-тесты валидации и сервисной логики.
7. `feat(tasks): expose task REST endpoints`
   - Тонкий NestJS controller, маппинг ошибок, Swagger и маршруты API.
   - Проверка: integration-тест CRUD и перемещения задачи.

## Веха 3 — клиент данных

8. `feat(web-api): add validated tasks API client`
   - Контракты, Zod-схемы ответов и единый API-клиент frontend.
   - Проверка: тесты валидации успешного и ошибочного ответа.
9. `feat(board-model): add task grouping and data hooks`
   - Чистая группировка по статусам, hooks загрузки и мутаций без UI.
   - Проверка: unit-тесты группировки и состояния ошибки.

## Веха 4 — интерфейс

10. `feat(board): render task board columns and cards`
    - MUI layout, три колонки и карточки с текстовыми метками приоритета.
    - Проверка: component-тест распределения задач по колонкам.
11. `feat(tasks-ui): add task creation and editing dialogs`
    - Формы с runtime-валидацией, просмотр и редактирование задачи.
    - Проверка: component-тест обязательных полей и отправки валидной формы.
12. `feat(tasks-ui): add task status changes and deletion`
    - Доступные действия смены статуса и подтверждение удаления.
    - Проверка: component/integration-тест вызова нужной мутации.

## Веха 5 — готовность к передаче

13. `feat(board): add responsive and explicit UI states`
    - Mobile layout, loading, error с повтором и empty-состояние.
    - Проверка: component-тест состояний; ручная проверка desktop и mobile.
14. `docs(readme): complete delivery guide and project decisions`
    - Финальные команды запуска, миграции, решения, ограничения, фактическое
      время, использование AI и способ проверки его результата.
    - Проверка: пройти README с чистого клона.
15. `test(tasks): strengthen key user journey coverage`
    - Недостающие устойчивые проверки основного пути: создать, перенести,
      отредактировать, удалить и перезагрузить страницу.
    - Проверка: полный `lint`, `typecheck`, `test` и production build.

Если UX-улучшение с фильтром приоритета согласовано для реализации, оно идёт
отдельным следующим коммитом: `feat(board): add priority quick filter` с
проверками фильтрации и сброса. Его не следует смешивать с обязательной
функциональностью.
