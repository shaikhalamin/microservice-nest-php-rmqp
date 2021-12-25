<?php

namespace App\Messenger;

use App\Message\ProductCreate;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Transport\Serialization\SerializerInterface;

class ExternalJsonMessageSerializer implements SerializerInterface
{

    public function decode(array $encodedEnvelope): Envelope
    {

        $body = $encodedEnvelope['body'];
        $headers = $encodedEnvelope['headers'];
        $data = json_decode($body, true);
        $message = new ProductCreate($data);

        $stamps = [];
        // if (isset($headers['stamps'])) {
        //     $stamps = json_encode($headers['stamps']);
        // }
        return new Envelope($message, $stamps);
    }
    public function encode(Envelope $envelope): array
    {
        $message = $envelope->getMessage();

        $allStamps = [];
        foreach ($envelope->all() as $stamps) {
            $allStamps = array_merge($allStamps, $stamps);
        }

        return [
            'body' => json_encode($message->getName()),
            'headers' => [
                'stamps' => [],
                'Content-Type' => 'application/json'
            ],
        ];
    }
}
