#!/usr/bin/env bash

# Packages versions
COMPOSER_VERSION="1.8.3"
NPM_VERSION="6.7.0"
NODE_VERSION="v8.11.2"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Permissions
wakers_resolve_permissions()
{
    mkdir -p ./assets/dynamic
    mkdir -p ./www/temp/static
    mkdir -p ./www/temp/dynamic
    mkdir -p ./temp
    mkdir -p ./temp/cache
    mkdir -p ./log

    chmod -R ugo+w ./assets/dynamic
    chmod -R ugo+rw ./www/temp/dynamic
    chmod -R ugo+rw ./www/temp/static
    chmod -R ugo+w ./temp
    chmod -R ugo+w ./log
}

wakers_console()
{
    #rm -rf ./temp/cache/*
    docker-compose exec app php ./www/index.php ${@}
}


wakers_propel()
{
    if test "$1" = "model:build"
    then
        rm -rf ./temp/propel
    fi

    docker-compose exec app php ./vendor/bin/wpropel ${@}

    if test "$1" = "model:build"
    then
        find ./temp/propel -maxdepth 2 -type f ! -name '*Query.php'  -exec rm -f {} +
    fi
}

wakers_help()
{
    echo -e "\n|------------------------------------------------|"
    echo -e "| ${YELLOW}DEV COMMANDS:${NC}                                  |"
    echo -e "|------------------------------------------------|"
    echo -e "|                                                |"
    echo -e "|   ${GREEN}./sc npm${NC}                                     |"
    echo -e "|   ${GREEN}./sc composer${NC}                                |"
    echo -e "|   ${GREEN}./sc propel${NC}                                  |"
    echo -e "|   ${GREEN}./sc console${NC}                                 |"
    echo -e "|                                                |"
    echo -e "|------------------------------------------------|\n"
}

# Resolve permissions on start
wakers_resolve_permissions

if test "$1" = "composer"
then
    docker run --rm --interactive --tty --volume $PWD:/app --volume $COMPOSER_HOME:/tmp composer:$COMPOSER_VERSION ${@}

elif test "$1" = "npm"
then
    ACTUAL_NPM_VER=$(npm --version)
    ACTUAL_NODE_VER=$(node --version)

    if [[ $ACTUAL_NPM_VER != *"$NPM_VERSION"* ]] || [[ $ACTUAL_NODE_VER != *"$NODE_VERSION"* ]]
    then
        echo -e "${RED}"
        echo -e "UPGRADE or DOWNGRADE your NODEJS or NPM versions if different.\n"
        echo -e "Your NPM version: $ACTUAL_NPM_VER"
        echo -e "${GREEN}You need NPM version: $NPM_VERSION\n"
        echo -e "${RED}Your NODEJS version: $ACTUAL_NODE_VER"
        echo -e "${GREEN}You need NODEJS version: $NODE_VERSION"
        echo -e "${NC}"
    else
        npm ${@:2}
    fi

elif test "$1" = "console"
then
    wakers_console ${@:2}

elif test "$1" = "propel"
then
    wakers_propel ${@:2}

elif test "$1" = ""
then
    wakers_help

else
    echo -e "\n${RED}ERROR: Command '${GREEN}./sc $1'${RED} does not specified in shortcuts!${NC}"
    wakers_help
fi

# resolve before end
wakers_resolve_permissions
