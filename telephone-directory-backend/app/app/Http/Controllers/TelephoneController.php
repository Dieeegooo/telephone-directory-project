<?php

namespace App\Http\Controllers;
use Illuminate\Validation\Rule;
use App\Models\Telephone;
use Illuminate\Http\Request;

class TelephoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Telephone::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'contact_id' => ['required', 'exists:contacts,id'],
            'number' => ['required', 'unique:telephones', 'string', 'regex:/^\+?[0-9\s\-\(\)]{7,20}$/']
        ]);
        $telephone = Telephone::create($validated);
        return response()->json($telephone, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Telephone $telephone)
    {
        return $telephone->load('contact');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Telephone $telephone)
    {
        $validated = $request->validate([
            'contact_id' => ['sometimes','required', 'exists:contacts,id'],
            'number' => ['sometimes','required', 
             'string', 'regex:/^\+?[0-9\s\-\(\)]{7,20}$/',
             Rule::unique('telephones')->ignore($telephone->id),]

        ]);
        $telephone->update($validated);
        return response()->json($telephone);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Telephone $telephone)
    {
        $telephone->delete();
        return response()->json(null,204);
    }
}
