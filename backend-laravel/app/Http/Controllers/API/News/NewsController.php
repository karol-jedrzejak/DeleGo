<?php

namespace App\Http\Controllers\API\News;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\News;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(News::with('user')->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('title', 'content','image_path');

        $post = $request->user()->news()->create($data);
        return response()->json(['message' => 'Post created', 'post' => $post]);
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return response()->json($news);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        $news->update($request->only('title', 'body'));
        return response()->json(['message' => 'Post updated', 'post' => $news]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();
        return response()->json(['message' => 'Post deleted']);
    }
}
