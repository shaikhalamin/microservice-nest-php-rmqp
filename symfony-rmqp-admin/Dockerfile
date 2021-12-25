FROM php:7.4-fpm

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y zlib1g-dev libzip-dev zip unzip
RUN docker-php-ext-install zip intl opcache pdo pdo_mysql sockets

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony

COPY composer*.json ./

COPY .env.example ./.env

RUN composer dump-autoload --no-scripts

RUN composer update --no-scripts


COPY . .

CMD symfony server:start --port=9080

EXPOSE 9080