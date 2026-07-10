<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\TelephoneController;
use App\Models\Telephone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
Route::get('/me', function (Request $request) {
return $request->user();
});
Route::post('/logout', [AuthController::class, 'logout']);
Route::apiResource('contacts', ContactController::class);
Route::apiResource('mails', MailController::class);
Route::apiResource('telephones', TelephoneController::class);
});