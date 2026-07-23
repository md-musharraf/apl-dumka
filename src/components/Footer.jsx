import React from "react";
import { Microscope, MessageCircle, Award, Phone } from "lucide-react";

export default function Footer({ scrollToSection }) {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="logo" onClick={() => scrollToSection("home")} style={{ cursor: "pointer" }}>
                        <div className="logo-icon logo-icon-footer">
                            <Microscope size={20} />
                        </div>
                        <span className="logo-title text-white">AAROGYA HEALTH SERVICE</span>
                    </div>
                    <p className="footer-desc">
                        Providing certified, high-precision blood testing and medical health screenings for the people of Dumka and Jharkhand. Accurate, rapid, and home-friendly.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                        </a>
                        <a href="https://wa.me/919431123456" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Direct">
                            <MessageCircle size={16} />
                        </a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Quick Navigation</h4>
                    <ul>
                        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>Home Banner</a></li>
                        <li><a href="#tests-section" onClick={(e) => { e.preventDefault(); scrollToSection("tests-section"); }}>Search blood tests</a></li>
                        <li><a href="#packages-section" onClick={(e) => { e.preventDefault(); scrollToSection("packages-section"); }}>Full checkup packages</a></li>
                        <li><a href="#about-section" onClick={(e) => { e.preventDefault(); scrollToSection("about-section"); }}>Why Choose Aarogya</a></li>
                        <li><a href="#contact-section" onClick={(e) => { e.preventDefault(); scrollToSection("contact-section"); }}>Lab Address & Contact</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Popular Diagnostics</h4>
                    <ul>
                        <li><a href="#tests-section" onClick={(e) => { e.preventDefault(); scrollToSection("tests-section"); }}>Complete Blood Count (CBC)</a></li>
                        <li><a href="#tests-section" onClick={(e) => { e.preventDefault(); scrollToSection("tests-section"); }}>Thyroid Profile (T3, T4, TSH)</a></li>
                        <li><a href="#tests-section" onClick={(e) => { e.preventDefault(); scrollToSection("tests-section"); }}>Lipid Profile & Cholesterol</a></li>
                        <li><a href="#tests-section" onClick={(e) => { e.preventDefault(); scrollToSection("tests-section"); }}>HbA1c & Fasting Sugar</a></li>
                        <li><a href="#tests-section" onClick={(e) => { e.preventDefault(); scrollToSection("tests-section"); }}>Liver Function (LFT)</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Accreditations</h4>
                    <p className="footer-accent-text">
                        <Award size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} /> 
                        Certified Quality standards. Handled under stringent hygiene protocols. All reports checked by MD Pathologist.
                    </p>
                    <p className="footer-accent-text">
                        <Phone size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} /> 
                        Emergency Contact: +91 94311 23456
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} Aarogya Health Service & PathLab Dumka. All rights reserved.</p>
                    <p>Designed with medical excellence for Jharkhand.</p>
                </div>
            </div>
        </footer>
    );
}
