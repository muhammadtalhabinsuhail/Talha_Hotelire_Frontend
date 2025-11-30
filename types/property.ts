export interface PropertyLocation {
  useProfileAddress: boolean
  province: string
  city: string
  street: string
  postalCode: string
  ownershipDocument?: {
    type: string
    file: File | null
    preview: string
  }
}

export interface PropertyDetails {
  classification: string
  title: string
  subtitle: string
  propertyName: string
  googleMapLink: string
  photos: {
    featured: File | null
    photo2: File | null
    photo3: File | null
    photo4: File | null
    photo5: File | null
  }
  photoPreviews: {
    featured: string
    photo2: string
    photo3: string
    photo4: string
    photo5: string
  }
}

export interface Room {
  id: string
  name: string
  roomtypeid: number | string // Store room type ID from database
  count: number
  price: string
  availabilityStart: string
  availabilityEnd: string
  image1: File | null
  image1Preview: string
  image2: File | null
  image2Preview: string
}

interface IAmenities {
  amenitiesid: number
  amenitiesname: string | null
}

interface ISafetyFeatures {
  safetyfeaturesid: number
  safetyfeaturesname: string | null
}

interface ISharedSpaces {
  sharedspacesid: number
  sharedspacesname: string | null
}

export interface PropertyAmenities {
  available: IAmenities[]
  featured: IAmenities[]
  safety: ISafetyFeatures[]
  sharedSpaces: ISharedSpaces[]
  checkInTime: string
  checkOutTime: string
  rules: string
}

export interface PropertySubmission {
  location: PropertyLocation
  details: PropertyDetails
  rooms: Room[]
  amenities: PropertyAmenities
}

export const PROPERTY_CLASSIFICATIONS = [
  "Apartment",
  "Condo",
  "Hotel",
  "Basement",
  "House",
  "Villa",
  "Cottage",
  "Cabin",
  "Other",
]

export const ROOM_TYPES = [
  "1 Double/Queen Room (1 Queen Bed)",
  "1 King Room (1 King Bed)",
  "Quad Room (2 large double beds)",
]

export const AVAILABLE_AMENITIES = [
  "Wi-Fi",
  "Free Parking",
  "Kitchen",
  "Pool",
  "Gym/Fitness Center",
  "Air Conditioning",
  "Heating",
  "Washer",
  "Dryer",
  "TV",
  "Hot Tub",
  "BBQ Grill",
  "Pet Friendly",
  "Wheelchair Accessible",
  "Elevator",
  "Breakfast Included",
]

export const SAFETY_FEATURES = [
  "Smoke detectors",
  "Carbon monoxide detectors",
  "Fire extinguisher",
  "First aid kit",
  "Surveillance camera",
  "Keyless entry",
  "Security guard",
  "24/7 front desk",
]

export const SHARED_SPACES = ["Kitchen", "Balcony", "Living Room", "Rooftop", "Patio", "Garden", "Terrace"]

export const OWNERSHIP_DOCUMENT_TYPES = ["Gas Bill", "Electricity Bill", "Internet Bill", "Bank Statement", "Other"]
