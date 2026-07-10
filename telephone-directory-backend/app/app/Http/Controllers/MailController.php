<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use Illuminate\Http\Request;

class MailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Mail::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'contact_id' => ['required', 'exists:contacts,id'],
            'mail'=>['required','unique:mails','email','max:255'],                     
        ]);
        $mail = Mail::create($validated);
        return response()->json($mail,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Mail $mail)
    {
        return $mail->load('contact');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mail $mail)
    {
        $validated = $request->validate([
            'contact_id'=>['sometimes','required','exists:contacts,id'],
            'mail'=>['sometimes','required','unique:mails','email','max:255']                     
        ]);
        $mail->update($validated);
        return response()->json($mail,204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mail $mail)
    {
        $mail->delete();
        return response()->json(null,204);
    }
}
