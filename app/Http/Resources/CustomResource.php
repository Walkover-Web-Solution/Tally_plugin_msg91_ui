<?php

namespace App\Http\Resources;

use App\Services\SlackService;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomResource extends JsonResource
{

    public $hasError;
    public $duration;

    public function __construct($resource, $hasError = false)
    {
        parent::__construct($resource);
        $this->hasError = $hasError;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $errors = [];
        $status = "success";
        $errors = [];
        if ($this->hasError) {
            $status = "error";
            $errors += parent::toArray($request);
        }
        $this->duration = floor(microtime(true) * 1000 - constant('LARAVEL_START') * 1000);
        $data = [
            'data' => parent::toArray($request),
            'status' => $status,
            'hasError' => $this->hasError,
            'errors' => $errors,
            'duration' => $this->duration . "ms",
        ];
        return $data;
    }

    /**
     * Function to manipulate response body or headers
     * Adding timeTrack and duration in response headers
     */
    public function withResponse($request, $response)
    {
        // Add duration in response headers 
        $response->headers->set("duration", $this->duration . 'ms');

        // On filter of trackTime
        if ($request->trackTime == 1) {
            $response->headers->set("timeTrack", json_encode(request()->timeTrack));
        }
    }
}
