import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Phone, Mail,BookMarked, MessageSquare, MapPin, Clock, Send, User } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Change Hobby into Money!</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join <span className="text-blue-600 font-semibold">TechSol</span> and kickstart your career in Tech, Design, or Marketing.
            Learn job-ready skills with <span className="text-green-600 font-medium">100% Placement Assistance</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Contact TechSol?</h2>
              <p className="text-lg text-gray-600">
                Whether you're interested in Full Stack Development, AutoCAD, Data Science, or Cyber Security —
                we’re here to guide you! Ask us about course details, start dates, and skill tracks.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Call to Register</h3>
                <p className="text-gray-600 mb-1">Mon-Sat, 10 AM – 6 PM</p>
                <a href="tel:+917302670626" className="text-blue-600 font-medium hover:text-blue-700">
                  +91 73026 70626
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Support</h3>
                <p className="text-gray-600 mb-1">We'll respond within 24 hrs</p>
                <a href="mailto:techsol626@gmail.com" className="text-green-600 font-medium hover:text-green-700">
                  techsol626@gmail.com
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Visit Us</h3>
                <p className="text-gray-600 mb-1">Office Location</p>
                <p className="text-purple-600 font-medium">
                  Radiance Building, Near Al Shifa Hospital, Abul Fazal, Jamia Nagar, Okhla
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Office Hours</h3>
                <p className="text-gray-600 mb-1">Mon-Fri: 9 AM – 6 PM</p>
                <p className="text-orange-600 font-medium">Sat: 10 AM – 4 PM</p>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose TechSol?</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✅ Industry-aligned instructors</li>
                <li>✅ Real-world projects & mentoring</li>
                <li>✅ 100% Placement Assistance</li>
                <li>✅ Flexible Learning (3–5 months)</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 border">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free Career Guidance</h3>
              <p className="text-gray-600">Let us know your interest, and we’ll help choose the right path for you.</p>
            </div>




<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    {/* Full Name Field */}
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-900 font-medium">Full Name</FormLabel>
          <FormControl>
            {/* Icon Container */}
            <div className="relative flex items-center">
              <User className="absolute left-3 h-5 w-5 text-gray-400" />
              <Input
                {...field}
                placeholder="Enter your name"
                className="h-12 w-full rounded-md border-gray-300 bg-slate-50 pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-gray-700"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Email Field */}
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-900 font-medium">Email</FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-5 w-5 text-gray-400" />
              <Input
                {...field}
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-md border-gray-300 bg-slate-50 pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-gray-700"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Phone Field */}
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-900 font-medium">Phone</FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              <Phone className="absolute left-3 h-5 w-5 text-gray-400" />
              <Input
                {...field}
                placeholder="+91 1234567890"
                className="h-12 w-full rounded-md border-gray-300 bg-slate-50 pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-gray-700"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Course of Interest Field */}
    <FormField
      control={form.control}
      name="service"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-900 font-medium">Course of Interest</FormLabel>
          <div className="relative flex items-center">
            <BookMarked className="absolute left-3 h-5 w-5 text-gray-400" />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 w-full rounded-md border-gray-300 bg-slate-50 pl-10 text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {/* SelectItem options... */}
                <SelectItem value="graphic-design">Graphic Designing</SelectItem>
                <SelectItem value="data-analyst">Data Analyst</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="fullstack-dev">Full Stack Development</SelectItem>
                <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                <SelectItem value="cyber-security">Cyber Security</SelectItem>
                <SelectItem value="autocad">AutoCAD 2D/3D/Sketchup</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Message Field */}
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-900 font-medium">Message</FormLabel>
          <FormControl>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Textarea
                {...field}
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full rounded-md border-gray-300 bg-slate-50 pl-10 pt-3 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-gray-700"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Submit Button */}
    <button
      type="submit"
      disabled={contactMutation.isPending}
      className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {contactMutation.isPending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          <Send className="h-5 w-5" />
          Send Message
        </>
      )}
    </button>
  </form>
</Form>
```
          </div>
        </div>
      </div>
    </div>
  );
}
