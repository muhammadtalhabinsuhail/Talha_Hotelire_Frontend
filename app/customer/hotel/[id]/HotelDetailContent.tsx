"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  ChevronDown,
  CalendarIcon,
  Users,
  MapPin,
  Minus,
  Plus,
  Star,
} from "lucide-react";

import * as Icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faWifi,
  faSquareParking,
  faUtensils,
  faSwimmingPool,
  faDumbbell,
  faSnowflake,
  faFire,
  faShirt,
  faTv,
  faHotTubPerson,
  faFireBurner,
  faPaw,
  faWheelchair,
  faElevator,
  faMugHot,
  faBell,
  faFireExtinguisher,
  faBriefcaseMedical,
  faVideo,
  faKey,
  faShieldHalved,
  faClock,
  faCouch,
  faMountainSun,
  faTree,
  faHotel,
  faSearch,
  faUserGroup,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { PropertyDetail } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface CartItem {
  propertyroomid: number;
  roomname: string;
  roomtypename: string;
  quantity: number;
  pricePerNight: number;
}

interface Amenities {
  label: string;
  icon: string;
}

interface SafetyFeatures {
  label: string;
  icon: string;
}

interface SharedSpaces {
  label: string;
  icon: string;
}

export default function HotelDetailPage({ id }: { id: string }) {
  const router = useRouter();

  // Availabilities state
  const [PropertyAmenities, setPropertyAmenities] = useState<Amenities[]>(
    []
  );
  const [PropertySafetyFeatures, setPropertySafetyFeatures] = useState<
    SafetyFeatures[]
  >([]);
  const [PropertySharedSpaces, setPropertySharedSpaces] = useState<
    SharedSpaces[]
  >([]);

  // Search bar state
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Per-room quantity selectors keyed by propertyroomid
  const [roomQtyMap, setRoomQtyMap] = useState<Record<number, number>>({});

  // Cart state (rooms added to sidebar)
  const [cart, setCart] = useState<CartItem[]>([]);

  // Validation state
  const [showValidation, setShowValidation] = useState(false);

  const [propertyDetail, setPropertyDetail] = useState<PropertyDetail | null>(
    null
  );

  // Simple canadian cities list used for suggestion dropdown (unchanged)
  const canadianCities = [
    "Toronto, Ontario",
    "Montreal, Quebec",
    "Vancouver, British Columbia",
    "Calgary, Alberta",
    "Edmonton, Alberta",
    "Ottawa, Ontario",
    "Niagara Falls, Ontario",
    "Halifax, Nova Scotia",
    "Victoria, British Columbia",
    "Quebec City, Quebec",
  ];

  const mapPropertyToDetail = (raw: any): PropertyDetail => {
    // Reset amenities arrays to avoid accumulating duplicates on multiple maps
    setPropertyAmenities([]);
    setPropertySafetyFeatures([]);
    setPropertySharedSpaces([]);

    const mapped: PropertyDetail = {
      propertyid: raw.propertyid,
      propertytitle: raw.propertytitle,
      propertysubtitle: raw.propertysubtitle,
      canadian_province_name:
        raw.canadian_states?.canadian_province_name ?? "",
      canadian_city_name: raw.canadian_cities?.canadian_city_name ?? "",
      postalcode: raw.postalcode,
      propertyclassificationname:
        raw.propertyclassification?.propertyclassificationname ?? "",
      checkintime: raw.checkintime,
      checkouttime: raw.checkouttime,
      propertymaplink: raw.propertymaplink,
      photo1_featured: raw.photo1_featured,
      photo2: raw.photo2,
      photo3: raw.photo3,
      photo4: raw.photo4,
      photo5: raw.photo5,
      houserules: raw.houserules,
      propertyamenities: raw.propertyamenities
        ?.map((a: any) => a.amenities?.amenitiesname)
        .filter(Boolean) ?? [],
      propertysafetyfeatures: raw.propertysafetyfeatures
        ?.map((a: any) => a.safetyfeatures?.safetyfeaturesname)
        .filter(Boolean) ?? [],
      propertysharedspaces: raw.propertysharedspaces
        ?.map((a: any) => a.sharedspaces?.sharedspacesname)
        .filter(Boolean) ?? [],
      propertyamenitiesicons: raw.propertyamenities
        ?.map((a: any) => a.amenities?.icons)
        .filter(Boolean) ?? [],
      PropertyRoom:
        raw.propertyroom?.map((room: any) => ({
          propertyroomid: room.propertyroomid,
          roomname: room.roomname,
          roomcount: room.roomcount,
          price: room.price,
          available: room.available,
          pic1: room.pic1,
          pic2: room.pic2,
          roomtypename: room.roomtype?.roomtypename ?? "",
          roomtypeid: room.roomtype?.roomtypeid,
        })) ?? [],
      rating: 4.0,
    };

    // populate the icon arrays for display
    (raw.propertyamenities ?? []).forEach((a: any) => {
      if (a?.amenities?.amenitiesname) {
        setPropertyAmenities((prev) => [
          ...prev,
          { label: a.amenities?.amenitiesname, icon: a.amenities?.icons },
        ]);
      }
    });
    (raw.propertysafetyfeatures ?? []).forEach((a: any) => {
      if (a?.safetyfeatures?.safetyfeaturesname) {
        setPropertySafetyFeatures((prev) => [
          ...prev,
          { label: a.safetyfeatures?.safetyfeaturesname, icon: a.safetyfeatures?.icons },
        ]);
      }
    });
    (raw.propertysharedspaces ?? []).forEach((a: any) => {
      if (a?.sharedspaces?.sharedspacesname) {
        setPropertySharedSpaces((prev) => [
          ...prev,
          { label: a.sharedspaces?.sharedspacesname, icon: a.sharedspaces?.icons },
        ]);
      }
    });

    return mapped;
  };

  useEffect(() => {
    if (!id || id === "") {
      router.push("/not-found");
      return;
    }

    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${baseUrl}/ownerProperty/getProperties/${id}`);
        if (!res || !res.data || !res.data.property) {
          router.push("/not-found");
          return;
        }

        const Details = res.data.property.map((p: any) => mapPropertyToDetail(p));
        setPropertyDetail(Details[0] ?? null);

        // initialize roomQtyMap with zeros for all propertyroomids
        const initialMap: Record<number, number> = {};
        (Details[0]?.PropertyRoom ?? []).forEach((r:any) => {
          initialMap[r.propertyroomid] = 0;
        });
        setRoomQtyMap(initialMap);
        setLocation(Details[0].canadian_city_name + " , " + Details[0].canadian_province_name);
      } catch (ex: any) {
        if (ex?.response?.status === 404) {
          router.push("/not-found");
          return;
        }
        console.error(ex);
        alert("Something went wrong");
        router.push("/not-found");
      }
    };

    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const filteredCities = location
    ? canadianCities.filter((city) =>
        city.toLowerCase().includes(location.toLowerCase())
      )
    : [];


  // quantity handlers use propertyroomid
  const increaseRoomQty = (propertyroomid: number) => {
    setRoomQtyMap((prev) => ({
      ...prev,
      [propertyroomid]: (prev[propertyroomid] || 0) + 1,
    }));
  };

  const decreaseRoomQty = (propertyroomid: number) => {
    setRoomQtyMap((prev) => ({
      ...prev,
      [propertyroomid]: Math.max(0, (prev[propertyroomid] || 0) - 1),
    }));
  };

  // Add room to cart by propertyroomid - merge if exists
  const addToCart = (
    propertyroomid: number,
    roomname: string,
    roomtypename: string,
    quantity: number,
    pricePerNight: number
  ) => {
    if (quantity === 0) return;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.propertyroomid === propertyroomid
      );
      const updated = [...prev];

      if (existingIndex >= 0) {
        updated[existingIndex] = {
          ...updated[existingIndex],
          // add quantities (you may choose to replace instead; this keeps adding)
          quantity: updated[existingIndex].quantity + quantity,
        };
      } else {
        updated.push({
          propertyroomid,
          roomname,
          roomtypename,
          quantity,
          pricePerNight,
        });
      }

      // reset that room's temp qty
      setRoomQtyMap((prevQty) => ({
        ...prevQty,
        [propertyroomid]: 0,
      }));

      return updated;
    });
  };

  // Remove by propertyroomid
  const removeFromCart = (propertyroomid: number) => {
    setCart((prev) => prev.filter((item) => item.propertyroomid !== propertyroomid));
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(1, nights);
    }
    return 1;
  };

  // Calculate total amount using nights
  const calculateTotal = () => {
    const nights = calculateNights();
    return cart.reduce(
      (sum, item) => sum + item.quantity * item.pricePerNight * nights,
      0
    );
  };

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate || cart.length === 0) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);

    const nights = calculateNights();

    const reservationPayload = {
      propertyid: propertyDetail?.propertyid ?? null,
      checkInDate: checkInDate?.toISOString() ?? null,
      checkOutDate: checkOutDate?.toISOString() ?? null,
      nights,
      adults,
      children,
      totalAmount: calculateTotal(),
      rooms: cart.map((c) => ({
        propertyroomid: c.propertyroomid,
        roomname: c.roomname,
        roomtypename: c.roomtypename,
        quantity: c.quantity,
        pricePerNight: c.pricePerNight,
        totalForThisRoom: c.quantity * c.pricePerNight * nights,
      })),
    };

    console.log("Reservation submitted:", reservationPayload);

    // You can replace the alert below with your API call to submit reservationPayload
    alert("Reservation submitted successfully! Check console for payload.");
  };

  function getIcon(iconName: string): IconDefinition | undefined {
    const icon = (Icons as any)[iconName as keyof typeof Icons];
    return typeof icon === "object" && icon !== null && "iconName" in icon
      ? (icon as IconDefinition)
      : undefined;
  }

  return (
    <div className="bg-white w-full flex flex-col min-h-screen">
      <section className="w-full bg-[#F5F6FD] py-6 px-4 md:px-8 lg:px-[203px]">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {/* Location */}
            <div className="flex-1 px-4 py-3 lg:py-0 lg:border-r border-gray-200 flex flex-col justify-center relative">
              <label
                htmlFor="location"
                className="font-semibold text-[#59A5B2] text-[13px] md:text-[15px] mb-1 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <Input
                id="location"
                type="text"
                value={location}
                
                onFocus={() => location && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Where are you going?"
                className="font-normal text-black-900 text-[12px] md:text-[13px] border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-800"
                style={{ fontFamily: "Poppins, sans-serif" }}
                data-testid="input-location"
                disabled={true}
              />
              
            </div>

            {/* Check-in / Check-out */}
            <div className="flex-1 px-4 py-3 lg:py-0 lg:border-r border-gray-200 flex flex-col justify-center">
              <label
                className="font-semibold text-[#59A5B2] text-[13px] md:text-[15px] mb-1 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <CalendarIcon className="w-4 h-4" />
                Check in - Check out
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="font-normal text-gray-600 text-[12px] md:text-[13px] border-0 p-0 h-auto justify-start hover:bg-transparent"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    data-testid="button-date-picker"
                  >
                    {checkInDate && checkOutDate
                      ? `${format(checkInDate, "MMM dd, yyyy")} - ${format(checkOutDate, "MMM dd, yyyy")}`
                      : "Select dates"}
                    <ChevronDown className="ml-auto w-3.5 h-2" aria-hidden="true" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-4 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#59A5B2] mb-2">Check-in</p>
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#59A5B2] mb-2">Check-out</p>
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        disabled={(date) => !checkInDate || date <= checkInDate}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {showValidation && (!checkInDate || !checkOutDate) && (
                <span className="text-red-500 text-xs mt-1">Please select check-in and check-out dates</span>
              )}
            </div>

            {/* Guests */}
            <div className="flex-1 px-4 py-3 lg:py-0 flex flex-col justify-center">
              <label
                className="font-semibold text-[#59A5B2] text-[13px] md:text-[15px] mb-1 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Users className="w-4 h-4" />
                Guests
              </label>
              <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="font-normal text-gray-600 text-[12px] md:text-[13px] border-0 p-0 h-auto justify-start hover:bg-transparent"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    data-testid="button-guests"
                  >
                    {`${adults} ${adults === 1 ? "adult" : "adults"}${children > 0 ? ` · ${children} ${children === 1 ? "child" : "children"}` : ""}`}
                    <ChevronDown className="ml-auto w-3.5 h-2" aria-hidden="true" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-4" align="start">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#59A5B2] text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Adults</p>
                        <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>Age 13+</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          disabled={adults <= 1}
                          data-testid="button-decrease-adults"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold" data-testid="text-adults-count">
                          {adults}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setAdults(adults + 1)}
                          data-testid="button-increase-adults"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#59A5B2] text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Children</p>
                        <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>Ages 2-12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          disabled={children <= 0}
                          data-testid="button-decrease-children"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold" data-testid="text-children-count">
                          {children}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChildren(children + 1)}
                          data-testid="button-increase-children"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="w-full px-4 md:px-8 lg:px-[203px] py-8">
        {/* Hotel Title */}
        <h1
          className="text-[28px] md:text-[32px] font-bold text-[#59A5B2] mb-1"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-hotel-title"
        >
          {propertyDetail?.propertytitle}
        </h1>
        <p className="text-gray-500 text-sm mb-2" style={{ fontFamily: "Inter, sans-serif" }} data-testid="text-hotel-subtitle">
          {propertyDetail?.propertysubtitle}
        </p>
        <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "Inter, sans-serif" }} data-testid="text-hotel-location">
          {propertyDetail?.canadian_city_name}, {propertyDetail?.canadian_province_name}
        </p>

        {/* Main Content + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Hotel Gallery - Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-lg" >
                <img className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-lg" src={propertyDetail?.photo1_featured} alt="featured" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="w-full h-[194px] bg-gray-200 rounded-lg">
                  {propertyDetail?.photo2 && (
                    <img className="w-full h-[194px] bg-gray-200 rounded-lg" src={propertyDetail?.photo2} alt="featured" />)}
                </div>

                <div className="w-full h-[194px] bg-gray-200 rounded-lg" >
                  {propertyDetail?.photo3 &&
                    (<img className="w-full h-[194px] bg-gray-200 rounded-lg" src={propertyDetail?.photo3} alt="featured" />)}
                </div>

                <div className="w-full h-[194px] bg-gray-200 rounded-lg" >
                  {propertyDetail?.photo4 &&
                    (<img className="w-full h-[194px] bg-gray-200 rounded-lg" src={propertyDetail?.photo4} alt="featured" />)}
                </div>

                <div className="w-full h-[194px] bg-gray-200 rounded-lg" >
                  {propertyDetail?.photo5 &&
                    (<img className="w-full h-[194px] bg-gray-200 rounded-lg" src={propertyDetail?.photo5} alt="featured" />)}
                </div>
              </div>
            </div>

            {/* Overview And Rules */}
            <section className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h2 className="text-[20px] font-bold text-[#59A5B2]" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Overview And Rules
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>3014 reviews</span>
                  <div className="flex items-center gap-1 bg-[#59A5B2] text-white px-2 py-1 rounded">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">4.8</span>
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                {propertyDetail?.houserules}
              </p>
            </section>

            {/* Most popular services & amenities */}
            <section className="mb-10">
              <h2 className="text-[20px] font-bold text-[#59A5B2] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Most popular services & amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {PropertyAmenities.length > 0
                  ? PropertyAmenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <FontAwesomeIcon icon={getIcon(amenity.icon) as IconDefinition} className="w-5 h-5 text-[#59A5B2]" />
                      <span className="text-[13px] text-[#59A5B2]" style={{ fontFamily: "Inter, sans-serif" }}>
                        {amenity.label}
                      </span>
                    </div>
                  ))
                  : <p>None</p>}
              </div>
            </section>

            {/* Safety Features */}
            <section className="mb-10">
              <h2 className="text-[20px] font-bold text-[#59A5B2] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Safety Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {PropertySafetyFeatures.length > 0 ? PropertySafetyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={getIcon(feature.icon) as IconDefinition} className="w-5 h-5 text-[#59A5B2]" />
                    <span className="text-[13px] text-[#59A5B2]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {feature.label}
                    </span>
                  </div>
                )) : <p>None</p>}
              </div>
            </section>

            {/* Shared Spaces */}
            <section className="mb-10">
              <h2 className="text-[20px] font-bold text-[#59A5B2] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Shared Spaces
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {PropertySharedSpaces.length > 0 ? PropertySharedSpaces.map((space, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={getIcon(space.icon) as IconDefinition} className="w-5 h-5 text-[#59A5B2]" />
                    <span className="text-[13px] text-[#59A5B2]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {space.label}
                    </span>
                  </div>
                )) : <p>None</p>}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-[24px] font-bold text-[#59A5B2] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Available Rooms
              </h2>

              {/* Rooms Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Table Header - Desktop */}
                <div className="hidden md:grid grid-cols-12 bg-[#FEC328] py-4 px-6">
                  <div className="col-span-3 font-bold text-black text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Room Type
                  </div>
                  <div className="col-span-3 font-bold text-black text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Room Type
                  </div>
                  <div className="col-span-3 font-bold text-black text-sm text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Price for per night
                  </div>
                  <div className="col-span-3 font-bold text-black text-sm text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Select Rooms
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden bg-[#FEC328] py-3 px-4">
                  <span className="font-bold text-black text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Available Rooms
                  </span>
                </div>

                {propertyDetail?.PropertyRoom.map((room) => {
                  const tempQty = roomQtyMap[room.propertyroomid] || 0;
                  return (
                    <div key={room.propertyroomid} className="border-b border-gray-200 p-4 md:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Col 1: Room Images */}
                        <div className="col-span-1 md:col-span-3">
                          <p className="text-xs text-gray-500 mb-2 " style={{ fontFamily: "Inter, sans-serif" }}>
                            {room.roomname}
                          </p>

                          <div className="flex gap-2">
                            <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                              <img src={room.pic1 ? room.pic1 : ""} className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" alt="" />
                            </div>

                            <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" >
                              <img src={room.pic2 ? room.pic2 : ""} className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" alt="" />
                            </div>
                          </div>
                        </div>

                        {/* Col 2: Room Type + Guest Icons */}
                        <div className="col-span-1 md:col-span-3">
                          <h1 className="font-semibold text-[#59A5B2] text-sm mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                            {room.roomtypename}
                          </h1>
                          <div className="flex items-center gap-1 justify-center">
                            {(room.roomtypeid === 1 || room.roomtypeid === 2) ? (
                              <>
                                <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                                <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                                <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                                <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                                <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                              </>
                            )}
                          </div>
                        </div>

                        {/* Col 3: Price */}
                        <div className="col-span-1 md:col-span-3 flex flex-col items-start md:items-center justify-center">
                          <span className="text-2xl font-bold text-[#59A5B2]" style={{ fontFamily: "Poppins, sans-serif" }}>
                            CAD {room.price}
                          </span>
                          <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                            Includes taxes and charges
                          </span>
                        </div>

                        {/* Col 4: Select Rooms */}
                        <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-center gap-3 flex-wrap">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => decreaseRoomQty(room.propertyroomid)}
                              disabled={tempQty <= 0}
                              data-testid={`button-room-decrease-${room.propertyroomid}`}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-sm font-medium border-x border-gray-300 min-w-[40px] text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                              {String(tempQty).padStart(2, "0")}
                            </span>
                            <button
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                              onClick={() => increaseRoomQty(room.propertyroomid)}
                              data-testid={`button-room-increase-${room.propertyroomid}`}
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Add Button */}
                          <Button
                            variant="outline"
                            className="border-[#59A5B2] text-[#59A5B2] hover:bg-[#59A5B2] hover:text-white px-12  disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={tempQty === 0}
                            onClick={() => addToCart(
                              room.propertyroomid,
                              room.roomname,
                              room.roomtypename,
                              tempQty,
                              Number(room.price)
                            )}
                            data-testid={`button-add-room-${room.propertyroomid}`}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR - BOOKING SUMMARY */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 p-6">
              {/* Check in - Check out */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Check in - Check out
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                  <CalendarIcon className="w-4 h-4 text-[#59A5B2]" />
                  <span>
                    {checkInDate && checkOutDate
                      ? `${format(checkInDate, "MMM dd yyyy")} - ${format(checkOutDate, "MMM dd yyyy")}`
                      : "Select dates"}
                  </span>
                </div>
                {showValidation && (!checkInDate || !checkOutDate) && (
                  <span className="text-red-500 text-xs mt-1 block">Please select dates</span>
                )}
              </div>

              {/* Guest */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Guest
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                  <Users className="w-4 h-4 text-[#59A5B2]" />
                  <span>{`${adults} adults · ${children} children · ${cart.reduce((sum, item) => sum + item.quantity, 0) || 1} room`}</span>
                </div>
              </div>

              {/* Booking Date / Selected Rooms */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Booking Details
                </h3>

                {cart.length === 0 ? (
                  <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                    No rooms selected
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.propertyroomid} className="flex justify-between items-center text-sm" style={{ fontFamily: "Inter, sans-serif" }}>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">
                            {item.quantity} {item.roomname}
                          </span>
                        </div>

                        <div>
                          <span className="text-gray-800 font-medium">
                            ${item.quantity * item.pricePerNight * calculateNights()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.propertyroomid)}
                            className="text-red-500 hover:text-red-700 ml-2"
                            data-testid={`button-remove-room-${item.propertyroomid}`}
                            aria-label={`Remove ${item.roomname}`}>
                            <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-red-500 hover:text-red-700" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

                {showValidation && cart.length === 0 && (
                  <span className="text-red-500 text-xs mt-2 block">Please add at least one room</span>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Total
                </span>
                <span className="text-2xl font-bold text-[#59A5B2]" style={{ fontFamily: "Poppins, sans-serif" }}>
                  ${calculateTotal()}
                </span>
              </div>

              {/* Reserve Button */}
              <Button
                className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] text-white font-semibold py-3"
                onClick={handleReserve}
                data-testid="button-reserve"
              >
                Reserve
              </Button>
            </Card>
          </div>
        </div>
      </div >
    </div >
  );
}
