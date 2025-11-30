'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, User, Quote } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Review } from '@shared/schema';

const reviewSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position/Company is required'),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, 'Review must be at least 10 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews']
  });

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: '',
      position: '',
      rating: 5,
      text: '',
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const response = await apiRequest('POST', '/api/reviews', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      form.reset();
      setSelectedRating(5);
      setShowReviewForm(false);
      toast({
        title: 'Success!',
        description: 'Thank you for your review! It has been added to our testimonials.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    createReviewMutation.mutate({
      ...data,
      rating: selectedRating,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            What Our Happy<br />
            Students Say
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Build skills with our courses and mentors from world-class companies.
          </p>

          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg"
          >
            Give Your Review
          </button>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Your Name</FormLabel>
                       <FormControl>
  <div className="relative flex items-center">
    {/* Icon yahan hai */}
    <User className="absolute left-3 h-5 w-5 text-gray-400" />

    {/* Input field ko icon ke liye left padding di gayi hai */}
    <Input
      placeholder="Enter your name"
      {...field}
      className="w-full border-gray-300 bg-gray-50 pl-10 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
    />
  </div>
</FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Position/Company</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Full-Stack Developer at XYZ"
                            {...field}
                            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 bg-gray-50 text-gray-900"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setSelectedRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${star <= selectedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Your Review</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your experience with our courses..."
                            rows={4}
                            {...field}
                            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 bg-gray-50 text-gray-900"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={createReviewMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </Form>
            </div>
          </div>
        )}

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-4">
                <Quote className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-center leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                <p className="text-sm text-gray-600">{review.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-6 opacity-90">
            Start your journey with TechSol and become our next success story.
          </p>
          <button className="bg-white text-purple-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
            Start Learning Today
          </button>
        </div>
      </div>
    </div>
  );
}
