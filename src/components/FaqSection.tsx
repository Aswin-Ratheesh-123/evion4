'use client';

import React, { useState } from 'react';
import { FAQS } from '@/data/faqs';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-light-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-white border border-light-border text-charcoal shadow-soft mb-4">
            <HelpCircle className="w-4 h-4 text-electric-green-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-text">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Clear Answers to Your <span className="text-gradient-green">Charging Questions</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-secondary-text leading-relaxed">
            Everything you need to know about charging speeds, connector standards, and enterprise solutions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-soft-white/80 border-electric-green shadow-soft ring-1 ring-electric-green/30'
                    : 'bg-white border-light-border hover:border-light-border hover:bg-soft-white/40'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-electric-green-mint text-electric-green-deep border border-electric-green/20">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-charcoal">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-electric-green text-charcoal rotate-180'
                        : 'bg-soft-white text-secondary-text'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-secondary-text leading-relaxed border-t border-light-border/60">
                    <p className="text-charcoal/90">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Help Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-soft-white border border-light-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-charcoal">Have a specific charging inquiry?</h4>
            <p className="text-xs text-secondary-text">Our customer engineering team is available 24/7.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-electric-green text-charcoal border border-light-border hover:border-electric-green transition-all shadow-soft"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Contact Support Desk</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

