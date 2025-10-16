'use client';

import { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { api } from '@/lib/api/client';

interface ReviewFormProps {
  companySlug: string;
  productSlug: string;
  onSuccess?: () => void;
}

export function ReviewForm({ companySlug, productSlug, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const reviewData = {
      itemSlug: productSlug,
      companySlug,
      rating,
      title: formData.get('title') as string,
      comment: formData.get('comment') as string,
      reviewerName: formData.get('name') as string,
      reviewerEmail: formData.get('email') as string,
    };

    try {
      await api.submitReview(reviewData);
      setSuccess(true);
      setRating(0);
      e.currentTarget.reset();
      
      // Show success message and reset after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Review Submitted!</h3>
        <p className="text-muted-foreground">Thank you for your feedback. Your review will be published after approval.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Write a Review</h3>
        
        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Your Rating *</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                {rating} out of 5
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Your Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your name"
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Your Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your email will not be published
          </p>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Review Title (Optional)
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Great product!"
            className="w-full"
          />
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Your Review *
          </label>
          <Textarea
            id="comment"
            name="comment"
            required
            placeholder="Share your experience with this product..."
            className="w-full min-h-[120px]"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </Button>
      </div>
    </form>
  );
}
