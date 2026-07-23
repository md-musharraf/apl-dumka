import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Default seed data from original app.js
const defaultTests = [
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

const defaultPackages = [
    {
        id: "pkg_basic",
        name: "Aarogya Basic Health Checkup",
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
        name: "Aarogya Advanced Wellness Package",
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
        name: "Aarogya Executive Gold Package",
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

const defaultSettings = {
    discountPercentage: 15,
    bannerText: "🔥 Monsoon Special: Get 15% OFF on all Diagnostic Tests & Health Packages! Free Home Sample Collection in Dumka. 🔥",
    whatsappNumber: "+919431123456"
};

// Env configurations for Firebase (optional)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let useFirebase = false;
let app, db, auth;

// Check if valid Firebase configuration is provided
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" && firebaseConfig.apiKey !== "") {
    try {
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            useFirebase = true;
            console.log("Firebase initialized successfully.");
        }
    } catch (error) {
        console.error("Failed to initialize Firebase, falling back to LocalStorage:", error);
        useFirebase = false;
    }
} else {
    console.log("No Firebase config found. Using LocalStorage fallback service.");
}

// ----------------------------------------------------
// LOCAL STORAGE MOCK DB IMPLEMENTATION
// ----------------------------------------------------
const initMockDB = () => {
    if (!localStorage.getItem("apl_tests")) {
        localStorage.setItem("apl_tests", JSON.stringify(defaultTests));
    }
    // Update existing stored packages if they have old APL names
    const existingPkgs = localStorage.getItem("apl_packages");
    if (!existingPkgs || existingPkgs.includes("APL Basic")) {
        localStorage.setItem("apl_packages", JSON.stringify(defaultPackages));
    }
    if (!localStorage.getItem("apl_settings")) {
        localStorage.setItem("apl_settings", JSON.stringify(defaultSettings));
    }
    const adminUser = localStorage.getItem("apl_admin_user");
    if (!adminUser || adminUser.includes("apldumka.com")) {
        localStorage.setItem("apl_admin_user", JSON.stringify({ email: "admin@aarogyahealthservice.com", loggedIn: false }));
    }
};

initMockDB();

const mockDB = {
    getTests: () => JSON.parse(localStorage.getItem("apl_tests")),
    saveTests: (tests) => {
        localStorage.setItem("apl_tests", JSON.stringify(tests));
        // Trigger storage event for local tabs
        window.dispatchEvent(new Event("storage"));
    },
    getPackages: () => JSON.parse(localStorage.getItem("apl_packages")),
    savePackages: (packages) => {
        localStorage.setItem("apl_packages", JSON.stringify(packages));
        window.dispatchEvent(new Event("storage"));
    },
    getSettings: () => JSON.parse(localStorage.getItem("apl_settings")),
    saveSettings: (settings) => {
        localStorage.setItem("apl_settings", JSON.stringify(settings));
        window.dispatchEvent(new Event("storage"));
    }
};

// ----------------------------------------------------
// EXPORTED DATABASE & AUTH API
// ----------------------------------------------------

export const isFirebaseEnabled = () => useFirebase;

// 1. AUTH API
export const loginAdmin = async (email, password) => {
    if (useFirebase) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } else {
        const admin = JSON.parse(localStorage.getItem("apl_admin_user"));
        if ((email === admin.email || email === "admin@aarogyahealthservice.com" || email === "admin@apldumka.com") && password === "admin123") {
            admin.loggedIn = true;
            localStorage.setItem("apl_admin_user", JSON.stringify(admin));
            window.dispatchEvent(new Event("storage"));
            return { email: admin.email };
        } else {
            throw new Error("Invalid admin credentials. Use admin@aarogyahealthservice.com / admin123");
        }
    }
};

export const logoutAdmin = async () => {
    if (useFirebase) {
        await signOut(auth);
    } else {
        const admin = JSON.parse(localStorage.getItem("apl_admin_user"));
        admin.loggedIn = false;
        localStorage.setItem("apl_admin_user", JSON.stringify(admin));
        window.dispatchEvent(new Event("storage"));
    }
};

export const subscribeToAuth = (callback) => {
    if (useFirebase) {
        return onAuthStateChanged(auth, callback);
    } else {
        const checkAuth = () => {
            const admin = JSON.parse(localStorage.getItem("apl_admin_user"));
            callback(admin && admin.loggedIn ? { email: admin.email } : null);
        };
        // Call immediately
        checkAuth();
        // Listen to local changes
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }
};

// 2. SETTINGS API
export const subscribeToSettings = (callback) => {
    if (useFirebase) {
        return onSnapshot(doc(db, "settings", "promo"), (docSnap) => {
            if (docSnap.exists()) {
                callback(docSnap.data());
            } else {
                // Seed settings if it doesn't exist in Firebase
                setDoc(doc(db, "settings", "promo"), defaultSettings);
                callback(defaultSettings);
            }
        });
    } else {
        const handleSettingsUpdate = () => {
            callback(mockDB.getSettings());
        };
        handleSettingsUpdate();
        window.addEventListener("storage", handleSettingsUpdate);
        return () => window.removeEventListener("storage", handleSettingsUpdate);
    }
};

export const updateSettings = async (settings) => {
    if (useFirebase) {
        const settingsRef = doc(db, "settings", "promo");
        await updateDoc(settingsRef, settings);
    } else {
        const current = mockDB.getSettings();
        mockDB.saveSettings({ ...current, ...settings });
    }
};

// 3. TESTS API
export const subscribeToTests = (callback) => {
    if (useFirebase) {
        return onSnapshot(collection(db, "tests"), (snapshot) => {
            const tests = [];
            snapshot.forEach((doc) => {
                tests.push({ id: doc.id, ...doc.data() });
            });
            if (tests.length === 0) {
                // Seed tests in Firestore
                defaultTests.forEach(test => {
                    const { id, ...data } = test;
                    setDoc(doc(db, "tests", id), data);
                });
                callback(defaultTests);
            } else {
                callback(tests);
            }
        });
    } else {
        const handleTestsUpdate = () => {
            callback(mockDB.getTests());
        };
        handleTestsUpdate();
        window.addEventListener("storage", handleTestsUpdate);
        return () => window.removeEventListener("storage", handleTestsUpdate);
    }
};

export const addTest = async (test) => {
    const id = test.id || "t_" + Date.now();
    const testData = { ...test, id };
    if (useFirebase) {
        const { id: _, ...data } = testData;
        await setDoc(doc(db, "tests", id), data);
    } else {
        const tests = mockDB.getTests();
        tests.push(testData);
        mockDB.saveTests(tests);
    }
};

export const updateTest = async (id, updatedFields) => {
    if (useFirebase) {
        const testRef = doc(db, "tests", id);
        await updateDoc(testRef, updatedFields);
    } else {
        const tests = mockDB.getTests();
        const index = tests.findIndex(t => t.id === id);
        if (index > -1) {
            tests[index] = { ...tests[index], ...updatedFields };
            mockDB.saveTests(tests);
        }
    }
};

export const deleteTest = async (id) => {
    if (useFirebase) {
        await deleteDoc(doc(db, "tests", id));
    } else {
        const tests = mockDB.getTests();
        const filtered = tests.filter(t => t.id !== id);
        mockDB.saveTests(filtered);
    }
};

// 4. PACKAGES API
export const subscribeToPackages = (callback) => {
    if (useFirebase) {
        return onSnapshot(collection(db, "packages"), (snapshot) => {
            const packages = [];
            snapshot.forEach((doc) => {
                packages.push({ id: doc.id, ...doc.data() });
            });
            if (packages.length === 0) {
                // Seed packages in Firestore
                defaultPackages.forEach(pkg => {
                    const { id, ...data } = pkg;
                    setDoc(doc(db, "packages", id), data);
                });
                callback(defaultPackages);
            } else {
                callback(packages);
            }
        });
    } else {
        const handlePackagesUpdate = () => {
            callback(mockDB.getPackages());
        };
        handlePackagesUpdate();
        window.addEventListener("storage", handlePackagesUpdate);
        return () => window.removeEventListener("storage", handlePackagesUpdate);
    }
};

export const addPackage = async (pkg) => {
    const id = pkg.id || "pkg_" + Date.now();
    const pkgData = { ...pkg, id };
    if (useFirebase) {
        const { id: _, ...data } = pkgData;
        await setDoc(doc(db, "packages", id), data);
    } else {
        const packages = mockDB.getPackages();
        packages.push(pkgData);
        mockDB.savePackages(packages);
    }
};

export const updatePackage = async (id, updatedFields) => {
    if (useFirebase) {
        const pkgRef = doc(db, "packages", id);
        await updateDoc(pkgRef, updatedFields);
    } else {
        const packages = mockDB.getPackages();
        const index = packages.findIndex(p => p.id === id);
        if (index > -1) {
            packages[index] = { ...packages[index], ...updatedFields };
            mockDB.savePackages(packages);
        }
    }
};

export const deletePackage = async (id) => {
    if (useFirebase) {
        await deleteDoc(doc(db, "packages", id));
    } else {
        const packages = mockDB.getPackages();
        const filtered = packages.filter(p => p.id !== id);
        mockDB.savePackages(filtered);
    }
};
