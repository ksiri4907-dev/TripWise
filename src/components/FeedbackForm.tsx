import React, { useState } from 'react';
import { Star, Send, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';
import { UserFeedback } from '../types/trip';

interface FeedbackFormProps {
  currentTripContext?: string;
  onFeedbackSubmitted?: (feedback: UserFeedback) => void;
  feedbacks: UserFeedback[];
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  currentTripContext,
  onFeedbackSubmitted,
  feedbacks,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMsg('Please share a few words about your experience.');
      return;
    }

    const newFeedback: UserFeedback = {
      id: `fb-${Date.now()}`,
      rating,
      comment: comment.trim(),
      tripContext: currentTripContext || 'General Experience',
      submittedAt: new Date().toISOString().split('T')[0],
    };

    onFeedbackSubmitted?.(newFeedback);
    setSubmitted(true);
    setErrorMsg(null);
  };

  const handleReset = () => {
    setComment('');
    setRating(5);
    setSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Main Feedback Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            How was your TripWise experience?
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Your feedback directly informs our vehicle routing, hotel ranking, and comparison engine.
        </p>

        {submitted ? (
          <div className="p-6 bg-teal-50/70 border border-teal-200 rounded-2xl text-center space-y-3 animate-in fade-in duration-300">
            <div className="w-12 h-12 mx-auto rounded-full bg-teal-600 text-white flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Thank you! Your feedback helps us improve TripWise.
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              We have recorded your review. Your input ensures more accurate travel time projections and better hotel suggestions.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-teal-900 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors cursor-pointer"
              >
                Submit another review
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1–5 Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Overall Satisfaction
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        (hoverRating !== null ? star <= hoverRating : star <= rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-medium text-slate-500 ml-2">
                  {rating === 5 && 'Excellent'}
                  {rating === 4 && 'Very Good'}
                  {rating === 3 && 'Average'}
                  {rating === 2 && 'Needs Improvement'}
                  {rating === 1 && 'Poor'}
                </span>
              </div>
            </div>

            {/* What did you think? Text Box */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                What did you think?
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="The vehicle comparison was very useful, but I would like more hotel options..."
                rows={4}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {currentTripContext && (
              <div className="text-xs text-slate-500">
                <span>Associated journey context: </span>
                <span className="font-semibold text-slate-800">{currentTripContext}</span>
              </div>
            )}

            {errorMsg && (
              <p className="text-xs font-medium text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Submit Feedback</span>
              <Send className="w-3.5 h-3.5 text-teal-400" />
            </button>
          </form>
        )}
      </div>

      {/* Community & Saved Feedback Stream */}
      {feedbacks.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <h4 className="text-sm font-bold text-slate-900 mb-4">
            Recent Traveler Feedback
          </h4>
          <div className="space-y-3">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium tabular-nums">
                    {fb.submittedAt}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">"{fb.comment}"</p>
                {fb.tripContext && (
                  <p className="text-[11px] text-slate-400">
                    Route: {fb.tripContext}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
