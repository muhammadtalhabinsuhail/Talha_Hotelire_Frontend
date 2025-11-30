import { Destination, Hotel, Property, Listing } from "@/types";

// This data will be replaced with API calls in production
// For now, keeping as reference data that matches the design

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Niagara Falls",
    properties: "390 properties",
    image: "/figmaAssets/rectangle-305.png",
  },
  {
    id: "2",
    name: "Niagara on the Lake",
    properties: "124 properties",
    image: "/figmaAssets/rectangle-306.png",
  },
  {
    id: "3",
    name: "Montreal",
    properties: "1390 properties",
    image: "/figmaAssets/rectangle-307.png",
  },
  {
    id: "4",
    name: "Quebec City",
    properties: "554 properties",
    image: "/figmaAssets/rectangle-308.png",
  },
];

export const popularHotels: Hotel[] = [
  {
    id: "1",
    name: "The Montcalm At Brewery London City",
    location: "Westminster Borough , London",
    type: "Luxury Hotel",
    rating: "4.7",
    reviews: "3014 reviews",
    image: "/figmaAssets/rectangle-149-4.png",
    stars: "/figmaAssets/group-316-1.png",
  },
  {
    id: "2",
    name: "Hillcrest Motel",
    location: "Westminster Borough , London",
    type: "Lakeside Chalet",
    rating: "3.7",
    reviews: "3014 reviews",
    image: "/figmaAssets/rectangle-315.png",
    stars: "/figmaAssets/group-316.png",
  },
  {
    id: "3",
    name: "Sterling Rentals",
    location: "Westminster Borough , London",
    type: "Penthouse",
    rating: "4.0",
    reviews: "3014 reviews",
    image: "/figmaAssets/rectangle-316.png",
    stars: "/figmaAssets/group-316-2.png",
  },
  {
    id: "4",
    name: "Liberty Suites",
    location: "Westminster Borough , London",
    type: "Resort",
    rating: "3.1",
    reviews: "3014 reviews",
    image: "/figmaAssets/rectangle-149-6.png",
    stars: "/figmaAssets/group-316-3.png",
  },
];

export const uniqueProperties: Property[] = [
  {
    id: "1",
    name: "The Montcalm At Brewery London City",
    location: "Westminster Borough , Canada",
    type: "Luxury Hotel",
    rating: "4.7",
    reviews: "3014 reviews",
    image: "/figmaAssets/rectangle-149.png",
    stars: "/figmaAssets/group-316-4.png",
  },
  {
    id: "2",
    name: "Cannery Lofts Niagara",
    location: "Westminster Borough , Canada",
    type: "Lakeside Chalet",
    rating: "3.7",
    reviews: "3014 reviews",
    image: "/figmaAssets/rectangle-149-1.png",
    stars: "/figmaAssets/group-316-5.png",
  },
  {
    id: "3",
    name: "Country Inn & Suites by Radisson, Niagara Falls",
    location: "Westminster Borough , Canada",
    type: "Penthouse",
    rating: "4.0",
    reviews: "3014 reviews",
    image: "/figmaAssets/rectangle-149-2.png",
    stars: "/figmaAssets/group-316-6.png",
  },
  {
    id: "4",
    name: "Sheraton Fallsview Hotel",
    location: "Westminster Borough , Canada",
    type: "Hotel",
    rating: "3.1",
    reviews: "3014 reviews",
    image: "/figmaAssets/rectangle-149-3.png",
    stars: "/figmaAssets/group-316-7.png",
  },
];

export const discoverLinks = [
  { id: "1", label: "About Us", href: "/about" },
  { id: "2", label: "Contact Us", href: "/contact" },
  { id: "3", label: "Faqs", href: "/faqs" },
  { id: "4", label: "Privacy Policy", href: "/privacy" },
  { id: "5", label: "Disclaimer", href: "/disclaimer" },
];

export const resourceLinks = [
  { id: "1", label: "Blog title 1", href: "/blog/1" },
  { id: "2", label: "Blog title 2", href: "/blog/2" },
  { id: "3", label: "Blog title 3", href: "/blog/3" },
  { id: "4", label: "Blog title 4", href: "/blog/4" },
];

export const listings: Listing[] = [
  {
    id: "1",
    name: "The Montcalm At Brewery London City",
    location: "Niagara Falls",
    type: "Hotel",
    rating: "4.0",
    reviews: "28 reviews",
    image: "/figmaAssets/rectangle-149-4.png",
    stars: "/figmaAssets/group-316-1.png",
    price: "CAD 280",
    amenities: ["Breakfast Included", "Indoor Pool"],
    description: "Just a 10-minute walk from Horseshoe Falls, this Days Inn by Wyndham Niagara Falls Near The Falls features an indoor pool and hot tub.",
  },
  {
    id: "2",
    name: "Liberty Suites",
    location: "Thornhill",
    type: "Hotel",
    rating: "3.9",
    reviews: "28 reviews",
    image: "/figmaAssets/rectangle-149-6.png",
    stars: "/figmaAssets/group-316-3.png",
    price: "CAD 250",
    amenities: ["Breakfast Included", "Indoor Pool"],
    description: "Liberty Suites is located in Thornhill, Ontario. Free WiFi access is available throughout. Each accommodation is modernly furnished.",
  },
  {
    id: "3",
    name: "Residence & Conference Centre - Windsor",
    location: "Windsor",
    type: "Resort",
    rating: "3.5",
    reviews: "28 reviews",
    image: "/figmaAssets/rectangle-315.png",
    stars: "/figmaAssets/group-316.png",
    price: "CAD 290",
    amenities: ["Breakfast Included", "Indoor Pool"],
    description: "Set within 12 km of TCF Center and 11 km of Gm World, Residence & Conference Centre - Windsor offers rooms with air conditioning...",
  },
  {
    id: "4",
    name: "Days Inn by Wyndham Niagara Falls",
    location: "Fallsview, Niagara Falls (Fallsview)",
    type: "Motel",
    rating: "4.0",
    reviews: "28 reviews",
    image: "/figmaAssets/rectangle-316.png",
    stars: "/figmaAssets/group-316-2.png",
    price: "CAD 250",
    amenities: ["Breakfast Included", "Indoor Pool"],
    description: "Just a 10-minute walk from Horseshoe Falls, this Days Inn by Wyndham Niagara Falls",
  },
  {
    id: "5",
    name: "Inn at the Falls",
    location: "Bracebridge",
    type: "Hotel",
    rating: "2.8",
    reviews: "28 reviews",
    image: "/figmaAssets/rectangle-149.png",
    stars: "/figmaAssets/group-316-4.png",
    price: "CAD 200",
    amenities: ["Breakfast Included", "Indoor Pool"],
    description: "Situated in Bracebridge, 20 km from Lake Muskoka, Inn at the Falls features accommodation with a garden, free private parking, a shared lounge and a terrace.",
  },
  {
    id: "6",
    name: "Mount Alverno Luxury Resorts",
    location: "Caledon",
    type: "Resort",
    rating: "4.0",
    reviews: "28 reviews",
    image: "/figmaAssets/rectangle-149-1.png",
    stars: "/figmaAssets/group-316-5.png",
    price: "CAD 250",
    amenities: ["Breakfast Included", "Indoor Pool"],
    description: "Situated in Caledon, 44 km from Mississauga Convention Centre, Mount Alverno Luxury Resorts features accommodation with a terrace, free private parking and a bar.",
  },
];

export interface Property {
  featured: string;
  id: string
  image: string
  isSponsored: boolean
  tags: string[]
  title: string
  address: string
  visitors: number
  downPayment: number
  installmentPrice: number
  installmentsCount: number
  firstDuePayment: string
  price: number
  paymentsCount: number
}

export const properties: Property[] = [
  {
    id: "1",
    image: "/luxury-villa-exterior.jpg",
    isSponsored: true,
    tags: ["For Sale", "For Rent", "Open House", "Villa", "Near Park", "Downtown"],
    title: "3 Bed Room Commercial Villa in Avenfield London",
    address: "Avenfield, London",
    visitors: 20,
    downPayment: 3200,
    installmentPrice: 650,
    installmentsCount: 36,
    firstDuePayment: "14-12-2023",
    price: 2450,
    paymentsCount: 4,
  },
  {
    id: "2",
    image: "/modern-studio-apartment.jpg",
    isSponsored: true,
    tags: ["For Sale", "For Rent", "Open House", "Villa", "Near Park", "Downtown"],
    title: "Studio in the Heart of Downtown Near Market",
    address: "Avenfield, London",
    visitors: 20,
    downPayment: 3200,
    installmentPrice: 650,
    installmentsCount: 36,
    firstDuePayment: "14-12-2023",
    price: 4750,
    paymentsCount: 4,
  },
  {
    id: "3",
    image: "/suburban-house-autumn.jpg",
    isSponsored: true,
    tags: ["For Sale", "For Rent", "Open House", "Villa", "Near Markt", "4 Car Parking"],
    title: "The Sphere, Hallsville Road, Canning Town E16",
    address: "Avenfield, London",
    visitors: 20,
    downPayment: 3200,
    installmentPrice: 650,
    installmentsCount: 36,
    firstDuePayment: "14-12-2023",
    price: 6230,
    paymentsCount: 4,
  },
  {
    id: "4",
    image: "/large-family-home-pool.jpg",
    isSponsored: true,
    tags: ["For Sale", "For Rent", "Open House", "Villa", "Swimming Pool"],
    title: "Adana Building, Conington Road, London, SE13",
    address: "Avenfield, London",
    visitors: 20,
    downPayment: 3200,
    installmentPrice: 650,
    installmentsCount: 36,
    firstDuePayment: "14-12-2023",
    price: 10097,
    paymentsCount: 4,
  },
]