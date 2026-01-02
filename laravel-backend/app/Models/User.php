<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'user_type',
        'status',
        'region',
        'district',
        'ward',
        'profile_image',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'user_type' => $this->user_type,
            'status' => $this->status,
        ];
    }

    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->user_type === 'admin';
    }

    /**
     * Check if user is extension officer.
     */
    public function isExtensionOfficer(): bool
    {
        return $this->user_type === 'extension_officer';
    }

    /**
     * Check if user is farmer.
     */
    public function isFarmer(): bool
    {
        return $this->user_type === 'farmer';
    }

    /**
     * Check if user is agri dealer.
     */
    public function isAgriDealer(): bool
    {
        return $this->user_type === 'agri_dealer';
    }

    /**
     * Check if user is agri company.
     */
    public function isAgriCompany(): bool
    {
        return $this->user_type === 'agri_company';
    }

    /**
     * Check if user is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    /**
     * Get the user's profile.
     */
    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    /**
     * Get the user's supplier profile.
     */
    public function supplier(): HasOne
    {
        return $this->hasOne(Supplier::class);
    }

    /**
     * Get the user's agricultural content.
     */
    public function content(): HasMany
    {
        return $this->hasMany(AgriculturalContent::class, 'author_id');
    }

    /**
     * Get the user's consultations as farmer.
     */
    public function consultationsAsFarmer(): HasMany
    {
        return $this->hasMany(Consultation::class, 'farmer_id');
    }

    /**
     * Get the user's consultations as extension officer.
     */
    public function consultationsAsOfficer(): HasMany
    {
        return $this->hasMany(Consultation::class, 'extension_officer_id');
    }

    /**
     * Get the user's farm records.
     */
    public function farmRecords(): HasMany
    {
        return $this->hasMany(FarmRecord::class);
    }

    /**
     * Get the user's reviews.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'reviewer_id');
    }

    /**
     * Scope a query to only include active users.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include users of a specific type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('user_type', $type);
    }

    /**
     * Scope a query to only include users from a specific region.
     */
    public function scopeFromRegion($query, $region)
    {
        return $query->where('region', $region);
    }
}