


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Select from "react-select"
import axios from "axios"
import FileUpload from "./FileUpload"
import { ca } from "zod/v4/locales"
import { Alert } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"

type OwnerBarrierErrors = Partial<{
  legalName: string
  displayName: string
  email: string
  province: string
  city: string
  address: string
  postalCode: string
  phone: string
  photoId: string
  ownershipDoc: string
  agreeOwnership: string
  agreeTerms: string
  idType: string
  proofType: string
}>

const BRAND = "#59A5B2"
const canadianPostalRegex = /^[A-Z]\d[A-Z][ ]?\d[A-Z]\d$/
const MAX_PHONE_LEN = 10

const sanitizePhone = (s: string) => s.replace(/\D/g, "").slice(0, MAX_PHONE_LEN)

const nameRegex = /^[A-Za-z\s-]{1,50}$/
const nameSanitize = (s: string) =>
  s
    .replace(/[^A-Za-z\s-]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 50)

const displayNameRegex = /^[A-Za-z\s]{1,15}$/
const displayNameSanitize = (s: string) =>
  s
    .replace(/[^A-Za-z\s]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 15)

const canadianAddressRegex = /^\d+\s+[A-Za-z0-9\s,'-]+$/

interface CanadianProvince {
  canadian_province_id: number
  canadian_province_name: string
}

interface CanadianCity {
  canadian_city_id: number
  canadian_city_name: string
  canadian_province_id: number
}

interface FileData {
  id: string
  file: File
  preview?: string
}


interface OwnerIdDocPicType {
  pictypeid: number;
  pictype: string;
  created_at?: string | Date;
}

interface OwnerResidentialDocPdfType {
  pdftypeid: number;
  pdftype: string;
  created_at?: string | Date;
}




const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 48,
    borderColor: state.isFocused ? BRAND : "#e5e7eb",
    boxShadow: state.isFocused ? `0 0 0 1px ${BRAND}` : "none",
    "&:hover": { borderColor: BRAND },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? BRAND : state.isFocused ? "#f3f4f6" : "white",
    color: state.isSelected ? "white" : "#111827",
  }),
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function OwnerBarrierForm() {
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    legalName: "",
    displayName: "",
    email: "", // Pre-filled and disabled
    province: "",
    city: "",
    address: "",
    postalCode: "",
    phone: "",
    agreeOwnership: false,
    agreeTerms: false,
    canadian_provinceid: "",
    canadian_cityid: "",
    idType: "",
    idTypeName: "",
    proofType: "",
    proofTypeName: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState<{
    photoId: FileData | null
    ownershipDoc: FileData | null
  }>({
    photoId: null,
    ownershipDoc: null,
  })

  const [errors, setErrors] = useState<OwnerBarrierErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [canadianProvinces, setCanadianProvinces] = useState<CanadianProvince[]>([]);
  const [canadianCities, setCanadianCities] = useState<CanadianCity[]>([]);
  const [ownerIdDocPicTypes, setownerIdDocPicTypes] = useState<OwnerIdDocPicType[]>([]);
  const [ownerDocPdfTypes, setownerDocPdfTypes] = useState<OwnerResidentialDocPdfType[]>([]);


  const fetchownerDocTypes = async () => {
    try {
      const response1 = await axios.get(`${baseUrl}/owner/ownerdocpictypes`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response1.status === 200) {
        const data1 = response1.data;
        setownerIdDocPicTypes(data1.data);
        console.log("Fetched owner ID document picture types:", data1.data);
      }

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

  }, [formData.province]);



  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/auth/me`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        const userData = response.data.user.user;
        console.log("User data response:", userData);




        setFormData((prev) => ({
          ...prev,
          email: userData.email || "",
          legalName: userData.firstname + " " + userData.lastname || "",
          canadian_provinceid: userData.canadian_provinceid || "",

          canadian_cityid: userData.canadian_cityid || "",
          address: userData.address || "",
          postalCode: userData.postalcode || "",
          phone: userData.phoneno ? sanitizePhone(userData.phoneno.replace("+1", "")) : "",

        }));

        console.log("Fetched user data:", userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }


  // Fetch provinces on mount
  useEffect(() => {
    fetchCanadianProvinces()
    fetchownerDocTypes();
    fetchUser();
  }, [])




  useEffect(() => {

    if (formData.canadian_provinceid) {
      console.log("candain ", canadianProvinces);

      const canadianprov = canadianProvinces.find(
        (opt) => String(opt.canadian_province_id) == formData.canadian_provinceid
      );

      if (canadianprov) {

        setFormData((prev) => ({
          ...prev,
          province: canadianprov?.canadian_province_name || "",
        }));

      }
    }

    if (formData.canadian_cityid) {
      var canadiancities = canadianCities.find((opt) => String(opt.canadian_city_id) == formData.canadian_cityid);
      if (canadiancities) {
        setFormData((prev) => ({
          ...prev,
          city: canadiancities?.canadian_city_name || "",
        }));
      }
    }

  }, [canadianProvinces, canadianCities]);







  const setField = (field: keyof typeof formData, value: any) => {

    if (field === "legalName" && typeof value === "string") {
      value = nameSanitize(value)
    }
    if (field === "displayName" && typeof value === "string") {
      value = displayNameSanitize(value)
    }
    if (field === "phone" && typeof value === "string") {
      value = sanitizePhone(value)
    }
    if (field === "postalCode" && typeof value === "string") {
      value = value.toUpperCase()
    }

    if (field === "province") {
      setFormData((prev) => ({ ...prev, province: value, city: "" }))
      validateField("province", value)
      setErrors((e) => ({ ...e, city: "" }))
      return
    }

    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field !== "agreeOwnership" && field !== "agreeTerms") {
      validateField(field, value)
    } else {
      setErrors((e) => ({ ...e, [field]: "" }))
    }
  }

  const validateField = (field: keyof typeof formData, raw: any) => {
    const value = typeof raw === "string" ? raw.trim() : raw
    let msg = ""

    switch (field) {
      case "legalName": {
        const v = String(value)
        if (!v) msg = "Legal name is required."
        else if (!nameRegex.test(v)) msg = "Letters, spaces, and hyphens only. Max 50 characters."
        break
      }
      case "displayName": {
        const v = String(value)
        if (v && !displayNameRegex.test(v)) msg = "Letters and spaces only. Max 15 characters."
        break
      }
      case "email":
        if (!value) msg = "Email is required."
        break
      case "address": {
        const v = String(value)
        if (!v) msg = "Address is required."
        else if (!canadianAddressRegex.test(v)) {
          msg = "Use a Canadian street address (e.g., 123 Queen Street W)."
        }
        break
      }
      case "province":
      case "city":
        if (!value) msg = "This field is required."
        break
      case "postalCode": {
        const v = String(value).toUpperCase()
        if (!v) msg = "Postal code is required."
        else if (!canadianPostalRegex.test(v)) {
          msg = "Format: A1A 1A1"
        }
        break
      }
      case "phone": {
        const v = String(value)
        if (!v) msg = "Phone number is required."
        else if (!/^\d+$/.test(v)) msg = "Digits only."
        else if (v.length !== MAX_PHONE_LEN) msg = "Must be 10 digits."
        break
      }
    }

    setErrors((prev) => ({ ...prev, [field]: msg }))
    return msg === ""
  }

  const validateAll = () => {
    const fieldsToValidate: (keyof typeof formData)[] = [
      "legalName",
      "email",
      "province",
      "city",
      "address",
      "postalCode",
      "phone",
    ]

    const ok = fieldsToValidate.every((f) => validateField(f, formData[f]))

    const filesOk = uploadedFiles.photoId && uploadedFiles.ownershipDoc
    if (!filesOk) {
      setErrors((e) => ({
        ...e,
        photoId: !uploadedFiles.photoId ? "Photo ID is required." : "",
        ownershipDoc: !uploadedFiles.ownershipDoc ? "Ownership document is required." : "",
      }))
    }

    const checkboxesOk = formData.agreeOwnership && formData.agreeTerms
    if (!formData.agreeOwnership)
      setErrors((e) => ({
        ...e,
        agreeOwnership: "You must confirm ownership.",
      }))
    if (!formData.agreeTerms) setErrors((e) => ({ ...e, agreeTerms: "You must agree to the terms." }))

    return ok && filesOk && checkboxesOk
  }

  const inputClass = (invalid?: string) =>
    [
      "h-12",
      "border-gray-300",
      "focus:border-[#59A5B2]",
      "focus:ring-[#59A5B2]",
      invalid && "border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500",
    ]
      .filter(Boolean)
      .join(" ")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    setIsSubmitting(true);



    try {
      const formDataToSend = new FormData();

      formDataToSend.append("email", formData.email);
      formDataToSend.append("legalfullname", formData.legalName);
      formDataToSend.append("displayname", formData.displayName || formData.legalName);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("postalCode", formData.postalCode);
      formDataToSend.append("phone", `+1${formData.phone}`);
      formDataToSend.append("idType", formData.idType);
      formDataToSend.append("proofType", formData.proofType);
      formDataToSend.append("canadian_cityid", formData.canadian_cityid);
      formDataToSend.append("canadian_provinceid", formData.canadian_provinceid);

      // Talha - Append files
      
      if (uploadedFiles.photoId?.file) {
        formDataToSend.append("iddocpic", uploadedFiles.photoId.file);
      }
      if (uploadedFiles.ownershipDoc?.file) {
        formDataToSend.append("residentialdocpdf", uploadedFiles.ownershipDoc.file);
      }

      const response = await axios.post(
        `${baseUrl}/owner/ownerinfo`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        router.push("/owner/verification-success");
      }

    } catch (error: unknown) {
      // Safely handle unknown error (axios error or generic)
      if (axios.isAxiosError(error)) {
        const message = (error.response as any)?.data?.message ?? error.message ?? "Verification failed. Please try again.";
        console.log(message);
        console.error("Verification error:", error);
         setErrors((prev) => ({
        ...prev,
        email: message,
      }));
      } else {
        console.error("Verification error:", error);
         setErrors((prev) => ({
        ...prev,
        email: "Verification failed. Please try again.",
      }));
      }



     
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <form noValidate className="space-y-6" onSubmit={handleSubmit}>
        {/* Legal Full Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Legal Full Name <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-1">(As per Government Issued ID)</span>
          </Label>
          <Input
            placeholder="John Doe"
            value={formData.legalName}
            onChange={(e) => setField("legalName", e.target.value)}
            onBlur={(e) => validateField("legalName", e.target.value)}
            className={inputClass(errors.legalName)}
            aria-invalid={!!errors.legalName || undefined}
          />
          {errors.legalName && <p className="text-xs text-red-500 mt-1">{errors.legalName}</p>}
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Display Name <span className="text-xs text-gray-500 ml-1">(Optional)</span>
          </Label>
          <Input
            placeholder="John"
            value={formData.displayName}
            onChange={(e) => setField("displayName", e.target.value)}
            onBlur={(e) => validateField("displayName", e.target.value)}
            className={inputClass(errors.displayName)}
            aria-invalid={!!errors.displayName || undefined}
          />
          {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName}</p>}
        </div>

        {/* Email (Pre-filled & Disabled) */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            disabled
            className="h-12 bg-gray-100 text-gray-500 border-gray-300"
            title="Email verified via authentication"
          />
          <p className="text-xs text-green-600">✓ Email verified</p>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Province <span className="text-red-500">*</span>
            </Label>

            
            <Select
              instanceId="owner-province"
              options={canadianProvinces.map((p) => ({
                value: String(p.canadian_province_id),
                label: p.canadian_province_name,
              }))}
              value={
                canadianProvinces
                  .map((p) => ({
                    value: String(p.canadian_province_id),
                    label: p.canadian_province_name,
                  }))
                  .find((opt) => opt.value === String(formData.canadian_provinceid)) || null
              }
              onChange={(opt: any) => {
                setField("canadian_provinceid", opt ? Number.parseInt(opt.value) : "")
                setField("province", opt?.label || "")
              }}
              styles={selectStyles}
              placeholder="Select province"
            />



            {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </Label>
            <Select
              instanceId="owner-city"
              isDisabled={!formData.canadian_provinceid}
              options={(canadianCities || []).map((c) => ({
                value: String(c.canadian_city_id),
                label: c.canadian_city_name,
              }))}
              value={
                (canadianCities || [])
                  .map((c) => ({
                    value: String(c.canadian_city_id),
                    label: c.canadian_city_name,
                  }))
                  .find((opt) => opt.value === String(formData.canadian_cityid)) || null
              }
              onChange={(opt: any) => {
                setField("canadian_cityid", opt ? Number.parseInt(opt.value) : "")
                setField("city", opt?.label || "")
              }}
              styles={selectStyles}
              placeholder={formData.canadian_provinceid ? "Select city" : "Select province first"}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e) => setField("address", e.target.value)}
            onBlur={(e) => validateField("address", e.target.value)}
            className={inputClass(errors.address)}
            aria-invalid={!!errors.address || undefined}
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>



        {/* Postal Code & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Postal Code <span className="text-red-500">*</span>
            </Label>
            <Input
              maxLength={7}
              placeholder="A1A 1A1"
              value={formData.postalCode}
              onChange={(e) => setField("postalCode", e.target.value)}
              onBlur={(e) => validateField("postalCode", e.target.value)}
              className={inputClass(errors.postalCode)}
              aria-invalid={!!errors.postalCode || undefined}
            />
            {errors.postalCode && <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Mobile Phone <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-sm text-gray-700 select-none">
                +1
              </span>
              <Input
                type="tel"
                inputMode="numeric"
                maxLength={MAX_PHONE_LEN}
                placeholder="416 555 0123"
                value={formData.phone}
                onChange={(e) => setField("phone", e.target.value)}
                onBlur={(e) => validateField("phone", e.target.value)}
                className={`${inputClass(errors.phone)} rounded-l-none border-l-0`}
                aria-invalid={!!errors.phone || undefined}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-6 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Upload Documents</h3>



          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Government Issued ID Type <span className="text-red-500">*</span>
            </Label>

            <Select
              instanceId="id-type"
              options={ownerIdDocPicTypes.map((type) => ({
                value: String(type.pictypeid),
                label: type.pictype,
              }))
              }
              value={
                ownerIdDocPicTypes.map((o) => ({
                  value: String(o.pictypeid),
                  label: o.pictype,
                })).find((opt) => opt.value === formData.idType) || null
              }
              onChange={(opt: any) => {
                setField("idType", opt ? opt.value : "")
                setField("idTypeName", opt ? opt.label : "")
              }}
              styles={selectStyles}
              placeholder="Select ID type"
            />
            {errors.idType && <p className="text-xs text-red-500 mt-1">{errors.idType}</p>}
          </div>



          <FileUpload
            label="Government Issued Photo ID"
            description={formData.idTypeName}
            acceptedTypes={["image/jpeg", "image/png"]}
            maxSize={1}
            fileType="photoId"
            onFileSelect={(fileData) =>
              setUploadedFiles((prev) => ({
                ...prev,
                photoId: fileData,
              }))
            }
            error={errors.photoId}
            uploadedFile={uploadedFiles.photoId}
            disabled={!formData.idType}
          />

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Proof of Residence Type <span className="text-red-500">*</span>
            </Label>






            <Select
              instanceId="proof-type"
              options={ownerDocPdfTypes.map((type) => ({
                value: String(type.pdftypeid),
                label: type.pdftype,
              }))
              }

              value={
                ownerDocPdfTypes.map((o) => ({
                  value: String(o.pdftypeid),
                  label: o.pdftype,
                })).find((opt) => opt.value === formData.proofType) || null
              }

              onChange={(opt: any) => {
                setField("proofType", opt ? opt.value : "")
                setField("proofTypeName", opt ? opt.label : "")
              }}

              styles={selectStyles}
              placeholder="Select proof of residence"
            />










            {errors.proofType && <p className="text-xs text-red-500 mt-1">{errors.proofType}</p>}
          </div>



          <FileUpload
            label="Residential Ownership Document"
            description={formData.proofTypeName}
            acceptedTypes={["application/pdf"]}
            maxSize={3}
            fileType="ownershipDoc"
            onFileSelect={(fileData) =>
              setUploadedFiles((prev) => ({
                ...prev,
                ownershipDoc: fileData,
              }))
            }
            error={errors.ownershipDoc}
            uploadedFile={uploadedFiles.ownershipDoc}
            disabled={!formData.proofType}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <Checkbox
              id="ownership"
              checked={formData.agreeOwnership}
              onCheckedChange={(v) => setField("agreeOwnership", Boolean(v))}
              className="mt-1"
            />
            <Label htmlFor="ownership" className="text-sm text-gray-700 leading-relaxed">
              I confirm I am the lawful owner or authorized representative of this property.{" "}
              <span className="text-red-500">*</span>
            </Label>
          </div>
          {errors.agreeOwnership && <p className="text-xs text-red-500 ml-7">{errors.agreeOwnership}</p>}

          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(v) => setField("agreeTerms", Boolean(v))}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
              I agree to the{" "}
              <a href="#" className="hover:underline font-medium" style={{ color: BRAND }}>
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="hover:underline font-medium" style={{ color: BRAND }}>
                Privacy Policy
              </a>
              <span className="text-red-500">*</span>
            </Label>
          </div>
          {errors.agreeTerms && <p className="text-xs text-red-500 ml-7">{errors.agreeTerms}</p>}
        </div>

        {
          (errors.email) && (
            < div className="">
              <br />
              <p className="text-red-500">{errors.email}</p>
            </div>
          )
        }




        {/* Buttons */}
        <div className="flex gap-4 pt-6">

          <Button
            type="submit"
            className="flex-1 h-12 text-white font-semibold transition-colors"
            style={{ backgroundColor: BRAND }}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </Button>
        </div>
      </form >
    </div >
  )
}
