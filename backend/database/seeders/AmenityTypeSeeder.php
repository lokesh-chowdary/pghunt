<?php
// database/seeders/AmenityTypeSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AmenityTypeSeeder extends Seeder
{
    public function run()
    {
        $amenities = [
            ['amenity_id' => 'wifi', 'name' => 'WiFi', 'icon' => '📶'],
            ['amenity_id' => 'food', 'name' => 'Food', 'icon' => '🍽️'],
            ['amenity_id' => 'ac', 'name' => 'AC', 'icon' => '❄️'],
            ['amenity_id' => 'laundry', 'name' => 'Laundry', 'icon' => '🧺'],
            ['amenity_id' => 'power_backup', 'name' => 'Power Backup', 'icon' => '🔋'],
            ['amenity_id' => 'parking', 'name' => 'Parking', 'icon' => '🚗'],
            ['amenity_id' => 'security', 'name' => '24/7 Security', 'icon' => '🛡️'],
            ['amenity_id' => 'gym', 'name' => 'Gym', 'icon' => '🏋️'],
            ['amenity_id' => 'hot_water', 'name' => 'Hot Water', 'icon' => '🚿'],
            ['amenity_id' => 'cleaning', 'name' => 'Room Cleaning', 'icon' => '🧹'],
            ['amenity_id' => 'tv', 'name' => 'TV', 'icon' => '📺'],
            ['amenity_id' => 'fridge', 'name' => 'Refrigerator', 'icon' => '🧊'],
        ];

        DB::table('amenity_types')->insert($amenities);
    }
}