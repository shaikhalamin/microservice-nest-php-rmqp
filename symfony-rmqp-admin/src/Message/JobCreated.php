<?php

namespace App\Message;

final class JobCreated
{
    /*
     * Add whatever properties & methods you need to hold the
     * data for this message class.
     */

    private $jobData;

    public function __construct(array $jobData)
    {
        $this->jobData = $jobData;
    }

    public function getJobData(): array
    {
        return $this->jobData;
    }
}
