"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProperty } from "../PropertyContext";
import { ProgressSteps } from "../components/ProgressSteps";
import { provinceToCities } from "@/lib/province-to-cities";
import {
  CA_PROVINCES,
  validateCanadianAddress,
  validateCanadianPostal,
  formatPostalCode,
} from "@/lib/addressValidation";
import { OWNERSHIP_DOCUMENT_TYPES } from "@/types/property";
import { ChevronDown, Upload, X, MapPin, Home } from "lucide-react";
import StyledSelect from "@/components/StyledSelected";
import axios from "axios";


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL


interface CanadianProvince {
  canadian_province_id: number
  canadian_province_name: string
}

interface CanadianCity {
  canadian_city_id: number
  canadian_city_name: string
  canadian_province_id: number
}

interface OwnerResidentialDocPdfType {
  pdftypeid: number;
  pdftype: string;
  created_at?: string | Date;
}


interface UserProvince {
  canadian_province_id: number;
  canadian_province_name: string;
}

interface UserCity {
  canadian_city_id: number;
  canadian_city_name: string;
  canadian_province_id: number;
}

export default function Step1Page() {
  const router = useRouter();
  // --- 1. VIDEO REF SETUP ---
  const videoRef = useRef<HTMLVideoElement>(null);


  const [canadianProvinces, setCanadianProvinces] = useState<CanadianProvince[]>([]);
  const [canadianCities, setCanadianCities] = useState<CanadianCity[]>([]);
  const [ownerDocPdfTypes, setownerDocPdfTypes] = useState<OwnerResidentialDocPdfType[]>([]);
  const [errorMessage, seterrorMessage] = useState("");




  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Reduces speed to 50%
    }
  }, []);





  // ---------------------------
  const { location, setLocation, nextStep, saveAsDraft } = useProperty();

  const [selectedOption, setSelectedOption] = useState<1 | 2 | null>(
    location.useProfileAddress ? 1 : location.province ? 2 : null
  );
  const [formData, setFormData] = useState({
    province: location.province,
    city: location.city,
    street: location.street,
    postalCode: location.postalCode,
    documentType: location.ownershipDocument?.type || "",
    documentFile: location.ownershipDocument?.file || null,
    documentPreview: location.ownershipDocument?.preview || "",
    canadian_provinceid: "",
    canadian_cityid: "",



  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  // Profile address (mock data - in production, fetch from user profile)
  interface profileAddressSchema {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    province_id: string,
    city_id: string

  };

  const [profileAddress, setprofileAddress] = useState<profileAddressSchema>({
    street: "",
    city: "",
    province: "",
    postalCode: "",
    province_id: "",
    city_id: "",
  });

  const cities = formData.province
    ? provinceToCities[formData.province] || []
    : [];


  const fetchownerDocTypes = async () => {
    try {

      const response2 = await axios.get(`${baseUrl}/owner/ownerdocpdftypes`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response2.status === 200) {
        const data2 = response2.data;
        setownerDocPdfTypes(data2.data);
        console.log("Fetched owner ID document picture types:", data2.data);
      }


    } catch (error) {
      console.error("Error fetching document types:", error);
    }
  }


  const fetchCanadianProvinces = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/getCanadianProvinces`)
      const data = await response.json()
      setCanadianProvinces(data.provinces || [])

    } catch (error) {
      console.error("Error fetching Canadian provinces:", error)
    }
  }


  useEffect(() => {
    if (formData.province) {
      fetch(`${baseUrl}/auth/getCanadianCities/${formData.canadian_provinceid}`)//id
        .then((res) => res.json())
        .then((data) => setCanadianCities(data.cities || []))
        .catch((err) => console.error("Error loading cities:", err));
    }

  }, [formData.canadian_provinceid]);






  const [userProvince, setuserProvince] = useState<UserProvince[]>([]);
  const [userCity, setuserCity] = useState<UserCity[]>([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/auth/me`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        const userData = response.data.user.user;
        console.log("User data response:", userData);


        let province_name: any;
        let city_name: any;


        try {
          const response = await fetch(`${baseUrl}/auth/getCanadianProvinces/${Number(userData.canadian_provinceid)}`)
          const data = await response.json()
          data.provinces.map((d: any) => {
            console.log(d.canadian_province_name)
            province_name = d.canadian_province_name;
          })

          //provinces ki magachmari end


          const response2 = await fetch(`${baseUrl}/auth/getCanadianCities/${userData.canadian_provinceid}`)
          const data2 = await response2.json()

          console.log(data2)


          data2.cities.map((d: any) => {

            city_name = d.canadian_city_name;
          })

          const response3 = await fetch(`${baseUrl}/auth/specificProvinceById/${userData.canadian_provinceid}`);
          const data3 = await response3.json();


          const response4 = await fetch(`${baseUrl}/auth/specificCityById/${userData.canadian_cityid}`);
          const data4 = await response4.json();

          const provinceObj = data3?.province?.[0] || data3?.province; 
          const cityObj = data4?.city?.[0] || data4?.city; 

          console.log("cityObj1",cityObj)
           console.log("cityObj2",data4)

          setprofileAddress(prev => ({
            ...prev,
            street: userData.address || "",
            province_id: userData.canadian_provinceid,
            city_id: userData.canadian_cityid, // FIXED
            province: provinceObj?.canadian_province_name || "",
            postalCode: userData.postalcode || "",
            city: cityObj?.canadian_city_name || ""
          }));



        } catch (error) {
          console.error("Error fetching Canadian provinces:", error)
        }






        console.log("Fetched user data:", userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }



  useEffect(() => {
    fetchCanadianProvinces()
    fetchownerDocTypes();
    fetchUser();
  }, [])








  const handleOptionSelect = (option: 1 | 2) => {
    setSelectedOption(option);
    setErrors({});

    if (option === 1) {
      // Use profile address
      console.log("profileAddress///",profileAddress)


      setFormData({
        ...formData,
        province: profileAddress.province,
        city: profileAddress.city,
        street: profileAddress.street,
        postalCode: profileAddress.postalCode,
        documentType: "",
        documentFile: null,
        documentPreview: "",
        canadian_provinceid: profileAddress.province_id,
        canadian_cityid: profileAddress.city_id,
      });

    


    } else {
      // Reset for new location
      setFormData({
        province: "",
        city: "",
        street: "",
        postalCode: "",
        documentType: "",
        documentFile: null,
        documentPreview: "",
        canadian_provinceid: "",
        canadian_cityid: ""
      });
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== "application/pdf") {
      setErrors({ ...errors, document: "Only PDF files are accepted" });
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setErrors({ ...errors, document: "File size must be less than 3MB" });
      return;
    }

    setFormData({
      ...formData,
      documentFile: file,
      documentPreview: file.name,
    });
    setErrors({ ...errors, document: "" });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const removeDocument = () => {
    setFormData({
      ...formData,
      documentFile: null,
      documentPreview: "",
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Apply trim to all fields
    const trimmedStreet = formData.street.trim();
    const trimmedPostalCode = formData.postalCode.trim();

    if (!formData.province) newErrors.province = "Province is required";
    if (!formData.city) newErrors.city = "City is required";

    if (!trimmedStreet) {
      newErrors.street = "Street address is required";
    } else if (!validateCanadianAddress(trimmedStreet)) {
      newErrors.street =
        "Use a Canadian Street Address (e.g., 123 Queen Street W)";
    }

    if (!trimmedPostalCode) {
      newErrors.postalCode = "Postal code is required";
    } else if (!validateCanadianPostal(trimmedPostalCode)) {
      newErrors.postalCode = "Format: A1A 1A1";
    }

    if (!formData.documentType)
      newErrors.documentType = "Document type is required";
    if (!formData.documentFile)
      newErrors.document = "Ownership document is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canProceed = () => {
    if (!selectedOption) return false;
    if (selectedOption === 1) return true;

    return (
      formData.province &&
      formData.city &&
      formData.street &&
      validateCanadianAddress(formData.street) &&
      formData.postalCode &&
      validateCanadianPostal(formData.postalCode) &&
      formData.documentType &&
      formData.documentFile
    );
  };

  const handleNext = async () => {

    console.log(formData);

    if (selectedOption === 2) {
      if (!validateForm()) return;
    }

    setLocation({
      useProfileAddress: selectedOption === 1,
      province:
        selectedOption === 1 ? profileAddress.province : formData.province,
      city: selectedOption === 1 ? profileAddress.city : formData.city,
      street: selectedOption === 1 ? profileAddress.street : formData.street,
      postalCode:
        selectedOption === 1 ? profileAddress.postalCode : formData.postalCode,
      ownershipDocument:
        selectedOption === 2 && formData.documentFile
          ? {
            type: formData.documentType,
            file: formData.documentFile,
            preview: formData.documentPreview,
          }
          : undefined,
    });


    const formDataToSend = new FormData();

    formDataToSend.append("address", formData.street);
    formDataToSend.append("postalcode", formData.postalCode);

    formDataToSend.append("pdftypeid", formData.documentType);

    formDataToSend.append("canadian_cityid", formData.canadian_cityid);




    formDataToSend.append("canadian_provinceid", formData.canadian_provinceid);
    formDataToSend.append("propertylocationid", String(selectedOption ?? ""));


    if (formData.documentFile) {
      formDataToSend.append("residentialdocpdf", formData.documentFile);
    }


    console.log("profileAddress",formData)

    


    try {
      const response = await axios.post(
        `${baseUrl}/ownerProperty/step1`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );



      if (response.status === 201) {
        nextStep();



        router.push(
          `/owner/add-property/step-2?address=${encodeURIComponent(formData.street)}&postalcode=${encodeURIComponent(formData.postalCode)}&propertyid=${encodeURIComponent(response.data.data.propertyid)}`
        );
      }

      if (response.status === 200) {
        nextStep();
        alert(response.data.message)

        router.push(
          `/owner/add-property/step-2?address=${encodeURIComponent(formData.street)}&postalcode=${encodeURIComponent(formData.postalCode)}&propertyid=${encodeURIComponent(response.data.data.propertyid)}`
        );
      }



    } catch (error) {


      if (axios.isAxiosError(error)) {
        const message = (error.response as any)?.data?.message ?? error.message ?? "Submission failed. Please try again.";
        console.log(message);
        seterrorMessage(message);
        console.error("Submission error:", error);

      } else {
        console.error("Submission error:", error);
        alert("Submission error: Something went wrong!");

      }

    }





  };

  const handleSaveExit = () => {
    saveAsDraft();
    router.push("/owner");
  };


  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <ProgressSteps currentStep={1} totalSteps={3} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Form Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2e2e2e] leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
                data-testid="heading-step1"
              >
                Where would you like to list your property?
              </h1>
              <p
                className="text-lg md:text-xl text-gray-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Choose the location for your property listing
              </p>


              {errorMessage &&
                <p
                  className="text-lg md:text-xl text-red-600 bg-red-100 p-5 rounded-xl"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Alert!  {errorMessage}
                </p>
              }



            </div>






            {/* Option Cards */}
            <div className="space-y-4">
              {/* Option 1 - Profile Address */}
              <button
                onClick={() => handleOptionSelect(1)}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${selectedOption === 1
                  ? "border-[#59A5B2] bg-[#59A5B2]/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                data-testid="button-option-profile"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${selectedOption === 1 ? "bg-[#59A5B2]" : "bg-gray-100"
                      }`}
                  >
                    <Home
                      className={`w-6 h-6 ${selectedOption === 1 ? "text-white" : "text-gray-500"
                        }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-1"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      I am going to list property where I live
                    </h3>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      The address that I mentioned in my profile
                    </p>
                  </div>
                </div>
              </button>

              {/* Option 2 - New Location */}
              <button
                onClick={() => handleOptionSelect(2)}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${selectedOption === 2
                  ? "border-[#59A5B2] bg-[#59A5B2]/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                data-testid="button-option-new"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${selectedOption === 2 ? "bg-[#59A5B2]" : "bg-gray-100"
                      }`}
                  >
                    <MapPin
                      className={`w-6 h-6 ${selectedOption === 2 ? "text-white" : "text-gray-500"
                        }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-1"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      I am going to list property to a new location
                    </h3>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Enter a different address for this listing
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Option 1 Content - Profile Address (Readonly) */}
            {selectedOption === 1 && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4
                  className="text-base font-semibold text-gray-900 mb-4"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Your Profile Address
                </h4>
                <div
                  className="space-y-2 text-gray-700"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <p>{profileAddress.street}</p>
                  <p>
                    {profileAddress.city}, {profileAddress.province}
                  </p>
                  <p>{profileAddress.postalCode}</p>
                </div>
              </div>
            )}

            {/* Option 2 Content - New Address Form */}
            {selectedOption === 2 && (

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Province */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Province *
                    </label>




                    <StyledSelect
                      options={canadianProvinces.map((p) => ({
                        value: String(p.canadian_province_id),
                        label: p.canadian_province_name,
                      }))}
                      value={formData.canadian_provinceid}
                      onChange={(value) => {
                        // find the province name by selected id so province (used for cities lookup) remains the label
                        const selectedProvince = canadianProvinces.find(
                          (p) => String(p.canadian_province_id) === value
                        )?.canadian_province_name || "";

                        setFormData({
                          ...formData,
                          province: selectedProvince,
                          city: "",
                          canadian_provinceid: value,
                        });

                        // Immediate validation
                        if (!value) {
                          setErrors({
                            ...errors,
                            province: "Province is required",
                          });
                        } else {
                          setErrors({ ...errors, province: "" });
                        }
                      }}
                      placeholder="Select province"
                      hasError={!!errors.province}
                      testId="select-province"
                    />

                    {errors.province && (
                      <p
                        className="text-xs text-red-500"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {errors.province}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      City *
                    </label>
                    <StyledSelect
                      options={canadianCities.map((city) => ({
                        value: String(city.canadian_city_id),
                        label: city.canadian_city_name,
                      }))}

                      value={formData.canadian_cityid}

                      onChange={(value) => {
                        // find the province name by selected id so province (used for cities lookup) remains the label
                        const selectedCity = canadianCities.find(
                          (p) => String(p.canadian_city_id) === value
                        )?.canadian_city_name || "";

                        setFormData({
                          ...formData,

                          city: selectedCity,
                          canadian_cityid: value,
                        });

                        // Immediate validation
                        if (!value) {
                          setErrors({
                            ...errors,
                            province: "Province is required",
                          });
                        } else {
                          setErrors({ ...errors, province: "" });
                        }
                      }}

                      placeholder="Select city"
                      isDisabled={!formData.province}
                      hasError={!!errors.city}
                      testId="select-city"
                    />
                    {errors.city && (
                      <p
                        className="text-xs text-red-500"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, street: value });

                      // Immediate validation with Canadian address format
                      if (!value.trim()) {
                        setErrors({
                          ...errors,
                          street: "Street address is required",
                        });
                      } else if (!validateCanadianAddress(value)) {
                        setErrors({
                          ...errors,
                          street:
                            "Address must start with a number (e.g., 123 Queen Street W)",
                        });
                      } else {
                        setErrors({ ...errors, street: "" });
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      if (!value) {
                        setErrors({
                          ...errors,
                          street: "Street address is required",
                        });
                      } else if (!validateCanadianAddress(value)) {
                        setErrors({
                          ...errors,
                          street:
                            "Address must start with a number (e.g., 123 Queen Street W)",
                        });
                      }
                    }}
                    placeholder="e.g., 123 Queen Street W"
                    className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${errors.street ? "border-red-500" : "border-gray-300"
                      }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                    data-testid="input-street"
                  />
                  {errors.street && (
                    <p
                      className="text-xs text-red-500"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {errors.street}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => {
                      const formatted = formatPostalCode(e.target.value);
                      setFormData({ ...formData, postalCode: formatted });

                      // Immediate validation using validateCanadianPostal
                      if (!formatted) {
                        setErrors({
                          ...errors,
                          postalCode: "Postal code is required",
                        });
                      } else if (
                        formatted.length >= 3 &&
                        !validateCanadianPostal(formatted)
                      ) {
                        setErrors({
                          ...errors,
                          postalCode:
                            "Invalid postal code format (e.g., A1A 1A1)",
                        });
                      } else {
                        setErrors({ ...errors, postalCode: "" });
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setErrors({
                          ...errors,
                          postalCode: "Postal code is required",
                        });
                      } else if (!validateCanadianPostal(value)) {
                        setErrors({
                          ...errors,
                          postalCode:
                            "Invalid postal code format (e.g., A1A 1A1)",
                        });
                      }
                    }}
                    placeholder="A1A 1A1"
                    maxLength={7}
                    className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${errors.postalCode ? "border-red-500" : "border-gray-300"
                      }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                    data-testid="input-postal"
                  />
                  {errors.postalCode && (
                    <p
                      className="text-xs text-red-500"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                {/* Ownership Document Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h4
                    className="text-lg font-semibold text-gray-900 mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Ownership Document
                  </h4>

                  {/* Document Type */}
                  <div className="space-y-2 mb-4">
                    <label
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Document Type *
                    </label>
                    <StyledSelect
                      options={ownerDocPdfTypes.map((type) => ({
                        value: String(type.pdftypeid),
                        label: type.pdftype,
                      }))}
                      value={formData.documentType}








                      onChange={(value) => {
                        setFormData({ ...formData, documentType: value });

                        // Immediate validation
                        if (!value) {
                          setErrors({
                            ...errors,
                            documentType: "Document type is required",
                          });
                        } else {
                          setErrors({ ...errors, documentType: "" });
                        }
                      }}
                      placeholder="Select document type"
                      hasError={!!errors.documentType}
                      testId="select-document-type"
                    />
                    {errors.documentType && (
                      <p
                        className="text-xs text-red-500"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {errors.documentType}
                      </p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Upload Document (PDF, Max 3MB) *
                    </label>

                    {!formData.documentFile ? (
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                          e.preventDefault();
                          if (formData.documentType) setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${!formData.documentType
                          ? "bg-gray-50 border-gray-200 cursor-not-allowed"
                          : isDragging
                            ? "border-[#59A5B2] bg-[#59A5B2]/5"
                            : "border-gray-300 hover:border-[#59A5B2] hover:bg-gray-50 cursor-pointer"
                          }`}
                        data-testid="upload-document"
                      >
                        <input
                          type="file"
                          accept=".pdf"
                          disabled={!formData.documentType}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <Upload
                          className={`w-12 h-12 mx-auto mb-4 ${formData.documentType
                            ? "text-[#59A5B2]"
                            : "text-gray-300"
                            }`}
                        />
                        <p
                          className="text-base font-medium text-gray-700 mb-1"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {formData.documentType
                            ? "Drop your PDF here or click to browse"
                            : "Select document type first"}
                        </p>
                        <p
                          className="text-sm text-gray-500"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          PDF only, maximum 3MB
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-1 flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 text-xs font-bold">
                              PDF
                            </span>
                          </div>
                          <span
                            className="text-sm text-gray-700 truncate"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {formData.documentPreview}
                          </span>
                        </div>
                        <button
                          onClick={removeDocument}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                          data-testid="button-remove-document"
                        >
                          <X className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    )}

                    {errors.document && (
                      <p
                        className="text-xs text-red-500"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {errors.document}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Illustration */}
          <div className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] max-h-[600px]">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline

                className="w-full h-full ml-6 p-2"
                data-testid="video-hotel-illustration"
              >
                <source
                  src="/figmaAssets/hotel-animation1.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleSaveExit}
            className="px-6 h-12 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
            data-testid="button-save-exit"
          >
            Save & Exit
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-8 h-12 rounded-lg font-semibold transition-all ${canProceed()
              ? "bg-[#59A5B2] text-white hover:bg-[#4a8a95] shadow-md hover:shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            style={{ fontFamily: "Inter, sans-serif" }}
            data-testid="button-next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
