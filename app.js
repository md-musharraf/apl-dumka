// ==========================================================================
// APL DIAGNOSTICS & PATHLAB, DUMKA - JAVASCRIPT
// Handles: Tests Catalog, Filtering, Shopping Cart, and WhatsApp Booking API
// ==========================================================================

// --- DIAGNOSTIC TESTS CATALOG DATA ---
const testsData = [
    {
        id: "t_cbc",
        name: "Complete Blood Count (CBC)",
        category: "general",
        description: "Evaluates overall health and detects a wide range of disorders including anemia, leukemia and infection.",
        price: 299,
        slashedPrice: 499,
        reportTime: "6 Hours",
        parameters: 24,
        isPopular: true
    },
    {
        id: "t_wbc",
        name: "WBC Count (Total Leucocyte Count)",
        category: "general",
        description: "Measures the number of white blood cells in your blood to detect infection, inflammation, or immune disorders.",
        price: 150,
        slashedPrice: 250,
        reportTime: "4 Hours",
        parameters: 1,
        isPopular: false
    },
    {
        id: "t_lipid",
        name: "Lipid Profile (Cholesterol & Fats)",
        category: "general",
        description: "Measures cholesterol, HDL, LDL, and triglycerides to assess cardiovascular health and heart attack risk.",
        price: 499,
        slashedPrice: 899,
        reportTime: "8 Hours",
        parameters: 7,
        isPopular: true
    },
    {
        id: "t_thyroid",
        name: "Thyroid Profile (T3, T4, TSH)",
        category: "hormones",
        description: "Checks how well the thyroid gland is working and helps diagnose hyperthyroidism or hypothyroidism.",
        price: 399,
        slashedPrice: 750,
        reportTime: "6 Hours",
        parameters: 3,
        isPopular: true
    },
    {
        id: "t_hba1c",
        name: "HbA1c (Glycated Haemoglobin)",
        category: "sugar",
        description: "Indicates your average blood sugar level over the past 3 months. Essential for diabetes monitoring.",
        price: 299,
        slashedPrice: 550,
        reportTime: "6 Hours",
        parameters: 1,
        isPopular: true
    },
    {
        id: "t_bsf",
        name: "Blood Sugar Fasting (BSF)",
        category: "sugar",
        description: "Measures blood glucose levels after an 8-12 hour fast to screen for diabetes.",
        price: 80,
        slashedPrice: 150,
        reportTime: "4 Hours",
        parameters: 1,
        isPopular: false
    },
    {
        id: "t_bspp",
        name: "Blood Sugar PP (Post Prandial)",
        category: "sugar",
        description: "Measures blood glucose levels exactly 2 hours after a meal to check post-meal sugar regulation.",
        price: 80,
        slashedPrice: 150,
        reportTime: "4 Hours",
        parameters: 1,
        isPopular: false
    },
    {
        id: "t_lft",
        name: "Liver Function Test (LFT)",
        category: "organs",
        description: "Measures proteins, liver enzymes, and bilirubin levels to check liver health and assess damage.",
        price: 599,
        slashedPrice: 1100,
        reportTime: "6 Hours",
        parameters: 11,
        isPopular: true
    },
    {
        id: "t_kft",
        name: "Kidney Function Test (KFT / RFT)",
        category: "organs",
        description: "Measures Urea, Creatinine, Uric acid, and electrolytes to evaluate renal efficiency.",
        price: 549,
        slashedPrice: 999,
        reportTime: "6 Hours",
        parameters: 9,
        isPopular: false
    },
    {
        id: "t_vitd",
        name: "Vitamin D3 (25-Hydroxy)",
        category: "vitamins",
        description: "Determines bone density, immune response, and overall vitamin D levels in the body.",
        price: 899,
        slashedPrice: 1800,
        reportTime: "Same Day",
        parameters: 1,
        isPopular: true
    },
    {
        id: "t_vitb12",
        name: "Vitamin B12",
        category: "vitamins",
        description: "Assesses nerve health, red blood cell synthesis, and brain functioning parameters.",
        price: 799,
        slashedPrice: 1500,
        reportTime: "Same Day",
        parameters: 1,
        isPopular: false
    },
    {
        id: "t_urine",
        name: "Urine Routine & Microscopy",
        category: "general",
        description: "Screens for urinary tract infections (UTI), kidney disorders, or diabetes indicators via urine analysis.",
        price: 199,
        slashedPrice: 350,
        reportTime: "4 Hours",
        parameters: 18,
        isPopular: false
    },
    {
        id: "t_crp",
        name: "C-Reactive Protein (CRP)",
        category: "infections",
        description: "Identifies systemic inflammation or bacterial infections in the body. Crucial diagnostic marker.",
        price: 349,
        slashedPrice: 650,
        reportTime: "6 Hours",
        parameters: 1,
        isPopular: false
    },
    {
        id: "t_widal",
        name: "Widal Test (Typhoid Screen)",
        category: "infections",
        description: "Slide agglutination test to diagnose enteric/typhoid fever caused by Salmonella bacteria.",
        price: 249,
        slashedPrice: 450,
        reportTime: "6 Hours",
        parameters: 4,
        isPopular: false
    },
    {
        id: "t_dengue",
        name: "Dengue NS1 Antigen & Ab Duo",
        category: "infections",
        description: "Rapid blood test for early detection of Dengue virus antigen and antibodies.",
        price: 599,
        slashedPrice: 1099,
        reportTime: "4 Hours",
        parameters: 3,
        isPopular: false
    },
    {
        id: "t_hb",
        name: "Hemoglobin (Hb%) Only",
        category: "general",
        description: "A fast screen to measure hemoglobin levels for assessing anemia severity.",
        price: 99,
        slashedPrice: 180,
        reportTime: "4 Hours",
        parameters: 1,
        isPopular: false
    }
];

// --- DIAGNOSTIC HEALTH PACKAGES DATA ---
const packagesData = [
    {
        id: "pkg_basic",
        name: "APL Basic Health Checkup",
        price: 999,
        slashedPrice: 2200,
        parameters: "25+ Parameters",
        testsIncluded: [
            "Complete Blood Count (CBC)",
            "Blood Sugar Fasting (BSF)",
            "Serum Creatinine (Kidney)",
            "Serum Cholesterol (Heart)",
            "Urine Routine & Analysis"
        ],
        isPopular: false
    },
    {
        id: "pkg_advanced",
        name: "APL Advanced Wellness Package",
        price: 1999,
        slashedPrice: 4500,
        parameters: "52+ Parameters",
        testsIncluded: [
            "Complete Blood Count (CBC)",
            "Liver Function Test (LFT - 11 Tests)",
            "Kidney Function Test (KFT - 9 Tests)",
            "Lipid Profile (7 Tests)",
            "Thyroid TSH Level",
            "Blood Sugar Fasting"
        ],
        isPopular: true
    },
    {
        id: "pkg_gold",
        name: "APL Executive Gold Package",
        price: 3499,
        slashedPrice: 7900,
        parameters: "75+ Parameters",
        testsIncluded: [
            "All Advanced Wellness Profile tests",
            "Vitamin D3 (Bone & Immunity)",
            "Vitamin B12 (Nerve & Energy)",
            "HbA1c (3-Month Sugar Average)",
            "Uric Acid & Serum Calcium"
        ],
        isPopular: false
    }
];

// --- SHOPPING CART STATE ---
let cart = [];

// --- DOM ELEMENTS ---
const testsGrid = document.getElementById("testsGrid");
const packagesGrid = document.getElementById("packagesGrid");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const categoryTabs = document.getElementById("categoryTabs");
const emptyState = document.getElementById("emptyState");
const resetSearchBtn = document.getElementById("resetSearchBtn");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const cartToggleBtn = document.getElementById("cartToggleBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
const cartCountBadge = document.getElementById("cartCountBadge");
const cartBadgeCount = document.getElementById("cartBadgeCount");
const cartEmptyState = document.getElementById("cartEmptyState");
const cartItemsSection = document.getElementById("cartItemsSection");
const cartItemsList = document.getElementById("cartItemsList");
const cartBrowseBtn = document.getElementById("cartBrowseBtn");

const baseTotalText = document.getElementById("baseTotalText");
const discountRow = document.getElementById("discountRow");
const discountValueText = document.getElementById("discountValueText");
const grandTotalText = document.getElementById("grandTotalText");

const bookingForm = document.getElementById("bookingForm");
const visitType = document.getElementById("visitType");
const addressFormGroup = document.getElementById("addressFormGroup");
const patientAddress = document.getElementById("patientAddress");
const bookingDate = document.getElementById("bookingDate");

const mobileNavToggle = document.getElementById("mobileNavToggle");
const mobileNavDrawer = document.getElementById("mobileNavDrawer");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const closeMobileNav = document.getElementById("closeMobileNav");
const mobileBookBtn = document.getElementById("mobileBookBtn");

const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("apl_cart");
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("apl_theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        toggleThemeIcons(true);
    }

    // Set minimum date picker to today
    const today = new Date().toISOString().split("T")[0];
    bookingDate.setAttribute("min", today);

    // Initial renders
    renderTests(testsData);
    renderPackages();
    updateCartUI();

    // Lucide Icons Initialization
    lucide.createIcons();

    // Set up event listeners
    setupEventListeners();
});

// --- HELPER FUNCTION: TOAST NOTIFICATION ---
function showToast(message, icon = "info") {
    toastMessage.textContent = message;
    
    // Update toast icon if lucide is available
    const iconElement = toastNotification.querySelector(".toast-icon");
    if (iconElement) {
        iconElement.setAttribute("data-lucide", icon);
        lucide.createIcons();
    }
    
    toastNotification.classList.add("active");
    setTimeout(() => {
        toastNotification.classList.remove("active");
    }, 3000);
}

// --- RENDER DYNAMIC TEST CATALOG ---
function renderTests(tests) {
    testsGrid.innerHTML = "";
    
    if (tests.length === 0) {
        testsGrid.style.display = "none";
        emptyState.style.display = "flex";
        return;
    }

    testsGrid.style.display = "grid";
    emptyState.style.display = "none";

    tests.forEach(test => {
        const isInCart = cart.some(item => item.id === test.id);
        const cardHTML = `
            <div class="test-card" data-id="${test.id}">
                ${test.isPopular ? '<span class="package-ribbon" style="top:10px; right:-25px; padding:3px 25px; font-size:0.55rem;">Popular</span>' : ''}
                <div class="test-card-header">
                    <span class="test-category-tag">${test.category}</span>
                    <span class="test-time-tag"><i data-lucide="clock"></i> ${test.reportTime}</span>
                </div>
                <h3 class="test-title">${test.name}</h3>
                <p class="test-description">${test.description}</p>
                
                <div class="test-meta">
                    <div class="test-meta-item">
                        <i data-lucide="flask-conical"></i>
                        <span>${test.parameters} ${test.parameters === 1 ? 'Parameter' : 'Parameters'}</span>
                    </div>
                    <div class="test-meta-item">
                        <i data-lucide="check-circle2"></i>
                        <span>NABL Standard</span>
                    </div>
                </div>

                <div class="test-card-footer">
                    <div class="price-box">
                        <span class="original-price">₹${test.slashedPrice}</span>
                        <span class="current-price">₹${test.price}</span>
                    </div>
                    <button class="btn-add-test ${isInCart ? 'added' : ''}" 
                            onclick="toggleCartItem('${test.id}', 'test')" 
                            aria-label="${isInCart ? 'Remove from booking' : 'Add to booking'}">
                        <i data-lucide="${isInCart ? 'check' : 'plus'}"></i>
                    </button>
                </div>
            </div>
        `;
        testsGrid.insertAdjacentHTML("beforeend", cardHTML);
    });
    
    // Re-trigger lucide icons for dynamically added HTML
    lucide.createIcons();
}

// --- RENDER WELLNESS PACKAGES ---
function renderPackages() {
    packagesGrid.innerHTML = "";
    
    packagesData.forEach(pkg => {
        const isInCart = cart.some(item => item.id === pkg.id);
        const testsListHTML = pkg.testsIncluded
            .map(test => `<li class="package-test-item"><i data-lucide="check"></i> <span>${test}</span></li>`)
            .join("");

        const cardHTML = `
            <div class="package-card" data-id="${pkg.id}">
                ${pkg.isPopular ? '<div class="package-ribbon">Best Value</div>' : ''}
                <div class="package-body">
                    <div class="package-header">
                        <h3 class="package-title">${pkg.name}</h3>
                        <span class="package-parameters">${pkg.parameters}</span>
                    </div>
                    <div class="package-price-row">
                        <span class="original-price" style="font-size: 1rem;">₹${pkg.slashedPrice}</span>
                        <span class="package-price">₹${pkg.price}</span>
                    </div>
                    
                    <h4 class="package-includes-title">Tests Included:</h4>
                    <ul class="package-test-list">
                        ${testsListHTML}
                    </ul>
                </div>
                <div class="package-footer">
                    <button class="btn ${isInCart ? 'btn-secondary' : 'btn-primary'} w-full" 
                            onclick="toggleCartItem('${pkg.id}', 'package')">
                        <i data-lucide="${isInCart ? 'shopping-bag' : 'plus'}"></i>
                        <span>${isInCart ? 'Remove from Cart' : 'Add Package to Cart'}</span>
                    </button>
                </div>
            </div>
        `;
        packagesGrid.insertAdjacentHTML("beforeend", cardHTML);
    });
    
    lucide.createIcons();
}

// --- FILTERING LOGIC (SEARCH & CATEGORIES) ---
let activeCategory = "all";
let searchQuery = "";

function applyFilters() {
    let filtered = testsData;

    // Apply category filter
    if (activeCategory !== "all") {
        filtered = filtered.filter(test => test.category === activeCategory);
    }

    // Apply search query filter
    if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(test => 
            test.name.toLowerCase().includes(query) || 
            test.description.toLowerCase().includes(query) || 
            test.category.toLowerCase().includes(query)
        );
    }

    renderTests(filtered);
}

// --- SHOPPING CART LOGIC ---
window.toggleCartItem = function(id, type) {
    const cartIndex = cart.findIndex(item => item.id === id);

    if (cartIndex > -1) {
        // Remove item from cart
        cart.splice(cartIndex, 1);
        showToast("Item removed from your booking basket!", "trash-2");
    } else {
        // Find details of item to add
        let itemToAdd = null;
        if (type === "test") {
            itemToAdd = testsData.find(t => t.id === id);
        } else if (type === "package") {
            itemToAdd = packagesData.find(p => p.id === id);
        }

        if (itemToAdd) {
            cart.push({
                id: itemToAdd.id,
                name: itemToAdd.name,
                price: itemToAdd.price,
                type: type,
                parameters: type === "test" ? `${itemToAdd.parameters} parameters` : itemToAdd.parameters
            });
            showToast("Item added to your booking basket!", "shopping-cart");
        }
    }

    // Sync views
    localStorage.setItem("apl_cart", JSON.stringify(cart));
    applyFilters(); // Re-render tests (to update '+' or 'check' icons)
    renderPackages(); // Re-render packages
    updateCartUI();
};

function updateCartUI() {
    // 1. Update Cart Badge Count
    const count = cart.length;
    cartCountBadge.textContent = count;
    cartBadgeCount.textContent = count;

    if (count === 0) {
        cartEmptyState.style.display = "flex";
        cartItemsSection.style.display = "none";
        cartCountBadge.style.display = "none";
    } else {
        cartEmptyState.style.display = "none";
        cartItemsSection.style.display = "flex";
        cartCountBadge.style.display = "flex";

        // 2. Render Cart Item Cards
        cartItemsList.innerHTML = "";
        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-meta">${item.parameters} • ${item.type.toUpperCase()}</div>
                    </div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <button class="btn-remove-item" onclick="toggleCartItem('${item.id}', '${item.type}')" aria-label="Remove item">
                        <i data-lucide="x"></i>
                    </button>
                </div>
            `;
            cartItemsList.insertAdjacentHTML("beforeend", itemHTML);
        });

        // 3. Calculation & Discount Logic
        // Give 10% multi-test discount if they purchase 3 or more total items
        let baseTotal = cart.reduce((sum, item) => sum + item.price, 0);
        let discount = 0;
        
        if (count >= 3) {
            discount = Math.round(baseTotal * 0.1); // 10% discount
            discountRow.style.display = "flex";
            discountValueText.textContent = `-₹${discount}`;
        } else {
            discountRow.style.display = "none";
        }

        let grandTotal = baseTotal - discount;

        baseTotalText.textContent = `₹${baseTotal}`;
        grandTotalText.textContent = `₹${grandTotal}`;
    }

    lucide.createIcons();
}

// --- BOOKING SUBMISSION & WHATSAPP GENERATION ---
function handleBookingSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
        showToast("Please add tests or packages to your cart before booking.", "alert-triangle");
        return;
    }

    // Collect Form Inputs
    const name = document.getElementById("patientName").value.trim();
    const age = document.getElementById("patientAge").value;
    const gender = document.getElementById("patientGender").value;
    const bookingVisitType = visitType.value;
    const address = patientAddress.value.trim();
    const dateVal = document.getElementById("bookingDate").value;
    const timeVal = document.getElementById("bookingTime").value;
    let labNumber = document.getElementById("whatsappLabNumber").value.replace(/\s+/g, '');

    // Format target WhatsApp phone number
    if (!labNumber.startsWith("+")) {
        // If it starts with 91, ensure '+' prefix
        if (labNumber.startsWith("91") && labNumber.length === 12) {
            labNumber = "+" + labNumber;
        } else if (labNumber.length === 10) {
            labNumber = "+91" + labNumber;
        }
    }

    // Build tests list message string
    let testListString = "";
    cart.forEach((item, index) => {
        testListString += `${index + 1}. *${item.name}* (₹${item.price})\n`;
    });

    // Compute Totals
    let baseTotal = cart.reduce((sum, item) => sum + item.price, 0);
    let discount = cart.length >= 3 ? Math.round(baseTotal * 0.1) : 0;
    let grandTotal = baseTotal - discount;

    // Format Booking Date nicely (e.g. DD-MM-YYYY)
    let formattedDate = dateVal;
    if (dateVal) {
        const parts = dateVal.split("-");
        if (parts.length === 3) {
            formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    }

    // Build the WhatsApp message template
    let message = `*APL DIAGNOSTICS & PATHLAB, DUMKA*\n`;
    message += `_New Pathology Booking Request_\n`;
    message += `==============================\n\n`;
    message += `*PATIENT DETAILS:*\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `🎂 *Age / Gender:* ${age} yrs / ${gender}\n`;
    message += `📍 *Visit Type:* ${bookingVisitType}\n`;
    
    if (bookingVisitType === "Home Collection") {
        message += `🏠 *Address:* ${address}\n`;
    }
    
    message += `📅 *Date:* ${formattedDate}\n`;
    message += `🕒 *Preferred Time Slot:* ${timeVal}\n\n`;
    
    message += `*SELECTED TESTS & PACKAGES:*\n`;
    message += `${testListString}\n`;
    
    message += `*PAYMENT SUMMARY:*\n`;
    message += `- Subtotal: ₹${baseTotal}\n`;
    if (discount > 0) {
        message += `- Multi-Test Discount (10%): -₹${discount}\n`;
    }
    message += `- Home Collection Charges: *FREE*\n`;
    message += `- *Grand Total (To Pay): ₹${grandTotal}*\n\n`;
    
    message += `==============================\n`;
    message += `Please confirm my appointment slot and technician details.\n`;
    message += `Thank you!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${labNumber.replace("+", "")}&text=${encodedMessage}`;

    // Show booking animation/alert and redirect
    showToast("Opening WhatsApp to complete booking...", "check-circle");
    
    setTimeout(() => {
        window.open(whatsappURL, "_blank");
    }, 800);
}

// --- LIGHT / DARK THEME TOGGLER ---
function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("apl_theme", isDark ? "dark" : "light");
    toggleThemeIcons(isDark);
    showToast(`${isDark ? "Dark theme" : "Light theme"} enabled!`, isDark ? "moon" : "sun");
}

function toggleThemeIcons(isDark) {
    const iconDark = themeToggleBtn.querySelector(".theme-icon-dark");
    const iconLight = themeToggleBtn.querySelector(".theme-icon-light");
    
    if (isDark) {
        iconDark.style.display = "none";
        iconLight.style.display = "block";
    } else {
        iconDark.style.display = "block";
        iconLight.style.display = "none";
    }
}

// --- CONTEXT SENSITIVE EVENT LISTENERS ---
function setupEventListeners() {
    // 1. Search Box Inputs
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        clearSearchBtn.style.display = searchQuery.length > 0 ? "block" : "none";
        applyFilters();
    });

    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.style.display = "none";
        applyFilters();
        searchInput.focus();
    });

    // 2. Category Tab Switches
    categoryTabs.addEventListener("click", (e) => {
        if (e.target.classList.contains("category-tab")) {
            // Remove active classes
            document.querySelectorAll(".category-tab").forEach(tab => tab.classList.remove("active"));
            
            // Add active class to clicked tab
            e.target.classList.add("active");
            activeCategory = e.target.getAttribute("data-category");
            applyFilters();
        }
    });

    // 3. Reset Button (Empty State)
    resetSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.style.display = "none";
        activeCategory = "all";
        
        document.querySelectorAll(".category-tab").forEach(tab => {
            if (tab.getAttribute("data-category") === "all") {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });

        applyFilters();
    });

    // 4. Cart Drawer Toggle Controls
    const openCart = () => {
        cartDrawer.classList.add("active");
        cartDrawerOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    };

    const closeCart = () => {
        cartDrawer.classList.remove("active");
        cartDrawerOverlay.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable background scroll
    };

    cartToggleBtn.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCart);
    cartDrawerOverlay.addEventListener("click", closeCart);
    cartBrowseBtn.addEventListener("click", closeCart);

    // 5. Mobile Nav Menu Drawer
    const openMobileNav = () => {
        mobileNavDrawer.classList.add("active");
        mobileNavOverlay.classList.add("active");
    };

    const closeMobileNavMenu = () => {
        mobileNavDrawer.classList.remove("active");
        mobileNavOverlay.classList.remove("active");
    };

    mobileNavToggle.addEventListener("click", openMobileNav);
    closeMobileNav.addEventListener("click", closeMobileNavMenu);
    mobileNavOverlay.addEventListener("click", closeMobileNavMenu);
    
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", closeMobileNavMenu);
    });

    mobileBookBtn.addEventListener("click", () => {
        closeMobileNavMenu();
        const testSection = document.getElementById("tests-section");
        testSection.scrollIntoView({ behavior: "smooth" });
    });

    // 6. Dynamic Form Validation (Toggle address field depending on lab visit type)
    visitType.addEventListener("change", (e) => {
        if (e.target.value === "Lab Visit") {
            addressFormGroup.style.display = "none";
            patientAddress.removeAttribute("required");
        } else {
            addressFormGroup.style.display = "flex";
            patientAddress.setAttribute("required", "required");
        }
    });

    // 7. Form Submission
    bookingForm.addEventListener("submit", handleBookingSubmit);

    // 8. Theme Changer Click
    themeToggleBtn.addEventListener("click", toggleTheme);

    // 9. FAQ Accordions
    document.querySelectorAll(".faq-question").forEach(questionBtn => {
        questionBtn.addEventListener("click", () => {
            const faqItem = questionBtn.parentElement;
            const isActive = faqItem.classList.contains("active");
            
            // Close all items
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = null;
            });

            // Open selected item if it wasn't active
            if (!isActive) {
                faqItem.classList.add("active");
                const answer = faqItem.querySelector(".faq-answer");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 10. Smooth Navbar Link Highlight on Scroll
    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY + 150;
        const navLinks = document.querySelectorAll(".nav-link");
        
        document.querySelectorAll("section[id]").forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });
}
