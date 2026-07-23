import React, { useState } from "react";
import { ShieldCheck, Truck, Microscope, Moon, Sun, ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar({
    cartCount,
    theme,
    toggleTheme,
    cartOpen,
    setCartOpen,
    scrollToSection
}) {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const handleMobileLinkClick = (sectionId) => {
        setMobileNavOpen(false);
        scrollToSection(sectionId);
    };

    return (
        <>
            {/* Top Alert Bar */}
            <div className="top-bar">
                <div className="container top-bar-content">
                    <span className="top-bar-text">
                        <ShieldCheck size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                        NABL Standard Guidelines & ISO 9001:2015 Certified Lab
                    </span>
                    <span className="top-bar-text">
                        <Truck size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                        Free Home Sample Collection in Dumka City
                    </span>
                </div>
            </div>

            {/* Header Navigation */}
            <header className="header">
                <div className="container header-container">
                    <a href="#" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>
                        <div className="logo-icon">
                            <Microscope size={22} />
                        </div>
                        <div className="logo-text">
                            <span className="logo-title">AAROGYA HEALTH SERVICE</span>
                            <span className="logo-sub">PATHLAB & IMAGING • DUMKA</span>
                        </div>
                    </a>
                    
                    <nav className="nav-menu">
                        <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>Home</a>
                        <a href="#tests-section" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("tests-section"); }}>Book Tests</a>
                        <a href="#packages-section" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("packages-section"); }}>Health Packages</a>
                        <a href="#about-section" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("about-section"); }}>Why Choose Us</a>
                        <a href="#contact-section" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection("contact-section"); }}>Contact</a>
                    </nav>

                    <div className="header-actions">
                        <button 
                            className="theme-toggle" 
                            onClick={toggleTheme} 
                            aria-label="Toggle dark mode"
                        >
                            {theme === "dark" ? (
                                <Sun className="theme-icon-light" size={20} />
                            ) : (
                                <Moon className="theme-icon-dark" size={20} />
                            )}
                        </button>
                        <button 
                            className="cart-btn" 
                            onClick={() => setCartOpen(true)} 
                            aria-label="Open booking cart"
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="cart-count">{cartCount}</span>
                            )}
                        </button>
                        <button 
                            className="btn btn-primary btn-nav-cta"
                            onClick={() => scrollToSection("tests-section")}
                        >
                            Book a Test
                        </button>
                        <button 
                            className="mobile-nav-toggle" 
                            onClick={() => setMobileNavOpen(true)} 
                            aria-label="Toggle menu"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div className={`mobile-nav-drawer ${mobileNavOpen ? "active" : ""}`}>
                <div className="mobile-nav-header">
                    <span className="mobile-nav-title">Menu</span>
                    <button className="close-mobile-nav" onClick={() => setMobileNavOpen(false)}>
                        <X size={20} />
                    </button>
                </div>
                <nav className="mobile-nav-links">
                    <a href="#home" className="mobile-nav-link" onClick={() => handleMobileLinkClick("home")}>Home</a>
                    <a href="#tests-section" className="mobile-nav-link" onClick={() => handleMobileLinkClick("tests-section")}>Book Tests</a>
                    <a href="#packages-section" className="mobile-nav-link" onClick={() => handleMobileLinkClick("packages-section")}>Health Packages</a>
                    <a href="#about-section" className="mobile-nav-link" onClick={() => handleMobileLinkClick("about-section")}>Why Choose Us</a>
                    <a href="#contact-section" className="mobile-nav-link" onClick={() => handleMobileLinkClick("contact-section")}>Contact</a>
                </nav>
                <div className="mobile-nav-actions">
                    <button 
                        className="btn btn-primary w-full" 
                        onClick={() => handleMobileLinkClick("tests-section")}
                    >
                        Explore Catalog
                    </button>
                </div>
            </div>
            {mobileNavOpen && (
                <div className="mobile-nav-overlay active" onClick={() => setMobileNavOpen(false)}></div>
            )}
        </>
    );
}
