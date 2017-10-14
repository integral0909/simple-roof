GOOGLE_MAPS_API = ENV['GOOGLE_MAPS_API'].freeze
Geocoder.configure(api_key: GOOGLE_MAPS_API)
