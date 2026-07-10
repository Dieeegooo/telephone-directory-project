<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mail extends Model
{
    protected $fillable = ['contact_id','mail',];

    public function contact(){
        return $this->belongsTo(Contact::class);
    }
}
// la mia idea sarebbe che al click di un contatto sparisce la tabella contatti e ti fa vedere il contatto singolo cliccato con più informazioni compresa l'email e il numero di telefono