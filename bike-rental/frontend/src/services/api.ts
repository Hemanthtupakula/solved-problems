import { Vehicle, City, Booking, User, Coupon, Offer, SupportTicket, SupportMessage, AdminAuditLog, AdminMetrics } from '../types';
import { getVehicleColourVariants } from './vehicleColours';

export const INITIAL_CITIES: City[] = [
  {
    id: 1,
    name: "Hyderabad",
    state: "Telangana",
    stateCode: "TS",
    active: true,
    hubs: [
      { id: 201, name: "Rajiv Gandhi Intl Airport (HYD)", address: "Shamshabad Aeroplaza", landmark: "Arrival Bay 3", hubType: "AIRPORT" },
      { id: 202, name: "Hitech City Hub", address: "Cyber Towers Outer Ring", landmark: "Near Shilparamam Metro", hubType: "TECH_PARK" },
      { id: 203, name: "Gachibowli Hub", address: "Financial District Main Circle", landmark: "Near DLF Cyber City", hubType: "TECH_PARK" },
      { id: 204, name: "Jubilee Hills Hub", address: "Road No 36", landmark: "Metro Pillar 140", hubType: "CITY_CENTER" }
    ]
  },
  {
    id: 2,
    name: "Bengaluru",
    state: "Karnataka",
    stateCode: "KA",
    active: true,
    hubs: [
      { id: 101, name: "Kempegowda Intl Airport (BLR)", address: "Terminal 1 & 2 Mobility Zone", landmark: "Near Arrival Gate 4", hubType: "AIRPORT" },
      { id: 102, name: "Indiranagar Hub", address: "100 Feet Road, 12th Main", landmark: "Opposite Toit Brewery", hubType: "CITY_CENTER" },
      { id: 103, name: "Koramangala Hub", address: "80 Feet Road, 4th Block", landmark: "Near Sony World Signal", hubType: "CITY_CENTER" },
      { id: 104, name: "Whitefield IT Hub", address: "ITPL Main Road", landmark: "Next to Nexus Shantiniketan", hubType: "TECH_PARK" }
    ]
  },
  {
    id: 3,
    name: "Chennai",
    state: "Tamil Nadu",
    stateCode: "TN",
    active: true,
    hubs: [
      { id: 501, name: "Chennai Intl Airport (MAA)", address: "Meenambakkam Terminal 2", landmark: "Aerohub Level 1", hubType: "AIRPORT" },
      { id: 502, name: "T. Nagar Hub", address: "GN Chetty Road", landmark: "Opposite Panagal Park", hubType: "CITY_CENTER" },
      { id: 503, name: "OMR IT Corridor", address: "Thoraipakkam Toll Gate", landmark: "Near Ascendas IT Park", hubType: "TECH_PARK" }
    ]
  },
  {
    id: 4,
    name: "Mumbai",
    state: "Maharashtra",
    stateCode: "MH",
    active: true,
    hubs: [
      { id: 301, name: "Chhatrapati Shivaji Intl Airport (BOM)", address: "Terminal 2 Ground Transportation", landmark: "P4 Parking Level", hubType: "AIRPORT" },
      { id: 302, name: "Bandra Kurla Complex (BKC)", address: "G Block, BKC", landmark: "Near Jio World Drive", hubType: "TECH_PARK" },
      { id: 303, name: "South Mumbai Hub", address: "Nariman Point Marine Drive", landmark: "Opposite Air India Bldg", hubType: "CITY_CENTER" }
    ]
  },
  {
    id: 5,
    name: "Pune",
    state: "Maharashtra",
    stateCode: "MH",
    active: true,
    hubs: [
      { id: 701, name: "Pune Airport (PNQ)", address: "Lohegaon Terminal", landmark: "Arrival Bay 2", hubType: "AIRPORT" },
      { id: 702, name: "Hinjawadi IT Hub", address: "Phase 1 Circle", landmark: "Next to Infosys Gate 1", hubType: "TECH_PARK" },
      { id: 703, name: "Koregaon Park Hub", address: "North Main Road", landmark: "Lane 5 Corner", hubType: "CITY_CENTER" }
    ]
  },
  {
    id: 6,
    name: "Delhi NCR",
    state: "Delhi",
    stateCode: "DL",
    active: true,
    hubs: [
      { id: 401, name: "Indira Gandhi Intl Airport (DEL)", address: "Terminal 3 Multi-Level Hub", landmark: "P3 Car Park", hubType: "AIRPORT" },
      { id: 402, name: "Cyber Hub Gurugram", address: "DLF Cyber City Phase 2", landmark: "Near Rapid Metro", hubType: "TECH_PARK" },
      { id: 403, name: "Connaught Place Hub", address: "Inner Circle Block E", landmark: "Near Rajiv Chowk Metro", hubType: "CITY_CENTER" }
    ]
  },
  {
    id: 7,
    name: "Kolkata",
    state: "West Bengal",
    stateCode: "WB",
    active: true,
    hubs: [
      { id: 751, name: "Netaji Subhash Chandra Bose Airport (CCU)", address: "Dum Dum Terminal", landmark: "Ground Transport Bay 2", hubType: "AIRPORT" },
      { id: 752, name: "Salt Lake Sector V", address: "College More Tech Zone", landmark: "Near Webel Bhavan", hubType: "TECH_PARK" },
      { id: 753, name: "Park Street Hub", address: "Park Street Crossing", landmark: "Near Allen Park", hubType: "CITY_CENTER" }
    ]
  },
  {
    id: 8,
    name: "Goa",
    state: "Goa",
    stateCode: "GA",
    active: true,
    hubs: [
      { id: 601, name: "Manohar Intl Airport Mopa (GOX)", address: "North Goa Terminal", landmark: "Pickup Zone A", hubType: "AIRPORT" },
      { id: 602, name: "Dabolim Airport (GOI)", address: "South Goa Terminal", landmark: "Arrival Exit 2", hubType: "AIRPORT" },
      { id: 603, name: "Calangute Beach Hub", address: "Tito's Lane Junction", landmark: "Near St. Anthony Chapel", hubType: "CITY_CENTER" },
      { id: 604, name: "Panaji Waterfront Hub", address: "Miramar Circle", landmark: "Near Dayanand Bandodkar Marg", hubType: "CITY_CENTER" }
    ]
  },
  {
    id: 9,
    name: "Jaipur",
    state: "Rajasthan",
    stateCode: "RJ",
    active: true,
    hubs: [
      { id: 801, name: "Jaipur Intl Airport (JAI)", address: "Terminal 2 Pickups", landmark: "Gate 3", hubType: "AIRPORT" },
      { id: 802, name: "MI Road Hub", address: "Panch Batti Circle", landmark: "Near Raj Mandir", hubType: "CITY_CENTER" }
    ]
  },
  {
    id: 10,
    name: "Ahmedabad",
    state: "Gujarat",
    stateCode: "GJ",
    active: true,
    hubs: [
      { id: 851, name: "Sardar Vallabhbhai Patel Airport (AMD)", address: "Terminal 1 & 2 Pickup Bay", landmark: "Arrival Gate 2", hubType: "AIRPORT" },
      { id: 852, name: "SG Highway Tech Hub", address: "Prahlad Nagar Junction", landmark: "Near Titanium City Centre", hubType: "TECH_PARK" },
      { id: 853, name: "Navrangpura Hub", address: "CG Road", landmark: "Near Municipal Market", hubType: "CITY_CENTER" }
    ]
  },
  {
    id: 11,
    name: "Kochi",
    state: "Kerala",
    stateCode: "KL",
    active: true,
    hubs: [
      { id: 901, name: "Cochin Intl Airport (COK)", address: "Nedumbassery Solar Terminal", landmark: "Canopy Pillar 12", hubType: "AIRPORT" },
      { id: 902, name: "Infopark Kakkanad", address: "Kakkanad Express Corridor", landmark: "Phase 1 Gate", hubType: "TECH_PARK" },
      { id: 903, name: "Marine Drive Hub", address: "Shanmugham Road", landmark: "Near Rainbow Bridge", hubType: "CITY_CENTER" }
    ]
  }
];

const allCities = "Hyderabad,Bengaluru,Chennai,Mumbai,Pune,Delhi NCR,Kolkata,Goa,Jaipur,Ahmedabad,Kochi";

export const INITIAL_VEHICLES: Vehicle[] = [
  // 1. Honda Activa 6G
  {
    id: 1,
    name: "Honda Activa 6G",
    brand: "Honda",
    model: "Activa",
    variant: "Standard 6G",
    category: "SCOOTER",
    vehicleType: "SCOOTER",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "109.51 cc PGM-FI",
    maxSpeed: 85,
    zeroToHundred: 14.2,
    pricePerHour: 49,
    pricePerDay: 449,
    pricePerWeek: 2699,
    pricePerMonth: 7999,
    securityDeposit: 1000,
    insuranceFee: 49,
    mileageOrRange: "50 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/honda/activa-6g/hero.jpg",
    galleryImageUrls: "[\"/vehicles/honda/activa-6g/hero.jpg\", \"/vehicles/honda/activa-6g/angle-front-quarter.jpg\", \"/vehicles/honda/activa-6g/angle-side.jpg\", \"/vehicles/honda/activa-6g/angle-rear.jpg\", \"/vehicles/honda/activa-6g/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 3,
    features: "Silent Start ACG,Engine Start/Stop Switch,External Fuel Lid,Telescopic Suspension",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 7.79,
    torqueNm: 8.84,
    groundClearanceMm: 162,
    bootCapacityLitres: 18
  },
  // 2. Honda Activa 125
  {
    id: 2,
    name: "Honda Activa 125",
    brand: "Honda",
    model: "Activa 125",
    variant: "Disc Drum",
    category: "SCOOTER",
    vehicleType: "SCOOTER",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "124.0 cc ESP",
    maxSpeed: 90,
    zeroToHundred: 12.8,
    pricePerHour: 59,
    pricePerDay: 499,
    pricePerWeek: 2999,
    pricePerMonth: 8999,
    securityDeposit: 1200,
    insuranceFee: 59,
    mileageOrRange: "47 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/honda/activa-125/hero.jpg",
    galleryImageUrls: "[\"/vehicles/honda/activa-125/hero.jpg\", \"/vehicles/honda/activa-125/angle-front-quarter.jpg\", \"/vehicles/honda/activa-125/angle-side.jpg\", \"/vehicles/honda/activa-125/angle-rear.jpg\", \"/vehicles/honda/activa-125/angle-cockpit.jpg\"]",
    colorHex: "#D4AF37",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Idling Stop System,Digital-Analog Meter,Front Glove Box,LED Headlamp",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 8.30,
    torqueNm: 10.4,
    groundClearanceMm: 162,
    bootCapacityLitres: 18
  },
  // 3. Suzuki Access 125
  {
    id: 3,
    name: "Suzuki Access 125",
    brand: "Suzuki",
    model: "Access 125",
    variant: "Ride Connect Edition",
    category: "SCOOTER",
    vehicleType: "SCOOTER",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "124.0 cc SEP",
    maxSpeed: 92,
    zeroToHundred: 12.5,
    pricePerHour: 59,
    pricePerDay: 519,
    pricePerWeek: 3099,
    pricePerMonth: 9199,
    securityDeposit: 1200,
    insuranceFee: 59,
    mileageOrRange: "48 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/suzuki/access-125/hero.jpg",
    galleryImageUrls: "[\"/vehicles/suzuki/access-125/hero.jpg\", \"/vehicles/suzuki/access-125/angle-front-quarter.jpg\", \"/vehicles/suzuki/access-125/angle-side.jpg\", \"/vehicles/suzuki/access-125/angle-rear.jpg\", \"/vehicles/suzuki/access-125/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Bluetooth Digital Console,Turn-by-Turn Nav,Chrome Mirrors,External Fuel Cap",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 8.70,
    torqueNm: 10.0,
    groundClearanceMm: 160,
    bootCapacityLitres: 22
  },
  // 4. TVS Jupiter 125
  {
    id: 4,
    name: "TVS Jupiter 125",
    brand: "TVS",
    model: "Jupiter 125",
    variant: "Disc SmartXonnect",
    category: "SCOOTER",
    vehicleType: "SCOOTER",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "124.8 cc ET-Fi",
    maxSpeed: 90,
    zeroToHundred: 13.1,
    pricePerHour: 55,
    pricePerDay: 489,
    pricePerWeek: 2899,
    pricePerMonth: 8699,
    securityDeposit: 1000,
    insuranceFee: 50,
    mileageOrRange: "50 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/tvs/jupiter-125/hero.jpg",
    galleryImageUrls: "[\"/vehicles/tvs/jupiter-125/hero.jpg\", \"/vehicles/tvs/jupiter-125/angle-front-quarter.jpg\", \"/vehicles/tvs/jupiter-125/angle-side.jpg\", \"/vehicles/tvs/jupiter-125/angle-rear.jpg\", \"/vehicles/tvs/jupiter-125/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Largest 33L Under-Seat Storage,Front External Fuel Fill,Progressive LED Light",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 8.15,
    torqueNm: 10.5,
    groundClearanceMm: 163,
    bootCapacityLitres: 33
  },
  // 5. TVS Ntorq 125
  {
    id: 5,
    name: "TVS Ntorq 125",
    brand: "TVS",
    model: "Ntorq 125",
    variant: "Race XP Edition",
    category: "SCOOTER",
    vehicleType: "SCOOTER",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "124.8 cc 3-Valve",
    maxSpeed: 98,
    zeroToHundred: 9.8,
    pricePerHour: 69,
    pricePerDay: 599,
    pricePerWeek: 3499,
    pricePerMonth: 9999,
    securityDeposit: 1500,
    insuranceFee: 60,
    mileageOrRange: "42 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/tvs/ntorq-125/hero.jpg",
    galleryImageUrls: "[\"/vehicles/tvs/ntorq-125/hero.jpg\", \"/vehicles/tvs/ntorq-125/angle-front-quarter.jpg\", \"/vehicles/tvs/ntorq-125/angle-side.jpg\", \"/vehicles/tvs/ntorq-125/angle-rear.jpg\", \"/vehicles/tvs/ntorq-125/angle-cockpit.jpg\"]",
    colorHex: "#FF4B4B",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Dual Ride Modes (Race/Street),SmartXonnect Telemetry,Stealth Aircraft Exhaust Note",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 10.2,
    torqueNm: 10.8,
    groundClearanceMm: 155,
    bootCapacityLitres: 22
  },
  // 6. Hero Splendor Plus
  {
    id: 6,
    name: "Hero Splendor Plus",
    brand: "Hero",
    model: "Splendor Plus",
    variant: "XTEC 2.0",
    category: "COMMUTER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "97.2 cc Single-Cylinder",
    maxSpeed: 87,
    zeroToHundred: 15.5,
    pricePerHour: 39,
    pricePerDay: 379,
    pricePerWeek: 2299,
    pricePerMonth: 6999,
    securityDeposit: 800,
    insuranceFee: 40,
    mileageOrRange: "65 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/hero/splendor-plus/hero.jpg",
    galleryImageUrls: "[\"/vehicles/hero/splendor-plus/hero.jpg\", \"/vehicles/hero/splendor-plus/angle-front-quarter.jpg\", \"/vehicles/hero/splendor-plus/angle-side.jpg\", \"/vehicles/hero/splendor-plus/angle-rear.jpg\", \"/vehicles/hero/splendor-plus/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 3,
    features: "i3S Stop-Start,Fully Digital Display,Call/SMS Alerts,High Fuel Economy",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 8.02,
    torqueNm: 8.05,
    groundClearanceMm: 165
  },
  // 7. Hero HF Deluxe
  {
    id: 7,
    name: "Hero HF Deluxe",
    brand: "Hero",
    model: "HF Deluxe",
    variant: "Self-Start Alloy",
    category: "COMMUTER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "97.2 cc OHC",
    maxSpeed: 85,
    zeroToHundred: 16.0,
    pricePerHour: 35,
    pricePerDay: 349,
    pricePerWeek: 2099,
    pricePerMonth: 6499,
    securityDeposit: 800,
    insuranceFee: 35,
    mileageOrRange: "68 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/hero/hf-deluxe/hero.jpg",
    galleryImageUrls: "[\"/vehicles/hero/hf-deluxe/hero.jpg\", \"/vehicles/hero/hf-deluxe/angle-front-quarter.jpg\", \"/vehicles/hero/hf-deluxe/angle-side.jpg\", \"/vehicles/hero/hf-deluxe/angle-rear.jpg\", \"/vehicles/hero/hf-deluxe/angle-cockpit.jpg\"]",
    colorHex: "#D4AF37",
    available: true,
    fleetUnitsAvailable: 2,
    features: "xSens Fi Technology,Tough Double Cradle Frame,Maintenance Free Battery",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 8.02,
    torqueNm: 8.05,
    groundClearanceMm: 165
  },
  // 8. Honda Shine 125
  {
    id: 8,
    name: "Honda Shine 125",
    brand: "Honda",
    model: "Shine 125",
    variant: "Drum OBD2",
    category: "COMMUTER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "123.94 cc eSP 5-Speed",
    maxSpeed: 95,
    zeroToHundred: 13.5,
    pricePerHour: 45,
    pricePerDay: 419,
    pricePerWeek: 2499,
    pricePerMonth: 7499,
    securityDeposit: 1000,
    insuranceFee: 45,
    mileageOrRange: "55 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/honda/shine/hero.jpg",
    galleryImageUrls: "[\"/vehicles/honda/shine/hero.jpg\", \"/vehicles/honda/shine/angle-front-quarter.jpg\", \"/vehicles/honda/shine/angle-side.jpg\", \"/vehicles/honda/shine/angle-rear.jpg\", \"/vehicles/honda/shine/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "5-Speed Transmission,Silent ACG Starter,Piston Cooling Jet,DC Headlamp",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 10.7,
    torqueNm: 11.0,
    groundClearanceMm: 162
  },
  // 9. Bajaj Pulsar 125
  {
    id: 9,
    name: "Bajaj Pulsar 125",
    brand: "Bajaj",
    model: "Pulsar 125",
    variant: "Carbon Fiber Split Seat",
    category: "COMMUTER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "124.4 cc DTS-i",
    maxSpeed: 100,
    zeroToHundred: 11.9,
    pricePerHour: 52,
    pricePerDay: 469,
    pricePerWeek: 2799,
    pricePerMonth: 8499,
    securityDeposit: 1200,
    insuranceFee: 50,
    mileageOrRange: "52 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/bajaj/pulsar-125/hero.jpg",
    galleryImageUrls: "[\"/vehicles/bajaj/pulsar-125/hero.jpg\", \"/vehicles/bajaj/pulsar-125/angle-front-quarter.jpg\", \"/vehicles/bajaj/pulsar-125/angle-side.jpg\", \"/vehicles/bajaj/pulsar-125/angle-rear.jpg\", \"/vehicles/bajaj/pulsar-125/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Twin Spark DTS-i,Clip-on Handlebars,Wolf-eyed Headlamp,Split Grab Rails",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 11.8,
    torqueNm: 10.8,
    groundClearanceMm: 165
  },
  // 10. Bajaj Pulsar 150
  {
    id: 10,
    name: "Bajaj Pulsar 150",
    brand: "Bajaj",
    model: "Pulsar 150",
    variant: "Single Disc SD",
    category: "COMMUTER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "149.5 cc Twin Spark",
    maxSpeed: 115,
    zeroToHundred: 10.2,
    pricePerHour: 59,
    pricePerDay: 529,
    pricePerWeek: 3199,
    pricePerMonth: 9499,
    securityDeposit: 1500,
    insuranceFee: 60,
    mileageOrRange: "48 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/bajaj/pulsar-150/hero.jpg",
    galleryImageUrls: "[\"/vehicles/bajaj/pulsar-150/hero.jpg\", \"/vehicles/bajaj/pulsar-150/angle-front-quarter.jpg\", \"/vehicles/bajaj/pulsar-150/angle-side.jpg\", \"/vehicles/bajaj/pulsar-150/angle-rear.jpg\", \"/vehicles/bajaj/pulsar-150/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Single Channel ABS,Tubeless Tyres,Contoured Split Seat,LED Tail Lamp",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 14.0,
    torqueNm: 13.25,
    groundClearanceMm: 165
  },
  // 11. Yamaha FZ-S FI V4
  {
    id: 11,
    name: "Yamaha FZ-S FI V4",
    brand: "Yamaha",
    model: "FZ-S FI",
    variant: "Version 4 Deluxe",
    category: "STREET",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "149.0 cc Blue Core",
    maxSpeed: 112,
    zeroToHundred: 10.5,
    pricePerHour: 69,
    pricePerDay: 599,
    pricePerWeek: 3599,
    pricePerMonth: 10999,
    securityDeposit: 1500,
    insuranceFee: 70,
    mileageOrRange: "45 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/yamaha/fz-fi/hero.jpg",
    galleryImageUrls: "[\"/vehicles/yamaha/fz-fi/hero.jpg\", \"/vehicles/yamaha/fz-fi/angle-front-quarter.jpg\", \"/vehicles/yamaha/fz-fi/angle-side.jpg\", \"/vehicles/yamaha/fz-fi/angle-rear.jpg\", \"/vehicles/yamaha/fz-fi/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Traction Control System (TCS),Y-Connect Bluetooth,Class D Headlight,Wide Radial Tyre",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 12.4,
    torqueNm: 13.3,
    groundClearanceMm: 165
  },
  // 12. Royal Enfield Classic 350
  {
    id: 12,
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    model: "Classic 350",
    variant: "Dark Stealth Black",
    category: "CRUISER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "349.0 cc J-Series OHC",
    maxSpeed: 115,
    zeroToHundred: 12.0,
    pricePerHour: 89,
    pricePerDay: 799,
    pricePerWeek: 4699,
    pricePerMonth: 13999,
    securityDeposit: 2500,
    insuranceFee: 99,
    mileageOrRange: "36 km/l",
    rating: 5.0,
    reviewCount: 1,
    tripsCompleted: 1,
    imageUrl: "/vehicles/royal-enfield/classic-350/hero.jpg",
    galleryImageUrls: "[\"/vehicles/royal-enfield/classic-350/hero.jpg\", \"/vehicles/royal-enfield/classic-350/angle-front-quarter.jpg\", \"/vehicles/royal-enfield/classic-350/angle-side.jpg\", \"/vehicles/royal-enfield/classic-350/angle-rear.jpg\", \"/vehicles/royal-enfield/classic-350/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 3,
    features: "Dual-Channel ABS,Twin Downtube Spine Frame,Tripper Navigation,Iconic Thump Exhaust",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 20.2,
    torqueNm: 27.0,
    groundClearanceMm: 170
  },
  // 13. Royal Enfield Hunter 350
  {
    id: 13,
    name: "Royal Enfield Hunter 350",
    brand: "Royal Enfield",
    model: "Hunter 350",
    variant: "Dapper Ash",
    category: "STREET",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "349.0 cc J-Series",
    maxSpeed: 114,
    zeroToHundred: 11.5,
    pricePerHour: 79,
    pricePerDay: 699,
    pricePerWeek: 4199,
    pricePerMonth: 12499,
    securityDeposit: 2000,
    insuranceFee: 89,
    mileageOrRange: "36 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/royal-enfield/hunter-350/hero.jpg",
    galleryImageUrls: "[\"/vehicles/royal-enfield/hunter-350/hero.jpg\", \"/vehicles/royal-enfield/hunter-350/angle-front-quarter.jpg\", \"/vehicles/royal-enfield/hunter-350/angle-side.jpg\", \"/vehicles/royal-enfield/hunter-350/angle-rear.jpg\", \"/vehicles/royal-enfield/hunter-350/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Agile Roadster Geometry,17-inch Cast Alloy Wheels,Digi-Analog Meter,Short Wheelbase",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 20.2,
    torqueNm: 27.0,
    groundClearanceMm: 150
  },
  // 14. Royal Enfield Bullet 350
  {
    id: 14,
    name: "Royal Enfield Bullet 350",
    brand: "Royal Enfield",
    model: "Bullet 350",
    variant: "Military Black",
    category: "CRUISER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "349.0 cc J-Platform",
    maxSpeed: 110,
    zeroToHundred: 12.4,
    pricePerHour: 85,
    pricePerDay: 749,
    pricePerWeek: 4499,
    pricePerMonth: 13499,
    securityDeposit: 2000,
    insuranceFee: 90,
    mileageOrRange: "37 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/royal-enfield/bullet-350/hero.jpg",
    galleryImageUrls: "[\"/vehicles/royal-enfield/bullet-350/hero.jpg\", \"/vehicles/royal-enfield/bullet-350/angle-front-quarter.jpg\", \"/vehicles/royal-enfield/bullet-350/angle-side.jpg\", \"/vehicles/royal-enfield/bullet-350/angle-rear.jpg\", \"/vehicles/royal-enfield/bullet-350/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Legendary Cast Headlamp Casquette,Hand-pinstriped Tank,Signature Single Bench Seat",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 20.2,
    torqueNm: 27.0,
    groundClearanceMm: 170
  },
  // 15. Royal Enfield Meteor 350
  {
    id: 15,
    name: "Royal Enfield Meteor 350",
    brand: "Royal Enfield",
    model: "Meteor 350",
    variant: "Supernova Bronze",
    category: "CRUISER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "349.0 cc Long-Stroke",
    maxSpeed: 120,
    zeroToHundred: 11.8,
    pricePerHour: 95,
    pricePerDay: 849,
    pricePerWeek: 4999,
    pricePerMonth: 14999,
    securityDeposit: 2500,
    insuranceFee: 100,
    mileageOrRange: "35 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/royal-enfield/meteor-350/hero.jpg",
    galleryImageUrls: "[\"/vehicles/royal-enfield/meteor-350/hero.jpg\", \"/vehicles/royal-enfield/meteor-350/angle-front-quarter.jpg\", \"/vehicles/royal-enfield/meteor-350/angle-side.jpg\", \"/vehicles/royal-enfield/meteor-350/angle-rear.jpg\", \"/vehicles/royal-enfield/meteor-350/angle-cockpit.jpg\"]",
    colorHex: "#D4AF37",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Touring Windscreen,Passenger Backrest,Tripper Turn-by-Turn GPS,Pannier Mounts",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 20.2,
    torqueNm: 27.0,
    groundClearanceMm: 170
  },
  // 16. Royal Enfield Scram 411
  {
    id: 16,
    name: "Royal Enfield Scram 411",
    brand: "Royal Enfield",
    model: "Scram 411",
    variant: "Silver Spirit",
    category: "ADVENTURE",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "411.0 cc LS410",
    maxSpeed: 125,
    zeroToHundred: 10.5,
    pricePerHour: 99,
    pricePerDay: 899,
    pricePerWeek: 5299,
    pricePerMonth: 15999,
    securityDeposit: 3000,
    insuranceFee: 110,
    mileageOrRange: "32 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/royal-enfield/scram-411/hero.jpg",
    galleryImageUrls: "[\"/vehicles/royal-enfield/scram-411/hero.jpg\", \"/vehicles/royal-enfield/scram-411/angle-front-quarter.jpg\", \"/vehicles/royal-enfield/scram-411/angle-side.jpg\", \"/vehicles/royal-enfield/scram-411/angle-rear.jpg\", \"/vehicles/royal-enfield/scram-411/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "19-inch Front Dual Purpose Wheels,High Ground Clearance,Urban Scrambler Ergonomics",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 24.3,
    torqueNm: 32.0,
    groundClearanceMm: 200
  },
  // 17. Bajaj Avenger Cruise 220
  {
    id: 17,
    name: "Bajaj Avenger Cruise 220",
    brand: "Bajaj",
    model: "Avenger Cruise 220",
    variant: "Auburn Black",
    category: "CRUISER",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "220.0 cc DTS-i Oil Cooled",
    maxSpeed: 118,
    zeroToHundred: 11.0,
    pricePerHour: 75,
    pricePerDay: 649,
    pricePerWeek: 3899,
    pricePerMonth: 11499,
    securityDeposit: 2000,
    insuranceFee: 80,
    mileageOrRange: "38 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/bajaj/avenger-220/hero.jpg",
    galleryImageUrls: "[\"/vehicles/bajaj/avenger-220/hero.jpg\", \"/vehicles/bajaj/avenger-220/angle-front-quarter.jpg\", \"/vehicles/bajaj/avenger-220/angle-side.jpg\", \"/vehicles/bajaj/avenger-220/angle-rear.jpg\", \"/vehicles/bajaj/avenger-220/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Ultra Low Slung Seat,Highway Cruising Windshield,Classic Chrome Package",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 19.03,
    torqueNm: 17.55,
    groundClearanceMm: 169
  },
  // 18. Bajaj Dominar 400
  {
    id: 18,
    name: "Bajaj Dominar 400",
    brand: "Bajaj",
    model: "Dominar 400",
    variant: "Touring Edition Aurora Green",
    category: "STREET",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "373.3 cc Liquid Cooled DOHC",
    maxSpeed: 155,
    zeroToHundred: 7.1,
    pricePerHour: 115,
    pricePerDay: 999,
    pricePerWeek: 5999,
    pricePerMonth: 17999,
    securityDeposit: 3500,
    insuranceFee: 130,
    mileageOrRange: "29 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/bajaj/dominar-400/hero.jpg",
    galleryImageUrls: "[\"/vehicles/bajaj/dominar-400/hero.jpg\", \"/vehicles/bajaj/dominar-400/angle-front-quarter.jpg\", \"/vehicles/bajaj/dominar-400/angle-side.jpg\", \"/vehicles/bajaj/dominar-400/angle-rear.jpg\", \"/vehicles/bajaj/dominar-400/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Factory Touring Visor & Handguards,43mm USD Forks,Twin Barrel Exhaust,Dual-Channel ABS",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 40.0,
    torqueNm: 35.0,
    groundClearanceMm: 157
  },
  // 19. Yamaha YZF-R15 V4
  {
    id: 19,
    name: "Yamaha YZF-R15 V4",
    brand: "Yamaha",
    model: "YZF-R15 V4",
    variant: "Racing Blue V4",
    category: "SPORTS",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "155.0 cc Liquid-Cooled VVA",
    maxSpeed: 140,
    zeroToHundred: 9.1,
    pricePerHour: 109,
    pricePerDay: 949,
    pricePerWeek: 5699,
    pricePerMonth: 16999,
    securityDeposit: 3000,
    insuranceFee: 120,
    mileageOrRange: "40 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/yamaha/r15-v4/hero.jpg",
    galleryImageUrls: "[\"/vehicles/yamaha/r15-v4/hero.jpg\", \"/vehicles/yamaha/r15-v4/angle-front-quarter.jpg\", \"/vehicles/yamaha/r15-v4/angle-side.jpg\", \"/vehicles/yamaha/r15-v4/angle-rear.jpg\", \"/vehicles/yamaha/r15-v4/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Quick Shifter (Up),Traction Control,Bi-Functional LED Headlight,Assist & Slipper Clutch",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 18.4,
    torqueNm: 14.2,
    groundClearanceMm: 170
  },
  // 20. Yamaha MT-15 V2
  {
    id: 20,
    name: "Yamaha MT-15 V2",
    brand: "Yamaha",
    model: "MT-15 V2",
    variant: "Cyan Storm Deluxe",
    category: "STREET",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "155.0 cc VVA 4-Valve",
    maxSpeed: 130,
    zeroToHundred: 9.4,
    pricePerHour: 99,
    pricePerDay: 879,
    pricePerWeek: 5199,
    pricePerMonth: 15499,
    securityDeposit: 2500,
    insuranceFee: 110,
    mileageOrRange: "42 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/yamaha/mt-15/hero.jpg",
    galleryImageUrls: "[\"/vehicles/yamaha/mt-15/hero.jpg\", \"/vehicles/yamaha/mt-15/angle-front-quarter.jpg\", \"/vehicles/yamaha/mt-15/angle-side.jpg\", \"/vehicles/yamaha/mt-15/angle-rear.jpg\", \"/vehicles/yamaha/mt-15/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "USD Golden Front Forks,Aluminum Swingarm,Dual-Channel ABS,Dark Warrior Styling",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 18.4,
    torqueNm: 14.1,
    groundClearanceMm: 170
  },
  // 21. KTM 250 Duke
  {
    id: 21,
    name: "KTM 250 Duke",
    brand: "KTM",
    model: "250 Duke",
    variant: "Electronic Orange",
    category: "STREET",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "249.0 cc Liquid-Cooled DOHC",
    maxSpeed: 148,
    zeroToHundred: 8.2,
    pricePerHour: 125,
    pricePerDay: 1099,
    pricePerWeek: 6499,
    pricePerMonth: 19499,
    securityDeposit: 4000,
    insuranceFee: 140,
    mileageOrRange: "30 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/ktm/duke-250/hero.jpg",
    galleryImageUrls: "[\"/vehicles/ktm/duke-250/hero.jpg\", \"/vehicles/ktm/duke-250/angle-front-quarter.jpg\", \"/vehicles/ktm/duke-250/angle-side.jpg\", \"/vehicles/ktm/duke-250/angle-rear.jpg\", \"/vehicles/ktm/duke-250/angle-cockpit.jpg\"]",
    colorHex: "#FF5500",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Ride-by-Wire Throttle,Slipper Clutch,WP APEX Inverted Suspension,LCD Dash",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 31.0,
    torqueNm: 25.0,
    groundClearanceMm: 151
  },
  // 22. KTM 390 Duke
  {
    id: 22,
    name: "KTM 390 Duke",
    brand: "KTM",
    model: "390 Duke",
    variant: "Atlantic Blue Gen-3",
    category: "STREET",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "399.0 cc LC4c Single",
    maxSpeed: 168,
    zeroToHundred: 5.5,
    pricePerHour: 149,
    pricePerDay: 1349,
    pricePerWeek: 7999,
    pricePerMonth: 23999,
    securityDeposit: 5000,
    insuranceFee: 170,
    mileageOrRange: "27 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/ktm/duke-390/hero.jpg",
    galleryImageUrls: "[\"/vehicles/ktm/duke-390/hero.jpg\", \"/vehicles/ktm/duke-390/angle-front-quarter.jpg\", \"/vehicles/ktm/duke-390/angle-side.jpg\", \"/vehicles/ktm/duke-390/angle-rear.jpg\", \"/vehicles/ktm/duke-390/angle-cockpit.jpg\"]",
    colorHex: "#FF5500",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Cornering ABS,Supermoto Mode,Quickshifter+ Launch Control,5-inch TFT with Smartphone Nav",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 46.0,
    torqueNm: 39.0,
    groundClearanceMm: 151
  },
  // 23. KTM RC 390
  {
    id: 23,
    name: "KTM RC 390",
    brand: "KTM",
    model: "RC 390",
    variant: "GP Edition Track Ready",
    category: "SPORTS",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "373.3 cc Liquid-Cooled",
    maxSpeed: 175,
    zeroToHundred: 5.3,
    pricePerHour: 159,
    pricePerDay: 1429,
    pricePerWeek: 8499,
    pricePerMonth: 25499,
    securityDeposit: 5000,
    insuranceFee: 180,
    mileageOrRange: "25 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/ktm/rc-390/hero.jpg",
    galleryImageUrls: "[\"/vehicles/ktm/rc-390/hero.jpg\", \"/vehicles/ktm/rc-390/angle-front-quarter.jpg\", \"/vehicles/ktm/rc-390/angle-side.jpg\", \"/vehicles/ktm/rc-390/angle-rear.jpg\", \"/vehicles/ktm/rc-390/angle-cockpit.jpg\"]",
    colorHex: "#FF5500",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Aerodynamic Fairings,Adjustable Handlebars,TFT Screen,MotoGP Inspired Livery",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 43.5,
    torqueNm: 37.0,
    groundClearanceMm: 158
  },
  // 24. Royal Enfield Himalayan 450
  {
    id: 24,
    name: "Royal Enfield Himalayan 450",
    brand: "Royal Enfield",
    model: "Himalayan 450",
    variant: "Kaza Brown Sherpa",
    category: "ADVENTURE",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "451.65 cc Sherpa Liquid-Cooled",
    maxSpeed: 151,
    zeroToHundred: 6.8,
    pricePerHour: 145,
    pricePerDay: 1299,
    pricePerWeek: 7699,
    pricePerMonth: 22999,
    securityDeposit: 4500,
    insuranceFee: 160,
    mileageOrRange: "30 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/royal-enfield/himalayan-450/hero.jpg",
    galleryImageUrls: "[\"/vehicles/royal-enfield/himalayan-450/hero.jpg\", \"/vehicles/royal-enfield/himalayan-450/angle-front-quarter.jpg\", \"/vehicles/royal-enfield/himalayan-450/angle-side.jpg\", \"/vehicles/royal-enfield/himalayan-450/angle-rear.jpg\", \"/vehicles/royal-enfield/himalayan-450/angle-cockpit.jpg\"]",
    colorHex: "#D4AF37",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Full-Map Google Navigation Display,Switchable ABS,Long-Travel Showa Monoshock,Ride-by-Wire",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 40.0,
    torqueNm: 40.0,
    groundClearanceMm: 230
  },
  // 25. Royal Enfield Guerrilla 450
  {
    id: 25,
    name: "Royal Enfield Guerrilla 450",
    brand: "Royal Enfield",
    model: "Guerrilla 450",
    variant: "Brava Blue",
    category: "STREET",
    vehicleType: "BIKE",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "452.0 cc Sherpa DOHC",
    maxSpeed: 155,
    zeroToHundred: 6.2,
    pricePerHour: 139,
    pricePerDay: 1249,
    pricePerWeek: 7399,
    pricePerMonth: 21999,
    securityDeposit: 4000,
    insuranceFee: 150,
    mileageOrRange: "30 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/royal-enfield/guerrilla-450/hero.jpg",
    galleryImageUrls: "[\"/vehicles/royal-enfield/guerrilla-450/hero.jpg\", \"/vehicles/royal-enfield/guerrilla-450/angle-front-quarter.jpg\", \"/vehicles/royal-enfield/guerrilla-450/angle-side.jpg\", \"/vehicles/royal-enfield/guerrilla-450/angle-rear.jpg\", \"/vehicles/royal-enfield/guerrilla-450/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Wide 160-Section Rear Tyre,Dynamic Chassis,Eco/Performance Modes,Tripper Dash",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 40.0,
    torqueNm: 40.0,
    groundClearanceMm: 169
  },
  // 26. Maruti Suzuki Swift
  {
    id: 26,
    name: "Maruti Suzuki Swift",
    brand: "Maruti Suzuki",
    model: "Swift",
    variant: "ZXi+ Dual Tone 2024",
    category: "HATCHBACK",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 5,
    engineOrBattery: "1.2L Z-Series 3-Cylinder",
    maxSpeed: 165,
    zeroToHundred: 12.1,
    pricePerHour: 149,
    pricePerDay: 1399,
    pricePerWeek: 8499,
    pricePerMonth: 24999,
    securityDeposit: 3000,
    insuranceFee: 150,
    mileageOrRange: "24.8 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/maruti/swift/hero.jpg",
    galleryImageUrls: "[\"/vehicles/maruti/swift/hero.jpg\", \"/vehicles/maruti/swift/angle-front-quarter.jpg\", \"/vehicles/maruti/swift/angle-side.jpg\", \"/vehicles/maruti/swift/angle-rear.jpg\", \"/vehicles/maruti/swift/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 3,
    features: "6 Airbags Standard,9-inch SmartPlay Pro+ Audio,Wireless Charger,Cruise Control",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 82.0,
    torqueNm: 112.0,
    groundClearanceMm: 163,
    bootCapacityLitres: 265
  },
  // 27. Maruti Suzuki Baleno
  {
    id: 27,
    name: "Maruti Suzuki Baleno",
    brand: "Maruti Suzuki",
    model: "Baleno",
    variant: "Alpha AGS Automatic",
    category: "PREMIUM_HATCHBACK",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "1.2L DualJet Dual VVT",
    maxSpeed: 170,
    zeroToHundred: 11.5,
    pricePerHour: 169,
    pricePerDay: 1549,
    pricePerWeek: 9299,
    pricePerMonth: 27499,
    securityDeposit: 3500,
    insuranceFee: 170,
    mileageOrRange: "22.9 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/maruti/baleno/hero.jpg",
    galleryImageUrls: "[\"/vehicles/maruti/baleno/hero.jpg\", \"/vehicles/maruti/baleno/angle-front-quarter.jpg\", \"/vehicles/maruti/baleno/angle-side.jpg\", \"/vehicles/maruti/baleno/angle-rear.jpg\", \"/vehicles/maruti/baleno/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Head-Up Display (HUD),360-Degree View Camera,Arkamys Surround Sound,Auto Climate",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 90.0,
    torqueNm: 113.0,
    groundClearanceMm: 170,
    bootCapacityLitres: 318
  },
  // 28. Maruti Suzuki Dzire
  {
    id: 28,
    name: "Maruti Suzuki Dzire",
    brand: "Maruti Suzuki",
    model: "Dzire",
    variant: "ZXi Plus AT",
    category: "COMPACT_SEDAN",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "1.2L DualJet Petrol",
    maxSpeed: 165,
    zeroToHundred: 12.0,
    pricePerHour: 159,
    pricePerDay: 1499,
    pricePerWeek: 8999,
    pricePerMonth: 26499,
    securityDeposit: 3500,
    insuranceFee: 160,
    mileageOrRange: "22.6 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/maruti/dzire/hero.jpg",
    galleryImageUrls: "[\"/vehicles/maruti/dzire/hero.jpg\", \"/vehicles/maruti/dzire/angle-front-quarter.jpg\", \"/vehicles/maruti/dzire/angle-side.jpg\", \"/vehicles/maruti/dzire/angle-rear.jpg\", \"/vehicles/maruti/dzire/angle-cockpit.jpg\"]",
    colorHex: "#D4AF37",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Rear AC Vents,Spacious 378L Boot,Leatherette Accents,Keyless Smart Entry",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 89.0,
    torqueNm: 113.0,
    groundClearanceMm: 163,
    bootCapacityLitres: 378
  },
  // 29. Maruti Suzuki Fronx
  {
    id: 29,
    name: "Maruti Suzuki Fronx",
    brand: "Maruti Suzuki",
    model: "Fronx",
    variant: "Alpha 1.0 Turbo AT",
    category: "CROSSOVER",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "1.0L Boosterjet Turbo",
    maxSpeed: 175,
    zeroToHundred: 10.4,
    pricePerHour: 189,
    pricePerDay: 1699,
    pricePerWeek: 10299,
    pricePerMonth: 30499,
    securityDeposit: 4000,
    insuranceFee: 190,
    mileageOrRange: "20.0 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/maruti/fronx/hero.jpg",
    galleryImageUrls: "[\"/vehicles/maruti/fronx/hero.jpg\", \"/vehicles/maruti/fronx/angle-front-quarter.jpg\", \"/vehicles/maruti/fronx/angle-side.jpg\", \"/vehicles/maruti/fronx/angle-rear.jpg\", \"/vehicles/maruti/fronx/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Paddle Shifters,6-Speed Torque Converter,Geometric Cut Alloys,Sporty Coupé Stance",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 100.0,
    torqueNm: 147.6,
    groundClearanceMm: 190,
    bootCapacityLitres: 308
  },
  // 30. Maruti Suzuki Brezza
  {
    id: 30,
    name: "Maruti Suzuki Brezza",
    brand: "Maruti Suzuki",
    model: "Brezza",
    variant: "ZXi+ Electric Sunroof",
    category: "COMPACT_SUV",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "MANUAL",
    seats: 5,
    engineOrBattery: "1.5L K15C Smart Hybrid",
    maxSpeed: 170,
    zeroToHundred: 11.2,
    pricePerHour: 199,
    pricePerDay: 1799,
    pricePerWeek: 10899,
    pricePerMonth: 32499,
    securityDeposit: 4000,
    insuranceFee: 200,
    mileageOrRange: "19.8 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/maruti/brezza/hero.jpg",
    galleryImageUrls: "[\"/vehicles/maruti/brezza/hero.jpg\", \"/vehicles/maruti/brezza/angle-front-quarter.jpg\", \"/vehicles/maruti/brezza/angle-side.jpg\", \"/vehicles/maruti/brezza/angle-rear.jpg\", \"/vehicles/maruti/brezza/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Electric Sunroof,Wireless Android Auto/CarPlay,SmartPlay Telematics,High Seating",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 103.0,
    torqueNm: 137.0,
    groundClearanceMm: 200,
    bootCapacityLitres: 328
  },
  // 31. Kia Sonet
  {
    id: 31,
    name: "Kia Sonet",
    brand: "Kia",
    model: "Sonet",
    variant: "GTX Plus 1.5 CRDi AT",
    category: "COMPACT_SUV",
    vehicleType: "DIESEL_CAR",
    fuelType: "DIESEL",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "1.5L CRDi VGT Turbo-Diesel",
    maxSpeed: 185,
    zeroToHundred: 10.1,
    pricePerHour: 219,
    pricePerDay: 1999,
    pricePerWeek: 11999,
    pricePerMonth: 35999,
    securityDeposit: 4500,
    insuranceFee: 220,
    mileageOrRange: "18.6 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/kia/sonet/hero.jpg",
    galleryImageUrls: "[\"/vehicles/kia/sonet/hero.jpg\", \"/vehicles/kia/sonet/angle-front-quarter.jpg\", \"/vehicles/kia/sonet/angle-side.jpg\", \"/vehicles/kia/sonet/angle-rear.jpg\", \"/vehicles/kia/sonet/angle-cockpit.jpg\"]",
    colorHex: "#FF4B4B",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Level 1 ADAS,Front Ventilated Seats,Bose 7-Speaker Premium Sound,Electric Sunroof",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 116.0,
    torqueNm: 250.0,
    groundClearanceMm: 205,
    bootCapacityLitres: 385
  },
  // 32. Hyundai Venue
  {
    id: 32,
    name: "Hyundai Venue",
    brand: "Hyundai",
    model: "Venue",
    variant: "SX(O) Turbo DCT",
    category: "COMPACT_SUV",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "1.0L Turbo GDi",
    maxSpeed: 180,
    zeroToHundred: 10.3,
    pricePerHour: 209,
    pricePerDay: 1899,
    pricePerWeek: 11499,
    pricePerMonth: 34499,
    securityDeposit: 4000,
    insuranceFee: 210,
    mileageOrRange: "18.3 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/hyundai/venue/hero.jpg",
    galleryImageUrls: "[\"/vehicles/hyundai/venue/hero.jpg\", \"/vehicles/hyundai/venue/angle-front-quarter.jpg\", \"/vehicles/hyundai/venue/angle-side.jpg\", \"/vehicles/hyundai/venue/angle-rear.jpg\", \"/vehicles/hyundai/venue/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "7-Speed Dual Clutch (DCT),Bluelink Connected Car,Ambient Mood Lighting,Air Purifier",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 120.0,
    torqueNm: 172.0,
    groundClearanceMm: 195,
    bootCapacityLitres: 350
  },
  // 33. Maruti Suzuki Ciaz
  {
    id: 33,
    name: "Maruti Suzuki Ciaz",
    brand: "Maruti Suzuki",
    model: "Ciaz",
    variant: "Alpha 1.5 AT Lounge",
    category: "MID_SIZE_SEDAN",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "1.5L K15 Smart Hybrid",
    maxSpeed: 175,
    zeroToHundred: 11.5,
    pricePerHour: 189,
    pricePerDay: 1699,
    pricePerWeek: 10299,
    pricePerMonth: 30999,
    securityDeposit: 4000,
    insuranceFee: 190,
    mileageOrRange: "20.0 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/maruti/ciaz/hero.jpg",
    galleryImageUrls: "[\"/vehicles/maruti/ciaz/hero.jpg\", \"/vehicles/maruti/ciaz/angle-front-quarter.jpg\", \"/vehicles/maruti/ciaz/angle-side.jpg\", \"/vehicles/maruti/ciaz/angle-rear.jpg\", \"/vehicles/maruti/ciaz/angle-cockpit.jpg\"]",
    colorHex: "#D4AF37",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Class-leading Rear Legroom,Cruise Control,Rear Sunshade,510L Huge Boot",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 105.0,
    torqueNm: 138.0,
    groundClearanceMm: 170,
    bootCapacityLitres: 510
  },
  // 34. Hyundai Verna
  {
    id: 34,
    name: "Hyundai Verna",
    brand: "Hyundai",
    model: "Verna",
    variant: "SX(O) 1.5 Turbo DCT",
    category: "MID_SIZE_SEDAN",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "1.5L Turbo GDi (160 PS)",
    maxSpeed: 210,
    zeroToHundred: 8.1,
    pricePerHour: 239,
    pricePerDay: 2199,
    pricePerWeek: 13199,
    pricePerMonth: 39499,
    securityDeposit: 5000,
    insuranceFee: 240,
    mileageOrRange: "20.6 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/hyundai/verna/hero.jpg",
    galleryImageUrls: "[\"/vehicles/hyundai/verna/hero.jpg\", \"/vehicles/hyundai/verna/angle-front-quarter.jpg\", \"/vehicles/hyundai/verna/angle-side.jpg\", \"/vehicles/hyundai/verna/angle-rear.jpg\", \"/vehicles/hyundai/verna/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Hyundai SmartSense Level 2 ADAS,Heated & Ventilated Front Seats,Bose Audio,Horizon LED Bar",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 160.0,
    torqueNm: 253.0,
    groundClearanceMm: 170,
    bootCapacityLitres: 528
  },
  // 35. Maruti Suzuki Ertiga
  {
    id: 35,
    name: "Maruti Suzuki Ertiga",
    brand: "Maruti Suzuki",
    model: "Ertiga",
    variant: "ZXi+ AT 7-Seater",
    category: "MPV",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 7,
    engineOrBattery: "1.5L K15C Dual VVT",
    maxSpeed: 165,
    zeroToHundred: 13.0,
    pricePerHour: 229,
    pricePerDay: 2099,
    pricePerWeek: 12599,
    pricePerMonth: 37999,
    securityDeposit: 4500,
    insuranceFee: 230,
    mileageOrRange: "20.3 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/maruti/ertiga/hero.jpg",
    galleryImageUrls: "[\"/vehicles/maruti/ertiga/hero.jpg\", \"/vehicles/maruti/ertiga/angle-front-quarter.jpg\", \"/vehicles/maruti/ertiga/angle-side.jpg\", \"/vehicles/maruti/ertiga/angle-rear.jpg\", \"/vehicles/maruti/ertiga/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Spacious 7 Seats,Roof-Mounted AC Vents,Paddle Shifters,Flexible Seat Folding",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 103.0,
    torqueNm: 136.8,
    groundClearanceMm: 180,
    bootCapacityLitres: 209
  },
  // 36. Maruti Suzuki XL6
  {
    id: 36,
    name: "Maruti Suzuki XL6",
    brand: "Maruti Suzuki",
    model: "XL6",
    variant: "Alpha+ Captain Seats 6-Seater",
    category: "MPV",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 6,
    engineOrBattery: "1.5L K15C Smart Hybrid",
    maxSpeed: 170,
    zeroToHundred: 12.8,
    pricePerHour: 249,
    pricePerDay: 2249,
    pricePerWeek: 13499,
    pricePerMonth: 40499,
    securityDeposit: 5000,
    insuranceFee: 250,
    mileageOrRange: "20.2 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/maruti/xl6/hero.jpg",
    galleryImageUrls: "[\"/vehicles/maruti/xl6/hero.jpg\", \"/vehicles/maruti/xl6/angle-front-quarter.jpg\", \"/vehicles/maruti/xl6/angle-side.jpg\", \"/vehicles/maruti/xl6/angle-rear.jpg\", \"/vehicles/maruti/xl6/angle-cockpit.jpg\"]",
    colorHex: "#D4AF37",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Second-Row Premium Captain Seats,Ventilated Seats,360 Camera,UV Cut Glass",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 103.0,
    torqueNm: 136.8,
    groundClearanceMm: 180,
    bootCapacityLitres: 209
  },
  // 37. Toyota Innova Crysta
  {
    id: 37,
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    model: "Innova Crysta",
    variant: "ZX 2.4 Diesel 7-Seater",
    category: "MPV",
    vehicleType: "DIESEL_CAR",
    fuelType: "DIESEL",
    transmission: "MANUAL",
    seats: 7,
    engineOrBattery: "2.4L GD Turbo Diesel",
    maxSpeed: 170,
    zeroToHundred: 11.5,
    pricePerHour: 329,
    pricePerDay: 2999,
    pricePerWeek: 17999,
    pricePerMonth: 53999,
    securityDeposit: 6000,
    insuranceFee: 300,
    mileageOrRange: "15.1 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/toyota/innova-crysta/hero.jpg",
    galleryImageUrls: "[\"/vehicles/toyota/innova-crysta/hero.jpg\", \"/vehicles/toyota/innova-crysta/angle-front-quarter.jpg\", \"/vehicles/toyota/innova-crysta/angle-side.jpg\", \"/vehicles/toyota/innova-crysta/angle-rear.jpg\", \"/vehicles/toyota/innova-crysta/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Legendary D-4D Reliability,Ladder Frame Comfort,7 Airbags,One-Touch Tumble Seats",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 150.0,
    torqueNm: 343.0,
    groundClearanceMm: 178,
    bootCapacityLitres: 300
  },
  // 38. Toyota Innova Hycross
  {
    id: 38,
    name: "Toyota Innova Hycross",
    brand: "Toyota",
    model: "Innova Hycross",
    variant: "ZX(O) Strong Hybrid e-CVT",
    category: "MPV",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 7,
    engineOrBattery: "2.0L TNGA 5th Gen Self-Charging Hybrid",
    maxSpeed: 180,
    zeroToHundred: 9.5,
    pricePerHour: 379,
    pricePerDay: 3499,
    pricePerWeek: 20999,
    pricePerMonth: 62999,
    securityDeposit: 7000,
    insuranceFee: 350,
    mileageOrRange: "23.24 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/toyota/innova-hycross/hero.jpg",
    galleryImageUrls: "[\"/vehicles/toyota/innova-hycross/hero.jpg\", \"/vehicles/toyota/innova-hycross/angle-front-quarter.jpg\", \"/vehicles/toyota/innova-hycross/angle-side.jpg\", \"/vehicles/toyota/innova-hycross/angle-rear.jpg\", \"/vehicles/toyota/innova-hycross/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Powered Ottoman Seats,Panoramic Sunroof,Toyota Safety Sense (ADAS),EV Only Silent Mode",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 186.0,
    torqueNm: 206.0,
    groundClearanceMm: 185,
    bootCapacityLitres: 300
  },
  // 39. Mahindra XUV700
  {
    id: 39,
    name: "Mahindra XUV700",
    brand: "Mahindra",
    model: "XUV700",
    variant: "AX7 Luxury AWD Diesel AT",
    category: "PREMIUM_SUV",
    vehicleType: "DIESEL_CAR",
    fuelType: "DIESEL",
    transmission: "AUTOMATIC",
    seats: 7,
    engineOrBattery: "2.2L mHawk CRDe Turbo",
    maxSpeed: 195,
    zeroToHundred: 9.2,
    pricePerHour: 399,
    pricePerDay: 3699,
    pricePerWeek: 22199,
    pricePerMonth: 66499,
    securityDeposit: 7000,
    insuranceFee: 370,
    mileageOrRange: "16.0 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/mahindra/xuv700/hero.jpg",
    galleryImageUrls: "[\"/vehicles/mahindra/xuv700/hero.jpg\", \"/vehicles/mahindra/xuv700/angle-front-quarter.jpg\", \"/vehicles/mahindra/xuv700/angle-side.jpg\", \"/vehicles/mahindra/xuv700/angle-rear.jpg\", \"/vehicles/mahindra/xuv700/angle-cockpit.jpg\"]",
    colorHex: "#FF4B4B",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Dual 10.25-inch Monolith Screens,Sony 3D 12-Speaker Sound,Level 2 ADAS,All-Wheel Drive",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 185.0,
    torqueNm: 450.0,
    groundClearanceMm: 200,
    bootCapacityLitres: 240
  },
  // 40. Toyota Fortuner 4x4
  {
    id: 40,
    name: "Toyota Fortuner 4x4",
    brand: "Toyota",
    model: "Fortuner",
    variant: "GR-Sport 2.8L 4x4 AT",
    category: "LUXURY_SUV",
    vehicleType: "DIESEL_CAR",
    fuelType: "DIESEL",
    transmission: "AUTOMATIC",
    seats: 7,
    engineOrBattery: "2.8L GD Turbocharged Diesel",
    maxSpeed: 190,
    zeroToHundred: 9.8,
    pricePerHour: 599,
    pricePerDay: 5499,
    pricePerWeek: 32999,
    pricePerMonth: 98999,
    securityDeposit: 15000,
    insuranceFee: 550,
    mileageOrRange: "14.4 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/toyota/fortuner/hero.jpg",
    galleryImageUrls: "[\"/vehicles/toyota/fortuner/hero.jpg\", \"/vehicles/toyota/fortuner/angle-front-quarter.jpg\", \"/vehicles/toyota/fortuner/angle-side.jpg\", \"/vehicles/toyota/fortuner/angle-rear.jpg\", \"/vehicles/toyota/fortuner/angle-cockpit.jpg\"]",
    colorHex: "#141416",
    available: true,
    fleetUnitsAvailable: 2,
    features: "Electronic 4WD Shift-on-the-fly,Heavy Duty Offroad Suspension,JBL Sound,Powered Tailgate",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 204.0,
    torqueNm: 500.0,
    groundClearanceMm: 225,
    bootCapacityLitres: 296
  },
  // 41. Audi A6 (Showcase Luxury Model - 0 Fleet Units initially: CURRENTLY UNAVAILABLE)
  {
    id: 41,
    name: "Audi A6",
    brand: "Audi",
    model: "A6",
    variant: "Technology 45 TFSI S-Line",
    category: "LUXURY_SEDAN",
    vehicleType: "PETROL_CAR",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "2.0L TFSI Turbo 48V Mild Hybrid",
    maxSpeed: 250,
    zeroToHundred: 6.7,
    pricePerHour: 999,
    pricePerDay: 8999,
    pricePerWeek: 53999,
    pricePerMonth: 161999,
    securityDeposit: 25000,
    insuranceFee: 900,
    mileageOrRange: "14.1 km/l",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/audi/a6/hero.jpg",
    galleryImageUrls: "[\"/vehicles/audi/a6/hero.jpg\", \"/vehicles/audi/a6/angle-front-quarter.jpg\", \"/vehicles/audi/a6/angle-side.jpg\", \"/vehicles/audi/a6/angle-rear.jpg\", \"/vehicles/audi/a6/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: false,
    fleetUnitsAvailable: 0,
    features: "Matrix LED Headlights,Dual MMI Touchscreens,Bang & Olufsen 3D Sound,Virtual Cockpit Plus",
    cityNames: allCities,
    assetType: "GALLERY",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: false,
    powerBhp: 245.0,
    torqueNm: 370.0,
    groundClearanceMm: 165,
    bootCapacityLitres: 530
  },
  // 42. Revolt RV400
  {
    id: 42,
    name: "Revolt RV400",
    brand: "Revolt Motors",
    model: "RV400",
    variant: "BRZ Edition",
    category: "COMMUTER",
    vehicleType: "ELECTRIC_BIKE",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "3.24 kWh Lithium-ion",
    maxSpeed: 85,
    zeroToHundred: 12.0,
    pricePerHour: 99,
    pricePerDay: 699,
    pricePerWeek: 4199,
    pricePerMonth: 17999,
    securityDeposit: 2500,
    insuranceFee: 69,
    mileageOrRange: "150 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/revolt/rv400/hero.jpg",
    galleryImageUrls: "[\"/vehicles/revolt/rv400/hero.jpg\", \"/vehicles/revolt/rv400/angle-front-quarter.jpg\", \"/vehicles/revolt/rv400/angle-side.jpg\", \"/vehicles/revolt/rv400/angle-rear.jpg\", \"/vehicles/revolt/rv400/angle-cockpit.jpg\"]",
    colorHex: "#FF3344",
    available: true,
    fleetUnitsAvailable: 4,
    features: "Removable Battery,3 Riding Modes (Eco/Norm/Sport),MyRevolt App Telemetry,CBS Braking",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 4.1,
    torqueNm: 54.0,
    groundClearanceMm: 215,
    bootCapacityLitres: 0,
    isElectric: true,
    batteryCapacityKwh: 3.24,
    chargingTimeHours: 4.5,
    fastChargingSupported: false,
    fastChargingTimeMinutes: undefined,
    chargingConnectorType: "15A 3-Pin Home / Swappable",
    motorPowerKw: 3.0,
    motorTorqueNm: 54.0,
    cityNames: allCities
  },
  // 43. Ultraviolette F77 Mach 2
  {
    id: 43,
    name: "Ultraviolette F77 Mach 2",
    brand: "Ultraviolette",
    model: "F77",
    variant: "Mach 2 Recon",
    category: "SPORTS",
    vehicleType: "ELECTRIC_BIKE",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "10.3 kWh SRB7",
    maxSpeed: 155,
    zeroToHundred: 7.7,
    pricePerHour: 299,
    pricePerDay: 1999,
    pricePerWeek: 11999,
    pricePerMonth: 49999,
    securityDeposit: 10000,
    insuranceFee: 199,
    mileageOrRange: "323 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/ultraviolette/f77/hero.jpg",
    galleryImageUrls: "[\"/vehicles/ultraviolette/f77/hero.jpg\", \"/vehicles/ultraviolette/f77/angle-front-quarter.jpg\", \"/vehicles/ultraviolette/f77/angle-side.jpg\", \"/vehicles/ultraviolette/f77/angle-rear.jpg\", \"/vehicles/ultraviolette/f77/angle-cockpit.jpg\"]",
    colorHex: "#1B2430",
    available: true,
    fleetUnitsAvailable: 3,
    features: "10 Level Regenerative Braking,Dynamic Stability Control,LTE Connected 5-inch TFT,Brembo ByBre Brakes",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 40.2,
    torqueNm: 100.0,
    groundClearanceMm: 160,
    bootCapacityLitres: 0,
    isElectric: true,
    batteryCapacityKwh: 10.3,
    chargingTimeHours: 5.0,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 60,
    chargingConnectorType: "CCS2 / UV Boost Charger",
    motorPowerKw: 30.0,
    motorTorqueNm: 100.0,
    cityNames: allCities
  },
  // 44. Matter Aera 5000+
  {
    id: 44,
    name: "Matter Aera 5000+",
    brand: "Matter",
    model: "Aera",
    variant: "5000+",
    category: "STREET",
    vehicleType: "ELECTRIC_BIKE",
    fuelType: "ELECTRIC",
    transmission: "MANUAL",
    seats: 2,
    engineOrBattery: "5.0 kWh Liquid-Cooled",
    maxSpeed: 105,
    zeroToHundred: 10.5,
    pricePerHour: 149,
    pricePerDay: 999,
    pricePerWeek: 5999,
    pricePerMonth: 24999,
    securityDeposit: 4000,
    insuranceFee: 99,
    mileageOrRange: "125 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/matter/aera/hero.jpg",
    galleryImageUrls: "[\"/vehicles/matter/aera/hero.jpg\", \"/vehicles/matter/aera/angle-front-quarter.jpg\", \"/vehicles/matter/aera/angle-side.jpg\", \"/vehicles/matter/aera/angle-rear.jpg\", \"/vehicles/matter/aera/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 5,
    features: "India First 4-Speed HyperShift Gearbox,Active Liquid Cooled Battery,7-inch Touchscreen Navigation",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 13.4,
    torqueNm: 52.0,
    groundClearanceMm: 180,
    bootCapacityLitres: 5,
    isElectric: true,
    batteryCapacityKwh: 5.0,
    chargingTimeHours: 4.0,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 90,
    chargingConnectorType: "5A/15A Common Standard Connector",
    motorPowerKw: 10.0,
    motorTorqueNm: 52.0,
    cityNames: allCities
  },
  // 45. Oben Rorr
  {
    id: 45,
    name: "Oben Rorr",
    brand: "Oben Electric",
    model: "Rorr",
    variant: "Neo Standard",
    category: "COMMUTER",
    vehicleType: "ELECTRIC_BIKE",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "4.4 kWh LFP Battery",
    maxSpeed: 100,
    zeroToHundred: 9.0,
    pricePerHour: 129,
    pricePerDay: 899,
    pricePerWeek: 5399,
    pricePerMonth: 21999,
    securityDeposit: 3000,
    insuranceFee: 89,
    mileageOrRange: "187 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/oben/rorr/hero.jpg",
    galleryImageUrls: "[\"/vehicles/oben/rorr/hero.jpg\", \"/vehicles/oben/rorr/angle-front-quarter.jpg\", \"/vehicles/oben/rorr/angle-side.jpg\", \"/vehicles/oben/rorr/angle-rear.jpg\", \"/vehicles/oben/rorr/angle-cockpit.jpg\"]",
    colorHex: "#FFBF00",
    available: true,
    fleetUnitsAvailable: 3,
    features: "High Heat Resistant LFP Chemistry,0-40 in 3.0s,Smart Vehicle Diagnostics,Alloy Wheels",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 10.7,
    torqueNm: 62.0,
    groundClearanceMm: 200,
    bootCapacityLitres: 0,
    isElectric: true,
    batteryCapacityKwh: 4.4,
    chargingTimeHours: 2.0,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 120,
    chargingConnectorType: "15A Fast Charge",
    motorPowerKw: 8.0,
    motorTorqueNm: 62.0,
    cityNames: allCities
  },
  // 46. Tork Kratos R
  {
    id: 46,
    name: "Tork Kratos R",
    brand: "Tork Motors",
    model: "Kratos",
    variant: "R Urban",
    category: "STREET",
    vehicleType: "ELECTRIC_BIKE",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "4.0 kWh Axial Flux",
    maxSpeed: 105,
    zeroToHundred: 9.8,
    pricePerHour: 139,
    pricePerDay: 949,
    pricePerWeek: 5699,
    pricePerMonth: 22999,
    securityDeposit: 3500,
    insuranceFee: 95,
    mileageOrRange: "180 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/tork/kratos-r/hero.jpg",
    galleryImageUrls: "[\"/vehicles/tork/kratos-r/hero.jpg\", \"/vehicles/tork/kratos-r/angle-front-quarter.jpg\", \"/vehicles/tork/kratos-r/angle-side.jpg\", \"/vehicles/tork/kratos-r/angle-rear.jpg\", \"/vehicles/tork/kratos-r/angle-cockpit.jpg\"]",
    colorHex: "#0D2C54",
    available: true,
    fleetUnitsAvailable: 3,
    features: "Patented Axial Flux PMAC Motor,In-app Navigation,Geofencing,Crash Alert",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 12.0,
    torqueNm: 38.0,
    groundClearanceMm: 165,
    bootCapacityLitres: 0,
    isElectric: true,
    batteryCapacityKwh: 4.0,
    chargingTimeHours: 4.0,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 60,
    chargingConnectorType: "Tork Fast Charge Network",
    motorPowerKw: 9.0,
    motorTorqueNm: 38.0,
    cityNames: allCities
  },
  // 47. Ather 450X Gen 3
  {
    id: 47,
    name: "Ather 450X Gen 3",
    brand: "Ather Energy",
    model: "450X",
    variant: "Gen 3 Apex",
    category: "SCOOTER",
    vehicleType: "ELECTRIC_SCOOTER",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "3.7 kWh IP67 Battery",
    maxSpeed: 90,
    zeroToHundred: 10.2,
    pricePerHour: 89,
    pricePerDay: 599,
    pricePerWeek: 3599,
    pricePerMonth: 14999,
    securityDeposit: 2000,
    insuranceFee: 59,
    mileageOrRange: "150 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/ather/450x/hero.jpg",
    galleryImageUrls: "[\"/vehicles/ather/450x/hero.jpg\", \"/vehicles/ather/450x/angle-front-quarter.jpg\", \"/vehicles/ather/450x/angle-side.jpg\", \"/vehicles/ather/450x/angle-rear.jpg\", \"/vehicles/ather/450x/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 6,
    features: "Warp Mode,Google Maps Integration on 7-inch Touchscreen,AutoHold Hill Assist,Ather Grid Fast Charge",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 8.6,
    torqueNm: 26.0,
    groundClearanceMm: 153,
    bootCapacityLitres: 22,
    isElectric: true,
    batteryCapacityKwh: 3.7,
    chargingTimeHours: 5.75,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 10,
    chargingConnectorType: "Ather Dot / Ather Grid Fast Charger",
    motorPowerKw: 6.4,
    motorTorqueNm: 26.0,
    cityNames: allCities
  },
  // 48. Ather Rizta Z
  {
    id: 48,
    name: "Ather Rizta Z",
    brand: "Ather Energy",
    model: "Rizta",
    variant: "Z 3.7 kWh",
    category: "SCOOTER",
    vehicleType: "ELECTRIC_SCOOTER",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "3.7 kWh Battery",
    maxSpeed: 80,
    zeroToHundred: 12.0,
    pricePerHour: 85,
    pricePerDay: 549,
    pricePerWeek: 3299,
    pricePerMonth: 13999,
    securityDeposit: 2000,
    insuranceFee: 55,
    mileageOrRange: "159 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/ather/rizta/hero.jpg",
    galleryImageUrls: "[\"/vehicles/ather/rizta/hero.jpg\", \"/vehicles/ather/rizta/angle-front-quarter.jpg\", \"/vehicles/ather/rizta/angle-side.jpg\", \"/vehicles/ather/rizta/angle-rear.jpg\", \"/vehicles/ather/rizta/angle-cockpit.jpg\"]",
    colorHex: "#3A7D44",
    available: true,
    fleetUnitsAvailable: 5,
    features: "Largest Family Seat in Segment,34L Boot Space,Ather SkidControl Traction,Magic Twist Regenerative Braking",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 5.8,
    torqueNm: 22.0,
    groundClearanceMm: 165,
    bootCapacityLitres: 34,
    isElectric: true,
    batteryCapacityKwh: 3.7,
    chargingTimeHours: 4.5,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 15,
    chargingConnectorType: "Ather Grid Fast Charge",
    motorPowerKw: 4.3,
    motorTorqueNm: 22.0,
    cityNames: allCities
  },
  // 49. Ola S1 Pro Gen 2
  {
    id: 49,
    name: "Ola S1 Pro Gen 2",
    brand: "Ola Electric",
    model: "S1 Pro",
    variant: "Gen 2",
    category: "SCOOTER",
    vehicleType: "ELECTRIC_SCOOTER",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "4.0 kWh Battery",
    maxSpeed: 120,
    zeroToHundred: 7.5,
    pricePerHour: 89,
    pricePerDay: 599,
    pricePerWeek: 3599,
    pricePerMonth: 14999,
    securityDeposit: 2000,
    insuranceFee: 59,
    mileageOrRange: "195 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/ola/s1-pro/hero.jpg",
    galleryImageUrls: "[\"/vehicles/ola/s1-pro/hero.jpg\", \"/vehicles/ola/s1-pro/angle-front-quarter.jpg\", \"/vehicles/ola/s1-pro/angle-side.jpg\", \"/vehicles/ola/s1-pro/angle-rear.jpg\", \"/vehicles/ola/s1-pro/angle-cockpit.jpg\"]",
    colorHex: "#222222",
    available: true,
    fleetUnitsAvailable: 6,
    features: "Hyper Mode 0-40 in 2.6s,Party Mode with Built-in Speakers,Cruise Control,MoveOS 4 Pro",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 14.7,
    torqueNm: 58.0,
    groundClearanceMm: 160,
    bootCapacityLitres: 34,
    isElectric: true,
    batteryCapacityKwh: 4.0,
    chargingTimeHours: 6.5,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 15,
    chargingConnectorType: "Ola Hypercharger / 750W Home",
    motorPowerKw: 11.0,
    motorTorqueNm: 58.0,
    cityNames: allCities
  },
  // 50. TVS iQube ST
  {
    id: 50,
    name: "TVS iQube ST",
    brand: "TVS",
    model: "iQube",
    variant: "ST 5.1 kWh",
    category: "SCOOTER",
    vehicleType: "ELECTRIC_SCOOTER",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "5.1 kWh Dual Battery",
    maxSpeed: 82,
    zeroToHundred: 11.5,
    pricePerHour: 85,
    pricePerDay: 549,
    pricePerWeek: 3299,
    pricePerMonth: 13999,
    securityDeposit: 2000,
    insuranceFee: 55,
    mileageOrRange: "145 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/tvs/iqube/hero.jpg",
    galleryImageUrls: "[\"/vehicles/tvs/iqube/hero.jpg\", \"/vehicles/tvs/iqube/angle-front-quarter.jpg\", \"/vehicles/tvs/iqube/angle-side.jpg\", \"/vehicles/tvs/iqube/angle-rear.jpg\", \"/vehicles/tvs/iqube/angle-cockpit.jpg\"]",
    colorHex: "#1E3D59",
    available: true,
    fleetUnitsAvailable: 4,
    features: "7-inch Full Colour TFT Touchscreen,32L Underseat Luggage,SmartXonnect Telemetry,Q-Park Assist Reverse",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 5.9,
    torqueNm: 33.0,
    groundClearanceMm: 157,
    bootCapacityLitres: 32,
    isElectric: true,
    batteryCapacityKwh: 5.1,
    chargingTimeHours: 4.5,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 45,
    chargingConnectorType: "TVS SmartXHome 950W",
    motorPowerKw: 4.4,
    motorTorqueNm: 33.0,
    cityNames: allCities
  },
  // 51. Bajaj Chetak Premium
  {
    id: 51,
    name: "Bajaj Chetak Premium",
    brand: "Bajaj",
    model: "Chetak",
    variant: "Premium Edition",
    category: "SCOOTER",
    vehicleType: "ELECTRIC_SCOOTER",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 2,
    engineOrBattery: "3.2 kWh IP67 Metal Battery",
    maxSpeed: 73,
    zeroToHundred: 13.0,
    pricePerHour: 79,
    pricePerDay: 499,
    pricePerWeek: 2999,
    pricePerMonth: 12999,
    securityDeposit: 2000,
    insuranceFee: 49,
    mileageOrRange: "126 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/bajaj/chetak/hero.jpg",
    galleryImageUrls: "[\"/vehicles/bajaj/chetak/hero.jpg\", \"/vehicles/bajaj/chetak/angle-front-quarter.jpg\", \"/vehicles/bajaj/chetak/angle-side.jpg\", \"/vehicles/bajaj/chetak/angle-rear.jpg\", \"/vehicles/bajaj/chetak/angle-cockpit.jpg\"]",
    colorHex: "#5E503F",
    available: true,
    fleetUnitsAvailable: 4,
    features: "Seamless All-Steel Metal Unibody,Sequential LED Blinkers,Keyless Start,Hill Hold Assist",
    imageSource: "BikeDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 5.6,
    torqueNm: 20.0,
    groundClearanceMm: 160,
    bootCapacityLitres: 21,
    isElectric: true,
    batteryCapacityKwh: 3.2,
    chargingTimeHours: 4.5,
    fastChargingSupported: false,
    fastChargingTimeMinutes: undefined,
    chargingConnectorType: "Standard 15A Home Plug",
    motorPowerKw: 4.2,
    motorTorqueNm: 20.0,
    cityNames: allCities
  },
  // 52. Tata Nexon EV Long Range
  {
    id: 52,
    name: "Tata Nexon EV Long Range",
    brand: "Tata",
    model: "Nexon EV",
    variant: "Empowered+ Long Range",
    category: "COMPACT_SUV",
    vehicleType: "ELECTRIC_CAR",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "45.0 kWh High Energy LFP",
    maxSpeed: 140,
    zeroToHundred: 8.9,
    pricePerHour: 249,
    pricePerDay: 2499,
    pricePerWeek: 14999,
    pricePerMonth: 59999,
    securityDeposit: 7500,
    insuranceFee: 249,
    mileageOrRange: "489 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/tata/nexon-ev/hero.jpg",
    galleryImageUrls: "[\"/vehicles/tata/nexon-ev/hero.jpg\", \"/vehicles/tata/nexon-ev/angle-front-quarter.jpg\", \"/vehicles/tata/nexon-ev/angle-side.jpg\", \"/vehicles/tata/nexon-ev/angle-rear.jpg\", \"/vehicles/tata/nexon-ev/angle-cockpit.jpg\"]",
    colorHex: "#00E5C7",
    available: true,
    fleetUnitsAvailable: 5,
    features: "V2V & V2L Power Bank Capability,12.3-inch Cinematic Display,360 Surround View Camera,JBL 9-Speaker Audio",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 142.0,
    torqueNm: 215.0,
    groundClearanceMm: 205,
    bootCapacityLitres: 350,
    isElectric: true,
    batteryCapacityKwh: 45.0,
    chargingTimeHours: 6.0,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 56,
    chargingConnectorType: "CCS2 / 50kW DC Fast Charge",
    motorPowerKw: 106.0,
    motorTorqueNm: 215.0,
    cityNames: allCities
  },
  // 53. Tata Punch EV Empowered
  {
    id: 53,
    name: "Tata Punch EV Empowered",
    brand: "Tata",
    model: "Punch EV",
    variant: "Empowered Plus Long Range",
    category: "COMPACT_SUV",
    vehicleType: "ELECTRIC_CAR",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "35.0 kWh acti.ev Architecture",
    maxSpeed: 120,
    zeroToHundred: 9.5,
    pricePerHour: 199,
    pricePerDay: 1999,
    pricePerWeek: 11999,
    pricePerMonth: 47999,
    securityDeposit: 6000,
    insuranceFee: 199,
    mileageOrRange: "421 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/tata/punch-ev/hero.jpg",
    galleryImageUrls: "[\"/vehicles/tata/punch-ev/hero.jpg\", \"/vehicles/tata/punch-ev/angle-front-quarter.jpg\", \"/vehicles/tata/punch-ev/angle-side.jpg\", \"/vehicles/tata/punch-ev/angle-rear.jpg\", \"/vehicles/tata/punch-ev/angle-cockpit.jpg\"]",
    colorHex: "#2C3E50",
    available: true,
    fleetUnitsAvailable: 4,
    features: "10.25-inch Dual Screen Cockpit,Ventilated Front Seats,Frunk Storage,Electronic Parking Brake with Auto Hold",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 120.0,
    torqueNm: 190.0,
    groundClearanceMm: 190,
    bootCapacityLitres: 366,
    isElectric: true,
    batteryCapacityKwh: 35.0,
    chargingTimeHours: 5.0,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 56,
    chargingConnectorType: "CCS2 / 50kW DC Fast Charge",
    motorPowerKw: 90.0,
    motorTorqueNm: 190.0,
    cityNames: allCities
  },
  // 54. Tata Tiago EV Tech Lux
  {
    id: 54,
    name: "Tata Tiago EV Tech Lux",
    brand: "Tata",
    model: "Tiago EV",
    variant: "XZ+ Tech Lux Long Range",
    category: "HATCHBACK",
    vehicleType: "ELECTRIC_CAR",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "24.0 kWh Ziptron",
    maxSpeed: 110,
    zeroToHundred: 11.2,
    pricePerHour: 149,
    pricePerDay: 1499,
    pricePerWeek: 8999,
    pricePerMonth: 35999,
    securityDeposit: 5000,
    insuranceFee: 149,
    mileageOrRange: "315 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/tata/tiago-ev/hero.jpg",
    galleryImageUrls: "[\"/vehicles/tata/tiago-ev/hero.jpg\", \"/vehicles/tata/tiago-ev/angle-front-quarter.jpg\", \"/vehicles/tata/tiago-ev/angle-side.jpg\", \"/vehicles/tata/tiago-ev/angle-rear.jpg\", \"/vehicles/tata/tiago-ev/angle-cockpit.jpg\"]",
    colorHex: "#16A085",
    available: true,
    fleetUnitsAvailable: 4,
    features: "Multi-Mode Regenerative Braking,Harman Touchscreen Audio,ZConnect Smart App Telemetry,Automatic Climate Control",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 74.0,
    torqueNm: 114.0,
    groundClearanceMm: 165,
    bootCapacityLitres: 240,
    isElectric: true,
    batteryCapacityKwh: 24.0,
    chargingTimeHours: 6.0,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 57,
    chargingConnectorType: "CCS2 / 3.3kW AC Wallbox",
    motorPowerKw: 55.0,
    motorTorqueNm: 114.0,
    cityNames: allCities
  },
  // 55. MG Windsor EV
  {
    id: 55,
    name: "MG Windsor EV",
    brand: "MG Motor",
    model: "Windsor EV",
    variant: "Essence Aero Lounge",
    category: "CROSSOVER",
    vehicleType: "ELECTRIC_CAR",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "38.0 kWh Prismatic Cell",
    maxSpeed: 125,
    zeroToHundred: 9.8,
    pricePerHour: 229,
    pricePerDay: 2299,
    pricePerWeek: 13799,
    pricePerMonth: 54999,
    securityDeposit: 7000,
    insuranceFee: 229,
    mileageOrRange: "331 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/mg/windsor-ev/hero.jpg",
    galleryImageUrls: "[\"/vehicles/mg/windsor-ev/hero.jpg\", \"/vehicles/mg/windsor-ev/angle-front-quarter.jpg\", \"/vehicles/mg/windsor-ev/angle-side.jpg\", \"/vehicles/mg/windsor-ev/angle-rear.jpg\", \"/vehicles/mg/windsor-ev/angle-cockpit.jpg\"]",
    colorHex: "#D4AF37",
    available: true,
    fleetUnitsAvailable: 4,
    features: "135-degree Aero Lounge Reclining Rear Seats,15.6-inch Grandview Touchscreen,Infinity Glass Roof,Wireless Apple CarPlay",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 134.0,
    torqueNm: 200.0,
    groundClearanceMm: 186,
    bootCapacityLitres: 604,
    isElectric: true,
    batteryCapacityKwh: 38.0,
    chargingTimeHours: 6.5,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 40,
    chargingConnectorType: "CCS2 / 45kW DC Fast Charge",
    motorPowerKw: 100.0,
    motorTorqueNm: 200.0,
    cityNames: allCities
  },
  // 56. MG ZS EV Exclusive Plus
  {
    id: 56,
    name: "MG ZS EV Exclusive Plus",
    brand: "MG Motor",
    model: "ZS EV",
    variant: "Exclusive Plus",
    category: "COMPACT_SUV",
    vehicleType: "ELECTRIC_CAR",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "50.3 kWh Prismatic Battery",
    maxSpeed: 140,
    zeroToHundred: 8.5,
    pricePerHour: 299,
    pricePerDay: 2999,
    pricePerWeek: 17999,
    pricePerMonth: 69999,
    securityDeposit: 9000,
    insuranceFee: 299,
    mileageOrRange: "461 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/mg/zs-ev/hero.jpg",
    galleryImageUrls: "[\"/vehicles/mg/zs-ev/hero.jpg\", \"/vehicles/mg/zs-ev/angle-front-quarter.jpg\", \"/vehicles/mg/zs-ev/angle-side.jpg\", \"/vehicles/mg/zs-ev/angle-rear.jpg\", \"/vehicles/mg/zs-ev/angle-cockpit.jpg\"]",
    colorHex: "#0A3D62",
    available: true,
    fleetUnitsAvailable: 3,
    features: "Level 2 ADAS (Adaptive Cruise, Lane Keep),Panoramic Dual-Pane Sunroof,i-SMART 75+ Connected Car Features,PM 2.5 Filter",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 174.0,
    torqueNm: 280.0,
    groundClearanceMm: 177,
    bootCapacityLitres: 470,
    isElectric: true,
    batteryCapacityKwh: 50.3,
    chargingTimeHours: 8.5,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 60,
    chargingConnectorType: "CCS2 / 50kW DC Fast Charge",
    motorPowerKw: 130.0,
    motorTorqueNm: 280.0,
    cityNames: allCities
  },
  // 57. Mahindra XUV400 EL Pro
  {
    id: 57,
    name: "Mahindra XUV400 EL Pro",
    brand: "Mahindra",
    model: "XUV400",
    variant: "EL Pro Fast Charge",
    category: "COMPACT_SUV",
    vehicleType: "ELECTRIC_CAR",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "39.4 kWh High Density",
    maxSpeed: 150,
    zeroToHundred: 8.3,
    pricePerHour: 269,
    pricePerDay: 2699,
    pricePerWeek: 16199,
    pricePerMonth: 62999,
    securityDeposit: 8000,
    insuranceFee: 269,
    mileageOrRange: "456 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/mahindra/xuv400/hero.jpg",
    galleryImageUrls: "[\"/vehicles/mahindra/xuv400/hero.jpg\", \"/vehicles/mahindra/xuv400/angle-front-quarter.jpg\", \"/vehicles/mahindra/xuv400/angle-side.jpg\", \"/vehicles/mahindra/xuv400/angle-rear.jpg\", \"/vehicles/mahindra/xuv400/angle-cockpit.jpg\"]",
    colorHex: "#B87333",
    available: true,
    fleetUnitsAvailable: 3,
    features: "Dual 10.25-inch Digital Cockpit,Copper Accents Styling,Lively Drive Modes (Fun/Fast/Fearless),Single Pedal Drive",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 147.5,
    torqueNm: 310.0,
    groundClearanceMm: 180,
    bootCapacityLitres: 378,
    isElectric: true,
    batteryCapacityKwh: 39.4,
    chargingTimeHours: 6.5,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 50,
    chargingConnectorType: "CCS2 / 50kW DC Fast Charge",
    motorPowerKw: 110.0,
    motorTorqueNm: 310.0,
    cityNames: allCities
  },
  // 58. BYD Atto 3 Superior
  {
    id: 58,
    name: "BYD Atto 3 Superior",
    brand: "BYD",
    model: "Atto 3",
    variant: "Superior Extended Range",
    category: "CROSSOVER",
    vehicleType: "ELECTRIC_CAR",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "60.48 kWh Ultra-Safe Blade Battery",
    maxSpeed: 160,
    zeroToHundred: 7.3,
    pricePerHour: 399,
    pricePerDay: 3999,
    pricePerWeek: 23999,
    pricePerMonth: 89999,
    securityDeposit: 12000,
    insuranceFee: 399,
    mileageOrRange: "521 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/byd/atto-3/hero.jpg",
    galleryImageUrls: "[\"/vehicles/byd/atto-3/hero.jpg\", \"/vehicles/byd/atto-3/angle-front-quarter.jpg\", \"/vehicles/byd/atto-3/angle-side.jpg\", \"/vehicles/byd/atto-3/angle-rear.jpg\", \"/vehicles/byd/atto-3/angle-cockpit.jpg\"]",
    colorHex: "#2C3E50",
    available: true,
    fleetUnitsAvailable: 3,
    features: "Revolutionary BYD Blade Battery (Nail Penetration Tested),Rotating 12.8-inch Touchscreen,Gym-Themed Interior,Full ADAS Suite",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 201.0,
    torqueNm: 310.0,
    groundClearanceMm: 175,
    bootCapacityLitres: 440,
    isElectric: true,
    batteryCapacityKwh: 60.48,
    chargingTimeHours: 9.5,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 50,
    chargingConnectorType: "CCS2 / 80kW DC Fast Charge",
    motorPowerKw: 150.0,
    motorTorqueNm: 310.0,
    cityNames: allCities
  },
  // 59. Hyundai Ioniq 5
  {
    id: 59,
    name: "Hyundai Ioniq 5",
    brand: "Hyundai",
    model: "Ioniq 5",
    variant: "RWD Long Range",
    category: "LUXURY_SUV",
    vehicleType: "ELECTRIC_CAR",
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    seats: 5,
    engineOrBattery: "72.6 kWh E-GMP Architecture",
    maxSpeed: 185,
    zeroToHundred: 7.6,
    pricePerHour: 599,
    pricePerDay: 5999,
    pricePerWeek: 35999,
    pricePerMonth: 139999,
    securityDeposit: 15000,
    insuranceFee: 599,
    mileageOrRange: "631 km",
    rating: 0,
    reviewCount: 0,
    tripsCompleted: 0,
    imageUrl: "/vehicles/hyundai/ioniq-5/hero.jpg",
    galleryImageUrls: "[\"/vehicles/hyundai/ioniq-5/hero.jpg\", \"/vehicles/hyundai/ioniq-5/angle-front-quarter.jpg\", \"/vehicles/hyundai/ioniq-5/angle-side.jpg\", \"/vehicles/hyundai/ioniq-5/angle-rear.jpg\", \"/vehicles/hyundai/ioniq-5/angle-cockpit.jpg\"]",
    colorHex: "#EAEAEA",
    available: true,
    fleetUnitsAvailable: 2,
    features: "800V Ultra-Fast Architecture 10-80% in 18 Min,V2L 3.6kW Power Output,Parametric Pixel LED Design,Relaxation Comfort Seats",
    imageSource: "CarDekho",
    imageLicense: "COLLEGE_DEMO_REFERENCE",
    assetVerified: true,
    powerBhp: 215.0,
    torqueNm: 350.0,
    groundClearanceMm: 163,
    bootCapacityLitres: 527,
    isElectric: true,
    batteryCapacityKwh: 72.6,
    chargingTimeHours: 7.0,
    fastChargingSupported: true,
    fastChargingTimeMinutes: 18,
    chargingConnectorType: "CCS2 / 350kW Ultra-Fast DC",
    motorPowerKw: 160.0,
    motorTorqueNm: 350.0,
    cityNames: allCities
  },
];

export const API_BASE = (((import.meta as any).env?.VITE_API_BASE_URL as string | undefined) || '').replace(/\/+$/, '') + '/api';

export class ApiError extends Error {
  status: number;
  data: any;
  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

interface ApiFetchOptions extends RequestInit {
  timeoutMs?: number;
  skipAuth?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

export async function getFreshAuthToken(): Promise<string | null> {
  // If Clerk session is available in the browser window, fetch a fresh, non-expired Clerk token
  if (typeof window !== 'undefined' && (window as any).Clerk?.session) {
    try {
      const clerkToken = await (window as any).Clerk.session.getToken();
      if (clerkToken) {
        sessionStorage.setItem('tbh_token', clerkToken);
        localStorage.setItem('tbh_token', clerkToken);
        return clerkToken;
      }
    } catch (e) {
      console.warn('[CLERK AUTH] Failed to retrieve fresh token from Clerk session:', e);
    }
  }
  return sessionStorage.getItem('tbh_token') || localStorage.getItem('tbh_token');
}

async function refreshAuthToken(): Promise<string | null> {
  // Check Clerk first
  if (typeof window !== 'undefined' && (window as any).Clerk?.session) {
    try {
      const clerkToken = await (window as any).Clerk.session.getToken({ skipCache: true });
      if (clerkToken) {
        sessionStorage.setItem('tbh_token', clerkToken);
        localStorage.setItem('tbh_token', clerkToken);
        return clerkToken;
      }
    } catch (e) {
      console.warn('[CLERK AUTH] Failed to force-refresh Clerk token:', e);
    }
  }

  const refreshToken = sessionStorage.getItem('tbh_refresh_token');
  if (!refreshToken) return null;

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          sessionStorage.setItem('tbh_token', data.token);
          if (data.refreshToken) {
            sessionStorage.setItem('tbh_refresh_token', data.refreshToken);
          }
          return data.token as string;
        }
      }
    } catch {}
    // Cleanse storage on refresh failure to prevent infinite loops
    sessionStorage.removeItem('tbh_token');
    sessionStorage.removeItem('tbh_refresh_token');
    sessionStorage.removeItem('tbh_user');
    localStorage.removeItem('tbh_token');
    return null;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

export async function apiFetch<T = any>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const { timeoutMs = 15000, skipAuth = false, headers = {}, ...rest } = options;
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const token = !skipAuth ? await getFreshAuthToken() : null;
  const reqHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>)
  };
  if (token && !skipAuth && !reqHeaders['Authorization']) {
    reqHeaders['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let res = await fetch(url, {
      ...rest,
      headers: reqHeaders,
      signal: controller.signal
    });

    // Handle 401 token refresh mutex (only for authenticated calls)
    if (res.status === 401 && !skipAuth && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
      const newToken = await refreshAuthToken();
      if (newToken) {
        reqHeaders['Authorization'] = `Bearer ${newToken}`;
        res = await fetch(url, {
          ...rest,
          headers: reqHeaders,
          signal: controller.signal
        });
      }
    }

    if (!res.ok) {
      let errBody: any = {};
      try {
        errBody = await res.json();
      } catch {
        errBody = {};
      }

      const serverMsg = errBody.message || errBody.error || '';

      switch (res.status) {
        case 400:
          throw new ApiError(400, serverMsg || 'Invalid request parameters. Please verify input.');
        case 401:
          throw new ApiError(401, 'Your session has expired. Please sign in again.');
        case 403:
          throw new ApiError(403, serverMsg || 'Access Denied: Insufficient authorization permissions.');
        case 404:
          throw new ApiError(404, serverMsg || 'The requested resource could not be found.');
        case 409:
          throw new ApiError(409, serverMsg || 'This vehicle is already reserved for the selected timeframe. Please pick different timings or an alternative machine.');
        case 410:
          throw new ApiError(410, serverMsg || 'Your reservation hold has expired (15-minute window). Please initiate a fresh vehicle booking.');
        case 422:
          throw new ApiError(422, serverMsg || 'Validation error: Requirements under Indian Motor Vehicles Act or KYC rule not satisfied.');
        case 429:
          throw new ApiError(429, 'Rate limit exceeded. Please wait a moment before trying again.');
        default:
          if (res.status >= 500) {
            throw new ApiError(res.status, serverMsg || 'Internal server error encountered. TBH operations team has been alerted.');
          }
          throw new ApiError(res.status, serverMsg || `HTTP error ${res.status}`);
      }
    }

    if (res.status === 204) {
      return {} as T;
    }

    return await res.json();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new ApiError(408, 'Network request timed out (15s). Please check your connection.');
    }
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(0, err.message || 'Network communication error. Please check connection.');
  } finally {
    clearTimeout(timeoutId);
  }
}

export function ensureVehicleAngles(v: Vehicle): Vehicle {
  if (!v) return v;
  if (!v.galleryImageUrls || v.galleryImageUrls.trim() === '' || v.galleryImageUrls === '[]') {
    if (v.imageUrl && v.imageUrl.includes('/hero.jpg')) {
      const base = v.imageUrl.substring(0, v.imageUrl.lastIndexOf('/hero.jpg'));
      v.galleryImageUrls = JSON.stringify([
        `${base}/hero.jpg`,
        `${base}/angle-front-quarter.jpg`,
        `${base}/angle-side.jpg`,
        `${base}/angle-rear.jpg`,
        `${base}/angle-cockpit.jpg`
      ]);
    } else if (v.imageUrl) {
      v.galleryImageUrls = JSON.stringify([v.imageUrl]);
    }
  }
  if (!v.colourVariants || v.colourVariants.length === 0) {
    v.colourVariants = getVehicleColourVariants(v);
  }
  return v;
}

export const api = {
  async getCities(): Promise<City[]> {
    try {
      const data = await apiFetch<City[]>('/locations/cities', { skipAuth: true });
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {}
    return INITIAL_CITIES;
  },

  async getVehicles(city?: string, type?: string, fuel?: string): Promise<Vehicle[]> {
    try {
      const params = new URLSearchParams();
      if (city && city !== 'ALL') params.append('city', city);
      if (type && type !== 'ALL') params.append('type', type);
      if (fuel && fuel !== 'ALL') params.append('fuel', fuel);

      const data = await apiFetch<Vehicle[]>(`/vehicles?${params.toString()}`, { skipAuth: true });
      if (Array.isArray(data) && data.length > 0) {
        return data.map(ensureVehicleAngles);
      }
    } catch {}

    // Fallback filtering on INITIAL_VEHICLES
    return INITIAL_VEHICLES.filter(v => {
      if (city && city !== 'ALL' && !v.cityNames.toLowerCase().includes(city.toLowerCase())) return false;
      if (type && type !== 'ALL' && v.vehicleType !== type) return false;
      if (fuel && fuel !== 'ALL' && v.fuelType !== fuel) return false;
      return true;
    }).map(ensureVehicleAngles);
  },

  async getVehicleById(id: number): Promise<Vehicle | undefined> {
    try {
      const data = await apiFetch<Vehicle>(`/vehicles/${id}`, { skipAuth: true });
      if (data) return ensureVehicleAngles(data);
    } catch {}
    const local = INITIAL_VEHICLES.find(v => v.id === id);
    return local ? ensureVehicleAngles(local) : undefined;
  },

  async getPricingQuote(quoteReq: {
    vehicleId: number;
    rentalMode: string;
    duration: number;
    insurancePlan?: string;
    pickupDateTime?: string;
    dropDateTime?: string;
    pickupCity?: string;
    dropCity?: string;
    couponCode?: string;
    offerId?: number;
  }): Promise<any> {
    return await apiFetch<any>('/pricing/quote', {
      method: 'POST',
      body: JSON.stringify(quoteReq),
      skipAuth: true
    });
  },

  async createBooking(bookingData: any): Promise<Booking> {
    const token = sessionStorage.getItem('tbh_token') || localStorage.getItem('tbh_token');
    if (!token) {
      throw new Error('Authentication required. Please sign in to reserve a vehicle.');
    }

    const saved = await apiFetch<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });

    const existing = JSON.parse(sessionStorage.getItem('tbh_bookings') || '[]');
    sessionStorage.setItem('tbh_bookings', JSON.stringify([saved, ...existing]));
    return saved;
  },

  async getMyBookings(userId: number): Promise<Booking[]> {
    try {
      const data = await apiFetch<Booking[]>(`/bookings/my/${userId}`);
      if (Array.isArray(data)) return data;
    } catch {}
    return JSON.parse(sessionStorage.getItem('tbh_bookings') || '[]');
  },

  async cancelBooking(bookingId: number, userId: number): Promise<Booking> {
    return await apiFetch<Booking>(`/bookings/${bookingId}/cancel?userId=${userId}`, {
      method: 'POST'
    });
  },

  async refreshToken(refreshToken: string): Promise<any> {
    return await apiFetch<any>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      skipAuth: true
    });
  },

  async logout(refreshToken?: string): Promise<void> {
    try {
      await apiFetch<any>('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        skipAuth: true
      });
    } catch {}
    sessionStorage.removeItem('tbh_token');
    sessionStorage.removeItem('tbh_refresh_token');
    sessionStorage.removeItem('tbh_user');
    localStorage.removeItem('tbh_token');
  },

  async verifyPayment(verificationData: {
    bookingReference: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): Promise<any> {
    return await apiFetch<any>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(verificationData)
    });
  },

  async getAdminMetrics(): Promise<any> {
    return await apiFetch<any>('/admin/metrics');
  },

  async getAllAdminBookings(): Promise<Booking[]> {
    return await apiFetch<Booking[]>('/admin/bookings');
  },

  async getVehicleAvailability(vehicleId: number, city?: string, hub?: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (city && city !== 'ALL') params.append('city', city);
      if (hub) params.append('hub', hub);
      return await apiFetch<any>(`/vehicles/${vehicleId}/availability?${params.toString()}`, { skipAuth: true });
    } catch {
      return null;
    }
  },

  async getKycStatus(userId?: number): Promise<any> {
    try {
      const url = userId ? `/kyc/status?userId=${userId}` : '/kyc/status';
      return await apiFetch<any>(url);
    } catch {
      return { status: 'NOT_SUBMITTED', verified: false };
    }
  },

  async demoVerifyKyc(userId?: number): Promise<any> {
    const url = userId ? `/kyc/demo-verify?userId=${userId}` : '/kyc/demo-verify';
    const data = await apiFetch<any>(url, { method: 'POST' });
    const storedUser = sessionStorage.getItem('tbh_user');
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        u.drivingLicenseVerified = true;
        u.drivingLicenseNumber = data.maskedLicenseNumber;
        sessionStorage.setItem('tbh_user', JSON.stringify(u));
      } catch {}
    }
    return data;
  },

  async uploadKyc(formData: FormData): Promise<any> {
    const token = await getFreshAuthToken();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(`${API_BASE}/kyc/upload`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData,
        signal: controller.signal
      });
      if (!res.ok) {
        let errMsg = 'Failed to upload driving licence.';
        try {
          const text = await res.text();
          try {
            const err = JSON.parse(text);
            errMsg = err.message || err.error || errMsg;
          } catch {
            if (text && text.trim().length > 0) {
              errMsg = text.trim();
            }
          }
        } catch {}
        throw new Error(errMsg);
      }
      const data = await res.json();
      const storedUser = sessionStorage.getItem('tbh_user');
      if (storedUser) {
        try {
          const u = JSON.parse(storedUser);
          u.drivingLicenseVerified = data.verified;
          u.drivingLicenseNumber = data.maskedLicenseNumber;
          sessionStorage.setItem('tbh_user', JSON.stringify(u));
        } catch {}
      }
      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  async confirmKyc(details: {
    kycId: number;
    confirmed: boolean;
    name?: string;
    licenseNumber?: string;
    dob?: string;
    expiryDate?: string;
    vehicleClasses?: string;
  }): Promise<any> {
    return await apiFetch<any>('/kyc/confirm', {
      method: 'POST',
      body: JSON.stringify(details)
    });
  },

  async getPendingKyc(): Promise<any[]> {
    try {
      const data = await apiFetch<any[]>('/admin/kyc/pending');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async reviewKyc(kycId: number, status: string, rejectionReason?: string): Promise<any> {
    return await apiFetch<any>(`/admin/kyc/${kycId}/review`, {
      method: 'POST',
      body: JSON.stringify({ status, rejectionReason })
    });
  },

  async getKycAudit(kycId: number): Promise<any[]> {
    try {
      const data = await apiFetch<any[]>(`/admin/kyc/${kycId}/audit`);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async toggleVehicleAvailability(vehicleId: number): Promise<any> {
    return await apiFetch<any>(`/admin/vehicles/${vehicleId}/toggle-availability`, {
      method: 'POST'
    });
  },

  async getAllAdminUsers(): Promise<any[]> {
    try {
      const data = await apiFetch<any[]>('/admin/users');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async getAllAdminKyc(): Promise<any[]> {
    try {
      const data = await apiFetch<any[]>('/admin/kyc/all');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async getAllAdminVehicles(): Promise<any[]> {
    try {
      const data = await apiFetch<any[]>('/admin/vehicles');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async fetchKycDocument(docUrlOrId: string | number): Promise<Blob> {
    const token = await getFreshAuthToken();
    let url = typeof docUrlOrId === 'number'
      ? `${API_BASE}/kyc/document/${docUrlOrId}/front`
      : (docUrlOrId.startsWith('http') ? docUrlOrId : (docUrlOrId.startsWith('/') ? `${API_BASE}${docUrlOrId}` : `${API_BASE}/${docUrlOrId}`));
    const res = await fetch(url, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if (!res.ok) throw new Error('Failed to load document');
    return await res.blob();
  },

  async syncClerkMobile(): Promise<{ mobileVerified: boolean; phoneNumber?: string }> {
    return await apiFetch<{ mobileVerified: boolean; phoneNumber?: string }>('/auth/clerk/sync-mobile', {
      method: 'POST'
    });
  },

  async getAdminOverview(): Promise<AdminMetrics> {
    return await apiFetch<AdminMetrics>('/admin/overview');
  },

  async getAdminAnalytics(): Promise<any> {
    return await apiFetch<any>('/admin/analytics');
  },

  async updateVehicle(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    return await apiFetch<Vehicle>(`/admin/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicle)
    });
  },

  async getCoupons(): Promise<Coupon[]> {
    try {
      const data = await apiFetch<Coupon[]>('/admin/coupons');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async createCoupon(coupon: Partial<Coupon>): Promise<Coupon> {
    return await apiFetch<Coupon>('/admin/coupons', {
      method: 'POST',
      body: JSON.stringify(coupon)
    });
  },

  async toggleCoupon(id: number): Promise<Coupon> {
    return await apiFetch<Coupon>(`/admin/coupons/${id}/toggle-active`, {
      method: 'POST'
    });
  },

  async deleteCoupon(id: number): Promise<void> {
    await apiFetch<any>(`/admin/coupons/${id}`, {
      method: 'DELETE'
    });
  },

  async getOffers(): Promise<Offer[]> {
    try {
      const data = await apiFetch<Offer[]>('/admin/offers');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async createOffer(offer: Partial<Offer>): Promise<Offer> {
    return await apiFetch<Offer>('/admin/offers', {
      method: 'POST',
      body: JSON.stringify(offer)
    });
  },

  async toggleOffer(id: number): Promise<Offer> {
    return await apiFetch<Offer>(`/admin/offers/${id}/toggle-active`, {
      method: 'POST'
    });
  },

  async deleteOffer(id: number): Promise<void> {
    await apiFetch<any>(`/admin/offers/${id}`, {
      method: 'DELETE'
    });
  },

  async getCustomerSupportTickets(): Promise<SupportTicket[]> {
    try {
      const data = await apiFetch<SupportTicket[]>('/support/tickets');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async createSupportTicket(ticket: { bookingId?: number; category: string; subject: string; message: string; priority?: string }): Promise<any> {
    return await apiFetch<any>('/support/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket)
    });
  },

  async getCustomerTicketMessages(ticketId: number): Promise<SupportMessage[]> {
    try {
      const data = await apiFetch<SupportMessage[]>(`/support/tickets/${ticketId}/messages`);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async addCustomerMessage(ticketId: number, message: string): Promise<SupportMessage> {
    return await apiFetch<SupportMessage>(`/support/tickets/${ticketId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });
  },

  async getAdminSupportTickets(): Promise<SupportTicket[]> {
    try {
      const data = await apiFetch<SupportTicket[]>('/admin/support/tickets');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async getAdminSupportMessages(ticketId: number): Promise<SupportMessage[]> {
    try {
      const data = await apiFetch<SupportMessage[]>(`/admin/support/tickets/${ticketId}/messages`);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async replyAdminSupportTicket(ticketId: number, message: string, isInternalNote?: boolean, newStatus?: string): Promise<SupportMessage> {
    return await apiFetch<SupportMessage>(`/admin/support/tickets/${ticketId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ message, isInternalNote: !!isInternalNote, newStatus })
    });
  },

  async updateAdminSupportStatus(ticketId: number, status: string): Promise<SupportTicket> {
    return await apiFetch<SupportTicket>(`/admin/support/tickets/${ticketId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  async getAdminAuditLogs(): Promise<AdminAuditLog[]> {
    try {
      const data = await apiFetch<AdminAuditLog[]>('/admin/audit-logs');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }
};

