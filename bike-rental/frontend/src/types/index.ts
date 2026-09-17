export type VehicleCategory = 
  | 'ALL'
  | 'BIKE'
  | 'SCOOTER'
  | 'ELECTRIC_BIKE'
  | 'ELECTRIC_SCOOTER'
  | 'PETROL_CAR'
  | 'DIESEL_CAR'
  | 'ELECTRIC_CAR';

export interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  variant?: string;
  category?: string;
  vehicleType: VehicleCategory;
  fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC';
  transmission: 'MANUAL' | 'AUTOMATIC';
  seats: number;
  engineOrBattery: string;
  maxSpeed: number; // km/h
  zeroToHundred: number; // seconds
  pricePerHour: number; // ₹
  pricePerDay: number; // ₹
  pricePerWeek?: number; // ₹
  pricePerMonth: number; // ₹
  securityDeposit: number; // ₹
  insuranceFee?: number; // ₹
  mileageOrRange: string;
  rating: number;
  reviewCount?: number;
  tripsCompleted: number;
  imageUrl: string;
  colorHex: string;
  available: boolean;
  fleetUnitsAvailable?: number;
  features: string;
  cityNames: string;
  assetType?: 'GALLERY';
  galleryImageUrls?: string;
  model3dUrl?: string | null;
  model3dSource?: string | null;
  model3dLicense?: string | null;
  colourVariants?: VehicleColourVariant[];
  imageSource?: string;
  imageLicense?: string;
  imageAttribution?: string;
  assetVerified?: boolean;
  powerBhp?: number;
  torqueNm?: number;
  groundClearanceMm?: number;
  bootCapacityLitres?: number;
  // EV-Specific Telemetry
  isElectric?: boolean;
  batteryCapacityKwh?: number;
  chargingTimeHours?: number;
  fastChargingSupported?: boolean;
  fastChargingTimeMinutes?: number;
  chargingConnectorType?: string;
  motorPowerKw?: number;
  motorTorqueNm?: number;
  maskedRegistrationNumber?: string;
}

export interface ColorGalleryImage {
  imageUrl: string;
  label: string;
  order?: number;
}

export interface VehicleColourVariant {
  name: string;
  hex: string;
  manufacturer: string;
  photoStatus: 'AVAILABLE' | 'PHOTO_PENDING';
  verified: boolean;
  representativeImage?: string;
  galleryImages: string[];
  spin360Images?: string[];
  gallery?: ColorGalleryImage[];
  sourceInfo?: string;
}

export interface LocationHub {
  id: number;
  name: string;
  address: string;
  landmark: string;
  hubType: 'AIRPORT' | 'TECH_PARK' | 'METRO' | 'RAILWAY' | 'CITY_CENTER';
}

export interface City {
  id: number;
  name: string;
  state: string;
  stateCode?: string;
  active: boolean;
  hubs: LocationHub[];
}

export interface FleetUnit {
  id: number;
  registrationNumber?: string;
  maskedRegistrationNumber: string;
  cityName: string;
  hubName: string;
  stateCode: string;
  status: string;
  odometerKm?: number;
  demoIdentifier?: string;
  isDemoVehicle?: boolean;
}

export interface LicenseVerification {
  id?: number;
  status: 'NOT_SUBMITTED' | 'SUBMITTED' | 'PROCESSING' | 'CUSTOMER_CONFIRMATION_REQUIRED' | 'PENDING_ADMIN_REVIEW' | 'TBH_VERIFIED' | 'VERIFIED' | 'REJECTED' | 'REUPLOAD_REQUIRED' | 'EXPIRED' | 'MANUAL_REVIEW' | string;
  verificationStatus?: string;
  verified: boolean;
  user?: User;
  userId?: number;
  fullName?: string;
  licenseNumber?: string;
  documentUrl?: string;
  maskedLicenseNumber?: string;
  issuingState?: string;
  dateOfBirth?: string;
  expiryDate?: string;
  submittedAt?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  message?: string;
  provider?: string;
  extractedName?: string;
  extractedLicenseNumber?: string;
  extractedDob?: string;
  extractedIssueDate?: string;
  extractedExpiryDate?: string;
  extractedVehicleClasses?: string;
  ocrStatus?: 'OCR_SUCCESS' | 'OCR_INCOMPLETE' | 'OCR_UNAVAILABLE' | string;
  qrStatus?: 'QR_DETECTED' | 'QR_NOT_DETECTED' | 'QR_UNREADABLE' | string;
  documentQualityStatus?: 'PASSED' | 'WARNING' | 'FAILED' | string;
  formatStatus?: 'FORMAT_VALID' | 'FORMAT_SUSPICIOUS' | 'FORMAT_UNKNOWN' | string;
  expiryStatus?: 'VALID' | 'EXPIRED' | 'EXPIRES_SOON' | 'UNKNOWN' | string;
  classStatus?: 'ELIGIBLE_ALL' | 'ELIGIBLE_TWO_WHEELER_ONLY' | 'ELIGIBLE_FOUR_WHEELER_ONLY' | 'CLASS_UNKNOWN' | string;
  customerConfirmed?: boolean;
  reviewNotes?: string;
}

export interface PricingQuote {
  quoteId: string;
  vehicleId: number;
  vehicleName: string;
  rentalMode: string;
  duration: number;
  baseRate: number;
  baseAmount: number;
  discountAmount: number;
  insurancePlan: string;
  insuranceAmount: number;
  crossCityFee: number;
  cityDifferential: number;
  pickupCity?: string;
  dropCity?: string;
  expiresAt?: string;
  gstPercent: number;
  gstAmount: number;
  securityDeposit: number;
  totalAmount: number;
  currency: string;
  couponCode?: string;
  couponDiscount?: number;
  offerName?: string;
  offerDiscount?: number;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  mobileVerified?: boolean;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  drivingLicenseVerified: boolean;
  drivingLicenseNumber?: string;
  aadhaarNumber?: string;
  clerkUserId?: string;
  token?: string;
  refreshToken?: string;
}

export interface Booking {
  id: number;
  bookingReference: string;
  vehicle: Vehicle;
  user?: User;
  fleetUnit?: FleetUnit;
  pickupCity: string;
  dropCity?: string;
  pickupHub: string;
  dropHub: string;
  pickupDateTime: string;
  dropDateTime: string;
  rentalMode: 'HOURLY' | 'DAILY' | 'MONTHLY';
  duration: number;
  baseAmount: number;
  insuranceAmount: number;
  taxAmount: number;
  depositAmount: number;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'INITIATED' | 'PENDING' | 'PAID' | 'REFUNDED' | 'FAILED';
  paymentMethod: string;
  unlockPin?: string;
  razorpayOrderId?: string;
  razorpayKeyId?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface AdminMetrics {
  totalVehicles: number;
  availableVehicles: number;
  totalBookings: number;
  activeBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  fleetUtilizationRate: string;
  customerSatisfaction: string;
  confirmedBookings?: number;
  ongoingBookings?: number;
  completedBookings?: number;
  pendingKyc?: number;
  totalUsers?: number;
  activeCoupons?: number;
  openTickets?: number;
}

export interface Coupon {
  id: number;
  code: string;
  description?: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number;
  minBookingAmount?: number;
  minimumOrderAmount?: number;
  maxDiscount?: number;
  maxDiscountAmount?: number;
  expiresAt?: string;
  validUntil?: string;
  maxUses?: number;
  currentUses?: number;
  perUserLimit?: number;
  active: boolean;
  createdAt?: string;
}

export interface Offer {
  id: number;
  name: string;
  code?: string;
  description?: string;
  discountType?: 'PERCENTAGE' | 'FLAT';
  discountValue?: number;
  discountPercentage?: number;
  minBookingAmount?: number;
  maxDiscount?: number;
  startDate?: string;
  endDate?: string;
  validUntil?: string;
  maxUses?: number;
  currentUses?: number;
  perUserLimit?: number;
  applicableVehicleType?: string;
  applicableVehicleId?: number;
  applicableCity?: string;
  active: boolean;
  createdAt?: string;
}

export interface SupportTicket {
  id: number;
  ticketNumber: string;
  userId?: number;
  user?: User;
  bookingId?: number;
  category: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'RESOLVED' | 'CLOSED' | string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: number;
  ticketId?: number;
  senderId: number;
  senderRole: 'CUSTOMER' | 'ADMIN' | 'SYSTEM' | string;
  senderName?: string;
  message: string;
  isInternalNote: boolean;
  isAdminReply?: boolean;
  createdAt: string;
}

export interface AdminAuditLog {
  id: number;
  adminEmail: string;
  action: string;
  targetEntity: string;
  targetId?: string;
  entityType?: string;
  entityId?: string;
  details?: string;
  metadataJson?: string;
  createdAt: string;
}
