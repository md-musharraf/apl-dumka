import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PromoBanner from "./components/PromoBanner";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import BookingCart from "./components/BookingCart";
import { subscribeToSettings, subscribeToTests, subscribeToPackages } from "./services/db";
import { Info, CheckCircle2, AlertTriangle, Trash2, ShoppingCart } from "lucide-react";

export default function App() {
    // Basic routing path state
    const [path, setPath] = useState(window.location.pathname);

    // Dynamic Database States
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [bannerText, setBannerText] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("+91 94311 23456");
    const [rawTests, setRawTests] = useState([]);
    const [rawPackages, setRawPackages] = useState([]);

    // UI States
    const [cart, setCart] = useState([]);
    const [theme, setTheme] = useState("light");
    const [cartOpen, setCartOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", icon: "info" });

    // Location Routing Listener
    useEffect(() => {
        const handleLocationChange = () => {
            setPath(window.location.pathname);
            // Scroll to top on page change
            window.scrollTo(0, 0);
        };
        
        // Listen to custom navigation events
        window.addEventListener("popstate", handleLocationChange);
        window.addEventListener("pushstate", handleLocationChange);

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.removeEventListener("pushstate", handleLocationChange);
        };
    }, []);

    // Load static UI state from localStorage
    useEffect(() => {
        // Cart
        const savedCart = localStorage.getItem("apl_cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                setCart([]);
            }
        }

        // Theme
        const savedTheme = localStorage.getItem("apl_theme") || "light";
        setTheme(savedTheme);
        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, []);

    // Subscribe to DB updates
    useEffect(() => {
        const unsubscribeSettings = subscribeToSettings((data) => {
            if (data) {
                setDiscountPercentage(data.discountPercentage || 0);
                setBannerText(data.bannerText || "");
                setWhatsappNumber(data.whatsappNumber || "+91 94311 23456");
            }
        });

        const unsubscribeTests = subscribeToTests((data) => {
            setRawTests(data || []);
        });

        const unsubscribePackages = subscribeToPackages((data) => {
            setRawPackages(data || []);
        });

        return () => {
            unsubscribeSettings();
            unsubscribeTests();
            unsubscribePackages();
        };
    }, []);

    // Dynamic Price Calculation
    // Apply global discount directly to tests and packages list
    const getActiveTests = () => {
        return rawTests.map(test => {
            let activePrice = test.price;
            if (discountPercentage > 0) {
                activePrice = Math.round(test.price * (1 - discountPercentage / 100));
            }
            return {
                ...test,
                activePrice
            };
        });
    };

    const getActivePackages = () => {
        return rawPackages.map(pkg => {
            let activePrice = pkg.price;
            if (discountPercentage > 0) {
                activePrice = Math.round(pkg.price * (1 - discountPercentage / 100));
            }
            return {
                ...pkg,
                activePrice
            };
        });
    };

    // Sync Cart items with latest database prices if discount changes
    useEffect(() => {
        if (cart.length === 0 || rawTests.length === 0 || rawPackages.length === 0) return;

        const updatedCart = cart.map(cartItem => {
            let currentDbItem = null;
            if (cartItem.type === "test") {
                currentDbItem = rawTests.find(t => t.id === cartItem.id);
            } else if (cartItem.type === "package") {
                currentDbItem = rawPackages.find(p => p.id === cartItem.id);
            }

            if (currentDbItem) {
                let updatedPrice = currentDbItem.price;
                if (discountPercentage > 0) {
                    updatedPrice = Math.round(currentDbItem.price * (1 - discountPercentage / 100));
                }
                return {
                    ...cartItem,
                    price: updatedPrice
                };
            }
            return cartItem;
        });

        // Stringify to compare to avoid infinite loop
        if (JSON.stringify(cart) !== JSON.stringify(updatedCart)) {
            setCart(updatedCart);
            localStorage.setItem("apl_cart", JSON.stringify(updatedCart));
        }
    }, [discountPercentage, rawTests, rawPackages]);

    // Toast Notification helper
    const showToast = (message, icon = "info") => {
        setToast({ show: true, message, icon });
    };

    // Auto-hide toast
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show, toast.message]);

    // Toggle Cart Items
    const toggleCartItem = (item, type) => {
        const cartIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        let newCart = [...cart];

        if (cartIndex > -1) {
            // Remove
            newCart.splice(cartIndex, 1);
            showToast("Item removed from your booking basket!", "trash-2");
        } else {
            // Add with current active price
            let activePrice = item.price;
            if (discountPercentage > 0) {
                activePrice = Math.round(item.price * (1 - discountPercentage / 100));
            }

            newCart.push({
                id: item.id,
                name: item.name,
                price: activePrice,
                type: type,
                parameters: type === "test" ? `${item.parameters} parameters` : item.parameters
            });
            showToast("Item added to your booking basket!", "shopping-cart");
        }

        setCart(newCart);
        localStorage.setItem("apl_cart", JSON.stringify(newCart));
    };

    // Toggle Theme
    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("apl_theme", nextTheme);
        
        if (nextTheme === "dark") {
            document.body.classList.add("dark-theme");
            showToast("Dark theme enabled!", "moon");
        } else {
            document.body.classList.remove("dark-theme");
            showToast("Light theme enabled!", "sun");
        }
    };

    // Navigate to admin
    const navigateTo = (url) => {
        window.history.pushState({}, "", url);
        window.dispatchEvent(new Event("pushstate"));
    };

    // Scroll to elements smoothly
    const scrollToSection = (sectionId) => {
        // If on admin page, navigate back to home first
        if (path.includes("admin")) {
            navigateTo("/");
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Helper to render Toast Icons
    const renderToastIcon = () => {
        switch (toast.icon) {
            case "check-circle":
                return <CheckCircle2 size={18} className="toast-icon text-success" />;
            case "alert-triangle":
                return <AlertTriangle size={18} className="toast-icon text-danger" />;
            case "trash-2":
                return <Trash2 size={18} className="toast-icon text-danger" />;
            case "shopping-cart":
                return <ShoppingCart size={18} className="toast-icon text-primary" />;
            default:
                return <Info size={18} className="toast-icon" />;
        }
    };

    const activeTests = getActiveTests();
    const activePackages = getActivePackages();

    return (
        <div className={theme === "dark" ? "dark-theme" : ""}>
            {/* Conditional Page Rendering */}
            {path === "/admin" || path.includes("/admin") ? (
                <Admin showToast={showToast} />
            ) : (
                <>
                    {/* Header Alert Bar & Logo Navigation */}
                    <Navbar 
                        cartCount={cart.length} 
                        theme={theme}
                        toggleTheme={toggleTheme}
                        cartOpen={cartOpen}
                        setCartOpen={setCartOpen}
                        scrollToSection={scrollToSection}
                    />

                    {/* Infinite Scrolling Discount Banner */}
                    <PromoBanner 
                        bannerText={bannerText} 
                        discountPercentage={discountPercentage} 
                    />

                    {/* Client Landing Page */}
                    <Home 
                        tests={activeTests}
                        packages={activePackages}
                        cart={cart}
                        toggleCartItem={toggleCartItem}
                        discountPercentage={discountPercentage}
                        whatsappNumber={whatsappNumber}
                        scrollToSection={scrollToSection}
                    />

                    {/* Footer */}
                    <Footer scrollToSection={scrollToSection} />

                    {/* Cart Slider Drawer */}
                    <BookingCart 
                        cart={cart}
                        toggleCartItem={toggleCartItem}
                        cartOpen={cartOpen}
                        setCartOpen={setCartOpen}
                        discountPercentage={discountPercentage}
                        whatsappNumber={whatsappNumber}
                        showToast={showToast}
                    />
                </>
            )}

            {/* Custom Admin Portal Quick-Link in corner of screen for testing/admin convenience */}
            <button 
                className="admin-quick-link-btn" 
                onClick={() => navigateTo(path.includes("admin") ? "/" : "/admin")}
                title={path.includes("admin") ? "Go to Live Website" : "Open Admin Portal"}
            >
                {path.includes("admin") ? "Exit Admin" : "Admin Panel"}
            </button>

            {/* Toast Notifications */}
            <div className={`toast ${toast.show ? "active" : ""}`}>
                {renderToastIcon()}
                <span className="toast-message">{toast.message}</span>
            </div>
        </div>
    );
}
