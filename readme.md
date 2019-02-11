# Wakers CMS 5

CMS založený na Nette 2.4 a PHP 7.3 | [http://www.wakers.cz/cms](http://www.wakers.cz/cms)

## O Projektu
**TODO:** Video - Proč jsme to vyvinuli, jak to funguje a co to umí.

## Instalace systému

### 0. Závislosti pro spuštění
- Docker: 18.23.2
- Docker compose: 1.23.2
- NodeJS: v8.12.2
- NPM: 6.7.0

### 1. Konfigurace
1. Instalace a spuštění Dockeru [https://www.docker.com/get-started](https://www.docker.com/get-started).
1. Zastavení všech Docker containerů `docker stop $(docker ps -a -q)`.
1. Vytvoření projektu `composer create-project wakers/cms-sandbox --stability dev`.
1. Vytvoření `./docker-compose.override.yml` (podle `./docker-compose.example.yml`).
1. Vytvoření `./docker/nginx/nginx.conf` (podle `./docker/nginx/nginx.example.conf`).
1. Vytvoření `.env` (podle souboru `.env.example`).
1. Vytvoření a nastavení configů `./app/config/db.local.neon` a `./app/config/smtp.local.neon` (podle `./app/config/*.example.neon` souborů).

### 2. Spuštění
1. Sestavení a spuštění Docker containeru `docker-compose up --build --d`.
1. Vytvoření databáze s kódováním `utf8_general_ci` na [http://localhost:9876](http://localhost:9876) (`s: mariadb`, `u: root`, `p: root`).
1. Instalace závislostí `./sc composer i` a `./sc npm i`.
1. Vygenerování assets `./sc npm run gulp-dev`.
1. Vygenerování DB active-record tříd`./sc propel model:build`.
1. Vytvoření databázových tabulek `./sc propel migration:migrate`.
1. Vytvoření jazyku `./sc console wakers:lang-create <lang>`.
1. Vytvoření (všech) úvodních stránek `./sc console wakers:homepage-create <defaultLang> [layoutName=home.latte]`.
1. Vytvoření admina `./sc console wakers:admin-create <email> <password>`.

## Užitečné příkazy
- Přehled hl. příkazů: `./sc`.
- Přepnutí se do Docker containeru: `docker exec -it <container_name> bash`.
- Spuštění příkazu v containeru: `docker-compose exec <service_name> <commands>`.
- Kompletní vyčištění dockeru `docker system prune --all -f`.

## Deploy
Po zprovoznění aplikace na serveru je potřeba:

1. Přepsat, případně přidat názvy domén (dev.wakers.cz) v souborech:
    - `./sc-letsencrypt.sh`.
    - `./docker/nginx/servers/production.conf`.
    
2. V souboru `./docker/nginx/nginx.conf` změnit `include servers/development.conf;`  na `include servers/production.conf;`.
3. Spustit script `./sc-letsencrypt.sh`.
4. Přidat cron pro dump DB `crontab -e`, `crontab -l`, `0 4 * * * /in-docker/sc-dumpdb.sh`.