<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller {

    public function downloadFile(Request $request) {
        $name_in_storage = $request->query->get("file");
        if (!$name_in_storage) {
            throw new NotFoundHttpException();
        }

        $filename = $request->query->get("name") ?? $name_in_storage;
        $path = "/public/files/".$name_in_storage;

        if (!Storage::exists("/public/files/".$name_in_storage)) {
            throw new NotFoundHttpException();
        }

        return response()->download(Storage::path($path), $filename);
    }

}
