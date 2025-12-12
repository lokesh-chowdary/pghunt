# File & Folder Reorganization Plan

## Current Issues Identified

1. **Naming Inconsistencies:**
   - `Privacy_Policy.tsx`, `Cookie_Policy.tsx`, `Terms_of_service.tsx` (underscores)
   - `HomePage.tsx` vs `Home.tsx` (confusing)
   - `listpgdetails/` (not descriptive)
   - Duplicate imports: `Mobile_nav_bar` and `MobileNavBar`

2. **Folder Structure Issues:**
   - `store/` contains auth components (should be `auth/`)
   - `home/` contains layout and search (should be separated)
   - Policy files at root level (should be in `policies/`)
   - `listpgdetails/` unclear naming

## Proposed Structure

```
src/components/
├── auth/                    # Authentication components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ForgotPassword.tsx
│   └── ProtectedRoute.tsx
│
├── layout/                  # Layout components
│   ├── Layout.tsx
│   ├── Header.tsx          # Extract from Layout if needed
│   └── MobileNavBar.tsx
│
├── pages/                   # Page-level components
│   ├── LandingPage.tsx      # Renamed from HomePage.tsx
│   ├── SearchPage.tsx        # Renamed from Home.tsx
│   ├── PGDetailsPage.tsx    # Renamed from PGCardDetails.tsx
│   ├── AboutPage.tsx        # Renamed from About.tsx
│   ├── ContactPage.tsx      # Renamed from Contact.tsx
│   ├── ProfilePage.tsx      # Renamed from UserProfile.tsx
│   └── YourListingsPage.tsx # Renamed from YourListings.tsx
│
├── pg-listing/              # PG listing management (renamed from listpgdetails)
│   ├── AddPgForm.tsx
│   ├── ProgressBar.tsx
│   ├── Step1PGInfo.tsx
│   ├── Step2SharingRent.tsx
│   ├── Step3Amenities.tsx
│   ├── Step4PricingMedia.tsx
│   ├── Step5Preview.tsx
│   └── SuccessScreen.tsx
│
├── policies/                # Policy pages
│   ├── PrivacyPolicy.tsx    # Renamed from Privacy_Policy.tsx
│   ├── CookiePolicy.tsx     # Renamed from Cookie_Policy.tsx
│   └── TermsOfService.tsx   # Renamed from Terms_of_service.tsx
│
├── common/                  # Shared/common components
│   ├── BackButton.tsx
│   ├── DevModeToggle.tsx
│   └── SEO.tsx
│
├── ui/                      # UI components (keep as is)
│   └── ...
│
├── footer/                  # Footer (keep as is)
│   └── Footer.tsx
│
└── ErrorBoundary.tsx        # Root level (keep as is)
```

## Renaming Strategy

1. **Policy Files:** `Privacy_Policy.tsx` → `PrivacyPolicy.tsx` (camelCase)
2. **Page Components:** Add `Page` suffix for clarity
3. **Folders:** Use kebab-case for folders (`pg-listing/`, `auth/`)
4. **Files:** Use PascalCase for components (`Login.tsx`, `Register.tsx`)

## Migration Steps

1. Create new folder structure
2. Move files to new locations
3. Update all import statements
4. Update route paths if needed
5. Remove old files
6. Test all routes

