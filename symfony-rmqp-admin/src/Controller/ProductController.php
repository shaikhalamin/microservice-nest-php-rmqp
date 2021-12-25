<?php

namespace App\Controller;

use App\Message\ProductCreate;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    #[Route('/product', name: 'product')]
    public function index()
    {
        echo phpinfo();
    }

    #[Route('/product/message', name: 'product')]
    public function message_dispatch(MessageBusInterface $bus)
    {
        $data_content = ["data" => ["product_name" => "Test product code from symfony app", "product_code" => "BFBG_7890", "PRODUCT_QUANTITY" => 90]];
        $data = ["pattern" => "PRODUCT_CREATED", $data_content];
        $bus->dispatch(new ProductCreate($data));
        //dd($bus->dispatch(new ProductCreate($data)));
        return $this->json(['message' => 'message send to rmqp']);
    }
}
