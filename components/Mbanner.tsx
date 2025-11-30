import Image from "next/image";
import { Button } from "@/components/ui/button";


export function Mbanner() {
  return (
    <section className="w-full bg-[#e3fdff] py-12 md:py-16 lg:py-[50px] relative overflow-hidden">
           <div className="absolute top-[-45px] left-[210px] w-[244px] h-[498px] -rotate-90 bg-[linear-gradient(180deg,rgba(255,255,255,0)_56%,rgba(254,188,17,1)_89%)] hidden lg:block" />
   
           <Image
             src="/figmaAssets/hotel-owner-1.png"
             alt="Hotel owner"
             width={581}
             height={326}
             className="absolute top-0 left-0 w-full md:w-[581px] h-[200px] md:h-[326px] object-cover opacity-50 md:opacity-100"
           />
   
           <div className="relative z-10 px-4 md:px-8 lg:ml-[622px] lg:mr-[203px] pt-[180px] md:pt-0">
             <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#59A5B2] text-[22px] md:text-[26px] mb-6 md:mb-[37px]">
               Grow Your Business with Hotelire
             </h2>
             <p className="[font-family:'Poppins',Helvetica] font-medium text-black text-base md:text-lg mb-6 md:mb-[32px] max-w-[601px]">
               Join Hotelire and showcase your property to travelers looking for
               their next memorable stay.
             </p>
             <Button className="w-full md:w-[500px] lg:w-[612px] h-[55px] md:h-[68px] bg-[#59A5B2] rounded-[10px] [font-family:'Inter',Helvetica] font-bold text-white text-lg md:text-xl transition-all duration-200 hover:bg-[#4c7e87] hover:scale-[1.02] hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
               SIGN UP AS PROPERTY OWNER
             </Button>
           </div>
         </section>
  );
}