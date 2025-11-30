"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useProperty } from "../PropertyContext"
import { ProgressSteps } from "../components/ProgressSteps"
import type { Room } from "@/types/property"
import { Upload, X, Plus, Bed, ArrowLeft, Trash2 } from "lucide-react"
import StyledSelect from "@/components/StyledSelected"
import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

interface IRoomType {
  roomtypeid: number
  roomtypename: string | null
}

interface ISafetyFeatures {
  safetyfeaturesid: number
  safetyfeaturesname: string | null
}

interface ISharedSpaces {
  sharedspacesid: number
  sharedspacesname: string | null
}

interface IAmenities {
  amenitiesid: number
  amenitiesname: string | null
}

interface PropertySubmissionPayload {
  propertyid: string;
  rooms: Array<{
    id: string
    name: string
    roomtypeid: number
    count: number
    price: string
    availabilityStart: string
    availabilityEnd: string
    image1: File | null
    image2: File | null
  }>
  availableAmenitiesIds: number[]
  featuredAmenitiesIds: number[]
  safetyFeaturesIds: number[]
  sharedSpacesIds: number[]
  checkInTime: string
  checkOutTime: string
  rules: string
}

export default function Step3Page() {
  const router = useRouter()
  const {
    rooms: initialRooms,
    amenities: initialAmenities,
    setRooms,
    setAmenities,
    prevStep,
    saveAsDraft,
    resetForm,
  } = useProperty()

  const [rooms, setLocalRooms] = useState<Room[]>(initialRooms.length > 0 ? initialRooms : [])
  const [amenities, setLocalAmenities] = useState({
    available: initialAmenities.available || [],
    featured: initialAmenities.featured || [],
    safety: initialAmenities.safety || [],
    sharedSpaces: initialAmenities.sharedSpaces || [],
    checkInTime: initialAmenities.checkInTime || "",
    checkOutTime: initialAmenities.checkOutTime || "",
    rules: initialAmenities.rules || "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([])
  const [amenitiesData, setAmenitiesData] = useState<IAmenities[]>([])
  const [safetyFeaturesData, setSafetyFeaturesData] = useState<ISafetyFeatures[]>([])
  const [sharedSpacesData, setSharedSpacesData] = useState<ISharedSpaces[]>([])
  const [PropertyId, setPropertyId] = useState("")

  useEffect(() => {
    async function loadData() {
      try {
        const [roomTypesRes, amenitiesRes, safetyRes, sharedSpacesRes] = await Promise.all([
          fetch(`${baseUrl}/ownerProperty/roomtypes`),
          fetch(`${baseUrl}/ownerProperty/amenities`),
          fetch(`${baseUrl}/ownerProperty/safetyfeatures`),
          fetch(`${baseUrl}/ownerProperty/sharedspaces`),
        ])

        const roomTypesData = await roomTypesRes.json()
        const amenitiesDataRes = await amenitiesRes.json()
        const safetyDataRes = await safetyRes.json()
        const sharedSpacesDataRes = await sharedSpacesRes.json()

        setRoomTypes(roomTypesData.roomtypes || [])
        setAmenitiesData(amenitiesDataRes.amenities || [])
        setSafetyFeaturesData(safetyDataRes.safety || [])
        setSharedSpacesData(sharedSpacesDataRes.sharedspaces || [])
      } catch (error) {
        console.error("Failed to load data:", error)
      }
    }

    const searchParams = new URLSearchParams(window.location.search);
    const propertyid = searchParams.get("propertyid");


    setPropertyId(String(propertyid));

    loadData()
  }, [])



  useEffect(() => {
    console.log("Updated rooms:", rooms);
  }, [rooms]);

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: "",
      roomtypeid: "",
      count: 1,
      price: "",
      image1: null,
      image1Preview: "",
      image2: null,
      image2Preview: "",
      availabilityStart: "",
      availabilityEnd: "",
    }
    setLocalRooms([...rooms, newRoom])
  }

  const updateRoom = (id: string, field: keyof Room, value: any) => {

    console.log("checking in updateRoom", [field], value)
    setLocalRooms(rooms.map(
      (room) => {
        if (room.id === id) {
          console.log("in if body")
          return { ...room, [field]: value }
        }
        else {
          return room
        }
      }
    ));

    setErrors({ ...errors, [`room-${id}-${field}`]: "" })
  }

  const removeRoom = (id: string) => {
    setLocalRooms(rooms.filter((room) => room.id !== id))
  }

  const handleRoomImage = (id: string, imageSlot: "image1" | "image2", file: File) => {

    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      setErrors({ ...errors, [`room-${id}-${imageSlot}`]: "Only JPG/PNG files accepted" })
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, [`room-${id}-${imageSlot}`]: "Image must be less than 2MB" })
      return
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const preview = e.target?.result as string

      setLocalRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === id
            ? {
              ...room,
              [imageSlot]: file,
              [`${imageSlot}Preview`]: preview,
            }
            : room
        )
      )

      setErrors((prev) => ({ ...prev, [`room-${id}-${imageSlot}`]: "" }))
    }

    reader.readAsDataURL(file)
  }

  const toggleAmenity = (amenity: IAmenities) => {
    if (amenities.available.some((a) => a.amenitiesid === amenity.amenitiesid)) {
      setLocalAmenities({
        ...amenities,
        available: amenities.available.filter((a) => a.amenitiesid !== amenity.amenitiesid),
        featured: amenities.featured.filter((a) => a.amenitiesid !== amenity.amenitiesid),
      })
    } else {
      setLocalAmenities({
        ...amenities,
        available: [...amenities.available, amenity],
      })
    }
  }

  const toggleFeatured = (amenity: IAmenities) => {
    if (amenities.featured.some((a) => a.amenitiesid === amenity.amenitiesid)) {
      setLocalAmenities({
        ...amenities,
        featured: amenities.featured.filter((a) => a.amenitiesid !== amenity.amenitiesid),
      })
    } else if (amenities.featured.length < 3) {
      setLocalAmenities({
        ...amenities,
        featured: [...amenities.featured, amenity],
      })
    }
  }

  const toggleSafety = (feature: ISafetyFeatures) => {
    if (amenities.safety.some((s) => s.safetyfeaturesid === feature.safetyfeaturesid)) {
      setLocalAmenities({
        ...amenities,
        safety: amenities.safety.filter((s) => s.safetyfeaturesid !== feature.safetyfeaturesid),
      })
    } else {
      setLocalAmenities({
        ...amenities,
        safety: [...amenities.safety, feature],
      })
    }
  }

  const toggleSharedSpace = (space: ISharedSpaces) => {
    if (amenities.sharedSpaces.some((s) => s.sharedspacesid === space.sharedspacesid)) {
      setLocalAmenities({
        ...amenities,
        sharedSpaces: amenities.sharedSpaces.filter((s) => s.sharedspacesid !== space.sharedspacesid),
      })
    } else {
      setLocalAmenities({
        ...amenities,
        sharedSpaces: [...amenities.sharedSpaces, space],
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    rooms.forEach((room) => {
      const trimmedName = room.name.trim()
      const trimmedPrice = room.price.trim()

      if (!trimmedName) newErrors[`room-${room.id}-name`] = "Room name required"
      if (!room.roomtypeid) newErrors[`room-${room.id}-roomtypeid`] = "Room type required"

      if (!room.count || room.count < 1 || !Number.isInteger(room.count)) {
        newErrors[`room-${room.id}-count`] = "Room count must be a positive integer"
      } else if (room.count > 999) {
        newErrors[`room-${room.id}-count`] = "Room count cannot exceed 999"
      }

      if (!trimmedPrice || Number.parseFloat(trimmedPrice) <= 0) {
        newErrors[`room-${room.id}-price`] = "Valid price required"
      } else if (Number.parseFloat(trimmedPrice) > 99999) {
        newErrors[`room-${room.id}-price`] = "Price cannot exceed $99,999 CAD"
      }

    })

    const trimmedCheckInTime = amenities.checkInTime.trim()
    const trimmedCheckOutTime = amenities.checkOutTime.trim()

    if (!trimmedCheckInTime) newErrors.checkInTime = "Check-in time required"
    if (!trimmedCheckOutTime) newErrors.checkOutTime = "Check-out time required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const canProceed = () => {
    if (rooms.length === 0) return false

    return (
      rooms.every(
        (room) =>
          room.name && room.roomtypeid && room.price && Number.parseFloat(room.price) > 0,
      ) &&
      amenities.checkInTime &&
      amenities.checkOutTime
    )
  }

  const buildStep3FormData = (payload: PropertySubmissionPayload) => {
    const fd = new FormData();

    fd.append("propertyid", String(payload.propertyid));
    fd.append("checkInTime", payload.checkInTime || "");
    fd.append("checkOutTime", payload.checkOutTime || "");
    fd.append("rules", payload.rules || "");

    fd.append("availableAmenitiesIds", JSON.stringify(payload.availableAmenitiesIds));
    fd.append("featuredAmenitiesIds", JSON.stringify(payload.featuredAmenitiesIds));
    fd.append("safetyFeaturesIds", JSON.stringify(payload.safetyFeaturesIds));
    fd.append("sharedSpacesIds", JSON.stringify(payload.sharedSpacesIds));

    rooms.forEach((room, index) => {
      fd.append(`rooms[${index}][id]`, room.id);
      fd.append(`rooms[${index}][name]`, room.name);
      fd.append(`rooms[${index}][roomtypeid]`, String(room.roomtypeid));
      fd.append(`rooms[${index}][count]`, String(room.count));
      fd.append(`rooms[${index}][price]`, room.price);
      fd.append(`rooms[${index}][availabilityStart]`, room.availabilityStart);
      fd.append(`rooms[${index}][availabilityEnd]`, room.availabilityEnd);

      if (room.image1) {
        fd.append(`rooms[${index}][image1]`, room.image1);
      }
      if (room.image2) {
        fd.append(`rooms[${index}][image2]`, room.image2);
      }
    });


    return fd;
  };


  const handlePublish = async () => {
    if (!validateForm()) return

    if (!PropertyId) {
      alert("User must first fill step 1 and step 2 form! If already filled then retry it.");
      return;
    }

    const roomsToSubmit = rooms

    setRooms(roomsToSubmit)
    setAmenities(amenities)
    setIsSubmitting(true)

    console.log(
      "Rooms before submission:",
      roomsToSubmit.map((r) => ({
        id: r.id,
        name: r.name,
        image1: r.image1 ? `File: ${r.image1.name}` : null,
        image2: r.image2 ? `File: ${r.image2.name}` : null,
      })),
    )

    const submissionPayload: PropertySubmissionPayload = {
      propertyid: PropertyId,
      rooms: roomsToSubmit.map((room) => ({
        id: room.id,
        name: room.name,
        roomtypeid: typeof room.roomtypeid === "string" ? Number.parseInt(room.roomtypeid) : room.roomtypeid,
        count: room.count,
        price: room.price,
        availabilityStart: room.availabilityStart,
        availabilityEnd: room.availabilityEnd,
        image1: room.image1,
        image2: room.image2,
      })),
      availableAmenitiesIds: amenities.available.map((a) => a.amenitiesid),
      featuredAmenitiesIds: amenities.featured.map((a) => a.amenitiesid),
      safetyFeaturesIds: amenities.safety.map((s) => s.safetyfeaturesid),
      sharedSpacesIds: amenities.sharedSpaces.map((s) => s.sharedspacesid),
      checkInTime: amenities.checkInTime,
      checkOutTime: amenities.checkOutTime,
      rules: amenities.rules,

    }


    const formData = buildStep3FormData(submissionPayload);

    try {
      if (!PropertyId) {
        alert("Please first fill location form (Step 1)!")
      }
      const response = await axios.post(`${baseUrl}/ownerProperty/step3`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });


      if (response.status === 200) {
        router.push("/owner")
      }



    } catch (error) {


      if (axios.isAxiosError(error)) {
        const message = (error.response as any)?.data?.message ?? error.message ?? "Submission failed. Please try again.";
        alert(message)

        console.error("Submission error:", error);

      } else {
        console.error("Submission error:", error);
        alert("Submission error: Something went wrong!");

      }

    }

    setIsSubmitting(false)
  }

  const handleBack = () => {
    setRooms(rooms)
    setAmenities(amenities)
    prevStep()
    router.push("/owner/add-property/step-2")
  }

  const handleSaveExit = () => {
    setRooms(rooms)
    setAmenities(amenities)
    saveAsDraft()
    router.push("/owner")
  }

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return [`${hour}:00`, `${hour}:30`]
  }).flat()

  if (showPreview) {
    return (
      <div className="w-full">
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <ProgressSteps currentStep={3} totalSteps={3} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#2e2e2e] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                Preview & Publish
              </h1>
              <p className="text-lg text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                Review your property listing before publishing
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Rooms ({rooms.length})
                </h3>
                <div className="space-y-3">
                  {rooms.map((room) => (
                    <div key={room.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900" style={{ fontFamily: "Inter, sans-serif" }}>
                          {room.name}
                        </p>
                        <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                          {roomTypes.find((rt) => rt.roomtypeid === room.roomtypeid)?.roomtypename} • {room.count}{" "}
                          room(s)
                        </p>
                      </div>
                      <p className="text-lg font-bold text-[#59A5B2]" style={{ fontFamily: "Inter, sans-serif" }}>
                        ${room.price}/night
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Amenities ({amenities.available.length})
                </h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                  {amenities.available.map((a) => a.amenitiesname).join(", ") || "None selected"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Check-in / Check-out
                </h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                  Check-in: {amenities.checkInTime} • Check-out: {amenities.checkOutTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 px-6 h-12 border-2 border-[#59A5B2] text-[#59A5B2] font-semibold rounded-lg hover:bg-[#59A5B2]/5 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Back to Edit
              </button>
              <button
                onClick={handlePublish}
                disabled={isSubmitting}
                className={`flex-1 px-6 h-12 rounded-lg font-semibold transition-all ${isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#59A5B2] text-white hover:bg-[#4a8a95] shadow-md hover:shadow-lg"
                  }`}
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="button-publish"
              >
                {isSubmitting ? "Publishing..." : "Publish Property"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <ProgressSteps currentStep={3} totalSteps={3} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#2e2e2e]"
              style={{ fontFamily: "Poppins, sans-serif" }}
              data-testid="heading-step3"
            >
              Rooms, Amenities & Policies
            </h1>
            <p className="text-lg text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
              Add rooms, select amenities, safety features, and set your property policies
            </p>
          </div>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                Rooms
              </h2>
              <button
                onClick={addRoom}
                className="flex items-center gap-2 px-4 h-10 bg-[#59A5B2] text-white rounded-lg hover:bg-[#4a8a95] transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="button-add-room"
              >
                <Plus className="w-5 h-5" />
                Add Room
              </button>
            </div>

            {rooms.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <Bed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                  No rooms added yet. Click "Add Room" to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {rooms.map((room, index) => (
                  <div key={room.id} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 relative">
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                      data-testid={`button-remove-room-${room.id}`}
                      title="Remove Room"
                    >
                      <Trash2 className="w-5 h-5 text-red-600 hover:text-red-700" />
                    </button>
                   
                    <div>
                      <h3
                        className="text-lg font-semibold text-gray-900 pr-10"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Room {index + 1}
                        
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Room Name *
                        </label>
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => {
                            const value = e.target.value
                            updateRoom(room.id, "name", value)
                            if (!value.trim()) {
                              setErrors({ ...errors, [`room-${room.id}-name`]: "Room name is required" })
                            } else {
                              setErrors({ ...errors, [`room-${room.id}-name`]: "" })
                            }
                          }}
                          onBlur={(e) => {
                            const value = e.target.value.trim()
                            if (!value) {
                              setErrors({ ...errors, [`room-${room.id}-name`]: "Room name is required" })
                            }
                          }}
                          placeholder="e.g., Deluxe Suite"
                          className={`w-full h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${errors[`room-${room.id}-name`] ? "border-red-500" : "border-gray-300"
                            }`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                          data-testid={`input-room-name-${room.id}`}
                        />
                        {errors[`room-${room.id}-name`] && (
                          <p className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                            {errors[`room-${room.id}-name`]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Room Type *
                        </label>
                        <StyledSelect
                          options={roomTypes.map((type) => ({
                            value: type.roomtypeid.toString(),
                            label: type.roomtypename || "",
                          }))}
                          value={room.roomtypeid.toString()}
                          onChange={(value) => {
                            updateRoom(room.id, "roomtypeid", Number.parseInt(value))
                            if (!value) {
                              setErrors({ ...errors, [`room-${room.id}-roomtypeid`]: "Room type is required" })
                            } else {
                              setErrors({ ...errors, [`room-${room.id}-roomtypeid`]: "" })
                            }
                          }}
                          placeholder="Select type"
                          hasError={!!errors[`room-${room.id}-roomtypeid`]}
                          testId={`select-room-type-${room.id}`}
                        />
                        {errors[`room-${room.id}-roomtypeid`] && (
                          <p className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                            {errors[`room-${room.id}-roomtypeid`]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Room Count *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={room.count}
                          onChange={(e) => {
                            const value = e.target.value
                            const numValue = Number.parseInt(value)
                            updateRoom(room.id, "count", numValue || 0)
                            if (!value || isNaN(numValue) || numValue < 1) {
                              setErrors({ ...errors, [`room-${room.id}-count`]: "Room count must be at least 1" })
                            } else if (value.length > 3 || numValue > 999) {
                              setErrors({ ...errors, [`room-${room.id}-count`]: "Room count cannot exceed 999" })
                            } else {
                              setErrors({ ...errors, [`room-${room.id}-count`]: "" })
                            }
                          }}
                          className={`w-full h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${errors[`room-${room.id}-count`] ? "border-red-500" : "border-gray-300"
                            }`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                          data-testid={`input-room-count-${room.id}`}
                        />
                        {errors[`room-${room.id}-count`] && (
                          <p className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                            {errors[`room-${room.id}-count`]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Price (CAD/night) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="99999"
                          step="0.01"
                          value={room.price}
                          onChange={(e) => {
                            const value = e.target.value.trim()
                            updateRoom(room.id, "price", value)
                            const numValue = Number.parseFloat(value)
                            const digitsOnly = value.split(".")[0]
                            if (!value || isNaN(numValue) || numValue <= 0) {
                              setErrors({ ...errors, [`room-${room.id}-price`]: "Valid price required" })
                            } else if (digitsOnly.length > 5) {
                              setErrors({ ...errors, [`room-${room.id}-price`]: "Price cannot exceed 5 digits" })
                            } else if (numValue > 99999) {
                              setErrors({ ...errors, [`room-${room.id}-price`]: "Price cannot exceed $99,999" })
                            } else {
                              setErrors({ ...errors, [`room-${room.id}-price`]: "" })
                            }
                          }}
                          placeholder="0.00"
                          className={`w-full h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${errors[`room-${room.id}-price`] ? "border-red-500" : "border-gray-300"
                            }`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                          data-testid={`input-room-price-${room.id}`}
                        />
                        {errors[`room-${room.id}-price`] && (
                          <p className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                            {errors[`room-${room.id}-price`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                        Room Pictures (2 images required) *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-xs text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                            Image 1 *
                          </p>
                          {!room.image1Preview ? (
                            <div className="relative aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#59A5B2] transition-colors">
                              <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleRoomImage(room.id, "image1", file)
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                data-testid={`input-room-image1-${room.id}`}
                              />
                              <Upload className="w-8 h-8 text-[#59A5B2] mb-2" />
                              <p
                                className="text-xs text-gray-600 text-center px-2"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                JPG/PNG, max 2MB
                              </p>
                            </div>
                          ) : (
                            <div className="relative aspect-video rounded-lg overflow-hidden group">
                              <img
                                src={room.image1Preview || "/placeholder.svg"}
                                alt="Room Image 1"
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => {
                                  updateRoom(room.id, "image1", null)
                                  updateRoom(room.id, "image1Preview", "")
                                }}
                                className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                data-testid={`button-remove-image1-${room.id}`}
                              >
                                <X className="w-5 h-5 text-gray-700" />
                              </button>
                            </div>
                          )}
                          {errors[`room-${room.id}-image1`] && (
                            <p className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                              {errors[`room-${room.id}-image1`]}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                            Image 2 *
                          </p>
                          {!room.image2Preview ? (
                            <div className="relative aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#59A5B2] transition-colors">
                              <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleRoomImage(room.id, "image2", file)
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                data-testid={`input-room-image2-${room.id}`}
                              />
                              <Upload className="w-8 h-8 text-[#59A5B2] mb-2" />
                              <p
                                className="text-xs text-gray-600 text-center px-2"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                JPG/PNG, max 2MB
                              </p>
                            </div>
                          ) : (
                            <div className="relative aspect-video rounded-lg overflow-hidden group">
                              <img
                                src={room.image2Preview || "/placeholder.svg"}
                                alt="Room Image 2"
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => {
                                  updateRoom(room.id, "image2", null)
                                  updateRoom(room.id, "image2Preview", "")
                                }}
                                className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                data-testid={`button-remove-image2-${room.id}`}
                              >
                                <X className="w-5 h-5 text-gray-700" />
                              </button>
                            </div>
                          )}
                          {errors[`room-${room.id}-image2`] && (
                            <p className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                              {errors[`room-${room.id}-image2`]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              Available Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {amenitiesData.map((amenity) => (
                <label
                  key={amenity.amenitiesid}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${amenities.available.some((a) => a.amenitiesid === amenity.amenitiesid)
                    ? "border-[#59A5B2] bg-[#59A5B2]/5"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={amenities.available.some((a) => a.amenitiesid === amenity.amenitiesid)}
                    onChange={() => toggleAmenity(amenity)}
                    className="w-4 h-4 text-[#59A5B2] rounded focus:ring-[#59A5B2]"
                  />
                  <span className="text-sm text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                    {amenity.amenitiesname}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {amenities.available.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Featured Amenities
                </h2>
                <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  Select up to 3 amenities to feature ({amenities.featured.length}/3 selected)
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenities.available.map((amenity) => (
                  <label
                    key={amenity.amenitiesid}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${amenities.featured.some((a) => a.amenitiesid === amenity.amenitiesid)
                      ? "border-[#59A5B2] bg-[#59A5B2]/5"
                      : "border-gray-300 hover:border-gray-400"
                      } ${amenities.featured.length >= 3 && !amenities.featured.some((a) => a.amenitiesid === amenity.amenitiesid) ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={amenities.featured.some((a) => a.amenitiesid === amenity.amenitiesid)}
                      onChange={() => toggleFeatured(amenity)}
                      disabled={
                        amenities.featured.length >= 3 &&
                        !amenities.featured.some((a) => a.amenitiesid === amenity.amenitiesid)
                      }
                      className="w-4 h-4 text-[#59A5B2] rounded focus:ring-[#59A5B2] disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                      {amenity.amenitiesname}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              Safety & Property Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {safetyFeaturesData.map((feature) => (
                <label
                  key={feature.safetyfeaturesid}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${amenities.safety.some((s) => s.safetyfeaturesid === feature.safetyfeaturesid)
                    ? "border-[#59A5B2] bg-[#59A5B2]/5"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={amenities.safety.some((s) => s.safetyfeaturesid === feature.safetyfeaturesid)}
                    onChange={() => toggleSafety(feature)}
                    className="w-4 h-4 text-[#59A5B2] rounded focus:ring-[#59A5B2]"
                  />
                  <span className="text-sm text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                    {feature.safetyfeaturesname}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              Check-In / Check-Out Times
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                  Check-in Time *
                </label>
                <StyledSelect
                  options={timeOptions.map((time) => ({
                    value: time,
                    label: time,
                  }))}
                  value={amenities.checkInTime}
                  onChange={(value) => {
                    setLocalAmenities({ ...amenities, checkInTime: value })
                    setErrors({ ...errors, checkInTime: "" })
                  }}
                  placeholder="Select time"
                  hasError={!!errors.checkInTime}
                  testId="select-checkin"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                  Check-out Time *
                </label>
                <StyledSelect
                  options={timeOptions.map((time) => ({
                    value: time,
                    label: time,
                  }))}
                  value={amenities.checkOutTime}
                  onChange={(value) => {
                    setLocalAmenities({ ...amenities, checkOutTime: value })
                    setErrors({ ...errors, checkOutTime: "" })
                  }}
                  placeholder="Select time"
                  hasError={!!errors.checkOutTime}
                  testId="select-checkout"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              Shared Spaces
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sharedSpacesData.map((space) => (
                <label
                  key={space.sharedspacesid}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${amenities.sharedSpaces.some((s) => s.sharedspacesid === space.sharedspacesid)
                    ? "border-[#59A5B2] bg-[#59A5B2]/5"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={amenities.sharedSpaces.some((s) => s.sharedspacesid === space.sharedspacesid)}
                    onChange={() => toggleSharedSpace(space)}
                    className="w-4 h-4 text-[#59A5B2] rounded focus:ring-[#59A5B2]"
                  />
                  <span className="text-sm text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                    {space.sharedspacesname}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              House Rules & Policies
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                  Rules & Policies
                </label>
                <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                  {amenities.rules.length}/500
                </span>
              </div>
              <textarea
                value={amenities.rules}
                onChange={(e) => setLocalAmenities({ ...amenities, rules: e.target.value })}
                maxLength={500}
                rows={6}
                placeholder="Enter your property rules and policies..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] resize-none"
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="textarea-rules"
              />
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 h-12 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveExit}
                className="px-6 h-12 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="button-save-exit"
              >
                Save & Exit
              </button>

              <button
                onClick={() => setShowPreview(true)}
                disabled={!canProceed()}
                className={`px-8 h-12 rounded-lg font-semibold transition-all ${canProceed()
                  ? "bg-[#59A5B2] text-white hover:bg-[#4a8a95] shadow-md hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="button-preview"
              >
                Preview & Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
