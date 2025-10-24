'use client';

import { useState } from 'react';
import { ValidatedInput, ValidatedForm } from '@/components/ui/ValidatedInput';
import { ValidationRule } from '@/lib/useFormValidation';
import { Button } from '@/components/ui/Button';
import { Mail, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

// Example validation rules
const nameRules: ValidationRule[] = [
  { type: 'required', message: 'Name is required' },
  { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' },
  { type: 'maxLength', value: 50, message: 'Name must not exceed 50 characters' },
];

const emailRules: ValidationRule[] = [
  { type: 'required', message: 'Email is required' },
  { type: 'email', message: 'Please enter a valid email address' },
];

const messageRules: ValidationRule[] = [
  { type: 'required', message: 'Message is required' },
  { type: 'minLength', value: 10, message: 'Message must be at least 10 characters' },
  { type: 'maxLength', value: 500, message: 'Message must not exceed 500 characters' },
];

export function ValidatedContactFormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you soon.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card border rounded-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p className="text-muted-foreground">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <ValidatedForm onSubmit={handleSubmit} className="space-y-6">
        <ValidatedInput
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          rules={nameRules}
          icon={<User className="h-5 w-5" />}
          helperText="Enter your first and last name"
        />

        <ValidatedInput
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          rules={emailRules}
          icon={<Mail className="h-5 w-5" />}
          helperText="We'll never share your email"
        />

        <div className="relative">
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2"
          >
            Message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="Tell us how we can help..."
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formData.message.length}/500 characters
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </ValidatedForm>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Try it out:</strong> Type in the fields to see real-time validation in action! 
          Error messages appear on blur, success checkmarks show when valid.
        </p>
      </div>
    </div>
  );
}
