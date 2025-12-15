"use client";
import { useState, useMemo, useEffect } from "react";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import {
  Search,
  MapPin,
  Pencil,
  Trash2,
  Plus,
  Star,
  Wifi,
  Car,
  Utensils,
  Waves,
  MoreVertical,
  Filter,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faLocationDot,
  faPencil,
  faTrash,
  faPlus,
  faTimes,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import * as Icons from "@fortawesome/free-solid-svg-icons";

// Assets
import imgHotel from "@assets/generated_images/modern_luxury_hotel_facade_at_twilight.png";
import imgCabin from "@assets/generated_images/cozy_modern_mountain_cabin_exterior.png";
import imgLoft from "@assets/generated_images/spacious_urban_loft_apartment_interior.png";
import imgResort from "@assets/generated_images/luxury_beachfront_resort_aerial_view.png";
import { authCheck } from "@/services/authCheck";
import axios from "axios";
import Link from "next/link";

// Interface matching the "Real" backend response structure provided
interface Property {
  propertyid: number;
  propertytitle: string;
  propertysubtitle: string; // Address
  photo1_featured: string;
  rating: number; // Mocked
  reviews: number; // Mocked
  availablestatus: boolean; // Mocked
  price: number; // Derived from rooms
  amenities: Amenity[];// Simplified for UI
  featured: boolean;
}

interface Amenity {
  name: string;
  icon: string; // or whatever type your icon system uses
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [propertyList, setPropertyList] = useState<Property[]>([]);

  useEffect(() => {

    const fetchProperties = async () => {
      try {

        const user = await authCheck();

        console.log("user from /auth/me is: ", user);
        const userid = user?.user.userid;

        if (user && user.user.roleid === 2 && user.user.userid) {
          const prop = await axios.get(`${baseUrl}/ownerProperty/getSpecificOwnerProperties/${userid}`);
          const properties = prop.data;
          console.log(properties)


          setPropertyList(
            properties.property.map((p: any) => {
              // Filter only features=true and map to objects with name + icon
              const amenities = Array.isArray(p.propertyamenities)
                ? p.propertyamenities
                  .filter((pa: any) => pa.features === true)
                  .map((pa: any) => ({
                    name: pa.amenities?.amenitiesname,
                    icon: pa.amenities?.icons, // e.g., "faWifi", "faDumbbell"
                  }))
                  .filter(Boolean)
                : [];

              return {
                propertyid: p.propertyid,
                propertytitle: p.propertytitle,
                propertysubtitle: p.propertysubtitle,
                photo1_featured: p.photo1_featured,
                availablestatus: Boolean(p.availablestatus),
                amenities,       // now an array of { name, icon }
                featured: true,
                rating: 0,
                reviews: 0,
                price: 0,
              };
            })
          );






        }
      } catch (error) {
        console.log("Error fetching properties:", error);
      }

    }
    fetchProperties();

  }, []);





  const filteredProperties = useMemo(() => {
    return propertyList.filter(p => {
      const matchesSearch = p.propertytitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.propertysubtitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || p.availablestatus == true;
      return matchesSearch && matchesStatus;
    });
  }, [propertyList, searchQuery, statusFilter]);
  const handleDelete = () => {
    if (deleteId) {
      setPropertyList(prev => prev.filter(p => p.propertyid !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <OwnerLayout>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              My Properties
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your property listings
            </p>
          </div>
          <button onClick={() => console.log(propertyList)}
            className="flex items-center gap-2 bg-[#59A5B2] hover:bg-[#4a9199] text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            data-testid="button-add-property"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            Add Property
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent"
              data-testid="input-search-properties"
            />
          </div>
          <div className="flex gap-2">
            {(["All", "Active", "Inactive"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${statusFilter === filter
                  ? "bg-[#59A5B2] text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                data-testid={`filter-${filter.toLowerCase()}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>




        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.propertyid} property={property} onDelete={() => setDeleteId(property.propertyid)} />
            ))}
          </AnimatePresence>
        </div>

        {/* Delete Modal */}
        <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Property?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the property listing and all associated data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete Listing</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


    </OwnerLayout>
  );
}



function getIcon(iconName: string): Icons.IconDefinition | undefined {
  const icon = (Icons as any)[iconName as keyof typeof Icons];
  return typeof icon === "object" && icon !== null && "iconName" in icon
    ? (icon as Icons.IconDefinition)
    : undefined;
}



function PropertyCard({ property, onDelete }: { property: Property; onDelete: () => void }) {

  console.log("prop", property);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}

      transition={{ duration: 0.2 }}
      className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm  transition-all duration-300 dark:bg-card/50"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.photo1_featured}
          alt={property.propertytitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${property.availablestatus
            ? 'bg-green-500/90 text-white border-green-400/50'
            : 'bg-zinc-500/90 text-white border-zinc-400/50'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${property.availablestatus ? 'bg-green-200 animate-pulse' : 'bg-zinc-300'
              }`} />
            {property.availablestatus ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEBC11] text-black shadow-sm">
              <Star className="w-3 h-3 fill-black text-black mr-1" />
              Featured
            </span>
          </div>
        )}

        {/* Rating Bubble */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur px-2.5 py-1.5 rounded-full shadow-lg text-xs font-semibold text-foreground">
          <Star className="w-3.5 h-3.5 fill-[#FEBC11] text-[#FEBC11]" />
          <span>{property.rating}</span>
          <span className="text-muted-foreground font-normal">({property.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex-1 space-y-3">
          {/* Title & Location */}
          <div>
            <h3 className="text-lg font-bold leading-tight text-foreground line-clamp-1 group-hover:text-[#59A5B2] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {property.propertytitle}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{property.propertysubtitle}</span>
            </div>
          </div>

          {/* Amenities Preview */}
          {/* <div className="flex gap-2 pt-1">
            {property.amenities.map((amenity, i) => (

              <Badge key={i} variant="secondary" className="px-2 py-0.5 h-6 text-[10px] font-medium bg-muted/50 text-muted-foreground border-transparent">
                {amenity}lo
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="secondary" className="px-2 py-0.5 h-6 text-[10px] font-medium bg-muted/50 text-muted-foreground border-transparent">
                +{property.amenities.length - 3}
              </Badge>
            )}
          </div> */}

          <div className="flex gap-2 pt-1">
            {property.amenities.map((amenity, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="px-2 py-0.5 h-6 text-[10px] font-medium bg-muted/50 text-muted-foreground border-transparent flex items-center gap-1"
              >
                <FontAwesomeIcon icon={getIcon(amenity.icon) as Icons.IconDefinition} className="w-5 h-5 text-[#59A5B2]" />

                <FontAwesomeIcon icon={amenity.icon as any} className="w-3 h-3" />
                {amenity.name}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge
                variant="secondary"
                className="px-2 py-0.5 h-6 text-[10px] font-medium bg-muted/50 text-muted-foreground border-transparent"
              >
                +{property.amenities.length - 3}
              </Badge>
            )}
          </div>




        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#59A5B2]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ${property.price}
              </span>
              <span className="text-xs text-muted-foreground font-medium">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-100 hover:opacity-100 transition-opacity duration-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent rounded-lg">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">


                <Link href={`/owner/add-property`}
                  className="flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  data-testid={`edit-property-${property.propertyid}`}
                >
                  <DropdownMenuItem className="cursor-pointer">

                    <Pencil className="w-4 h-4 mr-2" />
                    Edit

                  </DropdownMenuItem>

                </Link>


                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={onDelete}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            <Link href={`/owner/properties/${property.propertyid}`}>
              <Button size="sm" className="h-8 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-lg text-xs font-medium px-3 shadow-none">
                Manage <ArrowUpRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>

          </div>


        </div>
      </div>
    </motion.div>
  );
}
