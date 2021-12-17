# microservice-nest-php-rmqp
```javascript

#Clone the project cd into directory and run the following command
docker-compose up --build -up

#Change laravel folder permission to edit from editor where [shaikhalamin] is the pc username
sudo chown -R shaikhalamin laravel-microservice-admin-rmqp/

#Run migration for laravel app 
docker-compose run --rm laravel_microservice_admin_app php artisan migrate:fresh

```