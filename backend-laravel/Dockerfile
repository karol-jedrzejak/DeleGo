FROM php:8.3-cli


# System dependencies
RUN apt-get update && apt-get install -y \
git \
unzip \
libpng-dev \
libonig-dev \
libxml2-dev \
libzip-dev \
zip \
curl


# PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd


# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


WORKDIR /var/www


CMD php artisan serve --host=0.0.0.0 --port=8000