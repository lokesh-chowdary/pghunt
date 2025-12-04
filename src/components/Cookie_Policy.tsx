import React from "react";
import { Cookie, Globe, ShieldCheck, Settings2 } from "lucide-react";
import { useEffect } from "react";


const Cookie_Policy: React.FC = () => {

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
    
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8F5FF] via-[#F8F5FF] to-white text-gray-900">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-10 pt-10 pb-8 lg:pt-14 lg:pb-10">
        <div className="mx-auto max-w-6xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-white shadow-sm px-3 py-1 text-[11px] font-medium text-gray-700 mb-4 border border-purple-100">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
            Cookie Policy
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-semibold lg:font-bold tracking-tight leading-tight mb-3">
            How We Use{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Cookies &amp; Tracking
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            This Cookie Policy explains what cookies are, how PG Finder uses
            them, and how you can manage your cookie preferences while using
            our platform.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-10 pb-14 lg:pb-18">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            {/* Subtle glow background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-10 left-1/3 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl" />
              <div className="absolute -bottom-14 right-1/4 h-44 w-44 rounded-full bg-indigo-300/20 blur-3xl" />
            </div>

            {/* Main layout: sidebar + content */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
              {/* LEFT: Summary / At a glance */}
              <aside className="space-y-5 lg:space-y-6 lg:sticky lg:top-24">
                {/* Summary card */}
                <div className="rounded-2xl bg-white/85 backdrop-blur-sm border border-purple-50 shadow-[0_12px_30px_rgba(15,23,42,0.05)] p-5 lg:p-6">
                  <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-50">
                      <Cookie className="h-3.5 w-3.5 text-purple-600" />
                    </span>
                    At a Glance
                  </h2>

                  <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                    <div className="flex gap-2.5">
                      <div className="mt-0.5">
                        <Cookie className="h-4 w-4 text-purple-600" />
                      </div>
                      <p>
                        We use cookies to remember your preferences and improve
                        your PG Finder experience.
                      </p>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="mt-0.5">
                        <Globe className="h-4 w-4 text-purple-600" />
                      </div>
                      <p>
                        Cookies help us keep your city, filters, and recent
                        searches ready when you come back.
                      </p>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="mt-0.5">
                        <ShieldCheck className="h-4 w-4 text-purple-600" />
                      </div>
                      <p>
                        You stay in control and can disable cookies at any time
                        in your browser settings.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
                    <span>Last updated:</span>
                    <span className="font-medium text-gray-700">
                      December 2025
                    </span>
                  </div>
                </div>

                {/* Types quick view */}
                <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-purple-50 shadow-sm p-5 lg:p-5.5 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Types of Cookies We Use
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <li>
                      <span className="font-semibold text-gray-800">
                        Essential:
                      </span>{" "}
                      Required for login, navigation and basic security.
                    </li>
                    <li>
                      <span className="font-semibold text-gray-800">
                        Preferences:
                      </span>{" "}
                      Remember filters, city, and language.
                    </li>
                    <li>
                      <span className="font-semibold text-gray-800">
                        Analytics:
                      </span>{" "}
                      Help us understand usage &amp; improve features.
                    </li>
                  </ul>
                </div>

                {/* Manage cookies hint */}
                <div className="rounded-2xl bg-[#0F172A] text-slate-50 p-4 lg:p-4.5 flex gap-3 text-xs sm:text-sm shadow-[0_12px_30px_rgba(15,23,42,0.55)]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80">
                    <Settings2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Managing Cookies</p>
                    <p className="text-slate-200/90">
                      You can clear, block, or control cookies from your browser
                      settings (Chrome, Firefox, Safari, Edge, etc.).
                    </p>
                  </div>
                </div>
              </aside>

              {/* RIGHT: Detailed policy */}
              <article className="rounded-3xl bg-white/95 backdrop-blur-sm border border-purple-50 shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-6 sm:p-8 lg:p-9 text-sm sm:text-base text-gray-700 leading-relaxed">
                {/* Two-column layout on desktop for better use of space */}
                <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
                  {/* Column 1 */}
                  <div className="space-y-8">
                    <section className="pb-6 border-b border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        1. What Are Cookies?
                      </h2>
                      <p>
                        Cookies are small text files stored on your browser or
                        device when you visit a website. They allow the website
                        to remember certain information about your visit — such
                        as your login status, preferences, and how you
                        interacted with different pages — so your experience
                        feels smoother and more personalised the next time you
                        visit.
                      </p>
                    </section>

                    <section className="pb-6 border-b border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        2. How PG Finder Uses Cookies
                      </h2>
                      <p className="mb-3">
                        We use cookies to make PG Finder more convenient and
                        useful for you. For example, cookies help us:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5">
                        <li>
                          Remember your selected city and recent filter choices.
                        </li>
                        <li>Keep you logged in securely (where applicable).</li>
                        <li>
                          Understand how users navigate the platform, so we can
                          improve performance and UX.
                        </li>
                        <li>
                          Show relevant content and features based on your usage
                          patterns.
                        </li>
                      </ul>
                    </section>

                    <section className="pb-0 lg:pb-6 border-b lg:border-b-0 border-gray-100 lg:border-transparent">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        3. Types of Cookies We May Use
                      </h2>
                      <p className="mb-3">
                        Depending on how you use PG Finder, the following cookie
                        types may be used:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <span className="font-semibold">
                            Essential Cookies:
                          </span>{" "}
                          Required for core functions such as logging in, page
                          navigation, and accessing secure areas. The website
                          cannot function properly without these.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Preference Cookies:
                          </span>{" "}
                          Remember your preferences — like your chosen city,
                          search filters, or language — so you don’t have to set
                          them every time.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Analytics Cookies:
                          </span>{" "}
                          Help us understand which pages are used most, where
                          users drop off, and how features are performing, so we
                          can improve PG Finder over time.
                        </li>
                      </ul>
                    </section>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-8">
                    <section className="pb-6 border-b border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        4. Third-Party Cookies
                      </h2>
                      <p>
                        We may integrate trusted third-party services, such as
                        analytics tools or payment gateways. These third parties
                        may set their own cookies to function correctly. They
                        are responsible for their own cookie and privacy
                        practices, and we encourage you to review their
                        respective policies for more details.
                      </p>
                    </section>

                    <section className="pb-6 border-b border-gray-100">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        5. Managing &amp; Disabling Cookies
                      </h2>
                      <p className="mb-3">
                        You have full control over how cookies are used on your
                        devices. Most browsers let you:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 mb-3">
                        <li>View which cookies are stored.</li>
                        <li>Delete existing cookies.</li>
                        <li>Block cookies from specific websites.</li>
                        <li>Block all cookies, if you prefer.</li>
                      </ul>
                      <p className="mb-3">
                        However, if you choose to block or delete certain
                        cookies, some features of PG Finder may not work as
                        intended, and your experience may be less personalised.
                      </p>
                      <div className="flex items-start gap-2 text-sm sm:text-base">
                        <Settings2 className="h-4 w-4 mt-1 text-purple-600" />
                        <p>
                          For step-by-step instructions, check your browser&apos;s
                          help section (Chrome, Firefox, Edge, Safari, etc.) on
                          how to manage cookies and site data.
                        </p>
                      </div>
                    </section>

                    <section className="pt-1">
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-purple-600">
                        6. Contact Us About Cookies
                      </h2>
                      <p className="mb-2">
                        If you have any questions about this Cookie Policy or
                        how we use cookies at PG Finder, you can reach us at:
                      </p>
                      <p className="font-medium text-gray-800">
                        📩 Email:{" "}
                        <span className="text-purple-700">
                          support@pgfinder.com
                        </span>
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
};

export default Cookie_Policy;
