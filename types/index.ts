export interface Destination {
  id: string;
  name: string;
  properties: string;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: string;
  reviews: string;
  image: string;
  stars: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: string;
  reviews: string;
  image: string;
  stars: string;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export interface Listing {
  id: number;
  name: string;
  classification: string;
  mapUrl: string;
  rating?: number;
  image: string;
  roomTypes: string[];
  checkIn: string;
  checkOut: string;
  price?: number; // optional because your response me nahi tha
  adults?: number;
  nights?: number;
  amenities: string[];
}



interface PropertyRoom {
  propertyroomid: number;
  roomtypeid:number;
  roomname: string;
  roomcount: number;
  price: string;
  available: boolean;
  pic1: string | null;
  pic2: string | null; 
  roomtypename: string;
}


export interface PropertyDetail {
  propertyid: number;
  propertytitle: string;
  propertysubtitle: string;
  canadian_province_name: string;
  canadian_city_name: string;
  postalcode: string;
  propertyclassificationname: string;
  checkintime: string;
  checkouttime: string;
  propertymaplink: string;
  photo1_featured: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
  houserules: string;
  propertyamenities: string[];
  propertysafetyfeatures: string[];
  propertysharedspaces: string[];
  propertyamenitiesicons: string[]; // filhaal null daloo
  PropertyRoom: PropertyRoom[];
  rating?: number;  //filhaal null jae ga

}
