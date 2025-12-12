import YourListingsDirect from './components/pages/YourListingsDirect';
import UserProfileDirect from './components/pages/UserProfileDirect';

// This file provides direct access to the alternate components
// that use the simplified direct API endpoints

export const DirectComponents = {
  YourListingsDirect,
  UserProfileDirect
};

// How to use these components:
// 
// 1. In your main application file (e.g., App.tsx), import like this:
//    import { DirectComponents } from './DirectComponents';
// 
// 2. Then use the direct components in your routes:
//    <Route path="/your-listings" element={<DirectComponents.YourListingsDirect />} />
//    <Route path="/profile" element={<DirectComponents.UserProfileDirect />} />
//
// 3. Or you can temporarily replace the original components in your existing routes

export default DirectComponents;