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

wakers_help()
{
    echo -e "\n|------------------------------------------------|"
    echo "| DEV COMMANDS :                                 |"
    echo "|------------------------------------------------|"
    echo "|                                                |"
    echo "|   npm                                          |"
    echo "|   propel                                       |"
    echo "|   console                                      |"
    echo "|   composer                                     |"
    echo "|   gulp-dev                                     |"
    echo "|   gulp-prod                                    |"
    echo "|   gulp-watch                                   |"
    echo "|                                                |"
    echo -e "|------------------------------------------------|\n"
}


if test "$1" = "composer"
then
    wakers_composer ${@}

elif test "$1" = "npm"
then
    wakers_npm ${@}

elif test "$1" = "gulp-watch"
then
    wakers_npm "npm" "run" "gulp-watch"

elif test "$1" = "gulp-dev"
then
    wakers_npm "npm" "run" "gulp-dev"

elif test "$1" = "gulp-prod"
then
    wakers_npm "npm" "run" "gulp-prod"

elif test "$1" = "console"
then
    wakers_console ${@:2}

elif test "$1" = "propel"
then
    wakers_propel ${@:2}

elif test "$1" = "server-deploy-migrate"
then
    wakers_propel "model:build"
    wakers_propel "migration:migrate"

elif test "$1" = ""
then
    wakers_help

else
    echo -e "\nERROR: Command '$1' does not specified in shortcuts!"
    wakers_help
fi

# resolve before end
wakers_resolve_permissions