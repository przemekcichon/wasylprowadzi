# wasylprowadzi.pl

Statyczna strona jednostronicowa. Bez build stepu — Cloudflare Pages serwuje pliki jak leżą.

## Zawartość
- `index.html` — cała strona (treść PL/EN/FR w słowniku `I18N` w skrypcie na końcu pliku)
- `support.js` — runtime renderujący szablon
- `wasyl-map.js` — komponent mapy (Leaflet + kafle OpenStreetMap)
- `img/` — zdjęcia (WebP, przeskalowane)
- `vendor/leaflet/` — Leaflet 1.9.4 (js, css, images), hostowany lokalnie
- `vendor/react/` — React i ReactDOM 18.3.1 UMD, hostowane lokalnie; `index.html` mapuje na nie adresy CDN przez `window.__resources` przed wczytaniem `support.js`
- `fonts/` — 14 plików woff2 pobranych wprost z Google Fonts (EB Garamond 400/500/600 + 400 italic, Barlow 400/500/600; podzbiory latin i latin-ext), licencja OFL
- `font-test.html`, `font-fetch.html` — strony pomocnicze, nie część serwisu; można usunąć

Jedyny zasób z zewnątrz to kafle mapy z `tile.openstreetmap.org`. Fonty, Leaflet, React i ReactDOM idą z naszego serwera. Babel nie jest pobierany — runtime sięga po niego tylko gdy w projekcie jest plik `.jsx`, a takiego nie ma.

Pliki fontów pochodzą z gstatic (nie z Fontsource) — builda Fontsource rysuje tekst o 7,3% szerzej. Jeśli kiedyś trzeba je odtworzyć, otwórz `font-fetch.html` na wdrożonej stronie.

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
- rozważyć Protomaps + Cloudflare R2, żeby i kafle mapy szły z naszej domeny
