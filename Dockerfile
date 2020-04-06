FROM php:7.3.1-fpm

# Apt packages update
RUN apt-get update -y

# Install libs & extensions
RUN apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libjpeg62-turbo-dev libmcrypt-dev libpng-dev
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-install pdo_mysql

# Xdebug
#RUN pecl install xdebug-2.6.0
#RUN docker-php-ext-enable xdebug

# Move .env to docker container
COPY ./.env /in-docker/.env