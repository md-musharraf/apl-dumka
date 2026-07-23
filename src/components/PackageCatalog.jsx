import React from "react";
import { Check, ShoppingBag, Plus } from "lucide-react";

export default function PackageCatalog({ packages, cart, toggleCartItem, discountPercentage }) {
    return (
        <section id="packages-section" className="packages-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">HEALTH PACKAGES</span>
                    <h2 className="section-title">Comprehensive Health Checkup Packages</h2>
                    <p className="section-subtitle">
                        Specially curated test bundles offering advanced health insights at highly discounted prices. Ideal for annual and preventative family checkups.
                    </p>
                </div>

                <div className="packages-grid">
                    {packages.map((pkg) => {
                        const isInCart = cart.some(item => item.id === pkg.id);
                        
                        // Dynamic Pricing Calculation
                        let displayedSlashedPrice = pkg.slashedPrice;
                        let displayedCurrentPrice = pkg.price;
                        let savingsAmount = pkg.slashedPrice - pkg.price;
                        
                        if (discountPercentage > 0) {
                            // Baseline is the original base price
                            displayedSlashedPrice = pkg.price;
                            displayedCurrentPrice = Math.round(pkg.price * (1 - discountPercentage / 100));
                            savingsAmount = pkg.price - displayedCurrentPrice;
                        }

                        return (
                            <div key={pkg.id} className={`package-card ${pkg.isPopular ? "popular" : ""}`} data-id={pkg.id}>
                                {discountPercentage > 0 ? (
                                    <div className="package-ribbon" style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }}>
                                        {discountPercentage}% OFF
                                    </div>
                                ) : pkg.isPopular ? (
                                    <div className="package-ribbon">Best Value</div>
                                ) : null}

                                <div className="package-body">
                                    <div className="package-header">
                                        <h3 className="package-title">{pkg.name}</h3>
                                        <span className="package-parameters">{pkg.parameters}</span>
                                    </div>
                                    <div className="package-price-row">
                                        <div className="price-box">
                                            <div className="price-row-top" style={{ gap: "6px" }}>
                                                <span className="original-price" style={{ fontSize: "0.95rem" }}>
                                                    ₹{displayedSlashedPrice}
                                                </span>
                                                {savingsAmount > 0 && (
                                                    <span className="save-tag">Save ₹{savingsAmount}</span>
                                                )}
                                            </div>
                                            <span className="package-price">₹{displayedCurrentPrice}</span>
                                        </div>
                                    </div>
                                    
                                    <h4 className="package-includes-title">Tests Included:</h4>
                                    <ul className="package-test-list">
                                        {pkg.testsIncluded.map((testName, idx) => (
                                            <li key={idx} className="package-test-item">
                                                <Check size={14} style={{ marginRight: "6px", color: "var(--primary-color)" }} /> 
                                                <span>{testName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="package-footer">
                                    <button 
                                        className={`btn ${isInCart ? 'btn-secondary' : 'btn-primary'} w-full`} 
                                        onClick={() => toggleCartItem(pkg, "package")}
                                    >
                                        {isInCart ? (
                                            <>
                                                <ShoppingBag size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} />
                                                <span>Remove from Cart</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} />
                                                <span>Add Package to Cart</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
