# plan.md

Stan wdrożenia, decyzje architektoniczne i harmonogram — aktualizowane na bieżąco (patrz zasady w `CLAUDE.md`).

## Stan na 2026-08-22

### Zrobione
- Repo GitHub podpięte jako `origin`: [przemekcichon/wasylprowadzi](https://github.com/przemekcichon/wasylprowadzi), gałąź główna `main`.
- Pierwszy commit: `dist/` (statyczna strona wygenerowana przez Claude Design — `index.html`, `support.js`, `wasyl-map.js`, `img/`) + `CLAUDE.md`, `plan.md`, workspace.
- Ustalony workflow: zmiany przez PR, merge tylko na wyraźne pozwolenie użytkownika. Pierwszy PR (#1, doprecyzowanie sekcji "Zasady pracy") zmergowany do `main`, gałąź feature usunięta.
- `.gitignore` w katalogu głównym z regułami sekretów (`.env`, `*.mmdb`) zgodnie z CLAUDE.md.
- **Cloudflare Pages podpięte** — repo połączone przez dashboard, skonfigurowany custom domain.
- **GitHub ↔ Claude Code działa** — agent tworzy gałęzie i PR-y z promptów w bieżącej sesji (potwierdzone w praktyce, nie tylko deklaratywnie).

### Wyjątek od procesu
- Commit `4f14c23` ("Ikony telefonu i poczty jako SVG zamiast emoji", `dist/index.html`) trafił bezpośrednio na `main`, bez PR-a — użytkownik zmienił emoji ikony telefonu/poczty na SVG, żeby Apple nie renderowało ich jako czerwonych emoji. Zmiana jest już opublikowana i wypchnięta, więc odtworzenie jej przez PR wymagałoby przepisania historii `main` (revert + reapply) — uznane za nieproporcjonalne ryzyko dla drobnej, jednoznacznej poprawki wizualnej. Odnotowane tu po fakcie jako świadomy wyjątek; kolejne zmiany nadal przez PR.

### Do zrobienia (kandydaci — nie w planie, do przegłosowania na sesji planistycznej)
- **Claude Design → GitHub**: narzędzie `DesignSync` widzi tylko projekty typu "design system" (biblioteki komponentów) z konta, na którym akurat jest zalogowana sesja — przy sprawdzaniu byliśmy zalogowani na złe konto, więc nie potwierdziliśmy jeszcze, czy/jak połączyć konkretny projekt strony (ten, który wygenerował `dist/`) z GitHubem. Do ponownego sprawdzenia na właściwym koncie.
- **Migracja na Next.js**: obecnie `dist/` to czysty statyczny HTML/JS bez build stepu (zgodnie z README w `dist/`). CLAUDE.md zakłada Next.js jako docelowy framework, ale nie jest jeszcze wdrożony — do zaplanowania jako odrębna faza.

## Prompt startowy na następną sesję

> Kontynuujemy wdrożenie wasylprowadzi.pl. Stan: repo na GitHubie podpięte i wypchnięte (`main`), Cloudflare Pages podpięte z custom domain, GitHub ↔ Claude Code działa (agent tworzy gałęzie/PR-y z promptów). Claude Design ↔ GitHub jeszcze nie potwierdzone (do sprawdzenia na właściwym koncie claude.ai/design). Zacznij od ground-truth: sprawdź faktyczny stan repo (`git log`, `git status`) i przeczytaj `plan.md` + `CLAUDE.md` przed kontynuacją — nie zakładaj niczego z historii rozmowy z poprzedniej sesji.
>
> To będzie sesja planistyczna: temat to migracja `dist/` (statyczny HTML/JS) na Next.js. Zanim padnie jakakolwiek decyzja, wytłumacz użytkownikowi (nie zna Next.js) konkretnie jaką to robi różnicę dla tego projektu — co zyskuje, co się komplikuje, czy jest to w ogóle potrzebne przy tak małej, statycznej stronie — i dopiero na tej podstawie ustalcie razem, czy i jak wchodzi to do planu jako faza.
