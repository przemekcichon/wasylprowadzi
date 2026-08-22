# plan.md

Stan wdrożenia, decyzje architektoniczne i harmonogram — aktualizowane na bieżąco (patrz zasady w `CLAUDE.md`).

## Stan na 2026-08-22

### Zrobione
- Repo GitHub podpięte jako `origin`: [przemekcichon/wasylprowadzi](https://github.com/przemekcichon/wasylprowadzi), gałąź główna `main`.
- Pierwszy commit: `dist/` (statyczna strona wygenerowana przez Claude Design — `index.html`, `support.js`, `wasyl-map.js`, `img/`) + `CLAUDE.md`, `plan.md`, workspace.
- Ustalony workflow: zmiany przez PR, merge tylko na wyraźne pozwolenie użytkownika. Pierwszy PR (#1, doprecyzowanie sekcji "Zasady pracy") zmergowany do `main`, gałąź feature usunięta.
- `.gitignore` w katalogu głównym z regułami sekretów (`.env`, `*.mmdb`) zgodnie z CLAUDE.md.

### Wyjątek od procesu
- Commit `4f14c23` ("Ikony telefonu i poczty jako SVG zamiast emoji", `dist/index.html`) trafił bezpośrednio na `main`, bez PR-a — użytkownik zmienił emoji ikony telefonu/poczty na SVG, żeby Apple nie renderowało ich jako czerwonych emoji. Zmiana jest już opublikowana i wypchnięta, więc odtworzenie jej przez PR wymagałoby przepisania historii `main` (revert + reapply) — uznane za nieproporcjonalne ryzyko dla drobnej, jednoznacznej poprawki wizualnej. Odnotowane tu po fakcie jako świadomy wyjątek; kolejne zmiany nadal przez PR.

### Do zrobienia (kandydaci — nie w planie, do przegłosowania na sesji planistycznej)
- **Cloudflare Pages**: podpięcie repo przez dashboard (Workers & Pages → Create → Pages → Connect to Git). Framework preset: None, build command: puste, **output directory: `dist`**. Potem custom domains: `wasylprowadzi.pl` + `www`. Wymaga działania użytkownika w przeglądarce — agent nie ma do tego API.
- **Claude Design → GitHub**: sprawdzone narzędzie `DesignSync` obsługuje tylko projekty typu "design system" (biblioteki komponentów) — na koncie użytkownika są dwa: "hurra Design System" i "Design System", żaden nie odpowiada projektowi, który wygenerował `dist/`. Połączenie dla tego konkretnego projektu strony (jeśli istnieje) trzeba szukać w ustawieniach tego projektu na claude.ai/design — wymaga sprawdzenia przez użytkownika.
- **Migracja na Next.js**: obecnie `dist/` to czysty statyczny HTML/JS bez build stepu (zgodnie z README w `dist/`). CLAUDE.md zakłada Next.js jako docelowy framework, ale nie jest jeszcze wdrożony — do zaplanowania jako odrębna faza.
- **Github ↔ Claude Code**: automatyczne tworzenie sesji/PR z promptów agenta — jeszcze nie skonfigurowane.
- Sekrety GTM (Container Config, base64) i MaxMind (Account ID/License Key) — `.env` na serwerze jeszcze nie utworzony (serwer sam jeszcze nie ustalony/skonfigurowany).

## Prompt startowy na następną sesję

> Kontynuujemy wdrożenie wasylprowadzi.pl. Stan: repo na GitHubie podpięte i wypchnięte (`main`), pierwszy PR zmergowany. Cloudflare Pages i połączenie Claude Design ↔ GitHub jeszcze nie zrobione (wymagają kroków w przeglądarce). Zacznij od ground-truth: sprawdź faktyczny stan repo (`git log`, `git status`), czy Cloudflare Pages już podpięte (spytaj albo zweryfikuj jeśli masz dostęp), i przeczytaj `plan.md` + `CLAUDE.md` przed kontynuacją. Nie zakładaj niczego z historii rozmowy z poprzedniej sesji.
