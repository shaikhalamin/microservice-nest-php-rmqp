# microservice-nest-php-rmqp
```javascript

#Clone the project cd into directory and run the following command
docker-compose up --build -up

#Change laravel folder permission to edit from editor where [shaikhalamin] is the pc username
sudo chown -R shaikhalamin laravel-microservice-admin-rmqp/

#Run migration for laravel app 
docker-compose run --rm laravel_microservice_admin_app php artisan migrate:fresh

#Run Rabbitmq library
docker-compose run --rm laravel_microservice_admin_app composer require vladimir-yuldashev/laravel-queue-rabbitmq "^10.2.3"

#run rabbitmq on docker

docker run --rm -it -p 15672:15672 -p 5672:5672 rabbitmq:3-management

#check symfony container description
php bin/console config:dump framework messenger

```