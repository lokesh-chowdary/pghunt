import React from "react";
import { ShieldCheck, Lock, FileText } from "lucide-react";
import { useEffect } from "react";


function Privacy_Policy() {

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8F5FF] via-[#F8F5FF] to-white text-gray-900">
      {/* Header Section */}
      <section className="px-4 sm:px-6 lg:px-10 pt-10 pb-8 lg:pt-14 lg:pb-10">
        <div className="mx-auto w-full max-w-6xl">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-white shadow-sm px-3 py-1 text-[11px] font-medium text-gray-700 mb-4 border border-purple-100">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
            Privacy Policy
          </div>

          {/* Header */}
          <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-semibold lg:font-bold leading-tight tracking-tight mb-3">
            Your Privacy is Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Top Priority
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            PG Finder is committed to keeping your information secure,
            transparent, and protected. This Privacy Policy explains how we
            collect, use, and safeguard your data.
          </p>
        </div>
      </section>

      {/* Content Section: Sidebar + Policy */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 lg:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative">
            {/* Soft background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-10 left-1/3 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl" />
              <div className="absolute -bottom-16 right-1/4 h-44 w-44 rounded-full bg-indigo-300/20 blur-3xl" />
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[310px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
              {/* LEFT: Key principles / summary */}
              <aside className="space-y-5 lg:space-y-6 lg:sticky lg:top-24">
                {/* Summary header card */}
                <div className="rounded-2xl bg-white/85 backdrop-blur-sm border border-purple-50 shadow-[0_12px_30px_rgba(15,23,42,0.05)] p-5">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-50">
                      <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
                    </span>
                    Privacy at a Glance
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    We only collect what we need, use it to improve your PG
                    search experience, and protect it with strong security
                    practices.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {/* Data Protection */}
                    <div className="flex gap-3 rounded-xl border border-gray-100 bg-slate-50/70 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E9FF]">
                        <ShieldCheck className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Data Protection
                        </p>
                        <p className="text-[11px] text-gray-600">
                          Industry-standard security to safeguard your data.
                        </p>
                      </div>
                    </div>

                    {/* Secure Systems */}
                    <div className="flex gap-3 rounded-xl border border-gray-100 bg-slate-50/70 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E9FF]">
                        <Lock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Secure Systems
                        </p>
                        <p className="text-[11px] text-gray-600">
                          Encrypted transmission and controlled access.
                        </p>
                      </div>
                    </div>

                    {/* Transparency */}
                    <div className="flex gap-3 rounded-xl border border-gray-100 bg-slate-50/70 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E9FF]">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Transparency
                        </p>
                        <p className="text-[11px] text-gray-600">
                          Clear about what we collect and why.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
                    Last updated:{" "}
                    <span className="font-medium text-gray-700">
                      December 2025
                    </span>
                  </p>
                </div>
              </aside>

              {/* RIGHT: Full Policy Text */}
              <article className="rounded-3xl bg-white/95 backdrop-blur-sm border border-purple-50 shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-6 sm:p-8 lg:p-9 text-sm sm:text-base text-gray-700 leading-relaxed">
                {/* You can optionally split into 2 columns on large screens */}
                <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
                  {/* Column 1 */}
                  <div className="space-y-8">
                    {/* 1. Information We Collect */}
                    <section className="pb-6 border-b border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        1. Information We Collect
                      </h2>
                      <p className="mb-3">
                        We may collect certain personal and usage information
                        when you use PG Finder, including:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5">
                        <li>Name and contact details (mobile number, email).</li>
                        <li>
                          Location preferences (city, area and search filters).
                        </li>
                        <li>
                          PG search activity (views, favourites, enquiries).
                        </li>
                        <li>
                          Basic device and usage data to improve performance.
                        </li>
                      </ul>
                    </section>

                    {/* 2. How We Use Your Data */}
                    <section className="pb-6 border-b border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        2. How We Use Your Data
                      </h2>
                      <p className="mb-3">
                        We use your information strictly to operate and improve
                        the PG Finder platform. This includes:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5">
                        <li>Improving PG recommendations and relevance.</li>
                        <li>Providing personalised search results and filters.</li>
                        <li>
                          Facilitating communication for enquiries and bookings.
                        </li>
                        <li>
                          Detecting suspicious activity and preventing fraud or
                          misuse of the platform.
                        </li>
                      </ul>
                    </section>

                    {/* 3. Sharing Your Information */}
                    <section className="pb-0 lg:pb-6 border-b lg:border-b-0 border-gray-100 lg:border-transparent">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        3. Sharing Your Information
                      </h2>
                      <p className="mb-3">
                        We do <span className="font-semibold">not</span> sell
                        your personal information.
                      </p>
                      <p>
                        Limited details may be shared only with{" "}
                        <span className="font-medium">verified PG owners</span>{" "}
                        when you choose to submit an enquiry or express interest
                        in a property, solely to help them contact you and
                        complete the booking process.
                      </p>
                    </section>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-8">
                    {/* 4. Data Security Measures */}
                    <section className="pb-6 border-b border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        4. Data Security Measures
                      </h2>
                      <p className="mb-3">
                        We use a combination of technical and organisational
                        measures to protect your personal information, such as:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5">
                        <li>Encryption in transit where applicable.</li>
                        <li>
                          Role-based access controls for sensitive information.
                        </li>
                        <li>
                          Secure infrastructure and periodic security reviews.
                        </li>
                        <li>
                          Limited access to data only for authorised team
                          members and systems.
                        </li>
                      </ul>
                    </section>

                    {/* 5. Your Rights & Choices */}
                    <section className="pb-6 border-b border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        5. Your Rights &amp; Choices
                      </h2>
                      <p className="mb-3">
                        Depending on your location and applicable laws, you may
                        have the right to:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 mb-3">
                        <li>Access the personal data we hold about you.</li>
                        <li>Request corrections to inaccurate information.</li>
                        <li>
                          Request deletion of certain data, subject to legal and
                          operational requirements.
                        </li>
                        <li>
                          Restrict or object to certain types of data
                          processing.
                        </li>
                      </ul>
                      <p>
                        To exercise any of these rights, you can contact us at:{" "}
                        <span className="font-semibold text-purple-700">
                          support@pgfinder.com
                        </span>
                      </p>
                    </section>

                    {/* 6. Updates to This Policy */}
                    <section>
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        6. Updates to This Policy
                      </h2>
                      <p className="mb-3">
                        We may revise this Privacy Policy from time to time to
                        reflect updates to our practices, legal requirements, or
                        new features on PG Finder.
                      </p>
                      <p className="mb-4">
                        Whenever we make changes, we will update the{" "}
                        <span className="font-medium">“Last updated”</span>{" "}
                        date at the bottom of this page. We encourage you to
                        review this page periodically.
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        Last updated:{" "}
                        <span className="font-medium">December 2025</span>
                      </p>
                    </section>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Privacy_Policy;
