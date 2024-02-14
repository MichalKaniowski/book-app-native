# Aplikacja do czytania dla dzieci

Aplikacja stworzona w react native (expo). Jest to moja pierwsza mobilna aplikacja i nauczyłem się sporo o tej technologii i działaniu aplikacji mobilnych. Backend do tej aplikacji jest w repo book-app-backend. Aplikacja jest o tematyce książek dla dzieci. Chciałem zrobić aplikację z książkami, ale żeby wyróżnić się jakoś spośród innych aplikacji wybrałem niszę z książkami dla dzieci. Podczas pierwszego odpalenia aplikacji książki długo się ładują, ponieważ bezpłatny serwer na renderze musi się odpalić.

## Features

- Logowanie
- Wyświetlanie książek z bazy danych
- Filtrowanie książek poprzez kategorie i nazwę
- Filtrowanie książek w bibliotece na przeczytane i nieprzeczytane
- Dodawanie książek do biblioteki użytkownika
- jasny/ciemny tryb
- statystyki

## ENV

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

DOMAIN=

## Odpal lokalnie

Sklonuj projekt

```bash
  git clone https://github.com/MichalKaniowski/book-app-native.git
```

Przejdź do folderu projektu

```bash
  cd book-app-native
```

Zainstaluj zależności

```bash
  npm install
```

Włącz server

```bash
  npm run dev
```

## Rzeczy do dodania w przyszłości

- inne języki
- subskrybcje
