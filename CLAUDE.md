# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands


## Architecture Overview


### Key Technologies

- Cloudflare Pages — hosting statyczny, reverse proxy na portach 80/443, terminacja SSL, cache, firewall
- Next.js — framework React, SSR, SSG, API routes, TypeScript -> użytkownik się na tym nie zna, ale agent LLM może weryfikować poprawność kodu i konfiguracji -> w tym zakresie to projekt szkoleniowy dla użytkownika
- Claude Design (CD) — komponenty UI, motyw kolorystyczny, typografia, ikony

### Component Architecture


### External Integrations


## Zasady pracy

- Decyzje architektoniczne, stan wdrożenia i harmonogram kroków dokumentujemy na bieżąco w `plan.md`
- Plan dzieli się na fazy: przygotowanie środowiska, implementacja, testy, deploy, utrzymanie. Każda faza ma checklistę zadań i harmonogram. 
- Fazy mogą być dodawane w sesji planistycznej i zmieniane w trakcie sesji implementacyjnej, jeśli pojawią się nowe informacje. Każda zmiana w planie wymaga uzasadnienia i dokumentacji w `plan.md`.
- Realizujemy tylko zadania z planu, nie improwizujemy. Jeśli pojawi się nowy pomysł, agent LLM dodaje go do planu i harmonogramu, a nie implementuje od razu.
- Dodajemy do planu jako kandydat w każdym czasie pracy. Kandydaci są poza planem, dopóki nie zostaną przeniesieni do planu po sesji planistycznej. Wówczas kandydat zostaje oznaczony kolorową ikoną graficzną żeby było widać, że został promowany do planu.
- Sesja planistyczna poprzedzona jest ground-truth — weryfikacją stanu repo, serwera i dokumentów. Agent LLM nie polega wyłącznie na historii rozmowy czy tym, co napisane w `plan.md`.
- Na końcu sesji planistycznej agent LLM przygotowuje gotowy prompt startowy dla następnej sesji implementacyjnej: stan projektu, co zrobione, co dalej. Nowa sesja zaczyna od ground-truth — weryfikuje faktyczny stan (repo, serwer, dokumenty) zamiast polegać wyłącznie na historii rozmowy czy na tym, co napisane w `plan.md`.
- Agent w sesji implementacyjnej odsyła do weryfikacji poprawność swojego kodu i konfiguracji do osobnej subsesji agenta weryfikatora. Agent weryfikator sprawdza poprawność kodu i konfiguracji, a nie tylko czy kod się kompiluje. Agent weryfikator może też weryfikować poprawność konfiguracji serwera i usług zewnętrznych (np. Cloudflare Pages, MaxMind, GTM). Agent weryfikator może też weryfikować poprawność dokumentacji w `plan.md`.
- Agent implementujący uwzględnia weryfikację w swoim planie pracy i nie przechodzi do kolejnych zadań, dopóki weryfikacja nie zakończy się sukcesem. Weryfikacja może wymagać kilku iteracji. 
- Komunikacja z osobami nietechnicznymi (np. mailem) — bez żargonu, tylko konkretna prośba + krótkie "dlaczego"
- Maksymalne wykorzystanie agenta LLM (Claude Code) w prowadzeniu wdrożenia — automatyzacja, weryfikacja (np. propagacji DNS), dokumentowanie decyzji, zamiast pracy ręcznej

## Powiązane dokumenty

- `plan.md` — stan serwera, przyjęte decyzje architektoniczne, checklisty i harmonogram wdrożenia

## Repozytorium i deploy

- Jedno repo (monorepo) dla całego projektu 
- Repo: [git@github.com:przemekcichon/wasylprowadzi.git](https://github.com/przemekcichon/wasylprowadzi) (remote `origin` do podpięcia).
- Github do podpięcia do Cloudflare Pages, automatyczny deploy po merge na main
- Github do podpięcia do Claude Code, automatyczne tworzenie sesji i PR-ów z promptów agenta
- Github do podpięcia do Claude Design, automatyczne aktualizacje komponentów UI w repo
- **Sekrety — tylko przez `.env`, nigdy w repo.** Container Config z GTM (klucz base64) oraz MaxMind Account ID/License Key trzymane w `.env` na serwerze (tworzony ręcznie przez SSH, poza repo). W repo commitowany tylko `.env.example` (szablon nazw zmiennych, bez wartości). `.env` i baza `*.mmdb` w `.gitignore`.

## Workflow: sesje i Pull Requesty

Mimo małej skali projektu zależy nam na przejrzystej historii zmian — istotne przy pracy z agentem LLM w wielu oddzielnych sesjach, bo historia PR-ów to główny zapis "dlaczego" obok `plan.md`.

- Zmiany trafiają na main przez Pull Requesty, nie przez bezpośrednie commity
- Merge PR-a tylko na wyraźne pozwolenie użytkownika — agent nigdy nie mergeuje samodzielnie
- Każda sesja pracuje na osobnej gałęzi feature; jedna gałąź/PR = jedna spójna jednostka pracy
- Na koniec sesji agent przygotowuje gotowy prompt startowy dla następnej sesji: stan projektu, co zrobione, co dalej
- Nowa sesja zaczyna od ground-truth — weryfikuje faktyczny stan (repo, serwer, dokumenty) zamiast polegać wyłącznie na historii rozmowy czy na tym, co napisane w `plan.md`