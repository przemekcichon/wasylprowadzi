# wasylprowadzi.pl

Statyczna strona jednostronicowa. Bez build stepu — Cloudflare Pages serwuje pliki jak leżą.

## Zawartość
- `index.html` — cała strona (treść PL/EN/FR w słowniku `I18N` w skrypcie na końcu pliku)
- `support.js` — runtime renderujący szablon
- `wasyl-map.js` — komponent mapy (Leaflet + kafle OpenStreetMap)
- `img/` — zdjęcia (WebP, przeskalowane)

## Lokalnie
Otwórz przez serwer statyczny, nie przez `file://`:

    npx serve .

## Deploy na Cloudflare Pages
1. Wypchnij ten folder na GitHuba.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → wybierz repo.
3. Framework preset: **None**. Build command: puste. Output directory: `/` (albo `dist`, jeśli repo trzyma cały projekt).
4. Save and Deploy. Adres `*.pages.dev` działa od razu.
5. Custom domains → dodaj `wasylprowadzi.pl` i `www`. DNS i certyfikat Cloudflare ustawia sam.

Każdy push na główną gałąź = nowy deploy. Pull requesty dostają własne podglądy.

## Do zrobienia
- polityka prywatności (`#prywatnosc`) i regulamin (`#regulamin`) — do sprawdzenia przez prawnika
- prawdziwe opinie (obecne są przykładowe)
- zdjęcia cerkwi i cmentarza wojennego
- proofreading EN/FR
- uściślenie zarysu obszaru na mapie
