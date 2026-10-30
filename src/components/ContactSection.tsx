'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ContactSectionProps {
  initialType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialType = 'General Enquiry' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: initialType,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const enquiryTypes = [
    'General Enquiry',
    'Charging Station Information',
    'Business Charging Solutions',
    'Technical Support',
    'Partnership Enquiry',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitSuccess(null);

    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please provide a message with at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitSuccess(
        `Thank you, ${formData.name}! Your enquiry has been received (Ref: ${data.referenceId}). Our team will reach out within 24 hours.`
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        enquiryType: 'General Enquiry',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-soft-white/60 relative overflow-hidden border-t border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-light-border text-charcoal shadow-soft mb-4">
            <Mail className="w-4 h-4 text-electric-green-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="font-lato section-heading !text-3xl sm:!text-4xl lg:!text-5xl text-charcoal tracking-tight font-extrabold leading-tight">
            Let&apos;s Power the <span className="text-gradient-green">Electric Future</span> Together
          </h2>

          <p className="mt-4 body-text max-w-2xl mx-auto">
            Have a question about EV charging or exploring charging solutions for your business? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct channels & WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-light-border shadow-soft">
              <h3 className="font-lato section-heading !text-xl font-bold text-charcoal mb-3">Direct EVION Support</h3>
              <p className="font-lato text-sm text-secondary-text leading-relaxed mb-6">
                Whether you need immediate charging bay assistance or want to schedule an enterprise commercial site survey, our team is standing by.
              </p>

              <div className="space-y-4">
                {/* 24/7 Telephone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-soft-white border border-light-border">
                  <div className="p-2 rounded-xl bg-electric-green-mint text-electric-green-deep">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary-text block">
                      24/7 Driver Support Line
                    </span>
                    <a
                      href="tel:+448003846600"
                      className="text-base font-bold text-charcoal hover:text-electric-green-deep transition-colors"
                    >
                      +44 800 384 6600
                    </a>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-soft-white border border-light-border">
                  <div className="p-2 rounded-xl bg-electric-green-mint text-electric-green-deep">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary-text block">
                      Enquiries & Partnerships
                    </span>
                    <a
                      href="mailto:support@evioncharge.com"
                      className="text-base font-bold text-charcoal hover:text-electric-green-deep transition-colors"
                    >
                      support@evioncharge.com
                    </a>
                  </div>
                </div>

                {/* Official WhatsApp Chat */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-soft-white border border-light-border">
                  <div className="p-2 rounded-xl bg-[#25D366]/20 text-[#128C7E]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary-text block">
                      Official WhatsApp Business
                    </span>
                    <a
                      href="https://wa.me/448003846600"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#128C7E] hover:underline inline-flex items-center gap-1"
                    >
                      Chat on WhatsApp
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Commitments */}
              <div className="mt-8 pt-6 border-t border-light-border space-y-2 text-xs text-secondary-text">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-electric-green-deep" />
                  <span>Average business enquiry response: Under 4 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-electric-green-deep" />
                  <span>Secure data handling in compliance with GDPR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-light-border shadow-soft">
              <h3 className="font-lato section-heading !text-2xl font-bold text-charcoal mb-1">Send an Enquiry</h3>
              <p className="font-lato text-xs text-secondary-text mb-6">
                Fill in your details below and an EVION charging specialist will assist you.
              </p>

              {/* Alert Feedback Messages */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-electric-green-mint border border-electric-green text-charcoal text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-electric-green-deep shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Submission Confirmed</p>
                    <p className="text-xs mt-1 text-secondary-text">{submitSuccess}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-soft-white border border-light-border text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-electric-green focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-soft-white border border-light-border text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-electric-green focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7123 456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-soft-white border border-light-border text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-electric-green focus:bg-white transition-all"
                    />
                  </div>

                  {/* Enquiry Type Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      Enquiry Type *
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-soft-white border border-light-border text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-electric-green cursor-pointer font-medium"
                    >
                      {enquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your requirements, station location query, or property details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-soft-white border border-light-border text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-electric-green focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button with Turquoise-to-Green Gradient */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold font-lato bg-evion-gradient hover:opacity-95 text-[#071A16] transition-all shadow-[0_4px_25px_rgba(8,220,197,0.4)] hover:shadow-[0_0_35px_rgba(8,220,197,0.55)] disabled:opacity-50 cursor-pointer border border-white/20"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-charcoal" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

