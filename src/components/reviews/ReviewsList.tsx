'use client';

import { Star, CheckCircle } from 'lucide-react';
import type { Review } from '@/lib/api/client';

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-card border border-border rounded-2xl">
        <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{review.reviewerName}</h4>
                {review.isVerified && (
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <time className="text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </div>
          {review.title && (
            <h5 className="font-semibold mb-2">{review.title}</h5>
          )}
          {review.comment && (
            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
