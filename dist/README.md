# wasylprowadzi.pl

Statyczna strona jednostronicowa. Bez build stepu — Cloudflare Pages serwuje pliki jak leżą.

## Zawartość
- `index.html` — cała strona (treść PL/EN/FR w słowniku `I18N` w skrypcie na końcu pliku)
- `support.js` — runtime renderujący szablon
- `wasyl-map.js` — komponent mapy (Leaflet + kafle OpenStreetMap)
- `img/` — zdjęcia (WebP, przeskalowane)
- `vendor/leaflet/` — Leaflet 1.9.4 (js, css, images), hostowany lokalnie
- `vendor/react/` — React i ReactDOM 18.3.1 UMD, hostowane lokalnie; `index.html` mapuje na nie adresy CDN przez `window.__resources` przed wczytaniem `support.js`
- `fonts/` — 18 plików woff2 pobranych wprost z Google Fonts, licencja OFL; każdy krój w podzbiorach latin i latin-ext:
  - EB Garamond 400/500/600 + 400 italic, Barlow 400/500/600 (14 plików)
  - Inter, wersja zmienna, normal + italic (4 pliki) — dla wariantu bezszeryfowego z przełącznika kroju; budowa zgodna z plikami Google Fonts, źródło niepotwierdzone

Jedyny zasób z zewnątrz to kafle mapy z `tile.openstreetmap.org`. Fonty, Leaflet, React i ReactDOM idą z naszego serwera. Babel nie jest pobierany — runtime sięga po niego tylko gdy w projekcie jest plik `.jsx`, a takiego nie ma.

Pliki fontów pochodzą z gstatic (nie z Fontsource) — builda Fontsource rysuje tekst o 7,3% szerzej. Jeśli kiedyś trzeba je odtworzyć: otwórz w nowoczesnej przeglądarce arkusz CSS z `fonts.googleapis.com/css2` (np. `?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Barlow:wght@400;500;600&display=swap`, dla Intera `?family=Inter:ital,wght@0,100..900;1,100..900&display=swap`), pobierz pliki woff2 z bloków oznaczonych `/* latin */` i `/* latin-ext */` i nazwij je według schematu z `index.html`.

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
