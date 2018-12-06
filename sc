#!/usr/bin/env bash

wakers_resolve_permissions()
{
    mkdir -p ./assets/dynamic
    mkdir -p ./www/temp/static
    mkdir -p ./www/temp/dynamic
    mkdir -p ./temp
    mkdir -p ./log

    chmod -R ugo+w ./assets/dynamic
    chmod -R ugo+rw ./www/temp/dynamic
    chmod -R ugo+r ./www/temp/static
    chmod -R ugo+w ./temp
    chmod -R ugo+w ./log
}

# Resolve before start
wakers_resolve_permissions


wakers_npm()
{
    mkdir -p ./node_modules/.temp-fix

    if [ -e ./package.json ]
    then
        cp -rf ./package.json ./node_modules/.temp-fix/package.json
    fi

    if [ -e ./package-lock.json ]
    then
        cp -rf ./package-lock.json ./node_modules/.temp-fix/package-lock.json
    fi

    docker exec -it nodejs ${@}
    find . -name 'npm-*' -type d -exec rm -rf {} +

    if [ -e ./node_modules/.temp-fix/package.json ]
    then
        cat /dev/null > ./package.json
        IFS=$'\n'

        for j in $(cat ./node_modules/.temp-fix/package.json)
        do
            echo "$j" >> ./package.json
        done
    fi

    if [ -e ./node_modules/.temp-fix/package-lock.json ]
    then
        cat /dev/null > ./package-lock.json
        IFS=$'\n'

        for j in $(cat ./node_modules/.temp-fix/package-lock.json)
        do
            echo "$j" >> ./package-lock.json
        done
    fi

}

wakers_composer()
{
    mkdir -p ./vendor/.temp-fix

    if [ -e ./composer.json ]
    then
        cp -rf ./composer.json ./vendor/.temp-fix/app/composer.json
    fi

    if [ -e ./composer.lock ]
    then
        cp -rf ./composer.lock ./vendor/.temp-fix/app/composer.lock
    fi

    docker exec -it composer ${@}

    if [ -e ./vendor/.temp-fix/app/composer.json ]
    then
        cat /dev/null > ./composer.json
        IFS=$'\n'

        for j in $(cat ./vendor/.temp-fix/app/composer.json)
        do
            echo "$j" >> ./composer.json
        done
    fi

    if [ -e ./vendor/.temp-fix/app/composer.lock ]
    then
        cat /dev/null > ./composer.lock
        IFS=$'\n'

        for j in $(cat ./vendor/.temp-fix/app/composer.lock)
        do
            echo "$j" >> ./composer.lock
        done
    fi
}


wakers_console()
{
    rm -rf ./temp/cache

    docker exec -it app php ./www/index.php ${@}
}


wakers_propel()
{
    if test "$1" = "model:build"
    then
        rm -rf ./temp/propel
    fi

    docker exec -it app php ./vendor/bin/wpropel ${@}

    if test "$1" = "model:build"
    then
        find ./temp/propel -maxdepth 2 -type f ! -name '*Query.php'  -exec rm -f {} +
    fi
}


wakers_assets_get()
{
    if [ "$2" -a "$3" ]
    then
        mkdir -p ./assets/dynamic
        scp -r root@$2:/root/$3/assets/dynamic ./assets/dynamic
    else
        echo -e "\nWRONG PARAMS: ./sc assets-get <server-ip> <project-folder>\n"
    fi
}


wakers_assets_push()
{
    if [ "$2" -a "$3" ]
    then
        scp -r ./assets/dynamic root@$2:/root/$3/assets/dynamic
    else
        echo -e "\nWRONG PARAMS: ./sc assets-push <server-ip> <project-folder>\n"
    fi

}


wakers_assets_mkdir()
{
    if [ "$2" -a "$3" ]
    then
        ssh root@$2 mkdir -p /root/$3/assets/dynamic
    else
        echo -e "\nWRONG PARAMS: ./sc assets-mkdir <server-ip> <project-folder>\n"
    fi
}


wakers_database_get()
{
    if [ "$2" -a "$3" ]
    then
        mkdir -p ./docker/database.local/
        scp -r root@$2:/root/$3/docker/database.local ./docker/database.local/
    else
        echo -e "\nWRONG PARAMS: ./sc database-get <server-ip> <project-folder>\n"
    fi
}


wakers_logs_get()
{
 if [ "$2" -a "$3" ]
    then
        mkdir -p ./log
        scp -r root@$2:/root/$3/log/ .
    else
        echo -e "\nWRONG PARAMS: ./sc logs-get <server-ip> <project-folder>\n"
    fi
}


wakers_deploy()
{
    echo -e "\nSTARTING DEPLOY ------------\n"


    if [ ! -e ./docker/xdebug.local.ini ]
    then
        echo -e "\nTURNING OFF XDEBUG -----------\n"
        echo "xdebug.remote_enable=0" > ./docker/xdebug.local.ini
    fi


    echo -e "\nREMOVING CONTAINERS ------------\n"
    docker stop $(docker ps -a -q)
    docker system prune --all -f


    echo -e "\nREMOVING DEPENDENCIES ------------\n"
    rm -rf ./vendor
    rm -rf ./node_modules


    echo -e "\nREMOVING CACHE ------------\n"
    rm -rf ./www/temp/static
    rm -rf ./temp/cache


    echo -e "\nBUILDING CONTAINERS ------------\n"
    docker-compose up --build -d


    echo -e "\nINSTALLING DEPENDENCIES ------------\n"
    wakers_composer "composer" "clear"
    wakers_composer "composer" "i"
    wakers_npm "npm" "i"


    echo -e "\nBUILDING ASSETS ------------\n"
    wakers_npm "npm" "run" "prod"

    # run migrations or show new database
    if [ -e ./app/config/db.local.neon ]
    then

        echo -e "\nSTARTING MIGRATION ------------\n"
        wakers_propel "migration:migrate"
        wakers_propel "model:build"

    else

        echo -e "\n|-----------------------------------------------------------------------|"
        echo "| WARNING: Database is not configured yet!                              |"
        echo "|-----------------------------------------------------------------------|"
        echo "| 1. Please create new user and database (do not use root credentials!) |"
        echo "| 2. Create config in ./app/config/db.local.neon                        |"
        echo "| 3. After configuration run command ./sc server-deploy-migrate         |"
        echo "|-----------------------------------------------------------------------|"
        echo -e "\nMYSQL ROOT PASSWORDS (use the first):"

        docker-compose logs 2>/dev/null | grep "GENERATED ROOT PASSWORD"
    fi


    echo -e "\nSTOPPING dev containers ------------"
    docker stop composer
    docker stop nodejs

    echo -e "\nDEPLOYING FINISHED ------------\n"
    docker system df
}


wakers_help()
{
    echo -e "\n|------------------------------------------------|"
    echo "| SHELL CONSOLE:                                 |"
    echo "|------------------------------------------------|"
    echo "|                                                |"
    echo "| DEV COMMANDS                                   |"
    echo "|                                                |"
    echo "|   npm                                          |"
    echo "|   propel                                       |"
    echo "|   console                                      |"
    echo "|   composer                                     |"
    echo "|   webpack-dev                                  |"
    echo "|   webpack-prod                                 |"
    echo "|   webpack-watch                                |"
    echo "|                                                |"
    echo "| SERVER ASSETS - use carefully!                 |"
    echo "|                                                |"
    echo "|   assets-get <server-ip> <project-folder>      |"
    echo "|   assets-mkdir <server-ip> <project-folder>    |"
    echo "|   assets-push <server-ip> <project-folder>     |"
    echo "|                                                |"
    echo "|   logs-get <server-ip> <project-folder>        |"
    echo "|                                                |"
    echo "| SERVER DATABASE                                |"
    echo "|                                                |"
    echo "|   database-get <server-ip> <project-folder>    |"
    echo "|                                                |"
    echo "| SERVER DEPLOYMENT                              |"
    echo "|                                                |"
    echo "|   server-deploy (use only on server)           |"
    echo "|   server-deploy-migrate (use only on server)   |"
    echo "|                                                |"
    echo -e "|------------------------------------------------|\n"
}


if test "$1" = "composer"
then
    wakers_composer ${@}

elif test "$1" = "npm"
then
    wakers_npm ${@}

elif test "$1" = "webpack-watch"
then
    wakers_npm "npm" "run" "watch"

elif test "$1" = "webpack-dev"
then
    wakers_npm "npm" "run" "dev"

elif test "$1" = "webpack-prod"
then
    wakers_npm "npm" "run" "prod"

elif test "$1" = "console"
then
    wakers_console ${@:2}

elif test "$1" = "server-deploy"
then
    wakers_deploy

elif test "$1" = "propel"
then
    wakers_propel ${@:2}

elif test "$1" = "server-deploy-migrate"
then
    wakers_propel "model:build"
    wakers_propel "migration:migrate"

elif test "$1" = "assets-get"
then
    wakers_assets_get ${@}

elif test "$1" = "assets-push"
then
    wakers_assets_push ${@}
    
elif test "$1" = "assets-mkdir"
then
    wakers_assets_mkdir ${@}

elif test "$1" = "database-get"
then
    wakers_assets_mkdir ${@}

elif test "$1" = "logs-get"
then
    wakers_logs_get ${@}

elif test "$1" = ""
then
    wakers_help

else
    echo -e "\nERROR: Command '$1' does not specified in shortcuts!"
    wakers_help
fi

# resolve before end
wakers_resolve_permissions