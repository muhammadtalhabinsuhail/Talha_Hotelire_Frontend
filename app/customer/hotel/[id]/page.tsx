import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import HotelDetailContent from "./HotelDetailContent";
import { Mbanner } from "@/components/Mbanner";



export default async function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  
  return (
    <div className="bg-white w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />
      <HotelDetailContent id={id} />
      <Mbanner />
      <Footer />
    </div>
  );
}
