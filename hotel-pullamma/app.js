// App State
let restaurants = [];
let orders = [];
let cart = {}; // Tracked as { itemName: { item: Object, quantity: Number } }
let selectedRestaurant = null;
let activeFilter = 'all';
let appliedDiscount = 0.0;
let promoCodeApplied = "";
let isSimulatorMode = false; // fallen back to browser simulation

// Swiggy Delivery Fees
const DELIVERY_FEE = 29.0;
const PACKAGING_FEE = 15.0;

// South Indian Promo Codes
const PROMO_CODES = {
    "KAAPI10": 10.0,
    "DOSA20": 20.0,
    "BIRYAN130": 30.0,
    "PULLAMMA50": 50.0
};

// Calorie & Rating Database
const ITEM_META = {
    "Ghee Podi Idli": { cals: 180, rating: "4.9 ★" },
    "Medu Vada (2pcs)": { cals: 220, rating: "4.7 ★" },
    "Masala Dosa": { cals: 320, rating: "4.8 ★" },
    "Pesarattu Upma": { cals: 380, rating: "4.8 ★" },
    "Rava Kesari": { cals: 260, rating: "4.6 ★" },
    "Egg Masala Dosa": { cals: 410, rating: "4.7 ★" },
    "Chicken Keema Dosa": { cals: 490, rating: "4.9 ★" },
    "Chicken Keema Pesarattu": { cals: 490, rating: "4.9 ★" },
    "Egg Appam (2pcs)": { cals: 280, rating: "4.5 ★" },
    "Andhra Veg Meals Thali": { cals: 750, rating: "4.8 ★" },
    "Gutti Vankaya Koora": { cals: 340, rating: "4.9 ★" },
    "Tomato Pappu": { cals: 220, rating: "4.6 ★" },
    "Rayalaseema Mutton Biryani": { cals: 880, rating: "4.9 ★" },
    "Andhra Chicken Curry with Rice": { cals: 670, rating: "4.7 ★" },
    "Nellore Chepala Pulusu": { cals: 620, rating: "4.8 ★" },
    "Ragi Sangati": { cals: 320, rating: "4.9 ★" },
    "South Indian Filter Kaapi": { cals: 90, rating: "4.9 ★" },
    "Mango Lassi": { cals: 230, rating: "4.7 ★" },
    "Badam Milk (Cold)": { cals: 190, rating: "4.6 ★" },
    "Elaneer Payasam": { cals: 240, rating: "4.9 ★" },
    "Mysore Pak (2pcs)": { cals: 310, rating: "4.8 ★" },
    "Atreyapuram Bellam Pootharekulu": { cals: 120, rating: "4.9 ★" },
    "Kakinada Gottam Kaja": { cals: 180, rating: "4.8 ★" },
    "Tapeswaram Madatha Kaja": { cals: 190, rating: "4.8 ★" },
    "Andhra Bobbatlu": { cals: 260, rating: "4.8 ★" },
    "Nethi Ariselu": { cals: 220, rating: "4.7 ★" },
    "Bellam Sunnundalu": { cals: 170, rating: "4.8 ★" },
    "Poornalu / Boorelu": { cals: 190, rating: "4.8 ★" }
};

// Fallback 150 Andhra items catalog for Static / GitHub Pages deployment
const FALLBACK_150_ITEMS = [
    // Tiffins & Breakfast (1-25)
    { name: "Babai Idli", price: 50.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Ghee Podi Idli", price: 60.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Neyyi Karapu Idli", price: 65.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Sambar Idli", price: 55.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Button Idli", price: 50.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Masala Dosa", price: 80.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Erra Karam Dosa", price: 85.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Onion Dosa", price: 75.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Ghee Roast Dosa", price: 90.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Rava Masala Dosa", price: 90.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "MLA Dosa", price: 110.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Pesarattu Upma", price: 95.0, category: "Breakfast", type: "Veg", subType: "Vegan" },
    { name: "Onion Pesarattu", price: 85.0, category: "Breakfast", type: "Veg", subType: "Vegan" },
    { name: "Dibba Rotti", price: 70.0, category: "Breakfast", type: "Veg", subType: "Vegan" },
    { name: "Puri Curry", price: 60.0, category: "Breakfast", type: "Veg", subType: "Vegan" },
    { name: "Pongal", price: 70.0, category: "Breakfast", type: "Veg", subType: "Vegan" },
    { name: "Uggani Bajji", price: 80.0, category: "Breakfast", type: "Veg", subType: "Vegan" },
    { name: "Egg Dosa", price: 100.0, category: "Breakfast", type: "Non-Veg", subType: "Egg" },
    { name: "Chicken Keema Dosa", price: 130.0, category: "Breakfast", type: "Non-Veg", subType: "Chicken" },
    { name: "Mutton Keema Dosa", price: 150.0, category: "Breakfast", type: "Non-Veg", subType: "Mutton" },
    { name: "Egg Pesarattu", price: 110.0, category: "Breakfast", type: "Non-Veg", subType: "Egg" },
    { name: "Chicken Keema Pesarattu", price: 140.0, category: "Breakfast", type: "Non-Veg", subType: "Chicken" },
    { name: "Minapa Garelu", price: 60.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Sambar Vada", price: 70.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    { name: "Rava Dosa", price: 75.0, category: "Breakfast", type: "Veg", subType: "Pure-Veg" },
    
    // Lunch - Vindu Bhojanam (26-55)
    { name: "Andhra Veg Meals Thali", price: 180.0, category: "Lunch", type: "Veg", subType: "Pure-Veg" },
    { name: "Gutti Vankaya Koora", price: 130.0, category: "Lunch", type: "Veg", subType: "Pure-Veg" },
    { name: "Tomato Pappu", price: 90.0, category: "Lunch", type: "Veg", subType: "Pure-Veg" },
    { name: "Gongura Pappu", price: 95.0, category: "Lunch", type: "Veg", subType: "Pure-Veg" },
    { name: "Dosakaya Pappu", price: 90.0, category: "Lunch", type: "Veg", subType: "Pure-Veg" },
    { name: "Menthi Pappu", price: 90.0, category: "Lunch", type: "Veg", subType: "Pure-Veg" },
    { name: "Kakarakaya Vepudu", price: 100.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Bendakaya Fry", price: 95.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Dondakaya Vepudu", price: 95.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Aratikaaya Vepudu", price: 100.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Chikkudukaya Koora", price: 110.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Beerakaya Eguru", price: 100.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Chamadumpala Pulusu", price: 115.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Tomato Charu Bowl", price: 50.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Miryala Rasam Bowl", price: 50.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Pappu Charu Bowl", price: 60.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Ulavacharu Bowl", price: 80.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Gongura Chicken Curry", price: 180.0, category: "Lunch", type: "Non-Veg", subType: "Chicken" },
    { name: "Andhra Chicken Fry (Kodi Vepudu)", price: 190.0, category: "Lunch", type: "Non-Veg", subType: "Chicken" },
    { name: "Rayalaseema Natu Kodi Pulusu", price: 220.0, category: "Lunch", type: "Non-Veg", subType: "Chicken" },
    { name: "Gongura Mutton Koora", price: 240.0, category: "Lunch", type: "Non-Veg", subType: "Mutton" },
    { name: "Andhra Mutton Fry", price: 250.0, category: "Lunch", type: "Non-Veg", subType: "Mutton" },
    { name: "Nellore Chepala Pulusu", price: 210.0, category: "Lunch", type: "Non-Veg", subType: "Fish" },
    { name: "Royyala Iguru (Prawn)", price: 230.0, category: "Lunch", type: "Non-Veg", subType: "Prawns" },
    { name: "Peethala Kura (Crab)", price: 240.0, category: "Lunch", type: "Non-Veg", subType: "Crab" },
    { name: "Bommidala Pulusu (Fish)", price: 250.0, category: "Lunch", type: "Non-Veg", subType: "Fish" },
    { name: "Egg Pulusu", price: 110.0, category: "Lunch", type: "Non-Veg", subType: "Egg" },
    { name: "Egg Masala Curry", price: 120.0, category: "Lunch", type: "Non-Veg", subType: "Egg" },
    { name: "Gobi Manchurian (AP Style)", price: 130.0, category: "Lunch", type: "Veg", subType: "Vegan" },
    { name: "Chili Paneer (AP Style)", price: 150.0, category: "Lunch", type: "Veg", subType: "Pure-Veg" },

    // Dinner (56-75)
    { name: "Ragi Sangati", price: 80.0, category: "Dinner", type: "Veg", subType: "Vegan" },
    { name: "Jonna Rotte", price: 30.0, category: "Dinner", type: "Veg", subType: "Vegan" },
    { name: "Sajja Rotte", price: 35.0, category: "Dinner", type: "Veg", subType: "Vegan" },
    { name: "Chapathi", price: 25.0, category: "Dinner", type: "Veg", subType: "Vegan" },
    { name: "Pulaka", price: 20.0, category: "Dinner", type: "Veg", subType: "Vegan" },
    { name: "Hyderabadi Veg Biryani", price: 160.0, category: "Dinner", type: "Veg", subType: "Pure-Veg" },
    { name: "Paneer Biryani", price: 180.0, category: "Dinner", type: "Veg", subType: "Pure-Veg" },
    { name: "Ulavacharu Veg Biryani", price: 190.0, category: "Dinner", type: "Veg", subType: "Pure-Veg" },
    { name: "Kaju Biryani", price: 210.0, category: "Dinner", type: "Veg", subType: "Pure-Veg" },
    { name: "Hyderabadi Chicken Biryani", price: 220.0, category: "Dinner", type: "Non-Veg", subType: "Chicken" },
    { name: "Gongura Chicken Biryani", price: 230.0, category: "Dinner", type: "Non-Veg", subType: "Chicken" },
    { name: "Ulavacharu Chicken Biryani", price: 240.0, category: "Dinner", type: "Non-Veg", subType: "Chicken" },
    { name: "Andhra Chicken Fry Piece Biryani", price: 230.0, category: "Dinner", type: "Non-Veg", subType: "Chicken" },
    { name: "Hyderabadi Mutton Biryani", price: 280.0, category: "Dinner", type: "Non-Veg", subType: "Mutton" },
    { name: "Gongura Mutton Biryani", price: 295.0, category: "Dinner", type: "Non-Veg", subType: "Mutton" },
    { name: "Ulavacharu Mutton Biryani", price: 310.0, category: "Dinner", type: "Non-Veg", subType: "Mutton" },
    { name: "Andhra Mutton Fry Piece Biryani", price: 295.0, category: "Dinner", type: "Non-Veg", subType: "Mutton" },
    { name: "Egg Biryani", price: 160.0, category: "Dinner", type: "Non-Veg", subType: "Egg" },
    { name: "Prawn Biryani", price: 260.0, category: "Dinner", type: "Non-Veg", subType: "Prawns" },
    { name: "Fish Biryani", price: 250.0, category: "Dinner", type: "Non-Veg", subType: "Fish" },

    // Pachadi (76-100)
    { name: "Gongura Pachadi", price: 40.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Tomato Pachadi", price: 35.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Dondakaya Pachadi", price: 35.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Kobbari Pachadi", price: 40.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Allam Pachadi", price: 40.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Dosakaya Pachadi", price: 35.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Beerakaya Thokku Pachadi", price: 40.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Avakaya Uragaya", price: 45.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Bellam Avakaya", price: 45.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Maagai Uragaya", price: 45.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Pandu Mirapakaya Pachadi", price: 40.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Usirikaya Pachadi", price: 40.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Chintakaya Pachadi", price: 40.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Nalla Karam Podi", price: 30.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Kandi Podi", price: 35.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Karivepaku Podi", price: 35.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Kakarakaya Podi", price: 40.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Putnala Podi", price: 30.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Ghee Podi Rice Bowl", price: 90.0, category: "Pachadi", type: "Veg", subType: "Pure-Veg" },
    { name: "Curd Rice (Daddojanam)", price: 80.0, category: "Pachadi", type: "Veg", subType: "Pure-Veg" },
    { name: "Lemon Rice (Pulihora)", price: 80.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Tamarind Pulihora", price: 85.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Gongura Rice", price: 90.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Mango Pulihora", price: 90.0, category: "Pachadi", type: "Veg", subType: "Vegan" },
    { name: "Coconut Rice", price: 95.0, category: "Pachadi", type: "Veg", subType: "Vegan" },

    // Snacks (101-125)
    { name: "Mirchi Bajji", price: 45.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Punugulu", price: 40.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Mysore Bonda", price: 50.0, category: "Snacks", type: "Veg", subType: "Pure-Veg" },
    { name: "Challa Punugulu", price: 45.0, category: "Snacks", type: "Veg", subType: "Pure-Veg" },
    { name: "Onion Pakodi", price: 40.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Garijalu", price: 50.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Chegodi", price: 35.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Janthikalu", price: 35.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Murukulu", price: 35.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Sakinalu", price: 40.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Poha Mixture", price: 30.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Masala Vada", price: 45.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Sweet Corn Vadalu", price: 55.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Aloo Samosa", price: 35.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Veg Cutlet", price: 50.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Spring Rolls (AP style)", price: 70.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Onion Bajji", price: 40.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Aloo Bajji", price: 40.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Aratikaaya Bajji", price: 45.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Tomato Bajji", price: 50.0, category: "Snacks", type: "Veg", subType: "Vegan" },
    { name: "Chicken Pakodi", price: 110.0, category: "Snacks", type: "Non-Veg", subType: "Chicken" },
    { name: "Egg Bonda", price: 70.0, category: "Snacks", type: "Non-Veg", subType: "Egg" },
    { name: "Fish Finger (AP style)", price: 140.0, category: "Snacks", type: "Non-Veg", subType: "Fish" },
    { name: "Chicken Keema Samosa", price: 80.0, category: "Snacks", type: "Non-Veg", subType: "Chicken" },
    { name: "Prawn Fry (Snack)", price: 160.0, category: "Snacks", type: "Non-Veg", subType: "Prawns" },

    // Drinks & Sweets (126-150)
    { name: "South Indian Filter Kaapi", price: 40.0, category: "Drinks", type: "Veg", subType: "Dairy-Based" },
    { name: "Bellam Paanakam", price: 35.0, category: "Drinks", type: "Veg", subType: "Vegan" },
    { name: "Spiced Majjiga (Buttermilk)", price: 35.0, category: "Drinks", type: "Veg", subType: "Dairy-Based" },
    { name: "Nannari Sharbat", price: 45.0, category: "Drinks", type: "Veg", subType: "Vegan" },
    { name: "Sugandhi Soda", price: 40.0, category: "Drinks", type: "Veg", subType: "Vegan" },
    { name: "Badam Milk (Cold)", price: 60.0, category: "Drinks", type: "Veg", subType: "Dairy-Based" },
    { name: "Ragi Ambali", price: 45.0, category: "Drinks", type: "Veg", subType: "Vegan" },
    { name: "Coconut Water", price: 40.0, category: "Drinks", type: "Veg", subType: "Vegan" },
    { name: "Lemon Soda", price: 35.0, category: "Drinks", type: "Veg", subType: "Vegan" },
    { name: "Mango Lassi", price: 70.0, category: "Drinks", type: "Veg", subType: "Dairy-Based" },
    { name: "Rose Milk", price: 55.0, category: "Drinks", type: "Veg", subType: "Dairy-Based" },
    { name: "Masala Tea", price: 30.0, category: "Drinks", type: "Veg", subType: "Dairy-Based" },
    { name: "Ginger Tea", price: 30.0, category: "Drinks", type: "Veg", subType: "Dairy-Based" },
    { name: "Atreyapuram Bellam Pootharekulu", price: 40.0, category: "Sweets", type: "Veg", subType: "Bellam" },
    { name: "Kakinada Gottam Kaja", price: 30.0, category: "Sweets", type: "Veg", subType: "Ghee" },
    { name: "Tapeswaram Madatha Kaja", price: 35.0, category: "Sweets", type: "Veg", subType: "Ghee" },
    { name: "Andhra Bobbatlu", price: 60.0, category: "Sweets", type: "Veg", subType: "Chana Dal" },
    { name: "Nethi Ariselu", price: 50.0, category: "Sweets", type: "Veg", subType: "Ghee" },
    { name: "Bellam Sunnundalu", price: 45.0, category: "Sweets", type: "Veg", subType: "Urad Dal" },
    { name: "Poornalu / Boorelu", price: 40.0, category: "Sweets", type: "Veg", subType: "Traditional" },
    { name: "Madugula Halwa", price: 70.0, category: "Sweets", type: "Veg", subType: "Wheat" },
    { name: "Ghee Mysore Pak", price: 80.0, category: "Sweets", type: "Veg", subType: "Ghee" },
    { name: "Rava Kesari", price: 60.0, category: "Sweets", type: "Veg", subType: "Semolina" },
    { name: "Paramannam Payasam", price: 75.0, category: "Sweets", type: "Veg", subType: "Rice-Milk" },
    { name: "Elaneer Payasam", price: 90.0, category: "Sweets", type: "Veg", subType: "Coconut-Milk" }
];

// DOM Elements
const selectedStallTitle = document.getElementById('selected-stall-title');
const selectedStallBadge = document.getElementById('selected-stall-badge');
const menuItemsContainer = document.getElementById('menu-items-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const vegOnlyToggle = document.getElementById('veg-only-toggle');

const cartItemsContainer = document.getElementById('cart-items-container');
const customerNameInput = document.getElementById('customer-name');
const deliveryAddressSelect = document.getElementById('delivery-address');
const paymentMethodSelect = document.getElementById('payment-method');
const promoCodeInput = document.getElementById('promo-code');
const applyPromoBtn = document.getElementById('apply-promo-btn');
const promoFeedback = document.getElementById('promo-feedback');

const billSubtotal = document.getElementById('bill-subtotal');
const billDiscountRow = document.getElementById('bill-discount-row');
const discountPctLabel = document.getElementById('discount-pct');
const billDiscountValue = document.getElementById('bill-discount');
const billDelivery = document.getElementById('bill-delivery');
const billPackaging = document.getElementById('bill-packaging');
const billTax = document.getElementById('bill-tax');
const billTotal = document.getElementById('bill-total');
const placeOrderBtn = document.getElementById('place-order-btn');

const refreshOrdersBtn = document.getElementById('refresh-orders-btn');
const ordersTimelineContainer = document.getElementById('orders-timeline-container');

// Stats Elements
const statRevenue = document.getElementById('stat-revenue');
const statOrders = document.getElementById('stat-orders');
const statTopItem = document.getElementById('stat-top-item');
const statQueue = document.getElementById('stat-queue');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    fetchRestaurants();
    fetchOrders();
    fetchStats();
    setupEventListeners();

    setInterval(() => {
        fetchOrders();
        fetchStats();
    }, 3000);
});

// Setup Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', () => {
        renderMenu();
    });

    vegOnlyToggle.addEventListener('change', () => {
        renderMenu();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            renderMenu();
        });
    });

    applyPromoBtn.addEventListener('click', applyPromoCode);
    customerNameInput.addEventListener('input', validateCheckoutForm);
    placeOrderBtn.addEventListener('click', placeOrder);

    refreshOrdersBtn.addEventListener('click', () => {
        fetchOrders();
        fetchStats();
    });
}

// Play Audio Feedback
function playSynthesizedSound(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        if (type === 'order-placed') {
            const now = ctx.currentTime;
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.type = 'sine';
            gain1.gain.setValueAtTime(0.08, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc1.frequency.setValueAtTime(523.25, now); // C5
            osc1.frequency.setValueAtTime(659.25, now + 0.12); // E5
            
            osc1.start(now);
            osc1.stop(now + 0.5);
        } else if (type === 'food-ready') {
            const now = ctx.currentTime;
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
            osc.frequency.setValueAtTime(880.0, now); 
            
            const oscH = ctx.createOscillator();
            const gainH = ctx.createGain();
            oscH.connect(gainH);
            gainH.connect(ctx.destination);
            oscH.type = 'sine';
            gainH.gain.setValueAtTime(0.04, now);
            gainH.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            oscH.frequency.setValueAtTime(1320.0, now); 
            
            osc.start(now);
            osc.stop(now + 1.2);
            oscH.start(now);
            oscH.stop(now + 0.8);
        }
    } catch (e) {
        console.warn("Web Audio API blocked:", e);
    }
}

// 1. Fetch Restaurants
async function fetchRestaurants() {
    try {
        const response = await fetch('/api/restaurants');
        if (!response.ok) throw new Error("HTTP error " + response.status);
        restaurants = await response.json();
        isSimulatorMode = false;
        document.querySelector('.status-text').textContent = "Pullamma Swiggy Engine Online";
    } catch (error) {
        isSimulatorMode = true;
        document.querySelector('.status-text').textContent = "Static Browser Simulator Mode";
        
        restaurants = [{
            name: "Hotel Pullamma",
            address: "Main Road, Near Temple, Andhra Pradesh",
            status: "Open",
            menu: FALLBACK_150_ITEMS
        }];
        
        const saved = localStorage.getItem('pullamma_orders');
        if (saved) {
            orders = JSON.parse(saved);
        }
    }

    if (restaurants.length > 0) {
        selectedRestaurant = restaurants[0];
        selectedStallTitle.textContent = `🍛 ${selectedRestaurant.name}`;
        selectedStallBadge.textContent = selectedRestaurant.address;
        
        document.querySelector('.hotel-title').textContent = selectedRestaurant.name;
        document.querySelector('.hotel-location').textContent = `📍 ${selectedRestaurant.address}`;
        
        renderMenu();
        renderCart();
    }
}

// Live kitchen queue status check
function updateCrowdStatus() {
    const activeQueueCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
    const crowdLabel = document.getElementById('hotel-crowd-label');
    const dot = document.querySelector('.crowd-indicator-dot');
    if (!crowdLabel || !dot) return;

    if (activeQueueCount >= 4) {
        crowdLabel.textContent = "High Demand";
        crowdLabel.parentElement.style.color = "var(--accent-nonveg)";
        crowdLabel.parentElement.style.borderColor = "var(--nonveg-glow)";
        crowdLabel.parentElement.style.background = "rgba(239, 68, 68, 0.1)";
        dot.style.backgroundColor = "var(--accent-nonveg)";
        dot.style.boxShadow = "0 0 10px var(--accent-nonveg)";
    } else if (activeQueueCount > 0) {
        crowdLabel.textContent = "Medium Queue";
        crowdLabel.parentElement.style.color = "var(--warning)";
        crowdLabel.parentElement.style.borderColor = "var(--warning-glow)";
        crowdLabel.parentElement.style.background = "rgba(245, 158, 11, 0.1)";
        dot.style.backgroundColor = "var(--warning)";
        dot.style.boxShadow = "0 0 10px var(--warning)";
    } else {
        crowdLabel.textContent = "Low Queue";
        crowdLabel.parentElement.style.color = "var(--accent-veg)";
        crowdLabel.parentElement.style.borderColor = "var(--veg-glow)";
        crowdLabel.parentElement.style.background = "rgba(22, 163, 74, 0.1)";
        dot.style.backgroundColor = "var(--accent-veg)";
        dot.style.boxShadow = "0 0 10px var(--accent-veg)";
    }
}

// 2. Render Menu Items with category filter, search, and Veg-Only switches
function renderMenu() {
    if (!selectedRestaurant) return;

    const items = selectedRestaurant.menu;
    const searchText = searchInput.value.toLowerCase().trim();
    const isVegOnly = vegOnlyToggle.checked;
    
    const filteredItems = items.filter(item => {
        if (isVegOnly && item.type !== 'Veg') {
            return false;
        }

        if (searchText && !item.name.toLowerCase().includes(searchText) && !item.category.toLowerCase().includes(searchText)) {
            return false;
        }

        if (activeFilter === 'all') return true;
        if (activeFilter === 'Veg' || activeFilter === 'Non-Veg') {
            return item.type === activeFilter;
        }
        return item.category.toLowerCase() === activeFilter.toLowerCase();
    });

    if (filteredItems.length === 0) {
        menuItemsContainer.innerHTML = `<div class="placeholder-info"><p>No items match your criteria.</p></div>`;
        return;
    }

    menuItemsContainer.innerHTML = '';
    filteredItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-item-card';
        card.style.animationDelay = `${Math.min(index * 0.02, 0.4)}s`;

        const dotClass = item.type === 'Veg' ? 'veg' : 'non-veg';
        const typeDetails = item.type === 'Veg' ? `Veg (${item.subType})` : `Non-Veg (Protein: ${item.subType})`;

        let cals = 280;
        let rating = "4.7 ★";
        if (ITEM_META[item.name]) {
            cals = ITEM_META[item.name].cals;
            rating = ITEM_META[item.name].rating;
        } else {
            let hash = 0;
            for (let i = 0; i < item.name.length; i++) {
                hash += item.name.charCodeAt(i);
            }
            cals = 80 + (hash % 500); 
            rating = (4.4 + (hash % 6) * 0.1).toFixed(1) + " ★"; 
        }

        // Check if item is in the cart to render ADD button or Quantity Pill
        const inCartQty = cart[item.name] ? cart[item.name].quantity : 0;
        let actionMarkup = '';
        if (inCartQty > 0) {
            actionMarkup = `
                <div class="qty-pill-swiggy">
                    <button class="qty-btn-swiggy dec-btn" data-name="${item.name}">-</button>
                    <span class="qty-val-swiggy">${inCartQty}</span>
                    <button class="qty-btn-swiggy inc-btn" data-name="${item.name}">+</button>
                </div>`;
        } else {
            actionMarkup = `<button class="add-cart-btn-swiggy add-btn" data-name="${item.name}">ADD</button>`;
        }

        card.innerHTML = `
            <div class="item-left">
                <div class="item-badge-row">
                    <span class="item-type-dot ${dotClass}" title="${typeDetails}"></span>
                    <span class="item-category">${item.category}</span>
                    <span class="item-nutrition">⚡ ${cals} kcal &bull; ⭐ ${rating}</span>
                </div>
                <span class="item-name">${item.name}</span>
                <span class="item-desc">Fresh, authentic Andhra dish prepared in Hotel Pullamma's kitchen.</span>
                <span class="item-price">₹${item.price.toFixed(2)}</span>
            </div>
            <div class="item-right">
                ${actionMarkup}
            </div>
        `;

        // Bind Actions
        const addBtn = card.querySelector('.add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => addToCart(item));
        }

        const incBtn = card.querySelector('.inc-btn');
        if (incBtn) {
            incBtn.addEventListener('click', () => addToCart(item));
        }

        const decBtn = card.querySelector('.dec-btn');
        if (decBtn) {
            decBtn.addEventListener('click', () => removeFromCart(item.name));
        }

        menuItemsContainer.appendChild(card);
    });
}

// 3. Cart Management with quantities support
function addToCart(item) {
    if (cart[item.name]) {
        cart[item.name].quantity += 1;
    } else {
        cart[item.name] = { item: item, quantity: 1 };
    }
    renderCart();
    renderMenu();
    validateCheckoutForm();
}

function removeFromCart(itemName) {
    if (cart[itemName]) {
        cart[itemName].quantity -= 1;
        if (cart[itemName].quantity <= 0) {
            delete cart[itemName];
        }
    }
    renderCart();
    renderMenu();
    validateCheckoutForm();
}

function renderCart() {
    const cartKeys = Object.keys(cart);

    if (cartKeys.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <span class="cart-icon">🛒</span>
                <p>Your leaf is empty.<br>Add items from the menu to start ordering.</p>
            </div>`;
        billSubtotal.textContent = "₹0.00";
        billDiscountRow.classList.add('hidden');
        
        // Hide fees when cart is empty
        document.getElementById('bill-delivery-row').classList.add('hidden');
        document.getElementById('bill-packaging-row').classList.add('hidden');
        document.getElementById('bill-tax-row').classList.add('hidden');
        
        billTotal.textContent = "₹0.00";
        return;
    }

    cartItemsContainer.innerHTML = '';
    let itemSubtotal = 0.0;

    cartKeys.forEach((key) => {
        const cartLine = cart[key];
        const linePrice = cartLine.item.price * cartLine.quantity;
        itemSubtotal += linePrice;

        const div = document.createElement('div');
        div.className = 'cart-item-swiggy';
        div.innerHTML = `
            <div class="cart-item-info-swiggy">
                <span class="cart-item-name-swiggy">${cartLine.item.type === 'Veg' ? '🟢' : '🔴'} ${cartLine.item.name}</span>
                <span class="cart-item-category-swiggy">${cartLine.item.category}</span>
            </div>
            <div class="cart-item-actions-swiggy">
                <div class="cart-qty-pill">
                    <button class="cart-qty-btn cart-dec" data-name="${cartLine.item.name}">-</button>
                    <span class="cart-qty-val">${cartLine.quantity}</span>
                    <button class="cart-qty-btn cart-inc" data-name="${cartLine.item.name}">+</button>
                </div>
                <span class="cart-item-price-swiggy">₹${linePrice.toFixed(2)}</span>
            </div>
        `;

        div.querySelector('.cart-inc').addEventListener('click', () => {
            addToCart(cartLine.item);
        });

        div.querySelector('.cart-dec').addEventListener('click', () => {
            removeFromCart(cartLine.item.name);
        });

        cartItemsContainer.appendChild(div);
    });

    // Detailed Swiggy Billing equations
    const discountAmount = itemSubtotal * (appliedDiscount / 100.0);
    const gstAmount = itemSubtotal * 0.05; // 5% GST
    const payableTotal = itemSubtotal - discountAmount + gstAmount + DELIVERY_FEE + PACKAGING_FEE;

    billSubtotal.textContent = `₹${itemSubtotal.toFixed(2)}`;
    
    if (appliedDiscount > 0) {
        discountPctLabel.textContent = appliedDiscount;
        billDiscountValue.textContent = `-₹${discountAmount.toFixed(2)}`;
        billDiscountRow.classList.remove('hidden');
    } else {
        billDiscountRow.classList.add('hidden');
    }

    // Show fees
    document.getElementById('bill-delivery-row').classList.remove('hidden');
    document.getElementById('bill-packaging-row').classList.remove('hidden');
    document.getElementById('bill-tax-row').classList.remove('hidden');

    billDelivery.textContent = `₹${DELIVERY_FEE.toFixed(2)}`;
    billPackaging.textContent = `₹${PACKAGING_FEE.toFixed(2)}`;
    billTax.textContent = `₹${gstAmount.toFixed(2)}`;
    billTotal.textContent = `₹${payableTotal.toFixed(2)}`;
}

// Apply Promo Code
function applyPromoCode() {
    const code = promoCodeInput.value.trim().toUpperCase();
    if (!code) {
        appliedDiscount = 0.0;
        promoCodeApplied = "";
        promoFeedback.className = "promo-feedback";
        promoFeedback.textContent = "";
        renderCart();
        return;
    }

    if (PROMO_CODES.hasOwnProperty(code)) {
        appliedDiscount = PROMO_CODES[code];
        promoCodeApplied = code;
        promoFeedback.className = "promo-feedback success";
        promoFeedback.textContent = `🎉 Promo applied! ${appliedDiscount}% Off.`;
    } else {
        appliedDiscount = 0.0;
        promoCodeApplied = "";
        promoFeedback.className = "promo-feedback error";
        promoFeedback.textContent = "❌ Invalid code. Try PULLAMMA50.";
    }
    renderCart();
}

function validateCheckoutForm() {
    const name = customerNameInput.value.trim();
    const hasItems = Object.keys(cart).length > 0;
    
    placeOrderBtn.disabled = !(name && hasItems);
}

// 4. Place Order
async function placeOrder() {
    const name = customerNameInput.value.trim();
    const cartKeys = Object.keys(cart);
    if (!name || cartKeys.length === 0) return;

    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = "Sending to Swiggy...";

    // Flatten cart items to array of names repeating based on quantity
    const itemsFlatList = [];
    cartKeys.forEach(key => {
        const cartLine = cart[key];
        for (let i = 0; i < cartLine.quantity; i++) {
            itemsFlatList.push(cartLine.item.name);
        }
    });

    if (isSimulatorMode) {
        setTimeout(() => {
            const newOrderNo = orders.length + 1;
            
            // Re-calculate math locally
            let itemSubtotal = 0;
            cartKeys.forEach(k => {
                itemSubtotal += cart[k].item.price * cart[k].quantity;
            });
            const discountAmount = itemSubtotal * (appliedDiscount / 100.0);
            const gstAmount = itemSubtotal * 0.05;
            const finalPrice = Math.round((itemSubtotal - discountAmount + gstAmount + DELIVERY_FEE + PACKAGING_FEE) * 100.0) / 100.0;

            const flatItemsRepresentation = [];
            cartKeys.forEach(k => {
                for (let i = 0; i < cart[k].quantity; i++) {
                    flatItemsRepresentation.push(cart[k].item);
                }
            });

            const newOrder = {
                orderNo: newOrderNo,
                customerName: name,
                items: flatItemsRepresentation,
                discountApplied: appliedDiscount,
                finalPrice: finalPrice,
                status: "Pending"
            };

            orders.push(newOrder);
            localStorage.setItem('pullamma_orders', JSON.stringify(orders));

            playSynthesizedSound('order-placed');
            clearCartForm();
            simulateKitchenCooking(newOrderNo);
            renderOrders();
            updateCrowdStatus();
            fetchStats();
        }, 800);
    } else {
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: name,
                    items: itemsFlatList,
                    discount: appliedDiscount
                })
            });

            if (!response.ok) throw new Error("Failed to place order");

            playSynthesizedSound('order-placed');
            clearCartForm();
            fetchOrders();
            fetchStats();
        } catch (error) {
            console.error("Order error:", error);
            alert("Connection lost. Switched to Static Simulator.");
        }
    }
}

function clearCartForm() {
    cart = {};
    promoCodeInput.value = "";
    appliedDiscount = 0.0;
    promoCodeApplied = "";
    promoFeedback.textContent = "";
    renderCart();
    renderMenu();
    validateCheckoutForm();
    placeOrderBtn.textContent = "⚡ Send Order to Pullamma Kitchen";
    document.querySelector('.order-tracking-section').scrollIntoView({ behavior: 'smooth' });
}

// Simulated Cooking Steps (Automatic pipeline progression)
function simulateKitchenCooking(orderNo) {
    // 1. Advance to Preparing in 3 seconds
    setTimeout(() => {
        const order = orders.find(o => o.orderNo === orderNo);
        if (order && order.status === 'Pending') {
            order.status = "Preparing";
            localStorage.setItem('pullamma_orders', JSON.stringify(orders));
            renderOrders();
            updateCrowdStatus();
        }
    }, 3000);

    // 2. Advance to Ready in 8 seconds and play temple bell chime
    setTimeout(() => {
        const order = orders.find(o => o.orderNo === orderNo);
        if (order && order.status === 'Preparing') {
            order.status = "Ready";
            localStorage.setItem('pullamma_orders', JSON.stringify(orders));
            playSynthesizedSound('food-ready');
            renderOrders();
            updateCrowdStatus();
        }
    }, 8000);
}

// 5. Fetch & Render Orders (Live Status Timeline)
async function fetchOrders() {
    if (isSimulatorMode) {
        renderOrders();
        updateCrowdStatus();
    } else {
        try {
            const response = await fetch('/api/orders');
            if (!response.ok) throw new Error("HTTP " + response.status);
            const fetchedOrders = await response.json();
            
            detectStatusChanges(fetchedOrders);
            orders = fetchedOrders;
            renderOrders();
            updateCrowdStatus();
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    }
}

function detectStatusChanges(newOrders) {
    newOrders.forEach(newO => {
        const oldO = orders.find(o => o.orderNo === newO.orderNo);
        if (oldO && oldO.status !== 'Ready' && newO.status === 'Ready') {
            playSynthesizedSound('food-ready');
        }
    });
}

function renderOrders() {
    if (orders.length === 0) {
        ordersTimelineContainer.innerHTML = `
            <div class="empty-orders-message">
                <span class="clock-icon">🕒</span>
                <p>No active orders in the kitchen. Order now to track.</p>
            </div>`;
        return;
    }

    const sortedOrders = [...orders].reverse();
    ordersTimelineContainer.innerHTML = '';

    sortedOrders.forEach((order, index) => {
        const card = document.createElement('div');
        card.className = 'order-monitor-card';
        card.style.animationDelay = `${index * 0.05}s`;

        const status = order.status;
        let step1 = '', step2 = '', step3 = '', step4 = '';
        let fillWidth = '0%';

        if (status === 'Pending') {
            step1 = 'active';
            fillWidth = '0%';
        } else if (status === 'Preparing') {
            step1 = 'done';
            step2 = 'active';
            fillWidth = '33.3%';
        } else if (status === 'Ready') {
            step1 = 'done';
            step2 = 'done';
            step3 = 'active';
            fillWidth = '66.6%';
        } else if (status === 'Delivered') {
            step1 = 'done';
            step2 = 'done';
            step3 = 'done';
            step4 = 'done';
            fillWidth = '100%';
        }

        // Group same item names with quantities for professional Swiggy list formatting
        const itemCounts = {};
        order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
        });

        const itemsString = Object.entries(itemCounts).map(([name, qty]) => {
            const matched = order.items.find(i => i.name === name);
            const dot = matched && matched.type === 'Veg' ? '🟢' : '🔴';
            return `${dot} ${name} x ${qty}`;
        }).join(', ');

        card.innerHTML = `
            <div class="order-card-top">
                <div class="order-id-info">
                    <h4>Order #${order.orderNo} &bull; ${order.customerName}</h4>
                    <p class="order-items-list">${itemsString}</p>
                </div>
                <div class="order-price-summary">
                    <div class="price">₹${order.finalPrice.toFixed(2)}</div>
                    ${order.discountApplied > 0 ? `<div class="discount">${order.discountApplied}% Promo Applied</div>` : ''}
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="order-progress-container">
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${fillWidth}"></div>
                </div>
                <div class="progress-step ${step1}">
                    <div class="step-dot"></div>
                    <span class="step-label">Pending</span>
                </div>
                <div class="progress-step ${step2}">
                    <div class="step-dot"></div>
                    <span class="step-label">Preparing</span>
                </div>
                <div class="progress-step ${step3}">
                    <div class="step-dot"></div>
                    <span class="step-label">Ready</span>
                </div>
                <div class="progress-step ${step4}">
                    <div class="step-dot"></div>
                    <span class="step-label">Picked Up</span>
                </div>
            </div>

            ${status !== 'Delivered' ? `
            <div class="order-actions">
                <button class="btn-status-sim" data-id="${order.orderNo}">
                    ${status === 'Pending' ? '👨‍🍳 Start Cooking' : status === 'Preparing' ? '🔔 Mark as Ready' : '✅ Mark Picked Up'}
                </button>
            </div>
            ` : ''}
        `;

        const simBtn = card.querySelector('.btn-status-sim');
        if (simBtn) {
            simBtn.addEventListener('click', () => advanceOrderStatus(order.orderNo));
        }

        ordersTimelineContainer.appendChild(card);
    });
}

// Advance status of order
async function advanceOrderStatus(orderNo) {
    if (isSimulatorMode) {
        const order = orders.find(o => o.orderNo === orderNo);
        if (order) {
            const current = order.status;
            if (current === "Pending") {
                order.status = "Preparing";
            } else if (current === "Preparing") {
                order.status = "Ready";
                playSynthesizedSound('food-ready');
            } else if (current === "Ready") {
                order.status = "Delivered";
            }
            localStorage.setItem('pullamma_orders', JSON.stringify(orders));
            renderOrders();
            updateCrowdStatus();
            fetchStats();
        }
    } else {
        try {
            const response = await fetch('/api/orders/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderNo: orderNo })
            });
            if (!response.ok) throw new Error("Failed to advance status");
            fetchOrders();
            fetchStats();
        } catch (error) {
            console.error("Error advancing status:", error);
        }
    }
}

// 6. Fetch Dashboard Statistics
async function fetchStats() {
    if (isSimulatorMode) {
        let totalRevenue = 0.0;
        const itemSales = {};
        
        orders.forEach(o => {
            if (o.status !== 'Cancelled') {
                totalRevenue += o.finalPrice;
            }
            o.items.forEach(item => {
                itemSales[item.name] = (itemSales[item.name] || 0) + 1;
            });
        });

        let topItem = "N/A";
        let topSales = 0;
        for (const name in itemSales) {
            if (itemSales[name] > topSales) {
                topSales = itemSales[name];
                topItem = name;
            }
        }

        statRevenue.textContent = `₹${totalRevenue.toFixed(2)}`;
        statOrders.textContent = orders.length;
        statTopItem.textContent = topItem !== "N/A" ? topItem : "None";
        statQueue.textContent = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
    } else {
        try {
            const response = await fetch('/api/stats');
            if (!response.ok) throw new Error("HTTP " + response.status);
            const stats = await response.json();

            statRevenue.textContent = `₹${stats.totalRevenue.toFixed(2)}`;
            statOrders.textContent = stats.totalOrders;
            statTopItem.textContent = stats.topSellingItem !== "N/A" ? stats.topSellingItem : "None";
            
            const activeQueueCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
            statQueue.textContent = activeQueueCount;
        } catch (error) {
            console.error("Error loading stats:", error);
        }
    }
}
