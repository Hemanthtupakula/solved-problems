// App State
let restaurants = [];
let orders = [];
let cart = [];
let selectedRestaurant = null;
let activeFilter = 'all';
let appliedDiscount = 0.0;
let promoCodeApplied = "";

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

// DOM Elements
const selectedStallTitle = document.getElementById('selected-stall-title');
const selectedStallBadge = document.getElementById('selected-stall-badge');
const menuItemsContainer = document.getElementById('menu-items-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');

const cartItemsContainer = document.getElementById('cart-items-container');
const customerNameInput = document.getElementById('customer-name');
const promoCodeInput = document.getElementById('promo-code');
const applyPromoBtn = document.getElementById('apply-promo-btn');
const promoFeedback = document.getElementById('promo-feedback');

const billSubtotal = document.getElementById('bill-subtotal');
const billDiscountRow = document.getElementById('bill-discount-row');
const discountPctLabel = document.getElementById('discount-pct');
const billDiscountValue = document.getElementById('bill-discount');
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

    // Poll for live kitchen queue updates
    setInterval(() => {
        fetchOrders();
        fetchStats();
    }, 3000);
});

// Setup Listeners
function setupEventListeners() {
    // Search Box Input
    searchInput.addEventListener('input', () => {
        renderMenu();
    });

    // Menu Category Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            renderMenu();
        });
    });

    // Promo Code Application
    applyPromoBtn.addEventListener('click', applyPromoCode);

    // Cart Button Check
    customerNameInput.addEventListener('input', validateCheckoutForm);

    // Place Order Button
    placeOrderBtn.addEventListener('click', placeOrder);

    // Manual Refresh Button
    refreshOrdersBtn.addEventListener('click', () => {
        fetchOrders();
        fetchStats();
    });
}

// Play Synthesized Audio (Zero file dependencies)
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
            
            osc.frequency.setValueAtTime(880.0, now); // A5 resonant bell base
            
            const oscH = ctx.createOscillator();
            const gainH = ctx.createGain();
            oscH.connect(gainH);
            gainH.connect(ctx.destination);
            oscH.type = 'sine';
            gainH.gain.setValueAtTime(0.04, now);
            gainH.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            oscH.frequency.setValueAtTime(1320.0, now); // E6 copper resonance
            
            osc.start(now);
            osc.stop(now + 1.2);
            oscH.start(now);
            oscH.stop(now + 0.8);
        }
    } catch (e) {
        console.warn("Web Audio API blocked by browser permissions:", e);
    }
}

// 1. Fetch Master Restaurant Profile
async function fetchRestaurants() {
    try {
        const response = await fetch('/api/restaurants');
        if (!response.ok) throw new Error("HTTP error " + response.status);
        restaurants = await response.json();
        
        // Select the single master hotel "Hotel Pullamma" automatically
        if (restaurants.length > 0) {
            selectedRestaurant = restaurants[0];
            selectedStallTitle.textContent = `🍛 ${selectedRestaurant.name}`;
            selectedStallBadge.textContent = selectedRestaurant.address;
            
            // Sync information with profile card
            document.querySelector('.hotel-title').textContent = selectedRestaurant.name;
            document.querySelector('.hotel-location').textContent = `📍 ${selectedRestaurant.address}`;
            
            renderMenu();
        }
    } catch (error) {
        console.error("Error loading restaurants:", error);
        menuItemsContainer.innerHTML = `<div class="placeholder-info"><p style="color: var(--accent-nonveg)">⚠️ Failed to connect to Central Engine. Ensure Java backend is running.</p></div>`;
    }
}

// Update the live crowd label based on active orders
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

// 2. Render Menu Items with category filter & search text matching
function renderMenu() {
    if (!selectedRestaurant) return;

    const items = selectedRestaurant.menu;
    const searchText = searchInput.value.toLowerCase().trim();
    
    // Filter items
    const filteredItems = items.filter(item => {
        // Search query check
        if (searchText && !item.name.toLowerCase().includes(searchText) && !item.category.toLowerCase().includes(searchText)) {
            return false;
        }

        // Category tab check
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
        // Add progressive animation delay for sleek card slide-up stagger effect
        card.style.animationDelay = `${Math.min(index * 0.02, 0.4)}s`;

        const dotClass = item.type === 'Veg' ? 'veg' : 'non-veg';
        const typeDetails = item.type === 'Veg' ? `Veg (${item.subType})` : `Non-Veg (Protein: ${item.subType})`;

        // Get calories and rating metadata dynamically with deterministic hash fallbacks
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
            cals = 80 + (hash % 500); // 80 to 580 kcal
            rating = (4.4 + (hash % 6) * 0.1).toFixed(1) + " ★"; // 4.4 to 4.9 ★
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
                <button class="add-cart-btn">Add to Cart</button>
            </div>
        `;

        card.querySelector('.add-cart-btn').addEventListener('click', () => {
            addToCart(item);
        });

        menuItemsContainer.appendChild(card);
    });
}

// 3. Cart Management
function addToCart(item) {
    cart.push(item);
    renderCart();
    validateCheckoutForm();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
    validateCheckoutForm();
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <span class="cart-icon">🛒</span>
                <p>Your leaf is empty.<br>Add items from the menu to start ordering.</p>
            </div>`;
        billSubtotal.textContent = "₹0.00";
        billDiscountRow.classList.add('hidden');
        billTotal.textContent = "₹0.00";
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0.0;

    cart.forEach((item, index) => {
        subtotal += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span class="cart-item-name">${item.type === 'Veg' ? '🟢' : '🔴'} ${item.name}</span>
            <div class="cart-item-meta">
                <span class="cart-item-price">₹${item.price.toFixed(2)}</span>
                <button class="remove-cart-btn" title="Remove Item">&times;</button>
            </div>
        `;

        div.querySelector('.remove-cart-btn').addEventListener('click', () => {
            removeFromCart(index);
        });

        cartItemsContainer.appendChild(div);
    });

    const discountAmount = subtotal * (appliedDiscount / 100.0);
    const grandTotal = subtotal - discountAmount;

    billSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    
    if (appliedDiscount > 0) {
        discountPctLabel.textContent = appliedDiscount;
        billDiscountValue.textContent = `-₹${discountAmount.toFixed(2)}`;
        billDiscountRow.classList.remove('hidden');
    } else {
        billDiscountRow.classList.add('hidden');
    }

    billTotal.textContent = `₹${grandTotal.toFixed(2)}`;
}

// Promo Code validation
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
        promoFeedback.textContent = "❌ Invalid promo code. Try DOSA20 or PULLAMMA50.";
    }
    renderCart();
}

function validateCheckoutForm() {
    const name = customerNameInput.value.trim();
    const hasItems = cart.length > 0;
    
    placeOrderBtn.disabled = !(name && hasItems);
}

// 4. Place Order API Call
async function placeOrder() {
    const name = customerNameInput.value.trim();
    if (!name || cart.length === 0) return;

    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = "Sending to Kitchen...";

    const payload = {
        customerName: name,
        items: cart.map(item => item.name),
        discount: appliedDiscount
    };

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Failed to place order");

        const placedOrder = await response.json();
        
        // Play success chime
        playSynthesizedSound('order-placed');

        // Reset cart
        cart = [];
        promoCodeInput.value = "";
        appliedDiscount = 0.0;
        promoCodeApplied = "";
        promoFeedback.textContent = "";
        renderCart();
        validateCheckoutForm();
        
        placeOrderBtn.textContent = "⚡ Send Order to Pullamma Kitchen";
        
        // Refresh stats & timeline
        fetchOrders();
        fetchStats();

    } catch (error) {
        console.error("Order error:", error);
        alert("Failed to connect to server. Order cancelled.");
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = "⚡ Send Order to Pullamma Kitchen";
    }
}

// 5. Fetch & Render Orders (Live Tracking)
async function fetchOrders() {
    try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error("HTTP " + response.status);
        const fetchedOrders = await response.json();
        
        detectStatusChanges(fetchedOrders);

        orders = fetchedOrders;
        renderOrders();
        updateCrowdStatus(); // dynamically calculate kitchen crowd density
    } catch (error) {
        console.error("Error loading orders:", error);
    }
}

// Sound chime detection on status update
function detectStatusChanges(newOrders) {
    newOrders.forEach(newO => {
        const oldO = orders.find(o => o.orderNo === newO.orderNo);
        // Play temple bell sound if status transitioned to "Ready"
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

        const itemsString = order.items.map(i => `${i.type === 'Veg' ? '🟢' : '🔴'} ${i.name}`).join(', ');

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

// Advance status of order (Simulate Kitchen)
async function advanceOrderStatus(orderNo) {
    try {
        const response = await fetch('/api/orders/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderNo: orderNo })
        });
        
        if (!response.ok) throw new Error("Failed to advance order status");
        
        fetchOrders();
        fetchStats();
    } catch (error) {
        console.error("Error advancing status:", error);
    }
}

// 6. Fetch & Render Dashboard Statistics
async function fetchStats() {
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
