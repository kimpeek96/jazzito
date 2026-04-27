# Jazzito Records — modular landing + order page

Projekt rozbity na moduły.

## Struktura

```txt
jazzito-records/
├── index.html
├── order.html
├── css/
│   ├── reset.css
│   ├── base.css
│   ├── scenes.css
│   ├── artists.css
│   ├── responsive.css
│   └── order.css
├── js/
│   ├── scenes.js
│   ├── artists.js
│   ├── release-slider.js
│   ├── order.js
│   └── main.js
├── videos/
└── assets/
    ├── epiphyllum-front.svg
    ├── xanthoderme-front.svg
    └── jazzito-pack.svg
```

## Funkcje

- pełnoekranowe sceny,
- scroll / klawiatura / swipe,
- scena rosteru artystów,
- video artysty po hoverze lub tapnięciu,
- scena release z automatycznym sliderem zdjęć,
- osobna strona `order.html` do zamawiania,
- slider na stronie zamówienia,
- formularz zamówienia generujący gotowy e-mail przez `mailto:`.

## Konfiguracja zamówień

Adres odbiorcy zamówienia ustawisz w pliku:

```js
js/order.js
```

Zmień:

```js
const ORDER_EMAIL = 'contact@jazzitorecords.pl';
```

Cena zestawu jest ustawiona w tym samym pliku:

```js
const SET_PRICE = 99;
```

## Obrazy

Podmień pliki w `assets/` na prawdziwe grafiki EP. Zachowaj te same nazwy albo zmień ścieżki w `index.html` i `order.html`.
