# Wakers CMS 5

CMS založený na Nette 2.4 a PHP 7.2 | [http://www.wakers.cz/cms](http://www.wakers.cz/cms)

## V čem je systém vyjímečný

**TODO:** Youtube Video

## Instalace systému

Symbol [ 🐳 ] - povinné pouze v případě použití Dockeru.

### Závislosti pro spuštění v Dockeru
- 🐳 Docker 18.23.2
- 🐳 Docker compose 1.23.2

#### Na OSX
- 🐳 Composer 1.7.2

#### Na Windows
- 🐳 Composer 1.7.2
- 🐳 NodeJS 8.12
- 🐳 NPM 6.4.1

### Závislosti pro spuštění bez Dockeru
- Nginx 1.15.4
- MariaDB 10.1.34
- PHP 7.2-fpm
- NodeJS 8.12
- NPM 6.4.1
- Composer 1.7.2

### Výběr shortcut souboru

**TODO:** dodělat zkratky - zatím je podporován pouze OSX / Unix.

**❗ Existují 3 shell soubory pro práci s konzolovými příkazy, zapamatujte si pouze jeden ./sc/...**

- Aplikace bude v Dockeru.
  - Můj systém je OSX / Unix: `./sc/dk-unix`.
  - Můj systém je Windows: `./sc/dk-win`.
- Aplikace nebude v Dockeru: `./sc/no-dk`.

### Samotná instalace a nastavení
1. Vytvoření projektu `composer create-project wakerscz/cms-sandbox --stability dev`.
2. Nastavení Xdebug configu `./docker/xdebug.local.ini` (podle `./docker/xdebug.example.ini`, na svou síťovou IP).
3. 🐳 Vytvoření `./docker-compose.override.yml` (podle `./docker-compose.example.yml`).
4. 🐳 Sestavení a spuštění Docker containeru `docker-compose up --build --d`.
5. 🐳 Úprava hesla pro root uživatele v admineru [http://localhost:9876](http://localhost:9876) (`s: mariadb`, `u: root`, `p: <hash-vygenerovaný-do-konzole-při-sestavení-containeru>`).
6. Vytvoření databáze s kódováním `utf8_general_ci`.
7. Vytvoření a nastavení configů `./app/config/db.local.neon` a `./app/config/smtp.local.neon` (podle `./app/config/*.example.neon` souborů).
8. Úprava konfigu v `./app/config/app.neon`.
9. Nastavení CLI PHP interpretu v PHPStormu.
10. Nastavení Xdebug mapování v PHPStormu `/<local-path>/my-project → /app`.
11. Instalace závislostí `./sc/... composer i`, `./sc/... npm i`.
12. Vygenerování assets `./sc/... webpack-dev`.
13. Vygenerování DB active-record tříd`./sc/... propel model:build`.
14. Vytvoření databázových tabulek `./sc/... propel migration:migrate`.
15. Vytvoření jazyku `./sc/... console wakers:lang-create <lang>`.
16. Vytvoření (všech) úvodních stránek `./sc/... wakers:homepage-create <defaultLang> [layoutName=home.latte]`.
17. Vytvoření admina `./sc/... wakers:admin-create <email> <password>`.

## Užitečné příkazy
- 🐳 Přepnutí se do Docker containeru: `docker exec -it app bash`.
- 🐳 Spuštění PHP příkazu v containeru: `docker exec -it app php <command>`.
