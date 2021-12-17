# FROM php:7.4-fpm

# WORKDIR /usr/src/app

# # RUN apt-get update && apt-get install -y zlib1g-dev libzip-dev zip unzip
# # RUN docker-php-ext-install zip intl opcache pdo pdo_mysql

# RUN apt-get update && apt-get install -y zlib1g-dev libzip-dev zip unzip
# RUN docker-php-ext-install zip pdo pdo_mysql

# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# COPY composer*.json ./
# COPY .env.example ./.env
# RUN composer dump-autoload -o
# RUN composer install --no-scripts

# COPY . .

# EXPOSE 8000

FROM php:7.4-fpm

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y zlib1g-dev libzip-dev zip unzip
RUN docker-php-ext-install zip pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer*.json ./

COPY .env.example ./.env

RUN composer update --no-scripts


COPY . .

RUN php artisan key:generate

CMD php artisan serve --host=0.0.0.0 --port=8000

EXPOSE 8000