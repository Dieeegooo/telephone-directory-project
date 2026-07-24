# 📖 Rubrica Telefonica — React + Laravel

Web app di gestione rubrica telefonica: un'interfaccia React (SPA) che consuma
un'API REST realizzata con Laravel. Permette di registrarsi/autenticarsi e di
gestire i propri contatti con relativi numeri di telefono ed email.

## ✨ Funzionalità

- Registrazione e login utente (autenticazione a token con Laravel Sanctum)
- Elenco contatti, creazione ed eliminazione
- Pagina di dettaglio contatto con modifica anagrafica
- Gestione di più numeri di telefono e più email per ogni contatto
- Tema chiaro / scuro con toggle (persistente tra le sessioni)

## 🧱 Stack tecnico

**Frontend:** React, React Router, Vite, Bootstrap 5, Context API
**Backend:** Laravel, Laravel Sanctum, SQLite

### Concetti React utilizzati

- `useState` e `useEffect` (gestione stato e caricamento dati dall'API)
- `React Router` con più pagine (`/login`, `/register`, `/`, `/contacts/:id`)
- `useContext` per il tema chiaro/scuro (`src/context/ThemeContext.jsx`)
- Bootstrap 5 come libreria di componenti/stili CSS

## 📂 Struttura del repository

```
.
├── telephone-directory-backend/app/   # API Laravel (root con artisan)
└── frontend/telephone-directory-app/  # SPA React
```

---

## 🚀 Avvio del progetto (dopo `git clone`)

Servono due terminali: uno per il backend, uno per il frontend.

### Prerequisiti

- PHP >= 8.3 e Composer
- Node.js >= 18 e npm

### 1) Backend (Laravel)

```bash
cd telephone-directory-backend/app    # la cartella dell'app Laravel (dove c'è artisan)
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite   # se il file non è già presente
php artisan migrate
php artisan serve                # avvia su http://127.0.0.1:8000
```

> Il progetto usa **SQLite** di default: non serve installare MySQL.
> Assicurati che nel `.env` ci sia `DB_CONNECTION=sqlite`.

> **In alternativa**, nella cartella `telephone-directory-backend/` è presente
> un `docker-compose.yml` che avvia backend + MySQL + phpMyAdmin
> (`docker compose up`). In quel caso il `.env` va impostato con
> `DB_CONNECTION=mysql` e le credenziali del container (vedi `docker-compose.yml`).

**CORS:** non è presente un `config/cors.php` nel progetto, quindi Laravel usa
il default del framework che permette tutte le origini
(`allowed_origins => ['*']`) — in locale funziona senza configurare nulla. Se
in futuro vuoi restringere le origini permesse, pubblica il file con
`php artisan config:publish cors` e imposta l'URL del frontend
(default Vite: `http://localhost:5173`).

### 2) Frontend (React)

```bash
cd frontend/telephone-directory-app
npm install
```

Crea un file `.env` nella cartella del frontend con l'URL dell'API:

```
VITE_API_URL=http://127.0.0.1:8000/api
```

Poi avvia il dev server:

```bash
npm run dev          # avvia su http://localhost:5173
```

### 3) Provare l'applicazione

1. Apri `http://localhost:5173`
2. Vai su **Register** e crea un utente (nome, email, password min. 8 caratteri)
3. Verrai autenticato e reindirizzato alla rubrica
4. Aggiungi un contatto, aprilo e inserisci numeri di telefono ed email

> Non esiste un utente pre-caricato: registrane uno nuovo dall'app.

---

## 🔌 Note sull'architettura

- L'autenticazione usa **token Sanctum**: al login il token viene salvato in
  `localStorage` e inviato su ogni richiesta nell'header `Authorization: Bearer`.
- Tutte le chiamate HTTP passano da un unico wrapper (`src/api/api.js`) che
  inietta il token e centralizza la gestione degli errori.
- Contatti, telefoni ed email sono risorse REST separate lato backend
  (`/contacts`, `/telephones`, `/mails`); il dettaglio contatto le compone.

## 🔮 Sviluppi futuri

- Ricerca e filtro dei contatti
- Validazione lato client dei form (numero/email) con feedback immediato
- Migrazione a React Router in *data mode* (loader/action) al posto del fetch nei componenti
- Refresh token / scadenza sessione gestita
- Upload avatar del contatto e campo "preferiti"
- Test automatici (frontend con Vitest, backend con PHPUnit)

## 🔗 Riferimenti utili

- React — https://react.dev
- React Router (tutorial Address Book) — https://reactrouter.com
- Vite — https://vite.dev
- Bootstrap 5 — https://getbootstrap.com
- Laravel — https://laravel.com/docs
- Laravel Sanctum — https://laravel.com/docs/sanctum
