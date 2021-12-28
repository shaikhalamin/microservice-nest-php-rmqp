<?php

namespace App\Messenger;

use App\Message\JobCreated;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Exception\UnrecoverableMessageHandlingException;
use Symfony\Component\Messenger\Transport\Serialization\SerializerInterface;

class JobJsonMessageSerializer implements SerializerInterface
{

    public function decode(array $encodedEnvelope): Envelope
    {

        $body = $encodedEnvelope['body'];
        $headers = $encodedEnvelope['headers'];

        if (isset($headers['message_type']) && $headers['message_type']['type'] != 'job') {
            throw new  UnrecoverableMessageHandlingException("You are not allowed to consume another transport message");
        }

        $data = json_decode($body, true);
        $message = new JobCreated($data);

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
            'body' => json_encode($message->getJobData()),
            'headers' => [
                'stamps' => [],
                'message_type' => ['type' => 'job', 'action' => 'created'],
                'Content-Type' => 'application/json'
            ],
        ];
    }
}
