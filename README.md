Aplikacja zrobiona do konkursu streamera fvlvte. Jest zrobiona w react native expo. Jest to pierwszy mój projekt w react native i nauczyłem się sporo o tym narzędziu i działaniu aplikacji mobilnych.
Aplikacja jest o tematyce książek dla dzieci. Zrobiona została, ponieważ nie ma na rynku aplikacji z książkami dla dzieci, szczególnie na androida. Backend do tej aplikacji jest w repo: book-app-backend.

Aplikacja zawiera następujace featury: 
-logowanie, 
-wyswietlanie ksiazek z bazy danych, 
-filtrowanie książek poprzez kategorie i nazwe, 
-dodawanie książek do biblioteki użytkownika, 
-real-time updates shelfBooks i profilu,
-filtrowanie książek z biblioteki na przeczytane i nieprzeczytane, 
-light, dark theme, 
-statystyki

Do dodania w przyszłości:
- subsckrybcje
- różne języki

Startowanie projektu:
git clone https://github.com/MichalKaniowski/book-app-native.git
cd book-app-native
dodaj plik .env, w którym będziesz miał klucze do firebase i DOMAIN do backendu
npm install
npm run dev
