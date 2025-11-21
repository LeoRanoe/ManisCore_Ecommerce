'use client';

import { motion } from 'framer-motion';
import { Star, ThumbsUp, CheckCircle, Camera, X } from 'lucide-react';
import { useState } from 'react';
import { EnhancedImage } from '../ui/EnhancedImage';
import { Button } from '../ui/Button';

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment?: string;
  reviewerName: string;
  isVerified: boolean;
  createdAt: string;
  helpfulCount: number;
  photos?: string[];
  hasUserVoted?: boolean;
}

interface EnhancedReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: (review: Partial<Review>) => void;
  onVoteHelpful?: (reviewId: string) => void;
}

export function EnhancedReviews({
  reviews,
  averageRating,
  totalReviews,
  onAddReview,
  onVoteHelpful,
}: EnhancedReviewsProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  // Sort and filter reviews
  const filteredReviews = reviews
    .filter((r) => !filterRating || Math.floor(r.rating) === filterRating)
    .sort((a, b) => {
      if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const StarRating = ({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Overall Rating Summary */}
      <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <div className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="pb-2">
              <StarRating rating={Math.round(averageRating)} size="lg" />
              <p className="text-sm text-muted-foreground mt-1">
                Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <button
              key={rating}
              onClick={() => setFilterRating(filterRating === rating ? null : rating)}
              className={`w-full flex items-center gap-3 group hover:bg-white dark:hover:bg-gray-700 p-2 rounded-lg transition-colors ${
                filterRating === rating ? 'bg-white dark:bg-gray-700' : ''
              }`}
            >
              <span className="text-sm font-medium w-8">{rating}</span>
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: rating * 0.1 }}
                  className="h-full bg-yellow-400"
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort and Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium">Sort by:</span>
        <div className="flex gap-2">
          {(['recent', 'helpful', 'rating'] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === sort
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </button>
          ))}
        </div>
        {filterRating && (
          <button
            onClick={() => setFilterRating(null)}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
          >
            {filterRating} stars only
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition-shadow"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {review.reviewerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.reviewerName}</span>
                    {review.isVerified && (
                      <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <StarRating rating={review.rating} size="sm" />
                    <span>•</span>
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            {review.title && <h4 className="font-semibold mb-2">{review.title}</h4>}
            {review.comment && <p className="text-muted-foreground mb-4">{review.comment}</p>}

            {/* Review Photos */}
            {review.photos && review.photos.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative w-20 h-20 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                  >
                    <EnhancedImage src={photo} alt={`Review photo ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Helpful Button */}
            <button
              onClick={() => onVoteHelpful?.(review.id)}
              disabled={review.hasUserVoted}
              className={`flex items-center gap-2 text-sm ${
                review.hasUserVoted
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400'
              } transition-colors disabled:cursor-not-allowed`}
            >
              <ThumbsUp className={`w-4 h-4 ${review.hasUserVoted ? 'fill-current' : ''}`} />
              <span>Helpful ({review.helpfulCount})</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <EnhancedImage
            src={selectedPhoto}
            alt="Review photo"
            width={800}
            height={800}
            className="object-contain max-w-full max-h-full"
          />
        </motion.div>
      )}

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {filterRating ? `No ${filterRating}-star reviews yet` : 'No reviews yet'}
          </p>
          <Button onClick={() => onAddReview?.({})} className="mt-4">
            Be the first to review
          </Button>
        </div>
      )}
    </div>
  );
}
