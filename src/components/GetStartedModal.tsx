import { useState } from 'react';
import { X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First save to Supabase
      const subscriptionData = {
        full_name: formData.fullName,
        email: formData.email,
        city: formData.city,
      };

      const { error } = await supabase.from('subscriptions').insert([subscriptionData]);

      if (error) throw error;

      // Then send to n8n webhook - change to GET method to match configuration
      try {
        // Constructing URL with query parameters for GET
        const webhookUrl = new URL('https://savindu2580.app.n8n.cloud/webhook-test/6b0ef129-bcca-4d40-a7e8-435d3d373236');
        webhookUrl.searchParams.append('fullName', formData.fullName);
        webhookUrl.searchParams.append('email', formData.email);
        webhookUrl.searchParams.append('city', formData.city);
        webhookUrl.searchParams.append('timestamp', new Date().toISOString());

        const response = await fetch(webhookUrl.toString(), {
          method: 'GET', // Changed to GET to match n8n configuration
        });

        if (!response.ok) {
          throw new Error(`Webhook failed with status: ${response.status}`);
        }

        console.log('n8n webhook notification sent successfully');
      } catch (webhookError) {
        console.warn('n8n webhook notification failed:', webhookError);
        // Webhook failure doesn't need to prevent success state since data is already saved to Supabase
      }

      // Continue with success state
      setShowSuccess(true);
      setFormData({ fullName: '', email: '', city: '' });

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 scale-in"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div
        className="relative glass glass-border rounded-2xl p-8 md:p-12 max-w-md w-full scale-in"
        style={{ border: '1px solid #4CC9F0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#4CC9F0] transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {!showSuccess ? (
          <>
            <h2 className="text-3xl font-bold mb-2 gradient-text">Get Started</h2>
            <p className="text-gray-400 mb-8 font-light">Subscribe for real-time weather alerts</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="w-full bg-transparent border-b-2 border-[#4CC9F0]/30 py-3 px-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#4CC9F0] transition-all duration-300 focus:glow-cyan"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b-2 border-[#4CC9F0]/30 py-3 px-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#4CC9F0] transition-all duration-300 focus:glow-cyan"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="City / Location"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="w-full bg-transparent border-b-2 border-[#4CC9F0]/30 py-3 px-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#4CC9F0] transition-all duration-300 focus:glow-cyan"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#4CC9F0] to-[#4895EF] rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:glow-cyan-strong disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4CC9F0] to-[#4895EF] flex items-center justify-center mx-auto mb-6 glow-cyan-strong">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 gradient-text">Success!</h3>
            <p className="text-gray-300 font-light">You're now subscribed for real-time alerts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
