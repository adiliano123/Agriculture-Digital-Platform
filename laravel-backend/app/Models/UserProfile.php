<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'farm_size',
        'farm_location',
        'crops_grown',
        'livestock_owned',
        'farming_experience',
        'education_level',
        'preferred_language',
        'bio',
        'coordinates',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'crops_grown' => 'array',
        'livestock_owned' => 'array',
        'coordinates' => 'array',
        'farm_size' => 'decimal:2',
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the farm size in hectares with unit.
     */
    public function getFarmSizeWithUnitAttribute(): string
    {
        if (!$this->farm_size) {
            return 'Not specified';
        }
        
        return $this->farm_size . ' hectares';
    }

    /**
     * Get the farming experience with unit.
     */
    public function getFarmingExperienceWithUnitAttribute(): string
    {
        if (!$this->farming_experience) {
            return 'Not specified';
        }
        
        $years = $this->farming_experience;
        return $years . ' ' . ($years === 1 ? 'year' : 'years');
    }

    /**
     * Check if user has GPS coordinates.
     */
    public function hasCoordinates(): bool
    {
        return !empty($this->coordinates) && 
               isset($this->coordinates['latitude']) && 
               isset($this->coordinates['longitude']);
    }

    /**
     * Get the latitude coordinate.
     */
    public function getLatitudeAttribute(): ?float
    {
        return $this->coordinates['latitude'] ?? null;
    }

    /**
     * Get the longitude coordinate.
     */
    public function getLongitudeAttribute(): ?float
    {
        return $this->coordinates['longitude'] ?? null;
    }
}