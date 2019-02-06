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
1. Zastavení všech docker containerů `docker stop $(docker ps -a -q)`.
1. Kompletní vyčištění dockeru `docker system prune --all -f`
1. Vytvoření projektu `composer create-project wakerscz/cms-sandbox --stability dev`.
1. 🐳 Vytvoření `./docker-compose.override.yml` (podle `./docker-compose.example.yml`).
1. 🐳 Vytvoření `.env` (podle souboru `.env.example`).
1. 🐳 Sestavení a spuštění Docker containeru `docker-compose up --build --d`.
1. 🐳 Získání hesla k DB `docker-compose logs 2>/dev/null | grep "GENERATED ROOT PASSWORD"`.
1. 🐳 Úprava hesla pro root uživatele v admineru [http://localhost:9876](http://localhost:9876) (`s: mariadb`, `u: root`, `p: <získané-heslo>`).
1. Vytvoření databáze s kódováním `utf8_general_ci`.
1. Vytvoření a nastavení configů `./app/config/db.local.neon` a `./app/config/smtp.local.neon` (podle `./app/config/*.example.neon` souborů).
1. Úprava configu v `./app/config/app.neon`.
1. Nastavení CLI PHP interpretu v PHPStormu.
1. Nastavení Xdebug mapování v PHPStormu `/<local-path>/my-project → /app`.
1. Instalace závislostí `./sc/... composer i`, `./sc/... npm i`.
1. Vygenerování assets `./sc/... webpack-dev`.
1. Vygenerování DB active-record tříd`./sc/... propel model:build`.
1. Vytvoření databázových tabulek `./sc/... propel migration:migrate`.
1. Vytvoření jazyku `./sc/... console wakers:lang-create <lang>`.
1. Vytvoření (všech) úvodních stránek `./sc/... console wakers:homepage-create <defaultLang> [layoutName=home.latte]`.
1. Vytvoření admina `./sc/... console wakers:admin-create <email> <password>`.

## Užitečné příkazy
- 🐳 Přepnutí se do Docker containeru: `docker exec -it app bash`.
- 🐳 Spuštění PHP příkazu v containeru: `docker exec -it app php <command>`.

## Možné problémy
- 🐳 Při generování assets hlásí chybu s neexistujícími soubory / nedostačujícími právy, mělo by stačit pustit `docker-compose restart`.
- Nezobrazuje se tracy - dumpněte si `var_dump($_SERVER['REMOTE_ADDR'])` a přidejte jí do `./app/bootstrap.php` - `$configurator->setDebugMode(['X.X.X.X']);`.

## Deploy a HTTPS
Po zprovoznění aplikace na serveru je potřeba:

1. Přepsat, případně přidat názvy domén (dev.wakers.cz) v souborech:
    - `./init-letsencrypt.sh`.
    - `./docker/nginx/servers/production.conf`.
    
2. V souboru `./docker/nginx/nginx.conf` změnit `include servers/development.conf;`  na `include servers/production.conf;`.
3. Spustit script `./init-letsencrypt.sh`.