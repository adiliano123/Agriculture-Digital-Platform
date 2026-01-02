<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Builder;

class Review extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reviewer_id',
        'reviewable_type',
        'reviewable_id',
        'rating',
        'title',
        'comment',
        'pros',
        'cons',
        'verified_purchase',
        'helpful_count',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'integer',
        'pros' => 'array',
        'cons' => 'array',
        'verified_purchase' => 'boolean',
        'helpful_count' => 'integer',
    ];

    /**
     * Get the reviewer (user) who wrote the review.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    /**
     * Get the parent reviewable model (product, supplier, content, etc.).
     */
    public function reviewable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Scope a query to filter by rating.
     */
    public function scopeWithRating(Builder $query, int $rating): Builder
    {
        return $query->where('rating', $rating);
    }

    /**
     * Scope a query to filter by minimum rating.
     */
    public function scopeMinRating(Builder $query, int $minRating): Builder
    {
        return $query->where('rating', '>=', $minRating);
    }

    /**
     * Scope a query to filter by status.
     */
    public function scopeWithStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to get approved reviews.
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to get pending reviews.
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to get verified purchase reviews.
     */
    public function scopeVerifiedPurchase(Builder $query): Builder
    {
        return $query->where('verified_purchase', true);
    }

    /**
     * Scope a query to get recent reviews.
     */
    public function scopeRecent(Builder $query, int $days = 30): Builder
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope a query to order by helpfulness.
     */
    public function scopeOrderByHelpful(Builder $query): Builder
    {
        return $query->orderBy('helpful_count', 'desc');
    }

    /**
     * Check if review is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if review is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if review is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Check if review is from verified purchase.
     */
    public function isVerifiedPurchase(): bool
    {
        return $this->verified_purchase;
    }

    /**
     * Approve the review.
     */
    public function approve(): void
    {
        $this->update(['status' => 'approved']);
    }

    /**
     * Reject the review.
     */
    public function reject(): void
    {
        $this->update(['status' => 'rejected']);
    }

    /**
     * Mark review as helpful.
     */
    public function markAsHelpful(): void
    {
        $this->increment('helpful_count');
    }

    /**
     * Get rating as stars.
     */
    public function getRatingStarsAttribute(): string
    {
        return str_repeat('★', $this->rating) . str_repeat('☆', 5 - $this->rating);
    }

    /**
     * Get rating color for UI.
     */
    public function getRatingColorAttribute(): string
    {
        return match(true) {
            $this->rating >= 4 => 'green',
            $this->rating >= 3 => 'yellow',
            $this->rating >= 2 => 'orange',
            default => 'red'
        };
    }

    /**
     * Get review summary.
     */
    public function getSummaryAttribute(): string
    {
        if ($this->title) {
            return $this->title;
        }
        
        return \Str::limit($this->comment, 100);
    }

    /**
     * Get time since review was created.
     */
    public function getTimeAgoAttribute(): string
    {
        return $this->created_at->diffForHumans();
    }

    /**
     * Check if review has pros and cons.
     */
    public function hasProsAndCons(): bool
    {
        return !empty($this->pros) || !empty($this->cons);
    }

    /**
     * Get formatted pros list.
     */
    public function getFormattedProsAttribute(): string
    {
        if (empty($this->pros)) {
            return '';
        }
        
        return '• ' . implode("\n• ", $this->pros);
    }

    /**
     * Get formatted cons list.
     */
    public function getFormattedConsAttribute(): string
    {
        if (empty($this->cons)) {
            return '';
        }
        
        return '• ' . implode("\n• ", $this->cons);
    }

    /**
     * Get review helpfulness percentage.
     */
    public function getHelpfulnessPercentageAttribute(): float
    {
        // This would require tracking total votes, for now return based on helpful count
        if ($this->helpful_count <= 0) {
            return 0;
        }
        
        // Assuming helpful_count represents net positive votes
        return min(100, ($this->helpful_count / max(1, $this->helpful_count + 1)) * 100);
    }
}