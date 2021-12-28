<?php

namespace App\Controller;

use App\Message\JobCreated;
use App\Message\ProductCreate;
use DateTime;
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
    public function message_dispatch(MessageBusInterface $commandBus)
    {
        $data = ["pattern" => "PRODUCT_CREATED", "data" => ["product_name" => "Test product code from symfony app", "product_code" => "BFBG_7890", "PRODUCT_QUANTITY" => 90]];
        //$commandBus->dispatch(new ProductCreate($data));
        dd($commandBus->dispatch(new ProductCreate($data)));
        return $this->json(['message' => 'message send to rmqp']);
    }

    #[Route('/jobs/create', name: 'job_create')]
    public function job_dispatch(MessageBusInterface $eventBus)
    {
        date_default_timezone_set('Asia/Tokyo');
        $data = ["pattern" => "JOB_CREATED", "data" => ["name" => "Test job created from symfony app", "job_id" => "JB_45546984", "no_of_vacancy" => 3, "created_at" => date("Y-m-d h:i:s")]];
        //$commandBus->dispatch(new ProductCreate($data));
        dd($eventBus->dispatch(new JobCreated($data)));
        return $this->json(['message' => 'message send to rmqp']);
    }
}
