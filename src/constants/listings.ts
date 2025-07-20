/**
 * Constants for listings functionality
 */
export const LISTINGS_CONSTANTS = {
  ROUTES: {
    ADD_LISTING: '/add-listing',
    EDIT_LISTING: '/edit-listing',
    LOGIN: '/login',
    YOUR_LISTINGS: '/your-listings',
    PG_DETAILS: '/pg',
  },
  MESSAGES: {
    SESSION_EXPIRED: 'Session expired. Please log in again',
    NO_LISTINGS_TITLE: 'No listings yet',
    NO_LISTINGS_DESCRIPTION: 'Get started by creating a new PG listing.',
    ADD_FIRST_LISTING: 'Add Your First Listing',
    ADD_NEW_LISTING: 'Add New Listing',
    ERROR_TITLE: 'Error',
  },
} as const;