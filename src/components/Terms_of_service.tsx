import React from "react";
import {
  FileText,
  Scale,
  Building2,
  UserCheck,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useEffect } from "react";


function Terms_of_service() {

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
            Terms of Service
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-semibold lg:font-bold leading-tight tracking-tight mb-3">
            PG Finder{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Terms of Service
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            These Terms of Service explain the rules and conditions for using
            the PG Finder platform. By accessing or using PG Finder, you agree
            to these terms.
          </p>
        </div>
      </section>

      {/* Content Section: Sidebar + Detailed Terms */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 lg:pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-10 left-1/3 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl" />
              <div className="absolute -bottom-16 right-1/4 h-44 w-44 rounded-full bg-indigo-300/20 blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[310px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
              {/* LEFT: Key highlights / summary */}
              <aside className="space-y-5 lg:space-y-6 lg:sticky lg:top-24">
                <div className="rounded-2xl bg-white/85 backdrop-blur-sm border border-purple-50 shadow-[0_12px_30px_rgba(15,23,42,0.05)] p-5 lg:p-6">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-50">
                      <FileText className="h-3.5 w-3.5 text-purple-600" />
                    </span>
                    Terms at a Glance
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    These terms ensure PG Finder is used fairly, safely, and
                    transparently by both PG seekers and owners.
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {/* Agreement */}
                    <div className="flex gap-3 rounded-xl border border-gray-100 bg-slate-50/80 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E9FF]">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Agreement to Terms
                        </p>
                        <p className="text-[11px] text-gray-600">
                          Using PG Finder means you accept these terms and
                          related policies.
                        </p>
                      </div>
                    </div>

                    {/* Fair & Safe Usage */}
                    <div className="flex gap-3 rounded-xl border border-gray-100 bg-slate-50/80 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E9FF]">
                        <Scale className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Fair &amp; Safe Use
                        </p>
                        <p className="text-[11px] text-gray-600">
                          No fraud, spam, harassment, or abuse of the platform.
                        </p>
                      </div>
                    </div>

                    {/* Platform Role */}
                    <div className="flex gap-3 rounded-xl border border-gray-100 bg-slate-50/80 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2E9FF]">
                        <Building2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Platform Role
                        </p>
                        <p className="text-[11px] text-gray-600">
                          PG Finder connects tenants and PG owners; we do not
                          own or operate PGs.
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

              {/* RIGHT: Detailed Terms – 2 flowing columns on desktop */}
              <article className="rounded-3xl bg-white/95 backdrop-blur-sm border border-purple-50 shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-6 sm:p-8 lg:p-9 text-sm sm:text-base text-gray-700 leading-relaxed">
                {/* Use CSS columns so sections flow and fill space nicely */}
                <div className="space-y-6 lg:space-y-8 lg:columns-2 lg:gap-10">
                  {/* 1. Acceptance of Terms */}
                  <section className="break-inside-avoid-column pb-4 border-b border-gray-100 mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                      1. Acceptance of Terms
                    </h2>
                    <p>
                      By accessing or using PG Finder (website or app), you
                      agree to be bound by these Terms of Service, our Privacy
                      Policy, and Cookie Policy. If you do not agree with these
                      terms, you should not use the platform.
                    </p>
                  </section>

                  {/* 2. Use of the Platform */}
                  <section className="break-inside-avoid-column pb-4 border-b border-gray-100 mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                      2. Use of the Platform
                    </h2>
                    <p className="mb-3">
                      When using PG Finder, you agree to:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>
                        Provide accurate and truthful information on the
                        platform.
                      </li>
                      <li>
                        Not misuse the platform for spam, fraud, harassment, or
                        any illegal activities.
                      </li>
                      <li>
                        Use PG Finder only for genuine PG searching, listing, or
                        management purposes.
                      </li>
                    </ul>
                  </section>

                  {/* 3. Listings, Content & Accuracy */}
                  <section className="break-inside-avoid-column pb-4 border-b border-gray-100 mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                      3. Listings, Content &amp; Accuracy
                    </h2>
                    <p className="mb-3">PG owners are responsible for:</p>
                    <ul className="list-disc list-inside space-y-1.5 mb-3">
                      <li>Providing correct and up-to-date PG details.</li>
                      <li>
                        Ensuring that photos and descriptions reflect the actual
                        PG.
                      </li>
                      <li>
                        Clearly mentioning rules, pricing, deposits, and
                        facilities.
                      </li>
                    </ul>
                    <p>
                      PG Finder is not responsible for errors or
                      misrepresentations in owner-submitted content, but we may
                      review and remove suspicious or fake listings at our
                      discretion.
                    </p>
                  </section>

                  {/* 4. Bookings, Visits & Payments */}
                  <section className="break-inside-avoid-column pb-4 border-b border-gray-100 mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                      4. Bookings, Visits &amp; Payments
                    </h2>
                    <p className="mb-3">Depending on the implementation:</p>
                    <ul className="list-disc list-inside space-y-1.5 mb-3">
                      <li>
                        Some bookings may happen directly between you and the PG
                        owner.
                      </li>
                      <li>
                        In some cases, PG Finder may offer online booking or
                        token advance options.
                      </li>
                      <li>
                        Final rent agreements and conditions are between the
                        tenant and the PG owner.
                      </li>
                    </ul>
                    <p>
                      Always review the terms and conditions communicated by the
                      PG owner before making any payment or agreement.
                    </p>
                  </section>

                  {/* 5. Cancellations & Refunds */}
                  <section className="break-inside-avoid-column pb-4 border-b border-gray-100 mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                      5. Cancellations &amp; Refunds
                    </h2>
                    <p>
                      Cancellation and refund policies may vary for each PG and
                      booking type. Please confirm all applicable cancellation
                      and refund terms directly with the PG owner before paying
                      any amount. If PG Finder provides any online payment
                      feature, the relevant refund policy will be clearly shown
                      at the time of booking.
                    </p>
                  </section>

                  {/* 6. Responsibilities – this whole block kept together */}
                  <section className="break-inside-avoid-column pb-4 border-b border-gray-100 mb-4">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Tenant Responsibilities */}
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <UserCheck className="h-5 w-5 text-purple-600" />
                          <h3 className="text-base sm:text-lg font-semibold text-purple-600">
                            6.1 Tenant Responsibilities
                          </h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1.5">
                          <li>
                            Verify PG details and, where possible, visit the
                            property before finalising.
                          </li>
                          <li>
                            Follow PG rules and maintain discipline and respect
                            for other occupants.
                          </li>
                          <li>
                            Make rent and deposit payments on time as agreed
                            with the owner.
                          </li>
                        </ul>
                      </div>

                      {/* PG Owner Responsibilities */}
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-purple-600" />
                          <h3 className="text-base sm:text-lg font-semibold text-purple-600">
                            6.2 PG Owner Responsibilities
                          </h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1.5">
                          <li>Provide honest and updated listing details.</li>
                          <li>
                            Maintain basic safety, hygiene, and promised
                            facilities.
                          </li>
                          <li>
                            Respect tenant rights and comply with applicable
                            local laws and regulations.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* 7. Limitation of Liability */}
                  <section className="break-inside-avoid-column pb-4 border-b border-gray-100 mb-4">
                    <div className="mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-purple-600" />
                      <h2 className="text-lg sm:text-xl font-semibold text-purple-600">
                        7. Limitation of Liability
                      </h2>
                    </div>
                    <p>
                      PG Finder is a platform to connect PG seekers and PG
                      owners. We do not own or operate PG properties. We are not
                      responsible for any disputes, damages, personal loss, or
                      legal issues arising between tenants and owners. However,
                      we may take action against abusive, fraudulent, or fake
                      accounts and listings on the platform.
                    </p>
                  </section>

                  {/* 8 & 9. Changes + Contact */}
                  <section className="break-inside-avoid-column">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                      8. Changes to These Terms
                    </h2>
                    <p className="mb-4">
                      We may update these Terms of Service from time to time.
                      Any changes will be posted on this page with an updated
                      revision date. Your continued use of PG Finder after
                      changes are made means you accept the updated terms.
                    </p>

                    <div className="mb-2 flex items-center gap-2">
                      <Info className="h-5 w-5 text-purple-600" />
                      <h2 className="text-lg sm:text-xl font-semibold text-purple-600">
                        9. Contact Us
                      </h2>
                    </div>
                    <p className="mb-2">
                      If you have any questions about these Terms of Service,
                      you can contact us at:
                    </p>
                    <p className="font-medium text-gray-800">
                      📩 Email:{" "}
                      <span className="text-purple-700">
                        support@pgfinder.com
                      </span>
                    </p>

                    <p className="text-sm text-gray-500 mt-5">
                      Last updated:{" "}
                      <span className="font-medium">December 2025</span>
                    </p>
                  </section>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Terms_of_service;
