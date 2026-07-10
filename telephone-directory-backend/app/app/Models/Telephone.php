<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Telephone extends Model
{
    protected $fillable = ['contact_id', 'number'];
    
    public function contact(){
        return $this->belongsTo(Contact::class);
    }
}
    

