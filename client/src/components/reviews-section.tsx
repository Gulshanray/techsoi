import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Mock/Helper functions for demonstration
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Review as SharedReview } from '@shared/schema';

// Extend Review type to include optional avatar property
type Review = SharedReview & { avatar?: string };

// --- Zod Schema for Form Validation ---
const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  position: z.string().min(2, 'Position/Company is required'),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, 'Review must be at least 10 characters'),
});
type ReviewFormData = z.infer<typeof reviewSchema>;

// --- 1. Reusable Review Card Component ---
function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
          {review.avatar ? (
            <img src={review.avatar} alt={review.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-7 h-7 text-white" />
          )}
        </div>
        <div>
          <h4 className="font-bold text-lg text-gray-800">{review.name}</h4>
          <p className="text-sm text-purple-700 font-medium">{review.position}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed italic flex-grow">"{review.text}"</p>
    </motion.div>
  );
}


// --- 2. Reusable Review Form Component (Updated Design) ---
function ReviewForm({ setShowForm }: { setShowForm: (show: boolean) => void }) {
  const [selectedRating, setSelectedRating] = useState(5);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: '', position: '', rating: 5, text: '' },
  });

  const createReviewMutation = useMutation({
    mutationFn: (data: ReviewFormData) => apiRequest('POST', '/api/reviews', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      form.reset();
      setShowForm(false);
      toast({ title: "Success!", description: "Thank you for your review!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit review.", variant: "destructive" });
    }
  });

  const onSubmit = (data: ReviewFormData) => {
    createReviewMutation.mutate({ ...data, rating: selectedRating });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-50 rounded-xl p-8 border border-gray-200 shadow-xl sticky top-28"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Share Your Experience</h3>
        <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField name="name" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Aman Gupta"
                  {...field}
                  className="bg-white text-gray-800 placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="position" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Position / Company</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Developer at TechSol"
                  {...field}
                  className="bg-white text-gray-800 placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div>
            <FormLabel className="text-gray-700">Rating</FormLabel>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setSelectedRating(star)}>
                  <Star className={`w-7 h-7 cursor-pointer transition-all ${star <= selectedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} />
                </button>
              ))}
            </div>
          </div>
          <FormField name="text" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How was your experience?"
                  rows={4}
                  {...field}
                  className="bg-white text-gray-800 placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <button type="submit" disabled={createReviewMutation.isPending} className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg transition-all hover:bg-purple-700 disabled:opacity-50">
            {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </Form>
    </motion.div>
  );
}


// --- 3. Main Reviews Section Component (Updated Design) ---
export default function ReviewsSection() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews']
  });
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showReviewForm && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  }, [showReviewForm]);

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-100 min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading Reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 mb-16">
          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              What Our Happy<br />Students Say
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl">
              Real stories from students who transformed their careers with us.
            </p>
          </div>
          <button
            onClick={() => setShowReviewForm(true)}
            className="w-full md:w-auto flex-shrink-0 px-8 py-4 bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 rounded-xl font-semibold shadow-md hover:shadow-lg"
          >
            Give Your Review
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div ref={formRef} className="lg:col-span-1">
            <AnimatePresence>
              {showReviewForm && <ReviewForm setShowForm={setShowReviewForm} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}