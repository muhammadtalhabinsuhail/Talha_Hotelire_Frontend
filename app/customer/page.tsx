import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { DestinationCard } from "@/components/DestinationCard";
import { HotelCard } from "@/components/HotelCard";
import { PropertyCard } from "@/components/PropertyCard";
import { destinations, popularHotels, uniqueProperties } from "@/lib/data";
import { Mbanner } from "@/components/Mbanner";

//ammar changing 

export default function CustomerHomePage() {
  return (
    <div className="bg-white w-full flex flex-col">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[536px]">
        <Image
          src="/figmaAssets/rectangle-290.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#080808] opacity-50" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-[71px]">
            <h1 className="[text-shadow:4px_4px_4px_#00000040] [font-family:'Poppins',Helvetica] font-normal text-[20px] md:text-[30px] lg:text-[38px] mb-2 md:mb-4">
              <span className="text-white">Your </span>
              <span className="font-bold text-[#febc11]">perfect stay</span>
              <span className="text-white"> is one click away</span>
            </h1>
            <h2 className="[text-shadow:4.45px_4.45px_4.45px_#00000040] [font-family:'Poppins',Helvetica] font-bold text-white text-[28px] md:text-[40px] lg:text-[53.3px]">
              Find Your Dream Luxury Hotel
            </h2>
          </div>

          <SearchBar />
        </div>
      </section>

      {/* Explore Canada */}
      <section className="w-full bg-[#e3fdff] py-12 md:py-16 lg:py-[81px] px-4 md:px-8 lg:px-[203px]">
        <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#59A5B2] text-[22px] md:text-[26px] lg:text-[28px] mb-3">
          Explore Canada
        </h2>
        <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-base md:text-lg lg:text-xl mb-8 md:mb-10 lg:mb-[46px]">
          Most popular and trending destinations
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[7px]">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* Most Popular Hotels */}
      <section className="w-full py-12 md:py-16 lg:py-[82px] px-4 md:px-8 lg:px-[203px]">
        <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#59A5B2] text-[22px] md:text-[26px] lg:text-[28px] mb-3">
          Most Popular Hotels
        </h2>
        <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-base md:text-lg mb-8 md:mb-12 lg:mb-[54px]">
          Embark on your next adventure with confidence
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[7px]">
          {popularHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="w-full bg-[#eaffe6] py-12 md:py-16 lg:py-[102px] px-4 md:px-8 lg:px-[203px]">
        <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#59A5B2] text-[22px] md:text-[26px] lg:text-[28px] mb-3">
          Offers
        </h2>
        <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-base md:text-lg mb-8 md:mb-12 lg:mb-[54px]">
          Promotions, deals and special offers for you
        </p>

        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src="/figmaAssets/yellow-blue-modern-travel-agency-billboard-2.png"
              alt="Travel agency promotion"
              width={377}
              height={98}
              className="w-full md:w-[377px] h-[98px] rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            />
            <Image
              src="/figmaAssets/traveling--banner--landscape----728-x-90-mm--1.png"
              alt="Traveling banner"
              width={815}
              height={99}
              className="w-full md:w-[300px] md:flex-1 h-[99px] rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[756px] h-[110px] bg-[#6b371a] rounded-lg relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
              <div className="absolute top-[28px] left-[20px] md:left-[57px] z-10">
                <h3 className="[font-family:'Poppins',Helvetica] font-bold text-white text-[18px] md:text-[22px] leading-[25px] md:leading-[30.5px] mb-2">
                  Live the dream in a holiday home
                </h3>
                <p className="text-[#e2a24b] text-xs md:text-sm leading-[16px] md:leading-[19.4px] [font-family:'Poppins',Helvetica]">
                  Choose form house, villas, chalets and more...!
                </p>
              </div>
              <Image
                src="/figmaAssets/pngwing-com-1.png"
                alt=""
                width={165}
                height={110}
                className="absolute top-0 right-[20px] md:right-[135px] w-[120px] md:w-[165px] h-[110px] object-cover"
              />
            </div>
            <Image
              src="/figmaAssets/screenshot-2025-09-03-at-6-00-16-am-1.png"
              alt="Special offer"
              width={436}
              height={110}
              className="w-full md:w-[436px] h-[110px] rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Unique Properties */}
      <section className="w-full py-12 md:py-16 lg:py-[57px] px-4 md:px-8 lg:px-[203px]">
        <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#59A5B2] text-[22px] md:text-[26px] lg:text-[28px] mb-3">
          Stay at our top unique properties
        </h2>
        <p className="[font-family:'Poppins',Helvetica] font-normal text-black text-base md:text-lg lg:text-xl mb-8 md:mb-12 lg:mb-[54px]">
          From castles and villas to boats and igloos we&apos;ve got it all
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[7px]">
          {uniqueProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* <Button
          className="w-10 h-10 bg-white rounded-[20px] shadow-[0px_4px_4px_#00000040] p-0 mt-16 md:mt-24 lg:mt-[133px] ml-auto flex transition-all duration-200 hover:bg-white/90 hover:scale-110 hover:shadow-xl"
          aria-label="Next properties"
        >
          <Image
            src="/figmaAssets/image-19.png"
            alt=""
            width={19}
            height={20}
          />
        </Button> */}
      </section>

<Mbanner />
      <Footer />
    </div>
  );
}