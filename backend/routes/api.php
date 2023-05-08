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
    Route::get("/users/find", [\App\Http\Controllers\UsersController::class, "findUsersByParam"])->name("users.find");
    Route::get("/user/{userid}", [\App\Http\Controllers\UsersController::class, "getUser"])->name("users.public.get");
    Route::put("/user/himself", [\App\Http\Controllers\UsersController::class, "selfEditUser"])->name("users.self.edit");
    Route::post("/user/himself/avatar", [\App\Http\Controllers\UsersController::class, "uploadAvatar"])->name("users.self.avatar");

    Route::get("/user/conversations/all", [\App\Http\Controllers\ConversationsController::class, "getUserConversationsAll"])->name("user.conversations.all");
    Route::get("/user/conversations/users", [\App\Http\Controllers\ConversationsController::class, "getUserConversationsUsers"])->name("user.conversations.users");
    Route::get("/user/conversations/clean", [\App\Http\Controllers\ConversationsController::class, "getUserConversationsClean"])->name("user.conversations.clean");

    Route::get("/conversations/{conversationid}", [\App\Http\Controllers\ConversationsController::class, "getMessages"])->name("conversations.messages");
});


//////////////////////////
/// AUTH
//////////////////////////
Route::post("/register", [\App\Http\Controllers\AuthController::class, "register"])->name("register");
Route::post("/login", [\App\Http\Controllers\AuthController::class, "login"])->name("login");
Route::post("/logout", [\App\Http\Controllers\AuthController::class, "logout"])->name("logout")->middleware('auth:sanctum');
Route::get("/user", [\App\Http\Controllers\AuthController::class, "user"])->name("checkUser")->middleware('auth:sanctum');

