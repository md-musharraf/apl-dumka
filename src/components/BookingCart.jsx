import React, { useState, useEffect } from "react";
import { ShoppingBag, X, ShoppingCart, Lock, Trash2 } from "lucide-react";

export default function BookingCart({
    cart,
    toggleCartItem,
    cartOpen,
    setCartOpen,
    discountPercentage,
    whatsappNumber,
    showToast
}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [visitType, setVisitType] = useState("Home Collection");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [labNumber, setLabNumber] = useState(whatsappNumber || "+91 94311 23456");

    // Sync lab number state if prop changes
    useEffect(() => {
        if (whatsappNumber) {
            setLabNumber(whatsappNumber);
        }
    }, [whatsappNumber]);

    const today = new Date().toISOString().split("T")[0];

    // Calculate Prices
    const calculateTotals = () => {
        let baseTotal = 0;
        cart.forEach(item => {
            // Price is already calculated based on global discount in App.jsx
            // Let's sum them
            baseTotal += item.price;
        });

        // 10% additional discount if 3 or more items
        const isMultiTestDiscountActive = cart.length >= 3;
        const additionalDiscount = isMultiTestDiscountActive ? Math.round(baseTotal * 0.1) : 0;
        const grandTotal = baseTotal - additionalDiscount;

        return {
            baseTotal,
            additionalDiscount,
            grandTotal,
            isMultiTestDiscountActive
        };
    };

    const { baseTotal, additionalDiscount, grandTotal, isMultiTestDiscountActive } = calculateTotals();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            showToast("Please add tests or packages to your cart before booking.", "alert-triangle");
            return;
        }

        // Format target WhatsApp phone number
        let formattedLabNumber = labNumber.replace(/\s+/g, '');
        if (!formattedLabNumber.startsWith("+")) {
            if (formattedLabNumber.startsWith("91") && formattedLabNumber.length === 12) {
                formattedLabNumber = "+" + formattedLabNumber;
            } else if (formattedLabNumber.length === 10) {
                formattedLabNumber = "+91" + formattedLabNumber;
            }
        }

        // Build selected tests string
        let testListString = "";
        cart.forEach((item, index) => {
            testListString += `${index + 1}. *${item.name}* (₹${item.price})\n`;
        });

        // Format Date
        let formattedDate = date;
        if (date) {
            const parts = date.split("-");
            if (parts.length === 3) {
                formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        }

        // Build WhatsApp Message
        let message = `*AAROGYA HEALTH SERVICE & PATHLAB, DUMKA*\n`;
        message += `_New Pathology Booking Request_\n`;
        message += `==============================\n\n`;
        message += `*PATIENT DETAILS:*\n`;
        message += `👤 *Name:* ${name}\n`;
        message += `🎂 *Age / Gender:* ${age} yrs / ${gender}\n`;
        message += `📍 *Visit Type:* ${visitType}\n`;
        
        if (visitType === "Home Collection") {
            message += `🏠 *Address:* ${address}\n`;
        }
        
        message += `📅 *Date:* ${formattedDate}\n`;
        message += `🕒 *Preferred Time Slot:* ${time}\n\n`;
        
        message += `*SELECTED TESTS & PACKAGES:*\n`;
        message += `${testListString}\n`;
        
        message += `*PAYMENT SUMMARY:*\n`;
        message += `- Subtotal: ₹${baseTotal}\n`;
        if (additionalDiscount > 0) {
            message += `- Multi-Test Discount (10%): -₹${additionalDiscount}\n`;
        }
        message += `- Home Collection Charges: *FREE*\n`;
        message += `- *Grand Total (To Pay): ₹${grandTotal}*\n\n`;
        
        message += `==============================\n`;
        message += `Please confirm my appointment slot and technician details.\n`;
        message += `Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://api.whatsapp.com/send?phone=${formattedLabNumber.replace("+", "")}&text=${encodedMessage}`;

        showToast("Opening WhatsApp to complete booking...", "check-circle");
        
        setTimeout(() => {
            window.open(whatsappURL, "_blank");
        }, 800);
    };

    return (
        <>
            {/* Overlay */}
            {cartOpen && (
                <div className="cart-drawer-overlay active" onClick={() => setCartOpen(false)}></div>
            )}

            {/* Cart Drawer */}
            <div className={`cart-drawer ${cartOpen ? "active" : ""}`}>
                <div className="cart-header">
                    <div className="cart-title-area">
                        <ShoppingBag className="text-primary" size={20} />
                        <h3>Booking Basket</h3>
                        <span className="cart-badge-count">{cart.length}</span>
                    </div>
                    <button className="close-cart-btn" onClick={() => setCartOpen(false)} aria-label="Close cart">
                        <X size={20} />
                    </button>
                </div>

                <div className="cart-body">
                    {cart.length === 0 ? (
                        /* Empty Cart Warning */
                        <div className="cart-empty-state" style={{ display: "flex" }}>
                            <ShoppingCart className="cart-empty-icon" size={48} />
                            <h4>Your booking basket is empty</h4>
                            <p>Browse through our diagnostic tests or wellness checkup packages to add tests to your booking request.</p>
                            <button className="btn btn-primary" onClick={() => setCartOpen(false)}>
                                Explore Tests
                            </button>
                        </div>
                    ) : (
                        /* Cart Items List & Booking Form */
                        <div className="cart-items-section" style={{ display: "flex" }}>
                            <h4 className="cart-section-title">Selected Tests & Packages</h4>
                            <div className="cart-items-list">
                                {discountPercentage > 0 && (
                                    <div className="cart-discount-alert">
                                        🔥 <strong>{discountPercentage}% Discount Active:</strong> All test prices updated automatically with original vs sale rates.
                                    </div>
                                )}

                                {cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-info">
                                            <div className="cart-item-title">{item.name}</div>
                                            <div className="cart-item-meta">
                                                {item.type === "test" 
                                                    ? `${item.parameters} parameters` 
                                                    : item.parameters
                                                } • {item.type.toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="cart-item-price-box">
                                            <span className="cart-item-price">₹{item.price}</span>
                                        </div>
                                        <button 
                                            className="btn-remove-item" 
                                            onClick={() => toggleCartItem(item, item.type)}
                                            aria-label="Remove item"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Price Calculator */}
                            <div className="cart-totals">
                                <div className="total-row">
                                    <span>Base Subtotal</span>
                                    <span>₹{baseTotal}</span>
                                </div>
                                {isMultiTestDiscountActive && (
                                    <div className="total-row discount-row" style={{ display: "flex" }}>
                                        <span>Multi-Test Bundle Offer (10%)</span>
                                        <span>-₹{additionalDiscount}</span>
                                    </div>
                                )}
                                <div className="total-row">
                                    <span>Home Sample Collection</span>
                                    <span className="text-success text-bold">FREE</span>
                                </div>
                                <div className="total-row grand-total-row">
                                    <span>Grand Total</span>
                                    <span>₹{grandTotal}</span>
                                </div>
                            </div>

                            {/* Patient Booking Form */}
                            <div className="booking-form-area">
                                <h4 className="cart-section-title">Patient & Booking Details</h4>
                                <form onSubmit={handleFormSubmit} className="booking-form">
                                    <div className="form-group">
                                        <label htmlFor="patientName">Patient Full Name <span className="required-star">*</span></label>
                                        <input 
                                            type="text" 
                                            id="patientName" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter patient's name" 
                                            required 
                                        />
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <label htmlFor="patientAge">Age <span className="required-star">*</span></label>
                                            <input 
                                                type="number" 
                                                id="patientAge" 
                                                min="1" 
                                                max="120" 
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                placeholder="Years" 
                                                required 
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="patientGender">Gender <span className="required-star">*</span></label>
                                            <select 
                                                id="patientGender" 
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="visitType">Sample Collection Type <span className="required-star">*</span></label>
                                        <select 
                                            id="visitType" 
                                            value={visitType}
                                            onChange={(e) => setVisitType(e.target.value)}
                                            required
                                        >
                                            <option value="Home Collection">Free Home Sample Collection</option>
                                            <option value="Lab Visit">Visit Aarogya Lab (Dumka)</option>
                                        </select>
                                    </div>

                                    {visitType === "Home Collection" && (
                                        <div className="form-group">
                                            <label htmlFor="patientAddress">Home Address (in Dumka) <span className="required-star">*</span></label>
                                            <textarea 
                                                id="patientAddress" 
                                                rows={2} 
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="House number, Landmark, Area in Dumka" 
                                                required
                                            ></textarea>
                                        </div>
                                    )}

                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <label htmlFor="bookingDate">Preferred Date <span className="required-star">*</span></label>
                                            <input 
                                                type="date" 
                                                id="bookingDate" 
                                                min={today}
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                required 
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="bookingTime">Time Slot <span className="required-star">*</span></label>
                                            <select 
                                                id="bookingTime" 
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select Time</option>
                                                <option value="07:00 AM - 09:00 AM">07 AM - 09 AM (Best for fasting)</option>
                                                <option value="09:00 AM - 11:00 AM">09 AM - 11 AM</option>
                                                <option value="11:00 AM - 01:00 PM">11 AM - 01 PM</option>
                                                <option value="01:00 PM - 04:00 PM">01 PM - 04 PM</option>
                                                <option value="04:00 PM - 07:00 PM">04 PM - 07 PM</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Lab Number Customizer */}
                                    <div className="form-group whatsapp-num-box">
                                        <label htmlFor="whatsappLabNumber">Lab WhatsApp Number</label>
                                        <input 
                                            type="text" 
                                            id="whatsappLabNumber" 
                                            value={labNumber}
                                            onChange={(e) => setLabNumber(e.target.value)}
                                            placeholder="e.g. +91 9431123456" 
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-submit-whatsapp w-full">
                                        <i className="whatsapp-btn-icon" style={{ display: "inline-flex", marginRight: "8px", verticalAlign: "middle" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18" fill="currentColor">
                                                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                            </svg>
                                        </i>
                                        <span>Send Booking Request on WhatsApp</span>
                                    </button>
                                    <p className="form-security-note">
                                        <Lock size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} /> 
                                        Your data is processed securely and directly sent to the lab via WhatsApp chat.
                                    </p>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
