<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomResource;
use Illuminate\Http\Request;

class TestingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function testing(Request $request)
    {
        return new CustomResource(["message" => "this is a testing api"]);
    }
}
