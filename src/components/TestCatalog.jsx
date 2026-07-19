import React, { useState } from "react";
import { Search, X, Clock, FlaskConical, CheckCircle2, Plus, Check } from "lucide-react";

export default function TestCatalog({ tests, cart, toggleCartItem, discountPercentage }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", label: "All Tests" },
        { id: "general", label: "General & Complete Blood" },
        { id: "sugar", label: "Diabetes & Sugar" },
        { id: "organs", label: "Liver & Kidney" },
        { id: "hormones", label: "Thyroid & Hormones" },
        { id: "vitamins", label: "Vitamins & Minerals" },
        { id: "infections", label: "Infections & Immunity" }
    ];

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const handleResetSearch = () => {
        setSearchQuery("");
        setActiveCategory("all");
    };

    // Filter tests
    const filteredTests = tests.filter((test) => {
        const matchesCategory = activeCategory === "all" || test.category === activeCategory;
        const matchesSearch = 
            test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });

    return (
        <section id="tests-section" className="catalog-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">TEST CATALOG</span>
                    <h2 className="section-title">Popular Diagnostic & Blood Tests</h2>
                    <p className="section-subtitle">
                        Search for individual tests or filter by organ group. Add selected tests to your cart and book via WhatsApp in a single click.
                    </p>
                </div>

                {/* Search and Filters Bar */}
                <div className="filter-controls-container">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tests (e.g. CBC, Lipid, Diabetes, Liver, WBC...)" 
                            aria-label="Search tests"
                        />
                        {searchQuery && (
                            <button className="clear-search-btn" onClick={handleClearSearch}>
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="category-tabs-container">
                        <div className="category-tabs">
                            {categories.map((cat) => (
                                <button 
                                    key={cat.id}
                                    className={`category-tab ${activeCategory === cat.id ? "active" : ""}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tests Grid */}
                {filteredTests.length > 0 ? (
                    <div className="tests-grid" style={{ display: "grid" }}>
                        {filteredTests.map((test) => {
                            const isInCart = cart.some(item => item.id === test.id);
                            
                            // Dynamic Pricing Calculation
                            let displayedSlashedPrice = test.slashedPrice;
                            let displayedCurrentPrice = test.price;
                            
                            if (discountPercentage > 0) {
                                // Baseline is the original base price
                                displayedSlashedPrice = test.price;
                                displayedCurrentPrice = Math.round(test.price * (1 - discountPercentage / 100));
                            }

                            return (
                                <div key={test.id} className="test-card" data-id={test.id}>
                                    {test.isPopular && (
                                        <span className="package-ribbon" style={{ top: "10px", right: "-25px", padding: "3px 25px", fontSize: "0.55rem" }}>
                                            Popular
                                        </span>
                                    )}
                                    <div className="test-card-header">
                                        <span className="test-category-tag">{test.category}</span>
                                        <span className="test-time-tag">
                                            <Clock size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} /> 
                                            {test.reportTime}
                                        </span>
                                    </div>
                                    <h3 className="test-title">{test.name}</h3>
                                    <p className="test-description">{test.description}</p>
                                    
                                    <div className="test-meta">
                                        <div className="test-meta-item">
                                            <FlaskConical size={14} style={{ marginRight: "4px" }} />
                                            <span>{test.parameters} {test.parameters === 1 ? 'Parameter' : 'Parameters'}</span>
                                        </div>
                                        <div className="test-meta-item">
                                            <CheckCircle2 size={14} style={{ marginRight: "4px" }} />
                                            <span>NABL Standard</span>
                                        </div>
                                    </div>

                                    <div className="test-card-footer">
                                        <div className="price-box">
                                            <span className="original-price">₹{displayedSlashedPrice}</span>
                                            <span className="current-price">₹{displayedCurrentPrice}</span>
                                        </div>
                                        <button 
                                            className={`btn-add-test ${isInCart ? 'added' : ''}`} 
                                            onClick={() => toggleCartItem(test, "test")} 
                                            aria-label={isInCart ? 'Remove from booking' : 'Add to booking'}
                                        >
                                            {isInCart ? <Check size={18} /> : <Plus size={18} />}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="empty-state" style={{ display: "flex" }}>
                        <Search className="empty-icon" size={48} />
                        <h3>No tests found</h3>
                        <p>We couldn't find any test matching your search query. Try checking the spelling or browse using the category tabs above.</p>
                        <button className="btn btn-secondary" onClick={handleResetSearch}>
                            Browse All Tests
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
