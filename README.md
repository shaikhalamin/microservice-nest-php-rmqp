# microservice-nest-php-rmqp
```javascript

#Clone the project cd into directory and run the following command
docker-compose up --build -up

#Change laravel folder permission to edit from editor where [shaikhalamin] is the pc username
sudo chown -R shaikhalamin laravel-microservice-admin-rmqp/

#run rabbitmq on docker

docker run --rm -it -p 15672:15672 -p 5672:5672 rabbitmq:3-management

#check symfony container description
php bin/console debug:messenger //to see bindings
php bin/console debug:autowiring messenger //to see autowire
php bin/console config:dump framework messenger //to see all possible options for messenger yaml

```