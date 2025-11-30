"use client";

import OwnerBarrierForm from "../components/OwnerVerificationForm";
import VerificationPanel from "../components/VerificationPanel";

export default function OwnerBarrierPage() {
  return (
    <main className="min-h-dvh bg-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
           {/* Right Section - Visual/Informative Area */}
          <div className="flex-1 animate-slideInRight ">
            <VerificationPanel />
          </div>
          {/* Left Section - Form Area */}
          <div className="flex-1 flex items-center justify-center animate-fadeIn">
            <div className="w-full max-w-[600px] bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <OwnerBarrierForm />
            </div>
          </div>

         
        </div>
      </div>
    </main>
  );
}

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const BRAND = "#59A5B2";
// const MAX_PHONE_LEN = 10;
// const sanitizePhone = (s: string) => s.replace(/\D/g, "").slice(0, MAX_PHONE_LEN);
// const nameRegex = /^[A-Za-z\s-]{1,50}$/;
// const displayNameRegex = /^[A-Za-z]{1,15}$/;
// const canadianPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i;

// interface CanadianProvince {
//   canadian_province_id: number;
//   canadian_province_name: string;
// }
// interface CanadianCity {
//   canadian_city_id: number;
//   canadian_city_name: string;
//   canadian_province_id: number;
// }

// export default function OwnerVerificationPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email") || "";
//   const fromGoogle = searchParams.get("from") === "google";

//   const [canadianProvinces, setCanadianProvinces] = useState<CanadianProvince[]>([]);
//   const [canadianCities, setCanadianCities] = useState<CanadianCity[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const [formData, setFormData] = useState({
//     legalName: "",
//     displayName: "",
//     email: email,
//     provinceId: "",
//     province: "",
//     cityId: "",
//     city: "",
//     address: "",
//     postalCode: "",
//     phone: "",
//     agreeOwnership: false,
//     agreeTerms: false,
//   });
// const [isFormValid, setIsFormValid] = useState(false);

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [photoIdFile, setPhotoIdFile] = useState<File | null>(null);
//   const [ownershipDocFile, setOwnershipDocFile] = useState<File | null>(null);
//   const [photoIdProgress, setPhotoIdProgress] = useState(0);
//   const [ownershipDocProgress, setOwnershipDocProgress] = useState(0);

//   const photoIdInputRef = useRef<HTMLInputElement>(null);
//   const ownershipDocInputRef = useRef<HTMLInputElement>(null);

//   const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const res = await fetch(`${baseUrl}/auth/getCanadianProvinces`);
//         const data = await res.json();
//         setCanadianProvinces(data.provinces || []);
//       } catch (err) {
//         console.error("Failed to load provinces");
//       }
//     };
//     fetchProvinces();
//   }, []);

//   useEffect(() => {
//     if (formData.provinceId) {
//       fetch(`${baseUrl}/auth/getCanadianCities/${formData.provinceId}`)
//         .then(res => res.json())
//         .then(data => setCanadianCities(data.cities || []))
//         .catch(() => setCanadianCities([]));
//     } else {
//       setCanadianCities([]);
//     }
//   }, [formData.provinceId]);

//   useEffect(() => {
//     if (!fromGoogle && email) {
//       // Simulate autofill from signup (in real app, fetch from /me)
//       const mockData = {
//         address: "123 Queen Street W",
//         postalCode: "M5H 2N2",
//         phone: "4165550123",
//         province: "Ontario",
//         city: "Toronto",
//       };
//       setFormData(prev => ({ ...prev, ...mockData }));
//     }
//   }, [email, fromGoogle]);

//   const setField = (field: string, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     validateField(field, value);
//   };

//   const validateField = (field: string, value: any): boolean => {
//     let msg = "";
//     const v = typeof value === "string" ? value.trim() : value;

//     switch (field) {
//       case "legalName":
//         if (!v) msg = "Legal name is required.";
//         else if (!nameRegex.test(v)) msg = "Letters, spaces, and hyphens only (max 50).";
//         break;
//       case "displayName":
//         if (v && !displayNameRegex.test(v)) msg = "Letters only (max 15).";
//         break;
//       case "address":
//         if (!v) msg = "Address is required.";
//         else if (!/^\d+\s+[A-Za-z0-9\s,'-]+$/.test(v)) msg = "Use format: 123 Queen Street W";
//         break;
//       case "province":
//       case "city":
//         if (!v) msg = "This field is required.";
//         break;
//       case "postalCode":
//         if (!v) msg = "Postal code is required.";
//         else if (!canadianPostalRegex.test(v)) msg = "Format: A1A 1A1";
//         break;
//       case "phone":
//         const digits = v.replace(/\D/g, "");
//         if (!digits) msg = "Phone number is required.";
//         else if (digits.length !== 10) msg = "Must be 10 digits.";
//         break;
//     }

//     setErrors(prev => ({ ...prev, [field]: msg }));
//     return msg === "";
//   };

//   const validateAll = () => {
//     const required = ["legalName", "address", "province", "city", "postalCode", "phone"];
//     const valid = required.every(f => validateField(f, formData[f as keyof typeof formData]));
//     const checkboxes = formData.agreeOwnership && formData.agreeTerms;
//     if (!checkboxes) {
//       setErrors(prev => ({
//         ...prev,
//         agreeOwnership: !formData.agreeOwnership ? "Required" : "",
//         agreeTerms: !formData.agreeTerms ? "Required" : "",
//       }));
//     }
//     return valid && checkboxes && photoIdFile && ownershipDocFile;
//   };

//   const handleFileUpload = (
//     file: File | null,
//     type: "photoId" | "ownershipDoc",
//     setFile: (f: File | null) => void,
//     setProgress: (p: number) => void
//   ) => {
//     if (!file) return;
//     if (type === "photoId" && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
//       setErrors(prev => ({ ...prev, photoId: "JPG/PNG only" }));
//       return;
//     }
//     if (type === "ownershipDoc" && file.type !== "application/pdf") {
//       setErrors(prev => ({ ...prev, ownershipDoc: "PDF only" }));
//       return;
//     }
//     if (type === "photoId" && file.size > 1 * 1024 * 1024) {
//       setErrors(prev => ({ ...prev, photoId: "Max 1MB" }));
//       return;
//     }
//     if (type === "ownershipDoc" && file.size > 5 * 1024 * 1024) {
//       setErrors(prev => ({ ...prev, ownershipDoc: "Max 5MB" }));
//       return;
//     }

//     setFile(file);
//     setErrors(prev => ({ ...prev, [type]: "" }));

//     // Simulate upload
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += 20;
//       setProgress(progress);
//       if (progress >= 100) {
//         clearInterval(interval);
//         setTimeout(() => setProgress(0), 500);
//       }
//     }, 200);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateAll()) return;

//     setIsSubmitting(true);
//     try {
//       // Simulate API call
//       await new Promise(r => setTimeout(r, 1500));

//       console.log("Verification payload:", {
//         email: formData.email,
//         legalName: formData.legalName,
//         displayName: formData.displayName || null,
//         province: formData.province,
//         city: formData.city,
//         address: formData.address,
//         postalCode: formData.postalCode,
//         phone: `+1${formData.phone.replace(/\D/g, "")}`,
//         photoId: photoIdFile?.name,
//         ownershipDoc: ownershipDocFile?.name,
//         agreeOwnership: formData.agreeOwnership,
//         agreeTerms: formData.agreeTerms,
//       });

//       setShowSuccess(true);
//       setTimeout(() => router.push("/owner-verification-success"), 2000);
//     } catch (err) {
//       setErrors(prev => ({ ...prev, submit: "Submission failed. Please try again." }));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputClass = (error?: string) =>
//     `w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-[#59A5B2] focus:outline-none transition`;

//   return (
//     <>
//       <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row">
//         {/* Left: Form */}
//         <main className="flex-1 flex items-center justify-center py-10 px-6 lg:px-12">
//           <div className="w-full max-w-[900px] mx-auto">
//             <form
//               noValidate
//               onSubmit={handleSubmit}
//               className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8 animate-fadeIn"
//             >
//               <div className="text-center mb-8">
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-['Poppins']">
//                   Owner Verification
//                 </h1>
//                 <p className="text-gray-600 mt-2">Complete your identity & ownership verification</p>
//               </div>

//               {/* Legal Name & Display Name */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Legal Full Name <span className="text-red-500">*</span>
//                     <span className="text-xs text-gray-500 block">As per government ID</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.legalName}
//                     onChange={e => setField("legalName", e.target.value)}
//                     onBlur={e => validateField("legalName", e.target.value)}
//                     className={inputClass(errors.legalName)}
//                     placeholder="John Doe"
//                   />
//                   {errors.legalName && <p className="text-xs text-red-500">{errors.legalName}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Display Name <span className="text-gray-400">(Optional)</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.displayName}
//                     onChange={e => setField("displayName", e.target.value)}
//                     onBlur={e => validateField("displayName", e.target.value)}
//                     className={inputClass(errors.displayName)}
//                     placeholder="John"
//                   />
//                   {errors.displayName && <p className="text-xs text-red-500">{errors.displayName}</p>}
//                 </div>
//               </div>

//               {/* Email (disabled) */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   disabled
//                   className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-gray-500 cursor-not-allowed"
//                 />
//               </div>

//               {/* Address Section */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-800">Property Address</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Province <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       value={formData.provinceId}
//                       onChange={e => {
//                         const id = e.target.value;
//                         const prov = canadianProvinces.find(p => p.canadian_province_id === parseInt(id));
//                         setField("provinceId", id);
//                         setField("province", prov?.canadian_province_name || "");
//                         setField("cityId", "");
//                         setField("city", "");
//                       }}
//                       onBlur={() => validateField("province", formData.province)}
//                       className={inputClass(errors.province)}
//                     >
//                       <option value="">Select province</option>
//                       {canadianProvinces.map(p => (
//                         <option key={p.canadian_province_id} value={p.canadian_province_id}>
//                           {p.canadian_province_name}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.province && <p className="text-xs text-red-500">{errors.province}</p>}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       City <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       value={formData.cityId}
//                       onChange={e => {
//                         const id = e.target.value;
//                         const city = canadianCities.find(c => c.canadian_city_id === parseInt(id));
//                         setField("cityId", id);
//                         setField("city", city?.canadian_city_name || "");
//                       }}
//                       onBlur={() => validateField("city", formData.city)}
//                       disabled={!formData.provinceId}
//                       className={inputClass(errors.city)}
//                     >
//                       <option value="">
//                         {formData.provinceId ? "Select city" : "Select province first"}
//                       </option>
//                       {canadianCities.map(c => (
//                         <option key={c.canadian_city_id} value={c.canadian_city_id}>
//                           {c.canadian_city_name}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Street Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.address}
//                     onChange={e => setField("address", e.target.value)}
//                     onBlur={e => validateField("address", e.target.value)}
//                     className={inputClass(errors.address)}
//                     placeholder="123 Queen Street W"
//                   />
//                   {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Postal Code <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       maxLength={7}
//                       value={formData.postalCode}
//                       onChange={e => setField("postalCode", e.target.value.toUpperCase())}
//                       onBlur={e => validateField("postalCode", e.target.value)}
//                       className={inputClass(errors.postalCode)}
//                       placeholder="M5A 1A1"
//                     />
//                     {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode}</p>}
//                   </div>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Mobile Phone <span className="text-red-500">*</span>
//                     </label>
//                     <div className="flex">
//                       <span className="inline-flex items-center px-3 text-sm bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-700">
//                         +1
//                       </span>
//                       <input
//                         type="tel"
//                         value={formData.phone}
//                         onChange={e => setField("phone", sanitizePhone(e.target.value))}
//                         onBlur={e => validateField("phone", e.target.value)}
//                         className={`${inputClass(errors.phone)} rounded-l-none border-l-0`}
//                         placeholder="4165550123"
//                       />
//                     </div>
//                     {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
//                   </div>
//                 </div>
//               </div>

//               {/* File Uploads */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-800">Verification Documents</h3>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Government Issued Photo ID <span className="text-red-500">*</span>
//                     <span className="text-xs text-gray-500 block">
//                       Driver’s License, Passport, or Health Card (JPG/PNG, max 1MB)
//                     </span>
//                   </label>
//                   <div
//                     className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-[#59A5B2] transition"
//                     onClick={() => photoIdInputRef.current?.click()}
//                   >
//                     <input
//                       ref={photoIdInputRef}
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png"
//                       className="hidden"
//                       onChange={e => {
//                         const file = e.target.files?.[0] || null;
//                         handleFileUpload(file, "photoId", setPhotoIdFile, setPhotoIdProgress);
//                       }}
//                     />
//                     {photoIdFile ? (
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between bg-green-50 p-3 rounded">
//                           <div className="flex items-center gap-2">
//                             <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             <span className="text-sm text-green-800">{photoIdFile.name}</span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={e => {
//                               e.stopPropagation();
//                               setPhotoIdFile(null);
//                               if (photoIdInputRef.current) photoIdInputRef.current.value = "";
//                             }}
//                             className="text-red-600 hover:text-red-800"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                         {photoIdProgress > 0 && photoIdProgress < 100 && (
//                           <div className="w-full bg-gray-200 rounded-full h-2">
//                             <div
//                               className="bg-[#59A5B2] h-2 rounded-full transition-all"
//                               style={{ width: `${photoIdProgress}%` }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <p className="text-sm text-gray-500">Click to upload photo ID</p>
//                     )}
//                   </div>
//                   {errors.photoId && <p className="text-xs text-red-500">{errors.photoId}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Residential Ownership Document <span className="text-red-500">*</span>
//                     <span className="text-xs text-gray-500 block">
//                       Gas/Electricity Bill, Internet Bill, or Bank Statement (PDF, max 5MB)
//                     </span>
//                   </label>
//                   <div
//                     className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-[#59A5B2] transition"
//                     onClick={() => ownershipDocInputRef.current?.click()}
//                   >
//                     <input
//                       ref={ownershipDocInputRef}
//                       type="file"
//                       accept="application/pdf"
//                       className="hidden"
//                       onChange={e => {
//                         const file = e.target.files?.[0] || null;
//                         handleFileUpload(file, "ownershipDoc", setOwnershipDocFile, setOwnershipDocProgress);
//                       }}
//                     />
//                     {ownershipDocFile ? (
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between bg-green-50 p-3 rounded">
//                           <div className="flex items-center gap-2">
//                             <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             <span className="text-sm text-green-800">{ownershipDocFile.name}</span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={e => {
//                               e.stopPropagation();
//                               setOwnershipDocFile(null);
//                               if (ownershipDocInputRef.current) ownershipDocInputRef.current.value = "";
//                             }}
//                             className="text-red-600 hover:text-red-800"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                         {ownershipDocProgress > 0 && ownershipDocProgress < 100 && (
//                           <div className="w-full bg-gray-200 rounded-full h-2">
//                             <div
//                               className="bg-[#59A5B2] h-2 rounded-full transition-all"
//                               style={{ width: `${ownershipDocProgress}%` }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <p className="text-sm text-gray-500">Click to upload ownership document</p>
//                     )}
//                   </div>
//                   {errors.ownershipDoc && <p className="text-xs text-red-500">{errors.ownershipDoc}</p>}
//                 </div>
//               </div>

//               {/* Checkboxes */}
//               <div className="space-y-4">
//                 <label className="flex items-start gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.agreeOwnership}
//                     onChange={e => setField("agreeOwnership", e.target.checked)}
//                     className="mt-1 h-4 w-4 accent-[#59A5B2] rounded"
//                   />
//                   <span className="text-sm text-gray-700">
//                     I confirm I am the lawful owner or authorized representative of this property. <span className="text-red-500">*</span>
//                   </span>
//                 </label>
//                 {errors.agreeOwnership && <p className="text-xs text-red-500 -mt-2">{errors.agreeOwnership}</p>}

//                 <label className="flex items-start gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.agreeTerms}
//                     onChange={e => setField("agreeTerms", e.target.checked)}
//                     className="mt-1 h-4 w-4 accent-[#59A5B2] rounded"
//                   />
//                   <span className="text-sm text-gray-700">
//                     I agree to the <a href="#" className="text-[#59A5B2] hover:underline">Terms & Conditions</a> and <a href="#" className="text-[#59A5B2] hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span>
//                   </span>
//                 </label>
//                 {errors.agreeTerms && <p className="text-xs text-red-500 -mt-2">{errors.agreeTerms}</p>}
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-6">
//                 <button
//                   type="button"
//                   className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
//                   onClick={() => router.back()}
//                 >
//                   Save as Draft
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !isFormValid}

//                   className="flex-1 py-3 px-6 bg-[#59A5B2] text-white font-semibold rounded-md hover:bg-[#4a8e9b] transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit for Verification"}
//                 </button>
//               </div>

//               {errors.submit && <p className="text-sm text-red-600 text-center">{errors.submit}</p>}
//             </form>
//           </div>
//         </main>

//         {/* Right: Illustration */}
//         <aside className="hidden md:flex md:basis-2/5 items-center justify-center bg-[#F1FAFB] p-12 animate-fadeIn">
//           <div className="text-center max-w-md">
//             <img
//               src="/verification-illustration.svg"
//               alt="Verification"
//               className="w-32 h-32 mx-auto mb-6"
//               onError={e => {
//                 e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%2359A5B2' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
//               }}
//             />
//             <h2 className="text-3xl font-bold text-gray-800 mb-3">Verify Your Identity</h2>
//             <p className="text-gray-600">
//               This will only take a couple of minutes. We’ll review your documents within 24 hours.
//             </p>
//           </div>
//         </aside>
//       </div>

//       {showSuccess && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
//           <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
//             <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">Verification Submitted!</h3>
//             <p className="text-gray-600">We’ll review your documents and notify you soon.</p>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out;
//         }
//       `}</style>
//     </>
//   );
// }
