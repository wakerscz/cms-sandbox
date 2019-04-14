# Wakers CMS 5

CMS založený na Nette 2.4 a PHP 7.3 | [http://www.wakers.cz/cms](http://www.wakers.cz/cms)

## O Projektu
Systém byl vyvinut za účelem zrychlení implementace a následné udržitelnosti projektů. Vše bylo
rozděleno do vendor modulů - ty jsou verzovány samostatně. Výsledný webový projekt tedy neobsahuje žádné
zbytečné kódy a je přehlednější. Dev-stack nového projektu lze připravit během pár minut.

7 základních modulů  **nahrazuje jiné open-source CMS**. Výhoda Wakers CMS spočívá v možnosti využití 
Nette. Systém lze rozšiřovat o další (vlastní) moduly či komponenty. Lze kompletně upravovat, nahrazovat
a konfigurovat jednotlivé části CMS. 

Druhou obrovskou výhodou je UI pro správu webu - administrátoři stránku editují téměř tak, jak ji vidí. 
Nemají k dispozici zbytečné funkce a jsou omezeni, aby zcela nenarušili vizuální podobu a celý smysl webu.

Jako freelanceři se vývojem tohoto CMS snažíme posouvat vpřed. 
Vše je zatím v alfa verzi - další mantrou je ztransparentnění zdrojových kódů a vytvoření (na sobě) nezávislých modulů.

**TODO:** Video - Jak implementovat one-page web (na míru) za 15 minut.

## Seznam výchozích modulů
1. [Base Module](http://www.github.com/wakerscz/cms-base-module)
1. [User Module](http://www.github.com/wakerscz/cms-user-module)
1. [Lang Module](http://www.github.com/wakerscz/cms-lang-module)
1. [Page Module](http://www.github.com/wakerscz/cms-page-module)
1. [On-Page Module](http://www.github.com/wakerscz/cms-onpage-module)
1. [Category Module](http://www.github.com/wakerscz/cms-category-module)
1. [Structure Module](http://www.github.com/wakerscz/cms-structure-module)

## Instalace systému

### 0. Závislosti pro spuštění
- [Docker desktop](https://www.docker.com/products/docker-desktop): 18.09.1
- [GIT](https://git-scm.com/downloads): 2.20.1
- [NodeJS](https://nodejs.org/en/download/): v8.12.2
- NPM: 6.7.0 `npm i -g npm@6.7.0`

### 1. Konfigurace
1. Vytvoření projektu `git clone --depth=1  https://github.com/wakerscz/cms-sandbox.git && rm -rf ./cms-sandbox/.git`.
1. Vytvoření `./docker-compose.override.yml` (podle `./docker-compose.example.yml`).
1. Vytvoření `./docker/nginx/nginx.conf` (podle `./docker/nginx/nginx.example.conf`).
1. Vytvoření `.env` (podle souboru `.env.example`).

### 2. Spuštění
1. Zastavení všech Docker containerů `docker stop $(docker ps -a -q)`.
1. Sestavení a spuštění Docker containeru `docker-compose up --build --d`.
1. Vytvoření databáze s kódováním `utf8_general_ci` na [http://localhost:9876](http://localhost:9876) (`s: mariadb`, `u: root`, `p: yourPassword_1`).
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

1. Přepsat, případně přidat názvy domén (wakers.cz) v souborech:
    - `./sc-letsencrypt.sh`.
    - `./docker/nginx/servers/production.conf`.
    
2. V souboru `./docker/nginx/nginx.conf` změnit `include servers/development.conf;`  na `include servers/production.conf;`.
3. Spustit script `./sc-letsencrypt.sh`.
4. Přidat cron pro dump DB `crontab -e`, `crontab -l`, `0 4 * * * /<path_to>/sc-dumpdb.sh`.
