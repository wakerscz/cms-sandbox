# Wakers CMS 5

Redakční systém založený na Nette frameworku 2.4 | [http://www.wakers.cz/cms](http://www.wakers.cz/cms)


## Autoři:

- Jiří Zapletal [zapletal@wakers.cz](mailto:zapletal@wakers.cz)

## Základní instalace a nastavení

1. Naklonování repozitáře (`git clone`).
2. Vytvoření a nastavení configů `db.local.neon` a `smtp.local.neon`.
3. Vytvoření a nastavení Xdebug configu `xdebug.local.ini`.
4. Instalace závislostí `composer i`, `npm i`.
5. Vygenerování GULP assets (`gulp --env dev`).
7. Sestavení a spuštění Docker containeru (`docker-compose up --build --d`).
8. Nastavení Docker CLI PHP interpretu v PHPStormu.
9. Nastavení Xdebug mapování v PHPStormu (`/<local-path>/my-project → /app`).


### Tipy na úvod

1. Přepnutí se do Docker containeru: `docker exec -it app bash`.
2. Spuštění PHP příkazu v containeru: `php <command>`.
3. Spuštění Symfony konzole: `php /app/index.php <symfony_command>`

### Nastavení nového webu 1. krok

1. Vytvoření databáze s kódováním `utf8_general_ci` v admineru [http://localhost:9876](http://localhost:9876) (`s: mariadb`, `u: root`, `p: root`).
2. Sestavení databázového schématu v `./app/schema/schema.xml`.
3. Vytvoření databázových tabulek (`propel:migration:diff`, `propel:migration:migrate`).
4. Vygenerování active-record tříd (`propel:model:build`).
5. Sestavení `adminModules`, `adminNavBar` a `frontendDashboard` v `./app/config/app.neon`.
6. Načtení modulových configů v `./app/config/app.neon`.

### Nastavení nového webu 2. krok

1. Vytvoření úvodní stránky `wakers:homepage-create`.
2. Otestování webu na [http://localhost](http://localhost).

### Nastavení nového webu 3. krok

1. Vytvoření nového uživatele `wakers:admin-create <email> <password>`.
2. Upravení šablon ve složce `./app/template/*`.


## Deploy na DigitalOcean

### První deploy

1. Vytvoření dropletu s docker containerem.
2. Připojení na droplet pomocí ssh - `ssh root@<server-ip>`.
3. Naklonování repozitáře - `git clone http://.../some-repo.git project-folder`.
4. Spuštění deploy scriptu.
    - `cd ./project-folder`.
    - `./sc server-deploy` (poznamenat si vygenerované MYSQL root heslo).
5. Vytvoření databáze a uživatele s omezeným oprávněním.
    - `http://<server-ip>:9876`.
    - `u: root`, `p: <poznamenané heslo>`.
5. Nastavení configů.
    - `cd ./app/config`.
    - `cp db.example.neon db.local.neon`.
    - `cp smtp.example.neon smtp.local.neon`.
    - `nano smtp.local.neon` - upravit hodnoty.
    - `nano db.local.neon` - upravit hodnoty.
6. Spustit migraci - `./../../sc server-deploy-migrate`.
7. `exit`.

### N-tý deploy
1. Připojení na droplet pomocí ssh
2. `cd <project-folder>`
2. `git pull`
3. `./sc server-deploy`


### Typy na konec
Reload nginxu `docker exec nginx /etc/init.d/nginx reload`