<?php

// This is a temporary helper to fix the amenity ID issue
// Run this script via tinker: php artisan tinker AmenityFixer.php

namespace App;

use App\Models\AmenityType;

class AmenityFixer
{
    public static function run()
    {
        // Create the standard amenity types if they don't exist
        $amenities = [
            'wifi' => ['name' => 'WiFi', 'icon' => '📶'],
            'food' => ['name' => 'Food', 'icon' => '🍽️'],
            'ac' => ['name' => 'AC', 'icon' => '❄️'],
            'laundry' => ['name' => 'Laundry', 'icon' => '🧺'],
            'power_backup' => ['name' => 'Power Backup', 'icon' => '🔋'],
            'parking' => ['name' => 'Parking', 'icon' => '🚗'],
            'security' => ['name' => '24/7 Security', 'icon' => '🛡️'],
            'gym' => ['name' => 'Gym', 'icon' => '🏋️'],
            'hot_water' => ['name' => 'Hot Water', 'icon' => '🚿'],
            'cleaning' => ['name' => 'Room Cleaning', 'icon' => '🧹'],
            'tv' => ['name' => 'TV', 'icon' => '📺'],
            'fridge' => ['name' => 'Refrigerator', 'icon' => '🧊']
        ];
        
        foreach ($amenities as $key => $details) {
            AmenityType::firstOrCreate(
                ['name' => $details['name']],
                ['name' => $details['name'], 'icon' => $details['icon']]
            );
        }
        
        // Now let's fix any existing amenities with string IDs
        $amenityModel = new \App\Models\Amenity();
        $stringAmenities = $amenityModel->whereRaw('amenity_type_id REGEXP "^[a-zA-Z]"')->get();
        
        echo "Found " . count($stringAmenities) . " amenities with string IDs\n";
        
        foreach ($stringAmenities as $amenity) {
            $stringId = $amenity->amenity_type_id;
            
            // Find a matching amenity type
            $amenityType = AmenityType::where('name', 'like', '%' . $stringId . '%')->first();
            
            if (!$amenityType) {
                // Create a new type
                $amenityType = AmenityType::create([
                    'name' => ucfirst($stringId),
                    'icon' => '✓'
                ]);
                
                echo "Created new amenity type for: " . $stringId . "\n";
            }
            
            // Update the amenity with the numeric ID
            $amenity->amenity_type_id = $amenityType->id;
            $amenity->save();
            
            echo "Fixed amenity ID: " . $stringId . " -> " . $amenityType->id . "\n";
        }
        
        echo "Amenity fix complete!\n";
    }
}

// Uncomment this to run directly:
// AmenityFixer::run();