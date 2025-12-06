import React from "react";
import {
  Search,
  Building2,
  CalendarCheck,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";


function About() {

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8F5FF] via-[#F8F5FF] to-white text-gray-900">
      {/* Hero / Intro */}
      <section className="px-4 sm:px-6 lg:px-10 pt-10 pb-14 lg:pt-14 lg:pb-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* Small badge */}
          <div className="inline-flex items-center rounded-full bg-white shadow-sm px-3 py-1 text-[11px] font-medium text-gray-700 mb-4 border border-purple-100">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
            About PG Finder
          </div>

          <div className="relative">
            {/* Soft background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-10 left-1/3 h-40 w-40 rounded-full bg-purple-300/25 blur-3xl" />
              <div className="absolute -bottom-14 right-1/4 h-44 w-44 rounded-full bg-indigo-300/25 blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
              {/* Left: main content */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-semibold lg:font-bold leading-tight tracking-tight mb-3">
                  Making PG Hunting{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    Simple, Transparent
                  </span>{" "}
                  &amp; Stress-Free
                </h1>

                <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-2xl">
                  PG Finder is built for students and working professionals who
                  are tired of roaming streets, dealing with brokers, facing
                  hidden charges and incomplete information. We bring verified PG
                  listings, real photos, and clear details together so you can
                  compare, decide, and book confidently.
                </p>

                <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                  Whether you&apos;re moving to{" "}
                  <span className="font-medium">Bangalore, Hyderabad,</span> or{" "}
                  <span className="font-medium">Chennai</span>, PG Finder helps
                  you discover the right stay for exams, interviews, internships,
                  or long-term accommodation — all in a few clicks.
                </p>

                {/* Two small info cards */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-purple-50 shadow-[0_10px_26px_rgba(15,23,42,0.06)] px-4 py-3">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                      For PG Seekers
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      No brokerage. No surprises.
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600">
                      Get complete clarity on rent, deposit, sharing type,
                      amenities, rules, and food before visiting the property.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-purple-50 shadow-[0_10px_26px_rgba(15,23,42,0.06)] px-4 py-3">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">
                      For PG Owners
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Manage PGs like a pro.
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600">
                      List your PG, manage rooms and occupancy, and handle
                      enquiries using our dedicated PG Manager tools.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full bg-purple-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-purple-700 active:bg-purple-800 transition-colors"
                  >
                    Start Exploring PGs
                  </Link>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>
                      Built for students, job seekers &amp; working professionals
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: side info cards */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-purple-50 shadow-[0_14px_34px_rgba(15,23,42,0.08)] px-5 py-4 sm:px-6 sm:py-5">
                  <h2 className="text-base sm:text-lg font-semibold mb-2">
                    Why We Started{" "}
                    <span className="text-purple-600">PG Finder</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Finding a PG in a new city usually means calling random
                    numbers, visiting multiple places, and still being unsure
                    about your decision. We experienced this struggle ourselves
                    and decided to fix it with a structured, tech-driven
                    platform focused only on PGs and shared living.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs sm:text-sm">
                  <div className="rounded-2xl bg-white/95 border border-purple-50 shadow-sm px-3 py-3">
                    <p className="text-[11px] text-gray-500 mb-1">
                      Focused Cities
                    </p>
                    <p className="font-semibold">Bangalore</p>
                    <p className="font-semibold">Hyderabad</p>
                    <p className="font-semibold">Chennai</p>
                  </div>
                  <div className="rounded-2xl bg-white/95 border border-purple-50 shadow-sm px-3 py-3 flex flex-col justify-center">
                    <p className="text-[11px] text-gray-500 mb-1">Built For</p>
                    <p className="font-semibold">Students</p>
                    <p className="font-semibold">Job Seekers</p>
                    <p className="font-semibold">Working Pros</p>
                  </div>
                  <div className="rounded-2xl bg-white/95 border border-purple-50 shadow-sm px-3 py-3 flex flex-col justify-center">
                    <p className="text-[11px] text-gray-500 mb-1">
                      Stay Duration
                    </p>
                    <p className="font-semibold">Short Stay</p>
                    <p className="font-semibold">Monthly</p>
                    <p className="font-semibold">Long Term</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works – mirrors home section style */}
      <section className="px-4 sm:px-6 lg:px-10 py-14 bg-white">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-2">
            How PG Finder{" "}
            <span className="text-purple-600">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-center text-sm sm:text-base text-gray-600 mb-10">
            A simple, guided flow that takes you from searching online to moving
            into your new PG with confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl bg-[#F8F5FF] px-5 py-5 text-center shadow-sm border border-purple-50">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Search className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Search</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Select your city, area, budget, sharing type and preferences in
                a few taps.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F5FF] px-5 py-5 text-center shadow-sm border border-purple-50">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Compare</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                View verified PG listings with photos, amenities, rules, and
                distance to key locations.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F5FF] px-5 py-5 text-center shadow-sm border border-purple-50">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <CalendarCheck className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Book / Visit</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Schedule a visit or block a bed using real-time availability and
                clear pricing.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F5FF] px-5 py-5 text-center shadow-sm border border-purple-50">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <ShieldCheck className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Move-in</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Move into a PG that matches your expectations — no last-minute
                surprises or hidden terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Promise */}
      <section className="px-4 sm:px-6 lg:px-10 py-14 bg-[#F8F5FF]">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative">
            {/* Soft glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-6 left-1/4 h-32 w-32 rounded-full bg-purple-300/20 blur-3xl" />
              <div className="absolute -bottom-10 right-1/4 h-36 w-36 rounded-full bg-indigo-300/20 blur-3xl" />
            </div>

            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-2">
              Our <span className="text-purple-600">Mission</span> &amp; Promise
            </h2>
            <p className="mx-auto max-w-2xl text-center text-sm sm:text-base text-gray-600 mb-10">
              We aim to build the most trusted PG discovery and management
              platform in India — fair to tenants, PG owners, and parents.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-5 py-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)] border border-purple-50 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2E9FF]">
                  <HeartHandshake className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">For Tenants</h3>
                <p className="text-sm text-gray-600 max-w-[280px]">
                  Transparent pricing, clear rules, and filters that matter —
                  so you always know exactly what you are signing up for.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-5 py-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)] border border-purple-50 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2E9FF]">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">For PG Owners</h3>
                <p className="text-sm text-gray-600 max-w-[280px]">
                  Manage rooms, occupancy, short stays, and enquiries seamlessly
                  using our PG Manager tools.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-5 py-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)] border border-purple-50 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2E9FF]">
                  <ShieldCheck className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  For Parents &amp; Guardians
                </h3>
                <p className="text-sm text-gray-600 max-w-[280px]">
                  Verified PGs, clear house rules, and honest details help
                  parents feel confident about where their children stay.
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-purple-200 bg-white px-6 py-2.5 text-sm font-medium text-purple-700 hover:bg-purple-50 active:bg-purple-100 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
