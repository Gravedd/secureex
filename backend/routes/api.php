<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group(['middleware' => 'auth:sanctum'], function() {

    Route::get("/user/{userid}", [\App\Http\Controllers\UsersController::class, "getUserById"])->name("getUserById");

});

//////////////////////////
/// AUTH
//////////////////////////
Route::post("/register", [\App\Http\Controllers\AuthController::class, "register"])->name("register");
Route::post("/login", [\App\Http\Controllers\AuthController::class, "login"])->name("login");
Route::post("/logout", [\App\Http\Controllers\AuthController::class, "logout"])->name("logout")->middleware('auth:sanctum');
Route::get("/user", [\App\Http\Controllers\AuthController::class, "user"])->name("checkUser")->middleware('auth:sanctum');
