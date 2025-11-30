// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import {
//   PropertyLocation,
//   PropertyDetails,
//     Room,
//     PropertyAmenities,
//   PropertySubmission,
// } from "@/types/property";

// interface PropertyContextType {
//   currentStep: number;
//   location: PropertyLocation;
//   details: PropertyDetails;
//   rooms: Room[];
//   amenities: PropertyAmenities;
//   setLocation: (location: PropertyLocation) => void;
//   setDetails: (details: PropertyDetails) => void;
//   setRooms: (rooms: Room[]) => void;
//   setAmenities: (amenities: PropertyAmenities) => void;
//   nextStep: () => void;
//   prevStep: () => void;
//   saveAsDraft: () => void;
//   loadDraft: () => void;
//   resetForm: () => void;
// }

// const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// export function useProperty() {
//   const context = useContext(PropertyContext);
//   if (!context) {
//     throw new Error("useProperty must be used within PropertyProvider");
//   }
//   return context;
// }

// const initialLocation: PropertyLocation = {
//   useProfileAddress: false,
//   province: "",
//   city: "",
//   street: "",
//   postalCode: "",
//   ownershipDocument: undefined,
// };

// const initialDetails: PropertyDetails = {
//   classification: "",
//   title: "",
//   subtitle: "",
//   propertyName: "",
//   googleMapLink: "",
//   photos: {
//     featured: null,
//     photo2: null,
//     photo3: null,
//     photo4: null,
//     photo5: null,
//   },
//   photoPreviews: {
//     featured: "",
//     photo2: "",
//     photo3: "",
//     photo4: "",
//     photo5: "",
//   },
// };


// const initialAmenities: PropertyAmenities = {
//   available: [],
//   featured: [],
//   safety: [],
//   sharedSpaces: [],
//   checkInTime: "",
//   checkOutTime: "",
//   rules: "",

// };

// export function PropertyProvider({ children }: { children: ReactNode }) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [location, setLocation] = useState<PropertyLocation>(initialLocation);
//   const [details, setDetails] = useState<PropertyDetails>(initialDetails);
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [amenities, setAmenities] = useState<PropertyAmenities>(initialAmenities);

//   // Load draft from localStorage on mount
//   useEffect(() => {
//     loadDraft();
//   }, []);

//   const nextStep = () => {

//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//       window.scrollTo(0, 0);
//     }
//   };




//   const prevStep = () => {
//     if (currentStep > 1) {


//       setCurrentStep(currentStep - 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   const saveAsDraft = () => {
//     const draft: PropertySubmission = {
//       location,
//       details: {
//         ...details,
//         // Don't save file objects, only previews
//         photos: {
//           featured: null,
//           photo2: null,
//           photo3: null,
//           photo4: null,
//           photo5: null,
//         },
//       },
//       rooms: rooms.map(room => ({
//         ...room,
//         image: null, // Don't save file objects
//       })),
//       amenities,
//     };
//     localStorage.setItem("propertyDraft", JSON.stringify(draft));
//   };

//   const loadDraft = () => {
//     try {
//       const saved = localStorage.getItem("propertyDraft");
//       if (saved) {
//         const draft: PropertySubmission = JSON.parse(saved);
//         setLocation(draft.location || initialLocation);
//         setDetails(draft.details || initialDetails);
//         setRooms(draft.rooms || []);
//         setAmenities(draft.amenities || initialAmenities);
//       }
//     } catch (error) {
//       console.error("Failed to load draft:", error);
//     }
//   };

//   const resetForm = () => {
//     setCurrentStep(1);
//     setLocation(initialLocation);
//     setDetails(initialDetails);
//     setRooms([]);
//     setAmenities(initialAmenities);
//     localStorage.removeItem("propertyDraft");
//   };

//   return (
//     <PropertyContext.Provider
//       value={{
//         currentStep,
//         location,
//         details,
//         rooms,
//         amenities,
//         setLocation,
//         setDetails,
//         setRooms,
//         setAmenities,
//         nextStep,
//         prevStep,
//         saveAsDraft,
//         loadDraft,
//         resetForm,
//       }}
//     >
//       {children}
//     </PropertyContext.Provider>
//   );
// }


"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { PropertyLocation, PropertyDetails, Room, PropertyAmenities, PropertySubmission } from "@/types/property"

interface PropertyContextType {
  currentStep: number
  location: PropertyLocation
  details: PropertyDetails
  rooms: Room[]
  amenities: PropertyAmenities
  setLocation: (location: PropertyLocation) => void
  setDetails: (details: PropertyDetails) => void
  setRooms: (rooms: Room[]) => void
  setAmenities: (amenities: PropertyAmenities) => void
  nextStep: () => void
  prevStep: () => void
  saveAsDraft: () => void
  loadDraft: () => void
  resetForm: () => void
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

export function useProperty() {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error("useProperty must be used within PropertyProvider")
  }
  return context
}

const initialLocation: PropertyLocation = {
  useProfileAddress: false,
  province: "",
  city: "",
  street: "",
  postalCode: "",
  ownershipDocument: undefined,
}

const initialDetails: PropertyDetails = {
  classification: "",
  title: "",
  subtitle: "",
  propertyName: "",
  googleMapLink: "",
  photos: {
    featured: null,
    photo2: null,
    photo3: null,
    photo4: null,
    photo5: null,
  },
  photoPreviews: {
    featured: "",
    photo2: "",
    photo3: "",
    photo4: "",
    photo5: "",
  },
}

const initialAmenities: PropertyAmenities = {
  available: [],
  featured: [],
  safety: [],
  sharedSpaces: [],
  checkInTime: "",
  checkOutTime: "",
  rules: "",
}

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [location, setLocation] = useState<PropertyLocation>(initialLocation)
  const [details, setDetails] = useState<PropertyDetails>(initialDetails)
  const [rooms, setRooms] = useState<Room[]>([])
  const [amenities, setAmenities] = useState<PropertyAmenities>(initialAmenities)

  // Load draft from localStorage on mount
  useEffect(() => {
    loadDraft()
  }, [])

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const saveAsDraft = () => {
    const draft: PropertySubmission = {
      location,
      details: {
        ...details,
        // Don't save file objects, only previews
        photos: {
          featured: null,
          photo2: null,
          photo3: null,
          photo4: null,
          photo5: null,
        },
      },
      rooms: rooms.map((room) => ({
        ...room,
        image1: null,  
        image2: null,
        image: null, // Don't save file objects
      })),
      amenities,
    }
    localStorage.setItem("propertyDraft", JSON.stringify(draft))
  }

  const loadDraft = () => {
    try {
      const saved = localStorage.getItem("propertyDraft")
      if (saved) {
        const draft: PropertySubmission = JSON.parse(saved)
        setLocation(draft.location || initialLocation)
        setDetails(draft.details || initialDetails)
        setRooms(draft.rooms || [])
        setAmenities(draft.amenities || initialAmenities)
      }
    } catch (error) {
      console.error("Failed to load draft:", error)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setLocation(initialLocation)
    setDetails(initialDetails)
    setRooms([])
    setAmenities(initialAmenities)
    localStorage.removeItem("propertyDraft")
  }

  return (
    <PropertyContext.Provider
      value={{
        currentStep,
        location,
        details,
        rooms,
        amenities,
        setLocation,
        setDetails,
        setRooms,
        setAmenities,
        nextStep,
        prevStep,
        saveAsDraft,
        loadDraft,
        resetForm,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}
