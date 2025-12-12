import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PG } from '../../types';
import { useUserListings } from '../../hooks/useUserListings';
import { LISTINGS_CONSTANTS } from '../../constants/listings';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import PGCard from './PGCard';
import { Plus, Edit } from 'lucide-react';

/**
 * Component for displaying user's PG listings
 * Uses custom hooks for data fetching and state management
 */
const YourListingsDirect: React.FC = () => {
  const navigate = useNavigate();
  const { listings, loading, error, refetch } = useUserListings();

  const handleAddNew = (): void => {
    navigate(LISTINGS_CONSTANTS.ROUTES.ADD_LISTING);
  };

  const handleEditListing = (id: number): void => {
    navigate(`${LISTINGS_CONSTANTS.ROUTES.EDIT_LISTING}/${id}`);
  };

  const handleViewListing = (listing: PG): void => {
    navigate(`${LISTINGS_CONSTANTS.ROUTES.PG_DETAILS}/${listing.id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" text="Loading your listings..." className="py-16" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ListingsHeader onAddNew={handleAddNew} />
      
      {error && (
        <ErrorMessage
          title={LISTINGS_CONSTANTS.MESSAGES.ERROR_TITLE}
          message={error}
          onRetry={refetch}
          className="mb-6"
        />
      )}

      {listings.length === 0 ? (
        <EmptyState
          title={LISTINGS_CONSTANTS.MESSAGES.NO_LISTINGS_TITLE}
          description={LISTINGS_CONSTANTS.MESSAGES.NO_LISTINGS_DESCRIPTION}
          actionLabel={LISTINGS_CONSTANTS.MESSAGES.ADD_FIRST_LISTING}
          onAction={handleAddNew}
        />
      ) : (
        <ListingsGrid
          listings={listings}
          onEdit={handleEditListing}
          onView={handleViewListing}
        />
      )}
    </div>
  );
};

/**
 * Header component with title and add button
 */
interface ListingsHeaderProps {
  onAddNew: () => void;
}

const ListingsHeader: React.FC<ListingsHeaderProps> = ({ onAddNew }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-gray-800">Your PG Listings</h1>
    <button
      onClick={onAddNew}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Add new listing"
    >
      <Plus className="w-5 h-5 mr-2" />
      {LISTINGS_CONSTANTS.MESSAGES.ADD_NEW_LISTING}
    </button>
  </div>
);

/**
 * Grid component for displaying listings
 */
interface ListingsGridProps {
  listings: PG[];
  onEdit: (id: number) => void;
  onView: (listing: PG) => void;
}

const ListingsGrid: React.FC<ListingsGridProps> = ({ listings, onEdit, onView }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {listings.map((listing) => (
      <ListingCard
        key={listing.id}
        listing={listing}
        onEdit={() => onEdit(listing.id)}
        onView={() => onView(listing)}
      />
    ))}
  </div>
);

/**
 * Individual listing card with edit functionality
 */
interface ListingCardProps {
  listing: PG;
  onEdit: () => void;
  onView: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onEdit, onView }) => (
  <div className="relative group">
    <PGCard pg={listing} onClick={onView} />
    <button
      onClick={onEdit}
      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      title="Edit Listing"
      aria-label={`Edit ${listing.pg_name || listing.name}`}
    >
      <Edit className="w-5 h-5 text-gray-600" />
    </button>
  </div>
);

export default YourListingsDirect;