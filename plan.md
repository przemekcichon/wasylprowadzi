# plan.md

Stan wdrożenia, decyzje architektoniczne i harmonogram — aktualizowane na bieżąco (patrz zasady w `CLAUDE.md`).

## Stan na 2026-09-25

### Zrobione
- Repo GitHub podpięte jako `origin`: [przemekcichon/wasylprowadzi](https://github.com/przemekcichon/wasylprowadzi), gałąź główna `main`.
- Pierwszy commit: `dist/` (statyczna strona wygenerowana przez Claude Design — `index.html`, `support.js`, `wasyl-map.js`, `img/`) + `CLAUDE.md`, `plan.md`, workspace.
- Ustalony workflow: zmiany przez PR, merge tylko na wyraźne pozwolenie użytkownika. Pierwszy PR (#1, doprecyzowanie sekcji "Zasady pracy") zmergowany do `main`, gałąź feature usunięta.
- `.gitignore` w katalogu głównym z regułami sekretów (`.env`, `*.mmdb`) zgodnie z CLAUDE.md.
- **Cloudflare Pages podpięte** — repo połączone przez dashboard, skonfigurowany custom domain.
- **GitHub ↔ Claude Code działa** — agent tworzy gałęzie i PR-y z promptów w bieżącej sesji (potwierdzone w praktyce, nie tylko deklaratywnie).
- **Naprawiony scroll dolnego menu na mobile** (PR #3) — usunięty `scroll-snap-type`/`scroll-snap-align`, który cofał przewijanie przed dotarciem do ikonek telefonu/poczty; zastąpiony `overscroll-behavior-x: contain`. Przy okazji naprawiony błąd w `componentDidUpdate` (sięgał po nieistniejący argument), który blokował zmianę tytułu strony i `html lang` przy przełączaniu języka. Poprawkę przygotował Claude Design.
- PR #2 i #4 — wyłącznie dokumentacja stanu w `plan.md` (stan na 2026-08-22, odnotowanie naprawy scrolla).
- **Przycisk zamknięcia menu „Więcej” na mobile** (PR #5) i **poprawione podświetlenie ostatniej sekcji w nawigacji** (PR #6).
- **Wszystkie zasoby hostowane lokalnie** (PR #7, #8) — fonty (EB Garamond, Barlow; woff2 z gstatic), Leaflet, React i ReactDOM leżą w `dist/`. Jedyny zasób z zewnątrz to kafle mapy OSM. Decyzja: prywatność odwiedzających (brak zapytań do Google/unpkg) i brak zależności od cudzych CDN.

### W toku — PR #9 (`feat/uwagi-klienta-wrzesien`, czeka na przegląd i merge)
- Treści PL/EN od klienta (sekcje główne, opisy 15 szlaków); FR robocze.
- Nowy tytuł, motto, meta description i teksty og:.
- Poprawiony logotyp, zmniejszony do 800 px szerokości (strona wyświetla go najwyżej na 400 px).
- **Tymczasowe przełączniki** w menu „Więcej”: układ góry (Klasyczny / Pas) i krój (Szeryfowy / Bezszeryfowy), zapis w localStorage (`wasyl-preview`). Decyzja: przełączniki służą tylko klientowi do wyboru wariantu, dlatego świadomie nie są tłumaczone, nie są opisane w polityce prywatności i nie usuwamy mignięcia domyślnego wariantu przy wczytaniu.
- Inter hostowany lokalnie (4 pliki woff2, latin + latin-ext) na potrzeby wariantu bezszeryfowego. Pliki najpewniej z Google Fonts (budowa zgodna z plikami z gstatic), ale źródło nie jest potwierdzone — mogą pochodzić z Fontsource.
- Usunięte strony pomocnicze `font-test.html` i `font-fetch.html`; README opisuje, jak odtworzyć fonty bez nich.
- Naprawiona notka pod opisem szlaku, która nigdy się nie wyświetlała: zmienna pętli `t` zasłaniała słownik tłumaczeń `t`, więc zmieniona na `tr`.
- `og:image` jako bezwzględny adres `https://wasylprowadzi.pl/...` i w formacie JPG (1024×536, kadr 1,91:1), bo część serwisów społecznościowych nie przyjmuje adresu względnego ani WebP.
- Weryfikacja: agent weryfikator sprawdził PR (klucze I18N, zasoby, fonty, składnię JS/HTML); poprawki po jego uwagach w tym samym PR.

### Wyjątek od procesu
- Commit `4f14c23` ("Ikony telefonu i poczty jako SVG zamiast emoji", `dist/index.html`) trafił bezpośrednio na `main`, bez PR-a — użytkownik zmienił emoji ikony telefonu/poczty na SVG, żeby Apple nie renderowało ich jako czerwonych emoji. Zmiana jest już opublikowana i wypchnięta, więc odtworzenie jej przez PR wymagałoby przepisania historii `main` (revert + reapply) — uznane za nieproporcjonalne ryzyko dla drobnej, jednoznacznej poprawki wizualnej. Odnotowane tu po fakcie jako świadomy wyjątek; kolejne zmiany nadal przez PR.

### Czeka na klienta
- **Wybór wariantu układu i kroju** — po decyzji: usunąć przełączniki, nieużywany wariant, klucz `wasyl-preview` i (jeśli wygra szeryfowy) pliki Inter z `dist/fonts/`.
- **Redakcja tekstów** — klient poprawia język sam: wersja FR, nazwy szlaków w EN/FR (obecnie po polsku), twarde spacje po jednoliterowych spójnikach, dywizy zamiast półpauz.

### Do zrobienia (kandydaci — nie w planie, do przegłosowania na sesji planistycznej)
- **Podział planu na fazy** (przygotowanie środowiska, implementacja, testy, deploy, utrzymanie) z checklistą i harmonogramem, zgodnie z `CLAUDE.md` — obecny `plan.md` go nie ma.
- **Atrybuty `width`/`height` na `<img>`** (m.in. logotyp) — zapobiegają przesuwaniu się układu podczas ładowania.
- **Tagi `twitter:card` i `og:url`** — ładniejszy podgląd linku w X/Twitterze i jednoznaczny adres kanoniczny.
- **Claude Design → GitHub**: narzędzie `DesignSync` widzi tylko projekty typu "design system" (biblioteki komponentów) z konta, na którym akurat jest zalogowana sesja — przy sprawdzaniu byliśmy zalogowani na złe konto, więc nie potwierdziliśmy jeszcze, czy/jak połączyć konkretny projekt strony (ten, który wygenerował `dist/`) z GitHubem. Do ponownego sprawdzenia na właściwym koncie.
- **Migracja na Next.js**: obecnie `dist/` to czysty statyczny HTML/JS bez build stepu (zgodnie z README w `dist/`). CLAUDE.md zakłada Next.js jako docelowy framework, ale nie jest jeszcze wdrożony — do zaplanowania jako odrębna faza.

## Prompt startowy na następną sesję

> Kontynuujemy wdrożenie wasylprowadzi.pl. Stan: repo na GitHubie podpięte i wypchnięte (`main`), wszystkie zasoby poza kaflami OSM hostowane lokalnie, PR #9 (uwagi klienta, tymczasowe przełączniki wariantów) czeka na merge, Cloudflare Pages podpięte z custom domain, GitHub ↔ Claude Code działa (agent tworzy gałęzie/PR-y z promptów). Claude Design ↔ GitHub jeszcze nie potwierdzone (do sprawdzenia na właściwym koncie claude.ai/design). Zacznij od ground-truth: sprawdź faktyczny stan repo (`git log`, `git status`) i przeczytaj `plan.md` + `CLAUDE.md` przed kontynuacją — nie zakładaj niczego z historii rozmowy z poprzedniej sesji.
>
> To będzie sesja planistyczna: temat to migracja `dist/` (statyczny HTML/JS) na Next.js. Zanim padnie jakakolwiek decyzja, wytłumacz użytkownikowi (nie zna Next.js) konkretnie jaką to robi różnicę dla tego projektu — co zyskuje, co się komplikuje, czy jest to w ogóle potrzebne przy tak małej, statycznej stronie — i dopiero na tej podstawie ustalcie razem, czy i jak wchodzi to do planu jako faza.
