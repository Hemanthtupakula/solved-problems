import React, { createContext, useContext, useState } from 'react';

type Lang = 'EN' | 'HI';

const DICTIONARY = {
  EN: {
    tagline: "Ride Beyond Limits",
    heroTitle: "India's Most Elite Mobility Fleet",
    heroSubtitle: "Superbikes. Iconic Cruisers. Electric Velocity. 4x4 Off-Road Legends.",
    searchBarTitle: "Find Your Machine",
    pickupCity: "Pickup City",
    pickupHub: "Pickup Hub",
    dropHub: "Drop Hub",
    rentalMode: "Rental Duration",
    hourly: "Hourly",
    daily: "Daily",
    monthly: "Monthly",
    allVehicles: "All Fleet",
    bikes: "Superbikes & Cruisers",
    scooters: "City Scooters",
    electric: "Electric Velocity (EV)",
    petrolCars: "Petrol Cars",
    dieselCars: "Diesel & 4x4 SUVs",
    threeDStudio: "3D Studio",
    quickBook: "Quick Book",
    compare: "Compare",
    topSpeed: "Top Speed",
    acceleration: "0-100 km/h",
    deposit: "Security Deposit",
    perHour: "/ hr",
    perDay: "/ day",
    perMonth: "/ mo",
    verifiedRider: "Verified Rider",
    unverifiedRider: "Pending Verification",
    adminDashboard: "Admin",
    myBookings: "My Bookings"
  },
  HI: {
    tagline: "राइड बियॉन्ड लिमिट्स",
    heroTitle: "भारत का सबसे प्रीमियम बाइक और कार रेंटल",
    heroSubtitle: "सुपरबाइक्स। क्लासिक क्रूज़र्स। इलेक्ट्रिक मोबिलिटी। 4x4 थार और फॉर्च्यूनर।",
    searchBarTitle: "अपनी मनपसंद राइड चुनें",
    pickupCity: "पिकअप शहर",
    pickupHub: "पिकअप हब",
    dropHub: "ड्रॉप हब",
    rentalMode: "किराया अवधि",
    hourly: "घंटे के आधार पर",
    daily: "प्रति दिन",
    monthly: "मासिक",
    allVehicles: "सभी वाहन",
    bikes: "सुपरबाइक और क्रूज़र",
    scooters: "स्कूटी",
    electric: "इलेक्ट्रिक (EV)",
    petrolCars: "पेट्रोल कारें",
    dieselCars: "डीजल और 4x4 SUV",
    threeDStudio: "3D स्टूडियो",
    quickBook: "तुरंत बुक करें",
    compare: "तुलना करें",
    topSpeed: "अधिकतम गति",
    acceleration: "0-100 गति",
    deposit: "सुरक्षा जमा राशि",
    perHour: "/ घंटा",
    perDay: "/ दिन",
    perMonth: "/ महीना",
    verifiedRider: "सत्यापित राइडर",
    unverifiedRider: "वेरिफिकेशन बाकी",
    adminDashboard: "व्यवस्थापक",
    myBookings: "मेरी बुकिंग"
  }
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof DICTIONARY['EN']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('EN');

  const t = (key: keyof typeof DICTIONARY['EN']): string => {
    return DICTIONARY[lang][key] || DICTIONARY['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
