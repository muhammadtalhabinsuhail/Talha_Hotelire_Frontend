"use client";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { SearchBar } from "@/components/SearchBar";
import { Footer } from "@/components/Footer";
import { Heart } from "lucide-react";


// Destination data structure
interface DestinationSection {
  id: string;
  city: string;
  province: string;
  description: string;
  hotels: Array<{
    id: string;
    name: string;
    location: string;
    type: string;
    rating: string;
    reviews: string;
    image: string;
  }>;
}


function SimpleHotelCard({ hotel }: { hotel: any }) {
  return (
    <div className="group">
      <a
        href={`/customer/hotel/${hotel.id}`}
        className="block overflow-hidden border border-gray-100 rounded-lg hover:shadow-[0px_8px_24px_rgba(89,165,178,0.15)] transition-all duration-300"
        data-testid={`link-hotel-${hotel.id}`}
      >
        <div className="p-0 flex flex-col h-full">
          <div className="relative w-full h-[250px] md:h-[280px] lg:h-[308px] rounded-[5px] overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label="Add to wishlist"
              data-testid={`button-wishlist-${hotel.id}`}
            >
              <Heart className="w-4 h-4 text-[#59A5B2] transition-colors duration-200 hover:fill-[#59A5B2]" />
            </button>
          </div>
          <div className="mt-4 flex-1 flex flex-col px-3 pb-3">
            <p
              className="font-medium text-[#5f5f5f] text-sm md:text-base mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {hotel.type}
            </p>
            <h3
              className="font-bold text-[#59A5B2] text-sm md:text-base mb-1 min-h-[40px] md:min-h-[48px] transition-colors duration-200 group-hover:text-[#4a8a95]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {hotel.name}
            </h3>
            <p
              className="font-medium text-black text-sm md:text-base mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {hotel.location}
            </p>

            <div className="flex items-start gap-4 mt-auto">
              <div className="w-[55px] h-14 bg-[#59A5B2] rounded-[5px] flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[#4a8a95]">
                <span
                  className="font-bold text-white text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {hotel.rating}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill={i < Math.floor(parseFloat(hotel.rating)) ? "#FEBC11" : "#D9D9D9"}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-black text-xs"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {hotel.reviews}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function ExploreCanadaPage() {
  // Destination sections data
  const destinations: DestinationSection[] = [
    {
      id: "toronto",
      city: "Toronto",
      province: "Ontario",
      description: "Canada's largest city, bursting with culture, cuisine, and iconic landmarks like the CN Tower and Royal Ontario Museum.",
      hotels: [
        {
          id: "toronto-1",
          name: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          type: "Luxury Hotel",
          rating: "4.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-4.png",
        },
        {
          id: "toronto-2",
          name: "Hillcrest Motel",
          location: "Westminster Borough, London",
          type: "Lakeside Chalet",
          rating: "3.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-315.png",
        },
        {
          id: "toronto-3",
          name: "Sterling Rentals",
          location: "Westminster Borough, London",
          type: "Penthouse",
          rating: "4.0",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-316.png",
        },
        {
          id: "toronto-4",
          name: "Liberty Suites",
          location: "Westminster Borough, London",
          type: "Resort",
          rating: "3.1",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-6.png",
        },
      ],
    },
    {
      id: "vancouver",
      city: "Vancouver",
      province: "British Columbia",
      description: "A stunning coastal gem surrounded by mountains and ocean, perfect for both city lovers and nature seekers.",
      hotels: [
        {
          id: "vancouver-1",
          name: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          type: "Luxury Hotel",
          rating: "4.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-4.png",
        },
        {
          id: "vancouver-2",
          name: "Hillcrest Motel",
          location: "Westminster Borough, London",
          type: "Lakeside Chalet",
          rating: "3.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-315.png",
        },
        {
          id: "vancouver-3",
          name: "Sterling Rentals",
          location: "Westminster Borough, London",
          type: "Penthouse",
          rating: "4.0",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-316.png",
        },
        {
          id: "vancouver-4",
          name: "Liberty Suites",
          location: "Westminster Borough, London",
          type: "Resort",
          rating: "3.1",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-6.png",
        },
      ],
    },
    {
      id: "montreal",
      city: "Montreal",
      province: "Quebec",
      description: "A European-inspired city full of charm, festivals, and world-class dining experiences.",
      hotels: [
        {
          id: "montreal-1",
          name: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          type: "Luxury Hotel",
          rating: "4.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-4.png",
        },
        {
          id: "montreal-2",
          name: "Hillcrest Motel",
          location: "Westminster Borough, London",
          type: "Lakeside Chalet",
          rating: "3.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-315.png",
        },
        {
          id: "montreal-3",
          name: "Sterling Rentals",
          location: "Westminster Borough, London",
          type: "Penthouse",
          rating: "4.0",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-316.png",
        },
        {
          id: "montreal-4",
          name: "Liberty Suites",
          location: "Westminster Borough, London",
          type: "Resort",
          rating: "3.1",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-6.png",
        },
      ],
    },
    {
      id: "banff",
      city: "Banff",
      province: "Alberta",
      description: "Nestled in the Rockies, famous for turquoise lakes, mountain views, and luxury resorts.",
      hotels: [
        {
          id: "banff-1",
          name: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          type: "Luxury Hotel",
          rating: "4.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-4.png",
        },
        {
          id: "banff-2",
          name: "Hillcrest Motel",
          location: "Westminster Borough, London",
          type: "Lakeside Chalet",
          rating: "3.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-315.png",
        },
        {
          id: "banff-3",
          name: "Sterling Rentals",
          location: "Westminster Borough, London",
          type: "Penthouse",
          rating: "4.0",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-316.png",
        },
        {
          id: "banff-4",
          name: "Liberty Suites",
          location: "Westminster Borough, London",
          type: "Resort",
          rating: "3.1",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-6.png",
        },
      ],
    },
    {
      id: "niagara",
      city: "Niagara Falls",
      province: "Ontario",
      description: "The world-famous waterfall destination, known for romance, adventure, and unforgettable sights.",
      hotels: [
        {
          id: "niagara-1",
          name: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          type: "Luxury Hotel",
          rating: "4.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-4.png",
        },
        {
          id: "niagara-2",
          name: "Hillcrest Motel",
          location: "Westminster Borough, London",
          type: "Lakeside Chalet",
          rating: "3.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-315.png",
        },
        {
          id: "niagara-3",
          name: "Sterling Rentals",
          location: "Westminster Borough, London",
          type: "Penthouse",
          rating: "4.0",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-316.png",
        },
        {
          id: "niagara-4",
          name: "Liberty Suites",
          location: "Westminster Borough, London",
          type: "Resort",
          rating: "3.1",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-6.png",
        },
      ],
    },
    {
      id: "quebec-city",
      city: "Quebec City",
      province: "Quebec",
      description: "A UNESCO-listed historic city that blends old-world beauty with modern comfort and hospitality.",
      hotels: [
        {
          id: "quebec-1",
          name: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          type: "Luxury Hotel",
          rating: "4.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-4.png",
        },
        {
          id: "quebec-2",
          name: "Hillcrest Motel",
          location: "Westminster Borough, London",
          type: "Lakeside Chalet",
          rating: "3.7",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-315.png",
        },
        {
          id: "quebec-3",
          name: "Sterling Rentals",
          location: "Westminster Borough, London",
          type: "Penthouse",
          rating: "4.0",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-316.png",
        },
        {
          id: "quebec-4",
          name: "Liberty Suites",
          location: "Westminster Borough, London",
          type: "Resort",
          rating: "3.1",
          reviews: "3014 reviews",
          image: "/figmaAssets/rectangle-149-6.png",
        },
      ],
    },
  ];

  return (
    <div className="bg-white w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />
   {/* Hero Section */}
      <section className="relative w-full h-[180px] md:h-[200px] lg:h-[236px]">
        <Image
          src="/figmaAssets/rectangle-290.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#080808] opacity-50" />
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-4">
          <div className="text-center mb-2 md:mb-8 lg:mb-[4px]">
            <h2 className="[text-shadow:4.45px_4.45px_4.45px_#00000040] [font-family:'Poppins',Helvetica] font-bold text-[#febc11] text-[28px] md:text-[40px] lg:text-[53.3px]">
              Explore Canada
            </h2>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Header */}
        <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[203px] bg-white">
          <p
            className=" text-[#59A5B2] font-bold text-base md:text-lg lg:text-xl max-w-4x2"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="text-page-subtitle"
          >
            From vibrant city lights to serene mountain escapes; discover where Canadians and travelers from around the world love to stay. Find your perfect getaway in these top destinations.
          </p>
        </section>

        {/* Destination Sections */}
        {destinations.map((destination, index) => (
          <section
            key={destination.id}
            className={`w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[203px] ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#f7f9fb]'
            }`}
            data-testid={`section-destination-${destination.id}`}
          >
            {/* City Header */}
            <div className="mb-8 md:mb-10 lg:mb-12">
              <h2
                className="font-bold text-[#59A5B2] text-[22px] md:text-[26px] lg:text-[28px] mb-3"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                data-testid={`text-city-${destination.id}`}
              >
                {destination.city}, {destination.province}
              </h2>
              <p
                className="font-normal text-[#2e2e2e] text-base md:text-lg max-w-4xl"
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid={`text-description-${destination.id}`}
              >
                {destination.description}
              </p>
            </div>

            {/* Hotel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {destination.hotels.map((hotel) => (
                <SimpleHotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {/* Separator Line (except for last section) */}
            {index < destinations.length - 1 && (
              <div className="mt-12 md:mt-16 lg:mt-20 border-b border-gray-200" />
            )}
          </section>
        ))}

        {/* Business CTA Section */}
        <section className="w-full bg-[#e3fdff] py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute top-[-45px] left-[210px] w-[244px] h-[498px] -rotate-90 bg-[linear-gradient(180deg,rgba(255,255,255,0)_56%,rgba(89,165,178,0.3)_89%)] hidden lg:block" />

          <img
            src="/figmaAssets/hotel-owner-1.png"
            alt="Hotel owner"
            className="absolute top-0 left-0 w-full md:w-[581px] h-[200px] md:h-[326px] object-cover opacity-50 md:opacity-100"
          />

          <div className="relative z-10 px-4 md:px-8 lg:ml-[622px] lg:mr-[203px] pt-[180px] md:pt-0">
            <h2
              className="font-bold text-[#59A5B2] text-[22px] md:text-[26px] mb-6 md:mb-[37px]"
              style={{ fontFamily: 'Inter, sans-serif' }}
              data-testid="text-cta-title"
            >
              Grow Your Business with Hotelire
            </h2>
            <p
              className="font-medium text-black text-base md:text-lg mb-6 md:mb-[32px] max-w-[601px]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              data-testid="text-cta-description"
            >
              Join Hotelire and showcase your property to travelers looking for their next memorable stay.
            </p>
            <button
              className="w-full md:w-[500px] lg:w-[612px] h-[55px] md:h-[68px] bg-[#59A5B2] rounded-[10px] font-bold text-white text-lg md:text-xl transition-all duration-200 hover:bg-[#4a8a95] hover:scale-[1.02] hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
              data-testid="button-signup-owner"
            >
              SIGN UP AS PROPERTY OWNER
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
