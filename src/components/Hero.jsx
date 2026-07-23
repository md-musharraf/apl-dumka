import React from "react";
import { Sparkles, Search, PhoneCall, Clock, Home, CheckCircle2, UserCheck, Activity } from "lucide-react";

export default function Hero({ scrollToSection, whatsappNumber }) {
    const defaultMsg = encodeURIComponent("Hello Aarogya Health Service, I want to book a test.");
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber.replace("+", "")}&text=${defaultMsg}`;

    return (
        <>
            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <span className="hero-tagline">
                            <Sparkles size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                            Dumka's Premier Pathology Laboratory
                        </span>
                        <h1 className="hero-title">
                            Accurate Lab Reports. <br />
                            <span className="text-gradient">Book From Home.</span>
                        </h1>
                        <p className="hero-description">
                            Experience premium pathology services in Dumka. Choose from 150+ blood tests and comprehensive health packages. Book online and have our certified technician visit your home for a free sample collection.
                        </p>
                        
                        <div className="hero-ctas">
                            <button 
                                onClick={() => scrollToSection("tests-section")} 
                                className="btn btn-primary btn-lg"
                            >
                                <Search size={18} style={{ marginRight: "8px", verticalAlign: "middle" }} />
                                Find a Test
                            </button>
                            <a 
                                href={whatsappURL} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-secondary btn-lg btn-whatsapp-direct" 
                                id="heroWhatsappBtn"
                            >
                                <PhoneCall size={18} style={{ marginRight: "8px", verticalAlign: "middle" }} />
                                Fast Booking via WhatsApp
                            </a>
                        </div>
                        
                        <div className="hero-features">
                            <div className="hero-feature-item">
                                <div className="feature-icon-mini">
                                    <Clock size={16} />
                                </div>
                                <span>6-Hour Report Turnaround</span>
                            </div>
                            <div className="feature-item-divider"></div>
                            <div className="hero-feature-item">
                                <div className="feature-icon-mini">
                                    <Home size={16} />
                                </div>
                                <span>Free Home Collection</span>
                            </div>
                            <div className="feature-item-divider"></div>
                            <div className="hero-feature-item">
                                <div className="feature-icon-mini">
                                    <CheckCircle2 size={16} />
                                </div>
                                <span>100% Reliable Results</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="hero-image-wrapper">
                            {/* Fallback to medical Unsplash graphic if local image fails */}
                            <img 
                                src="assets/hero_lab_banner.png" 
                                alt="Aarogya Pathology Lab Dumka" 
                                className="hero-image" 
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800';
                                }}
                            />
                            <div className="floating-badge badge-1">
                                <UserCheck size={20} className="floating-badge-icon" />
                                <div>
                                    <h4>Certified Pathologists</h4>
                                    <p>Expert MD Doctors</p>
                                </div>
                            </div>
                            <div className="floating-badge badge-2">
                                <Activity size={20} className="floating-badge-icon" />
                                <div>
                                    <h4>Fully Automated</h4>
                                    <p>Latest Roche & Sysmex analyzers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container stats-grid">
                    <div className="stat-card">
                        <h3 className="stat-number">25,000+</h3>
                        <p className="stat-label">Happy Patients Served</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number">150+</h3>
                        <p className="stat-label">Advanced Lab Tests</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number">99.9%</h3>
                        <p className="stat-label">Accuracy Rate (NABL Standard)</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number">10+</h3>
                        <p className="stat-label">Years of Diagnostic Excellence</p>
                    </div>
                </div>
            </section>
        </>
    );
}
