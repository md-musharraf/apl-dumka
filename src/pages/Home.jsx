import React, { useState } from "react";
import Hero from "../components/Hero";
import TestCatalog from "../components/TestCatalog";
import PackageCatalog from "../components/PackageCatalog";
import { 
    CheckSquare, FileText, Phone, Droplet, Check, Star, 
    ChevronDown, MapPin, PhoneCall, Mail, Clock, Map, Navigation 
} from "lucide-react";

export default function Home({
    tests,
    packages,
    cart,
    toggleCartItem,
    discountPercentage,
    whatsappNumber,
    scrollToSection
}) {
    const [faqOpenIndex, setFaqOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpenIndex(faqOpenIndex === index ? null : index);
    };

    const steps = [
        {
            num: "01",
            icon: <CheckSquare size={24} />,
            title: "Select Tests",
            desc: "Browse individual tests or packages, add them to your cart. You can choose as many as you need."
        },
        {
            num: "02",
            icon: <FileText size={24} />,
            title: "Enter Details",
            desc: "Open the cart, enter basic patient information like name, age, gender, and home address."
        },
        {
            num: "03",
            icon: <Phone size={24} />,
            title: "Confirm on WhatsApp",
            desc: "Click 'Book on WhatsApp'. Your detailed cart list and details will open instantly in WhatsApp to chat with our staff."
        },
        {
            num: "04",
            icon: <Droplet size={24} />,
            title: "Sample Collection",
            desc: "A certified, hygienic phlebotomist visits your home for quick sample collection. Report is sent digitally!"
        }
    ];

    const testimonials = [
        {
            avatar: "A",
            name: "Amit Kumar",
            location: "Dugdhi, Dumka",
            text: "Very professional service! The laboratory technician came exactly on time for my mother's home blood collection. We got the CBC and HbA1c reports on our WhatsApp by afternoon. Saves a lot of travel time."
        },
        {
            avatar: "P",
            name: "Priyanka Sen",
            location: "Banderjori, Dumka",
            text: "I ordered the Advanced Wellness Health Package for myself and my husband. Highly competitive pricing, nearly half of what other big labs charge, and tests are very comprehensive. Highly recommended diagnostic center in Dumka."
        },
        {
            avatar: "R",
            name: "Rajesh Murmu",
            location: "Rasikpur, Dumka",
            text: "Outstanding customer support. I wanted to book a lipid and thyroid profile. The booking was extremely simple through the WhatsApp system. The report has QR verification code which is great."
        }
    ];

    const faqs = [
        {
            question: "How does the WhatsApp Booking System work?",
            answer: "Simply select your tests and packages in our digital catalog, click on the cart icon to fill in the patient details (name, age, gender, address, date), and click 'Send Booking via WhatsApp'. This automatically creates a formatted text with your order details and opens WhatsApp, where you can instantly send it to our team to confirm your slot."
        },
        {
            question: "Is there any extra charge for Home Sample Collection in Dumka?",
            answer: "No, home sample collection is completely FREE within Dumka municipal limits for orders above ₹300. For extremely remote areas, a nominal travel fee may be applied with prior confirmation."
        },
        {
            question: "How long does it take to receive report results?",
            answer: "For most routine blood and urine tests (like CBC, Blood Sugar, Thyroid, LFT, KFT), reports are processed and delivered within 6 to 12 hours on the same day. Advanced screening or culture tests may take 24 to 48 hours."
        },
        {
            question: "Do I need to fast before giving a blood sample?",
            answer: "Fasting (no food or drink except plain water) for 8-12 hours is highly recommended for Blood Sugar Fasting, Lipid Profile (Cholesterol), and Liver/Kidney tests. For CBC, Thyroid Profile, and Hemoglobin, fasting is generally not required."
        },
        {
            question: "Are your reports accepted by all major hospitals and doctors?",
            answer: "Yes. Aarogya Health Service operates under NABL (National Accreditation Board for Testing and Calibration Laboratories) quality guidelines. Our laboratory parameters and reports are verified by MD Pathologists and fully accepted by all medical practitioners, hospitals, and insurance providers nationwide."
        }
    ];

    return (
        <main>
            {/* Hero Section */}
            <Hero scrollToSection={scrollToSection} whatsappNumber={whatsappNumber} />

            {/* Tests Catalog Section */}
            <TestCatalog 
                tests={tests} 
                cart={cart} 
                toggleCartItem={toggleCartItem} 
                discountPercentage={discountPercentage} 
            />

            {/* Packages Section */}
            <PackageCatalog 
                packages={packages} 
                cart={cart} 
                toggleCartItem={toggleCartItem} 
                discountPercentage={discountPercentage} 
            />

            {/* How it Works Section */}
            <section className="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">EASY BOOKING</span>
                        <h2 className="section-title">How To Book Your Test Online</h2>
                        <p className="section-subtitle">
                            Booking a medical test in Dumka has never been this simple. Just follow these four easy steps.
                        </p>
                    </div>

                    <div className="steps-grid">
                        {steps.map((step, idx) => (
                            <div key={idx} className="step-card">
                                <div className="step-num">{step.num}</div>
                                <div className="step-icon">{step.icon}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About / Why Choose Us Section */}
            <section id="about-section" className="about-section">
                <div className="container about-container">
                    <div className="about-visual">
                        <img 
                            src="assets/home_collection.png" 
                            alt="Free Home blood collection in Dumka" 
                            className="about-image" 
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800';
                            }}
                        />
                        <div className="experience-card">
                            <span className="exp-years">10+</span>
                            <span className="exp-text">Years of Trusted Diagnostics</span>
                        </div>
                    </div>
                    <div className="about-content">
                        <span className="section-tag">WHY CHOOSE AAROGYA</span>
                        <h2 className="section-title">Dumka's Standard Pathology & Diagnostic Lab</h2>
                        <p className="about-desc">
                            Aarogya Health Service is dedicated to providing high-quality, clinical-grade laboratory diagnostics to patients across Dumka and surrounding areas. Our fully automated setup utilizes world-class testing platforms to guarantee swift, precise, and double-verified results.
                        </p>
                        
                        <div className="features-list">
                            <div className="feature-list-item">
                                <div className="feature-list-icon">
                                    <Check size={16} />
                                </div>
                                <div>
                                    <h4>State-of-the-Art Automated Infrastructure</h4>
                                    <p>We employ high-end automated analyzers from Roche, Beckman Coulter, and Sysmex, minimizing human error.</p>
                                </div>
                            </div>
                            <div className="feature-list-item">
                                <div className="feature-list-icon">
                                    <Check size={16} />
                                </div>
                                <div>
                                    <h4>Hygienic and Qualified Technicians</h4>
                                    <p>Our home collection team is fully vaccinated, certified, and trained in pain-free pediatric and geriatric blood draws.</p>
                                </div>
                            </div>
                            <div className="feature-list-item">
                                <div className="feature-list-icon">
                                    <Check size={16} />
                                </div>
                                <div>
                                    <h4>Quick Digital Reports via WhatsApp & Email</h4>
                                    <p>Get your reports directly on WhatsApp in PDF format as soon as they are signed by our pathologists.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">TESTIMONIALS</span>
                        <h2 className="section-title">What Our Patients Say</h2>
                        <p className="section-subtitle">
                            Real feedback from families in Dumka who trust Aarogya Health Service for their routine health checkups.
                        </p>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map((testi, idx) => (
                            <div key={idx} className="testimonial-card">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill="#eab308" color="#eab308" style={{ marginRight: "2px" }} />
                                    ))}
                                </div>
                                <p className="testimonial-text">"{testi.text}"</p>
                                <div className="testimonial-user">
                                    <div className="user-avatar">{testi.avatar}</div>
                                    <div>
                                        <h4 class="user-name">{testi.name}</h4>
                                        <p class="user-location">{testi.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="faq-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">FAQS</span>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <p className="section-subtitle">
                            Got questions about booking, home collection, or report turnaround? Find the answers here.
                        </p>
                    </div>

                    <div className="faq-list">
                        {faqs.map((faq, idx) => {
                            const isOpen = faqOpenIndex === idx;
                            return (
                                <div key={idx} className={`faq-item ${isOpen ? "active" : ""}`}>
                                    <button className="faq-question" onClick={() => toggleFaq(idx)}>
                                        <span>{faq.question}</span>
                                        <ChevronDown className="faq-arrow" size={18} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
                                    </button>
                                    <div className="faq-answer" style={{ maxHeight: isOpen ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}>
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact-section" className="contact-section">
                <div className="container contact-container">
                    <div className="contact-info">
                        <span className="section-tag">FIND US</span>
                        <h2 className="section-title">Aarogya Health Service Dumka</h2>
                        <p className="contact-intro">
                            Visit our state-of-the-art diagnostic center or get in touch with our friendly support desk for bulk bookings, health packages, and clinical consulting.
                        </p>
                        
                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <div className="contact-detail-icon">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <h4>Our Laboratory Address</h4>
                                    <p>Near Tower Chowk, Bhagalpur Road, Dumka, Jharkhand - 814101</p>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <div className="contact-detail-icon">
                                    <PhoneCall size={18} />
                                </div>
                                <div>
                                    <h4>Call / WhatsApp Booking</h4>
                                    <p>+91 94311 23456 / +91 99999 99999</p>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <div className="contact-detail-icon">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <h4>Email Queries</h4>
                                    <p>booking@aarogyahealthservice.com</p>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <div className="contact-detail-icon">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <h4>Working Hours</h4>
                                    <p>Monday - Saturday: 7:00 AM - 8:00 PM <br />Sunday: 7:00 AM - 2:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-visual">
                        <div className="map-placeholder">
                            <div className="map-glass">
                                <Map className="map-icon" size={36} />
                                <h3>Aarogya PathLab Location</h3>
                                <p>Tower Chowk, Bhagalpur Road, Dumka, Jharkhand</p>
                                <a 
                                    href="https://maps.google.com/?q=Aarogya+Health+Service+Tower+Chowk+Dumka+Jharkhand" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-primary btn-sm"
                                >
                                    <Navigation size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} /> 
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
