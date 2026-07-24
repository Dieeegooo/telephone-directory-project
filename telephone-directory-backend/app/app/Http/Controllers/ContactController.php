<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Contact::where('user_id', $request->user()->id)->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>['required','string','max:255'],
            'surname'=>['nullable','string'],
        ]);
       $validated['user_id'] = $request->user()->id;
       $contact = Contact::create($validated);
       return response()->json($contact, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Contact $contact)
    {
        if ($contact->user_id !== $request->user()->id) {
            abort(403);
        }
        return $contact->load(['telephones','mails']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        if ($contact->user_id !== $request->user()->id) {
            abort(403);
        }
        $validated = $request->validate([
            'name'=>['sometimes','required','string','max:255'],
            'surname' => ['nullable','string'],
        ]);
        $contact->update($validated);
        return response()->json($contact);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Contact $contact)
    {
        if ($contact->user_id !== $request->user()->id) {
            abort(403);
        }
        $contact->delete();
        return response()->json(null,204);
    }
}
