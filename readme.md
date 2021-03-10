# Wakers CMS 5

CMS založený na Nette 2.5 a PHP 7.3 | [https://www.wakers.cz/cms](https://www.wakers.cz/cms)

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
- Unix **nebo** Windows 10 PRO s [WSL v1](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly) 
- [Docker desktop](https://www.docker.com/products/docker-desktop) >= 18.09.1
- [GIT](https://git-scm.com/downloads) >= 2.20.1
- [NodeJS](https://nodejs.org/en/download/): v8.12.2 - nejlépe přes [NVM](https://github.com/nvm-sh/nvm)
- NPM: 6.7.0 `npm i -g npm@6.7.0`

### 1. Konfigurace
1. Vytvoření souboru `cp ./docker-compose.example.yml ./docker-compose.override.yml`
1. Vytvoření souboru `cp ./docker/nginx/nginx.example.conf ./docker/nginx/nginx.conf`
1. Vytvoření souboru `cp .env.example .env`

### 2. Spuštění
1. Zastavení všech Docker containerů `docker stop $(docker ps -a -q)`
1. Sestavení a spuštění Docker containeru `docker-compose up --build --d`
1. Instalace závislostí `./sc composer i` a `./sc npm i`
1. Vygenerování assets `./sc npm run gulp-dev`
1. Vygenerování DB active-record tříd`./sc propel model:build`
1. Vytvoření databázových tabulek `./sc propel migration:migrate`
1. Vytvoření jazyku `./sc console wakers:lang-create <lang>`
1. Vytvoření (všech) úvodních stránek `./sc console wakers:homepage-create <defaultLang> [layoutName=home.latte]`
1. Vytvoření admina `./sc console wakers:admin-create <email> <password>`

## Užitečné příkazy
- Přehled hl. příkazů: `./sc`
- Dump databáze: `./sc-dump.sh`
- Přepnutí se do Docker containeru: `docker exec -it <container_name> bash`
- Spuštění příkazu v containeru: `docker-compose exec <service_name> <commands>`
- Kompletní vyčištění dockeru `docker system prune --all -f`
- Adminer: [localhost:9876](http://localhost:9876)

## Deploy
Po zprovoznění aplikace na serveru je potřeba:

1. Přepsat, případně přidat názvy domén (wakers.cz) v souborech:
    - `./sc-ssl.sh`
    - `./docker/nginx/servers/production.conf`
2. Spustit script `./sc-ssl.sh`
3. V souboru `./docker/nginx/nginx.conf` změnit `include servers/development.conf;`  na `include servers/production.conf;`
4. Restartovat nginx / docker `docker-compose restart`
