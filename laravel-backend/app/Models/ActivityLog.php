<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class ActivityLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'action',
        'description',
        'subject_type',
        'subject_id',
        'properties',
        'ip_address',
        'user_agent',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'properties' => 'array',
    ];

    /**
     * Get the user that performed the action.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to filter by action.
     */
    public function scopeWithAction(Builder $query, string $action): Builder
    {
        return $query->where('action', $action);
    }

    /**
     * Scope a query to filter by subject type.
     */
    public function scopeForSubjectType(Builder $query, string $subjectType): Builder
    {
        return $query->where('subject_type', $subjectType);
    }

    /**
     * Scope a query to filter by user.
     */
    public function scopeForUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to get recent activities.
     */
    public function scopeRecent(Builder $query, int $days = 30): Builder
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope a query to get today's activities.
     */
    public function scopeToday(Builder $query): Builder
    {
        return $query->whereDate('created_at', now()->toDateString());
    }

    /**
     * Get action icon for UI.
     */
    public function getActionIconAttribute(): string
    {
        return match($this->action) {
            'created' => '➕',
            'updated' => '✏️',
            'deleted' => '🗑️',
            'viewed' => '👁️',
            'downloaded' => '⬇️',
            'uploaded' => '⬆️',
            'login' => '🔑',
            'logout' => '🚪',
            'registered' => '👤',
            'password_changed' => '🔒',
            'profile_updated' => '👤',
            'consultation_requested' => '👨‍🌾',
            'consultation_scheduled' => '📅',
            'consultation_completed' => '✅',
            'review_posted' => '⭐',
            'product_purchased' => '🛒',
            'payment_made' => '💳',
            default => '📝'
        };
    }

    /**
     * Get action color for UI.
     */
    public function getActionColorAttribute(): string
    {
        return match($this->action) {
            'created' => 'green',
            'updated' => 'blue',
            'deleted' => 'red',
            'viewed' => 'gray',
            'login' => 'green',
            'logout' => 'orange',
            'registered' => 'purple',
            default => 'gray'
        };
    }

    /**
     * Get time since activity was logged.
     */
    public function getTimeAgoAttribute(): string
    {
        return $this->created_at->diffForHumans();
    }

    /**
     * Get formatted description with user name.
     */
    public function getFormattedDescriptionAttribute(): string
    {
        $userName = $this->user ? $this->user->full_name : 'Unknown User';
        return "{$userName} {$this->description}";
    }

    /**
     * Get browser name from user agent.
     */
    public function getBrowserAttribute(): string
    {
        if (!$this->user_agent) {
            return 'Unknown';
        }

        if (str_contains($this->user_agent, 'Chrome')) {
            return 'Chrome';
        } elseif (str_contains($this->user_agent, 'Firefox')) {
            return 'Firefox';
        } elseif (str_contains($this->user_agent, 'Safari')) {
            return 'Safari';
        } elseif (str_contains($this->user_agent, 'Edge')) {
            return 'Edge';
        } else {
            return 'Other';
        }
    }

    /**
     * Get device type from user agent.
     */
    public function getDeviceTypeAttribute(): string
    {
        if (!$this->user_agent) {
            return 'Unknown';
        }

        if (str_contains($this->user_agent, 'Mobile')) {
            return 'Mobile';
        } elseif (str_contains($this->user_agent, 'Tablet')) {
            return 'Tablet';
        } else {
            return 'Desktop';
        }
    }

    /**
     * Log an activity.
     */
    public static function logActivity(
        string $action,
        string $description,
        ?int $userId = null,
        ?string $subjectType = null,
        ?int $subjectId = null,
        array $properties = []
    ): self {
        return static::create([
            'user_id' => $userId ?? auth()->id(),
            'action' => $action,
            'description' => $description,
            'subject_type' => $subjectType,
            'subject_id' => $subjectId,
            'properties' => $properties,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Log user login.
     */
    public static function logLogin(int $userId): self
    {
        return static::logActivity(
            'login',
            'logged in to the system',
            $userId
        );
    }

    /**
     * Log user logout.
     */
    public static function logLogout(int $userId): self
    {
        return static::logActivity(
            'logout',
            'logged out from the system',
            $userId
        );
    }

    /**
     * Log user registration.
     */
    public static function logRegistration(int $userId): self
    {
        return static::logActivity(
            'registered',
            'registered a new account',
            $userId,
            'User',
            $userId
        );
    }

    /**
     * Log profile update.
     */
    public static function logProfileUpdate(int $userId): self
    {
        return static::logActivity(
            'profile_updated',
            'updated their profile',
            $userId,
            'User',
            $userId
        );
    }

    /**
     * Log consultation request.
     */
    public static function logConsultationRequest(int $userId, int $consultationId): self
    {
        return static::logActivity(
            'consultation_requested',
            'requested a new consultation',
            $userId,
            'Consultation',
            $consultationId
        );
    }

    /**
     * Log content creation.
     */
    public static function logContentCreation(int $userId, int $contentId): self
    {
        return static::logActivity(
            'created',
            'created new agricultural content',
            $userId,
            'AgriculturalContent',
            $contentId
        );
    }

    /**
     * Log product view.
     */
    public static function logProductView(int $userId, int $productId): self
    {
        return static::logActivity(
            'viewed',
            'viewed a product',
            $userId,
            'Product',
            $productId
        );
    }
}