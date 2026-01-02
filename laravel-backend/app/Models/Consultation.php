<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Builder;

class Consultation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'farmer_id',
        'extension_officer_id',
        'title',
        'description',
        'category',
        'priority',
        'status',
        'consultation_type',
        'scheduled_at',
        'completed_at',
        'location',
        'coordinates',
        'attachments',
        'notes',
        'rating',
        'feedback',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'scheduled_at' => 'datetime',
        'completed_at' => 'datetime',
        'coordinates' => 'array',
        'attachments' => 'array',
        'rating' => 'integer',
    ];

    /**
     * Get the farmer who requested the consultation.
     */
    public function farmer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }

    /**
     * Get the extension officer assigned to the consultation.
     */
    public function extensionOfficer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'extension_officer_id');
    }

    /**
     * Get all of the consultation's reviews.
     */
    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    /**
     * Scope a query to filter by status.
     */
    public function scopeWithStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeInCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to filter by priority.
     */
    public function scopeWithPriority(Builder $query, string $priority): Builder
    {
        return $query->where('priority', $priority);
    }

    /**
     * Scope a query to filter by consultation type.
     */
    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('consultation_type', $type);
    }

    /**
     * Scope a query to get pending consultations.
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to get scheduled consultations.
     */
    public function scopeScheduled(Builder $query): Builder
    {
        return $query->where('status', 'scheduled');
    }

    /**
     * Scope a query to get completed consultations.
     */
    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope a query to get consultations for a specific farmer.
     */
    public function scopeForFarmer(Builder $query, int $farmerId): Builder
    {
        return $query->where('farmer_id', $farmerId);
    }

    /**
     * Scope a query to get consultations for a specific extension officer.
     */
    public function scopeForOfficer(Builder $query, int $officerId): Builder
    {
        return $query->where('extension_officer_id', $officerId);
    }

    /**
     * Scope a query to get upcoming consultations.
     */
    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where('scheduled_at', '>', now())
                    ->whereIn('status', ['scheduled', 'confirmed']);
    }

    /**
     * Scope a query to get overdue consultations.
     */
    public function scopeOverdue(Builder $query): Builder
    {
        return $query->where('scheduled_at', '<', now())
                    ->whereIn('status', ['scheduled', 'confirmed']);
    }

    /**
     * Check if consultation is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if consultation is scheduled.
     */
    public function isScheduled(): bool
    {
        return $this->status === 'scheduled';
    }

    /**
     * Check if consultation is confirmed.
     */
    public function isConfirmed(): bool
    {
        return $this->status === 'confirmed';
    }

    /**
     * Check if consultation is in progress.
     */
    public function isInProgress(): bool
    {
        return $this->status === 'in_progress';
    }

    /**
     * Check if consultation is completed.
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    /**
     * Check if consultation is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    /**
     * Check if consultation is overdue.
     */
    public function isOverdue(): bool
    {
        return $this->scheduled_at && 
               $this->scheduled_at->isPast() && 
               !$this->isCompleted() && 
               !$this->isCancelled();
    }

    /**
     * Get consultation duration in minutes.
     */
    public function getDurationAttribute(): ?int
    {
        if (!$this->completed_at || !$this->scheduled_at) {
            return null;
        }

        return $this->scheduled_at->diffInMinutes($this->completed_at);
    }

    /**
     * Get priority color for UI.
     */
    public function getPriorityColorAttribute(): string
    {
        return match($this->priority) {
            'high' => 'red',
            'medium' => 'yellow',
            'low' => 'green',
            default => 'gray'
        };
    }

    /**
     * Get status color for UI.
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'pending' => 'yellow',
            'scheduled' => 'blue',
            'confirmed' => 'green',
            'in_progress' => 'purple',
            'completed' => 'green',
            'cancelled' => 'red',
            default => 'gray'
        };
    }

    /**
     * Mark consultation as completed.
     */
    public function markAsCompleted(string $notes = null): void
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
            'notes' => $notes ?: $this->notes,
        ]);
    }

    /**
     * Cancel consultation.
     */
    public function cancel(string $reason = null): void
    {
        $this->update([
            'status' => 'cancelled',
            'notes' => $reason ? "Cancelled: {$reason}" : $this->notes,
        ]);
    }

    /**
     * Reschedule consultation.
     */
    public function reschedule(\DateTime $newDateTime): void
    {
        $this->update([
            'scheduled_at' => $newDateTime,
            'status' => 'scheduled',
        ]);
    }

    /**
     * Get latitude coordinate.
     */
    public function getLatitudeAttribute(): ?float
    {
        return $this->coordinates['latitude'] ?? null;
    }

    /**
     * Get longitude coordinate.
     */
    public function getLongitudeAttribute(): ?float
    {
        return $this->coordinates['longitude'] ?? null;
    }
}