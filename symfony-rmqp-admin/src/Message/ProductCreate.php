<?php

namespace App\Message;

final class ProductCreate
{
    /*
     * Add whatever properties & methods you need to hold the
     * data for this message class.
     */

    private $data = [];

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function getName(): array
    {
        return $this->data;
    }
}
