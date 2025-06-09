FROM mcr.microsoft.com/playwright/dotnet:v1.52.0 AS build

WORKDIR /src

# Копируем все файлы проекта/решения
COPY . .

# Восстанавливаем зависимости
RUN dotnet restore MyApp.sln

# Публикуем приложение.
# Путь к твоему проекту с тестами.
RUN dotnet publish E2Etests/E2Etests.csproj -c Release -o /app/out


FROM mcr.microsoft.com/playwright/dotnet:v1.52.0

WORKDIR /app

# Playwright уже установлен и сконфигурирован в этом образе.
# Поэтому ENV PLAYWRIGHT_BROWSERS_PATH не нужен, он уже настроен в базовом образе.

# Копируем опубликованное приложение из этапа сборки.
COPY --from=build /app/out ./

ENTRYPOINT ["/bin/bash", "-c", "if [ -z \"$TEST_CATEGORY\" ]; then dotnet test E2Etests.dll --logger \"trx;LogFileName=test_results.trx\"; else dotnet test E2Etests.dll --filter \"Category=$TEST_CATEGORY\" --logger \"trx;LogFileName=test_results.trx\"; fi"]