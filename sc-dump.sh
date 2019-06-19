#!/usr/bin/env bash

docker-compose exec mariadb sh -c 'exec mysqldump wakers_cms_db --no-create-info --compact --all-tablespaces --extended-insert=FALSE  -uroot -p"$MYSQL_ROOT_PASSWORD" > /dumps/"$(date +%Y%m%d-%H%M%S)".sql'