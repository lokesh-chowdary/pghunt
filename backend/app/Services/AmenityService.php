<?php

namespace App\Services;

use App\Models\AmenityType;

class AmenityService
{
    // Map of string amenity IDs to their corresponding database IDs
    private static $amenityMap = [
        'wifi' => 1,
        'food' => 2,
        'ac' => 3,
        'laundry' => 4,
        'power_backup' => 5,
        'parking' => 6,
        'security' => 7,
        'gym' => 8,
        'hot_water' => 9,
        'cleaning' => 10,
        'tv' => 11,
        'fridge' => 12
    ];
    
    /**
     * Convert a frontend amenity ID to a database ID
     *
     * @param mixed $amenityId
     * @return int
     */
    public static function getAmenityTypeId($amenityId)
    {
        // If it's already numeric, return it as an integer
        if (is_numeric($amenityId)) {
            return (int)$amenityId;
        }
        
        // If it's a string and exists in our map, return the mapped ID
        if (is_string($amenityId) && isset(self::$amenityMap[$amenityId])) {
            return self::$amenityMap[$amenityId];
        }
        
        // Log the unmapped amenity
        \Log::warning("Unmapped amenity: {$amenityId}");
        
        // For unknown string amenities, look up or create
        $amenityType = AmenityType::firstOrCreate(
            ['name' => ucfirst($amenityId)],
            ['name' => ucfirst($amenityId), 'icon' => '✓']
        );
        
        return $amenityType->id;
    }
}