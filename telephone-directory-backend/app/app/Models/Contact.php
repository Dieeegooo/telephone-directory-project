<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name','surname',];

    public function telephones(){
        return $this->hasMany(Telephone::class);
    }
    public function mails(){
        return $this->hasMany(Mail::class);
    }
}
