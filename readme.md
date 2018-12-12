# Wakers CMS 5

CMS založený na Nette 2.4 a PHP 7.2 | [http://www.wakers.cz/cms](http://www.wakers.cz/cms)

## Instalace

🐳 Povinné pouze v případě použití Dockeru.

### Závislosti pro instalaci v Dockeru
- 🐳 Docker 18.23.2
- 🐳 Docker compose 1.23.2

#### Na OSX
- 🐳 Composer 1.7.2

#### Na Windows
- 🐳 Composer 1.7.2
- 🐳 NodeJS 8.12
- 🐳 NPM 6.4.1

### Závislosti pro instalaci bez Dockeru
- Nginx 1.15.4
- MariaDB 10.1.34
- PHP 7.2-fpm
- NodeJS 8.12
- NPM 6.4.1
- Composer 1.7.2

### Výběr shortuct souboru

**TODO:** dodělat zkratky - zatím je podporován pouze OSX / Unix.

**❗ Existují 3 shell soubory pro práci s konzolovými příkazy, vyberte pouze jeden ./sc/...**
- Aplikace bude v Dockeru.
  - Můj systém je OSX / Unix: `./sc/dk-unix`.
  - Můj systém je Windows: `./sc/dk-win`.
- Aplikace nebude v Dockeru: `./sc/no-dk`.

### Základní instalace a nastavení
1. Vytvoření projektu do `composer create-project wakerscz/cms-sandbox --stability dev`).
2. Nastavení Xdebug configu `xdebug.local.ini` (podle `xdebug.example.ini`, ale na svou síťovou IP).
3. 🐳 Sestavení a spuštění Docker containeru (`docker-compose up --build --d`).
4. Vytvoření databáze s kódováním `utf8_general_ci`.
   - 🐳 Úprava hesla pro root uživatele v admineru [http://localhost:9876](http://localhost:9876) (`s: mariadb`, `u: root`, `p: <hash-vygenerovaný-do-konzole-při-sestavení-containeru>`).
5. Vytvoření a nastavení configů `db.local.neon` a `smtp.local.neon` (podle `*.example.neon` souborů).
6. Úprava konfigu v `app.neon`.
7. Nastavení CLI PHP interpretu v PHPStormu.
8. Nastavení Xdebug mapování v PHPStormu (`/<local-path>/my-project → /app`).
9. Instalace závislostí `./sc/... composer i`, `./sc/... npm i`.
10. Vygenerování assets (`./sc/... webpack-dev`).
11. Vytvoření databázových tabulek `./sc/... propel migration:migrate`.
12. Vygenerování active-record tříd`./sc/... propel model:build`.
13. Vytvoření jazyků `./sc/... console wakers:lang-create <lang>`.
14. Vytvoření úvodních stránek `./sc/... wakers:homepage-create <defaultLang> [layoutName=home.latte]`.
15. Vytvoření admina `./sc/... wakers:admin-create <email> <password>`.

## Užitečné příkazy
- Přepnutí se do Docker containeru: `docker exec -it app bash`.
- Spuštění PHP příkazu v containeru: `docker exec -it app php <command>`.
