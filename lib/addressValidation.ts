// Shared address validation utilities for Canadian addresses
// Used across signup, owner verification, and add property flows

export const canadianPostalRegex = /^[A-Z]\d[A-Z][ ]?\d[A-Z]\d$/;
export const canadianAddressRegex = /^\d+\s+[A-Za-z0-9\s,'-]+$/;
export const MAX_PHONE_LEN = 10;

export const sanitizePhone = (s: string) =>
  s.replace(/\D/g, "").slice(0, MAX_PHONE_LEN);

export const formatPostalCode = (value: string): string => {
  const cleaned = value.toUpperCase().replace(/\s/g, "");
  if (cleaned.length >= 4) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
  }
  return cleaned;
};

export const validateCanadianPostal = (value: string): boolean => {
  return canadianPostalRegex.test(value.toUpperCase());
};

export const validateCanadianAddress = (value: string): boolean => {
  return canadianAddressRegex.test(value);
};

export const CA_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];
