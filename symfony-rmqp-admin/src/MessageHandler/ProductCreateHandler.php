<?php

namespace App\MessageHandler;

use App\Message\ProductCreate;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class ProductCreateHandler implements MessageHandlerInterface
{
    public function __invoke(ProductCreate $message)
    {
        print_r($message->getName());

        echo " consumed in symfony application\n";
    }
}
