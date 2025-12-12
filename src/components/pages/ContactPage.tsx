import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import SEO from "../common/SEO";


function Contact() {

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact PG Finder',
    description: 'Get in touch with PG Finder for support, inquiries, or to list your PG. We\'re here to help you find the perfect accommodation.',
    url: typeof window !== 'undefined' ? window.location.href : '',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8012345678',
      contactType: 'Customer Service',
      email: 'support@pgfinder.com',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - PG Finder"
        description="Get in touch with PG Finder for support, inquiries, or to list your PG. We're here to help you find the perfect accommodation."
        keywords="contact PG Finder, PG support, PG inquiries, list your PG"
        url="/contact"
        structuredData={structuredData}
      />
      <main className="min-h-screen bg-gradient-to-b from-[#F8F5FF] via-[#F8F5FF] to-white text-gray-900">
      <section className="px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Top text block */}
          <div className="text-center mb-10 lg:mb-12">
            <div className="inline-flex items-center rounded-full bg-white shadow-sm px-3 py-1 text-[11px] font-medium text-gray-700 mb-4 border border-purple-100">
              <span className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
              Contact PG Finder
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-semibold lg:font-bold leading-tight tracking-tight mb-3">
              Let&apos;s Talk About Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Next Stay
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re looking for a PG, managing one, or exploring
              collaboration opportunities — we&apos;re here to help. Reach out
              and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Main Card – split layout */}
          <div className="relative">
            {/* Soft gradient background behind card */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-10 -left-4 h-40 w-40 rounded-full bg-purple-300/25 blur-3xl" />
              <div className="absolute -bottom-12 -right-6 h-44 w-44 rounded-full bg-indigo-300/25 blur-3xl" />
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] border border-purple-50 p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-[1.05fr_minmax(0,0.95fr)] gap-8 md:gap-8 lg:gap-10">
              {/* LEFT: Form */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E9FF]">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold">
                      Send Us a Message
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Share your query and we&apos;ll respond within working hours.
                    </p>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-sm">
                      <label className="block mb-1 font-medium text-gray-800">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-400 focus:outline-none placeholder:text-gray-400"
                      />
                    </div>
                    <div className="text-sm">
                      <label className="block mb-1 font-medium text-gray-800">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-400 focus:outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="text-sm">
                    <label className="block mb-1 font-medium text-gray-800">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-400 focus:outline-none placeholder:text-gray-400"
                    />
                  </div>

                  <div className="text-sm">
                    <label className="block mb-1 font-medium text-gray-800">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Share details about your query..."
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 focus:outline-none placeholder:text-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 active:bg-purple-800 transition"
                  >
                    Send Message
                    <Send className="h-4 w-4" />
                  </button>

                  <p className="text-[11px] text-gray-400">
                    By contacting us, you agree that PG Finder may use your
                    details to respond to your enquiry.
                  </p>
                </form>
              </div>

              {/* RIGHT: Contact info & extras */}
              <div className="space-y-5">
                {/* Highlight */}
                <div className="rounded-2xl bg-[#F8F5FF]/90 border border-purple-100 px-4 py-3 flex items-start gap-3">
                  <div className="mt-0.5">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    We primarily focus on{" "}
                    <span className="font-semibold">
                      Bangalore, Hyderabad, and Chennai
                    </span>{" "}
                    — but feel free to reach out for other cities too.
                  </p>
                </div>

                {/* Contact blocks */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-2xl bg-[#F9FAFB] border border-gray-100 px-4 py-4 flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold mb-0.5">Office Address</p>
                      <p className="text-gray-600">
                        123 Main Street,
                        <br />
                        Koramangala, Bangalore – 560034
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#F9FAFB] border border-gray-100 px-4 py-4 flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                      <Phone className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold mb-0.5">Phone Support</p>
                      <p className="text-gray-600">
                        +91 8012345678
                        <br />
                        <span className="text-xs text-gray-500">
                          For urgent / time-sensitive support
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#F9FAFB] border border-gray-100 px-4 py-4 flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold mb-0.5">Email</p>
                      <p className="text-gray-600">
                        support@pgfinder.com
                        <br />
                        <span className="text-xs text-gray-500">
                          For detailed queries & feedback
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-2xl bg-[#0F172A] text-slate-50 px-4 py-4 flex gap-3 items-start shadow-[0_14px_35px_rgba(15,23,42,0.6)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Support Hours</p>
                    <p className="text-slate-200 text-xs sm:text-sm">
                      Monday – Saturday:{" "}
                      <span className="font-medium">9:00 AM to 7:00 PM</span>
                      <br />
                      Sunday:{" "}
                      <span className="font-medium">Limited Support</span>
                    </p>
                  </div>
                </div>

                {/* Social */}
                <div className="rounded-2xl bg-white/95 border border-purple-50 px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold">Stay Connected</p>
                    <p className="text-xs text-gray-500">
                      Follow PG Finder for updates, tips & new feature launches.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <a href="#" className="hover:text-purple-600 transition">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="hover:text-purple-600 transition">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="hover:text-purple-600 transition">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      </main>
    </>
  );
}

export default Contact;
