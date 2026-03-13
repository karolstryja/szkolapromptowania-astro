---
title: Prompt engineering — zaawansowane techniki
date: 2026-02-28
image: images/project-3_1project-3.webp
excerpt: Chain-of-thought, few-shot, system prompts. Techniki, które odróżniają amatora od profesjonalisty.
gallery_layout: grid
tags: [prompt engineering, zaawansowane, techniki]
---

Znasz podstawy. Umiesz dać kontekst, przypisać rolę, opisać zadanie. Ale profesjonalny prompt engineer idzie dalej. Dużo dalej.

## Chain-of-Thought — myśl krok po kroku

Zamiast prosić AI o odpowiedź, proś o **proces myślenia**. Różnica jest ogromna.

Bez chain-of-thought:
```
Ile wynosi 15% rabatu od ceny 847 zł,
jeśli klient ma dodatkowy kupon 50 zł?
```

Z chain-of-thought:
```
Rozwiąż to krok po kroku:
1. Oblicz cenę po rabacie 15% od 847 zł
2. Odejmij kupon 50 zł
3. Podaj cenę końcową
Pokaż każdy krok obliczeń.
```

> Chain-of-thought to nie jest "sztuczka". To fundamentalna zmiana w sposobie, jak AI przetwarza informację. Wymuszasz głębsze rozumowanie.

## Few-Shot Learning — ucz przez przykłady

Zamiast opisywać czego chcesz, **pokaż**. Daj 2-3 przykłady i pozwól AI wyciągnąć wzorzec.

```
Przekształć nazwy produktów w hasła marketingowe:

Produkt: Kawa ziarnista Colombia
Hasło: "Colombia w filiżance — smak, który budzi zmysły"

Produkt: Herbata matcha premium
Hasło: "Matcha premium — rytuał zdrowia w każdym łyku"

Produkt: Kakao ceremonial grade
Hasło:
```

AI zrozumie styl, strukturę i ton. Bez słowa wyjaśnienia.

:::gallery-grid
images/project-1.jpg | Chain-of-thought w praktyce
images/project-2_1project-2.webp | Few-shot learning
images/project-3_1project-3.webp | System prompts
images/project-4_1project-4.webp | Structured outputs
:::

## System Prompts — ukryta supermoc

System prompt to instrukcja, którą AI dostaje **przed** rozmową z użytkownikiem. To DNA zachowania modelu.

Przykład system promptu dla firmowego asystenta:
```
Jesteś asystentem firmy TechCorp.
Odpowiadasz TYLKO na pytania dotyczące naszych produktów.
Ton: profesjonalny, pomocny.
Jeśli nie znasz odpowiedzi — powiedz wprost.
Nigdy nie wymyślaj informacji o produktach.
Zawsze podawaj źródło (link do dokumentacji).
```

To zmienia AI z "generycznego chatbota" w **specjalistycznego pracownika**.

## Structured Outputs — kontroluj format

Nie proś AI o "odpowiedź". Proś o odpowiedź w **konkretnym formacie**.

```
Przeanalizuj ten tekst i zwróć wynik jako JSON:
{
  "sentiment": "pozytywny/negatywny/neutralny",
  "key_topics": ["temat1", "temat2"],
  "summary": "1-2 zdania",
  "action_items": ["punkt1", "punkt2"]
}
```

Teraz możesz podłączyć wynik AI do dowolnego procesu automatyzacji.

## Łącz techniki

Prawdziwa magia dzieje się, gdy łączysz chain-of-thought + few-shot + structured output w jednym prompcie. To jest **prompt engineering** — nie sztuczka, a inżynieria.
