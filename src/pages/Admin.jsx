import React, { useState, useEffect } from "react";
import { 
    subscribeToAuth, loginAdmin, logoutAdmin,
    subscribeToSettings, updateSettings,
    subscribeToTests, addTest, updateTest, deleteTest,
    subscribeToPackages, addPackage, updatePackage, deletePackage,
    isFirebaseEnabled
} from "../services/db";
import { 
    Lock, Settings, FlaskConical, Gift, LogOut, Plus, 
    Trash2, Edit, Save, X, Check, ShieldAlert 
} from "lucide-react";

export default function Admin({ showToast }) {
    const [user, setUser] = useState(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    // Active Admin Tab
    const [activeTab, setActiveTab] = useState("settings");

    // Dynamic Database States
    const [settings, setSettings] = useState(null);
    const [tests, setTests] = useState([]);
    const [packages, setPackages] = useState([]);

    // Form/Modal States for Tests
    const [testModalOpen, setTestModalOpen] = useState(false);
    const [currentTest, setCurrentTest] = useState(null); // null for new, otherwise editing test object
    const [testForm, setTestForm] = useState({
        name: "", category: "general", description: "",
        price: "", slashedPrice: "", reportTime: "6 Hours",
        parameters: 1, isPopular: false
    });

    // Form/Modal States for Packages
    const [packageModalOpen, setPackageModalOpen] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null);
    const [packageForm, setPackageForm] = useState({
        name: "", price: "", slashedPrice: "",
        parameters: "20+ Parameters", testsIncludedString: "",
        isPopular: false
    });

    // Subscribe to Auth and Database changes
    useEffect(() => {
        const unsubscribeAuth = subscribeToAuth((usr) => {
            setUser(usr);
        });

        const unsubscribeSettings = subscribeToSettings((data) => {
            setSettings(data);
        });

        const unsubscribeTests = subscribeToTests((data) => {
            // Sort tests by category and name
            const sorted = [...data].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
            setTests(sorted);
        });

        const unsubscribePackages = subscribeToPackages((data) => {
            setPackages(data);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeSettings();
            unsubscribeTests();
            unsubscribePackages();
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError("");
        try {
            await loginAdmin(loginEmail, loginPassword);
            showToast("Successfully logged in as administrator!", "check-circle");
        } catch (error) {
            setLoginError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out of the Admin panel?")) {
            await logoutAdmin();
            showToast("Logged out successfully.", "info");
        }
    };

    // --- SETTINGS OPERATIONS ---
    const handleSettingsSave = async (e) => {
        e.preventDefault();
        try {
            await updateSettings({
                discountPercentage: Number(settings.discountPercentage),
                bannerText: settings.bannerText,
                whatsappNumber: settings.whatsappNumber
            });
            showToast("Settings updated successfully!", "check-circle");
        } catch (err) {
            showToast("Failed to update settings.", "alert-triangle");
        }
    };

    // --- TEST OPERATIONS ---
    const openAddTestModal = () => {
        setCurrentTest(null);
        setTestForm({
            name: "", category: "general", description: "",
            price: "", slashedPrice: "", reportTime: "6 Hours",
            parameters: 1, isPopular: false
        });
        setTestModalOpen(true);
    };

    const openEditTestModal = (test) => {
        setCurrentTest(test);
        setTestForm({
            name: test.name,
            category: test.category,
            description: test.description,
            price: test.price,
            slashedPrice: test.slashedPrice,
            reportTime: test.reportTime,
            parameters: test.parameters,
            isPopular: test.isPopular || false
        });
        setTestModalOpen(true);
    };

    const handleTestSubmit = async (e) => {
        e.preventDefault();
        const testPayload = {
            name: testForm.name,
            category: testForm.category,
            description: testForm.description,
            price: Number(testForm.price),
            slashedPrice: Number(testForm.slashedPrice),
            reportTime: testForm.reportTime,
            parameters: Number(testForm.parameters),
            isPopular: testForm.isPopular
        };

        try {
            if (currentTest) {
                // Update
                await updateTest(currentTest.id, testPayload);
                showToast("Test updated successfully!", "check-circle");
            } else {
                // Add
                await addTest(testPayload);
                showToast("New test added successfully!", "check-circle");
            }
            setTestModalOpen(false);
        } catch (err) {
            showToast("Error saving test.", "alert-triangle");
        }
    };

    const handleTestDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete the test: "${name}"?`)) {
            try {
                await deleteTest(id);
                showToast("Test deleted successfully.", "trash-2");
            } catch (err) {
                showToast("Failed to delete test.", "alert-triangle");
            }
        }
    };

    // --- PACKAGE OPERATIONS ---
    const openAddPackageModal = () => {
        setCurrentPackage(null);
        setPackageForm({
            name: "", price: "", slashedPrice: "",
            parameters: "20+ Parameters", testsIncludedString: "",
            isPopular: false
        });
        setPackageModalOpen(true);
    };

    const openEditPackageModal = (pkg) => {
        setCurrentPackage(pkg);
        setPackageForm({
            name: pkg.name,
            price: pkg.price,
            slashedPrice: pkg.slashedPrice,
            parameters: pkg.parameters,
            testsIncludedString: pkg.testsIncluded.join(", "),
            isPopular: pkg.isPopular || false
        });
        setPackageModalOpen(true);
    };

    const handlePackageSubmit = async (e) => {
        e.preventDefault();
        const testsIncluded = packageForm.testsIncludedString
            .split(",")
            .map(t => t.trim())
            .filter(t => t.length > 0);

        const packagePayload = {
            name: packageForm.name,
            price: Number(packageForm.price),
            slashedPrice: Number(packageForm.slashedPrice),
            parameters: packageForm.parameters,
            testsIncluded,
            isPopular: packageForm.isPopular
        };

        try {
            if (currentPackage) {
                await updatePackage(currentPackage.id, packagePayload);
                showToast("Package updated successfully!", "check-circle");
            } else {
                await addPackage(packagePayload);
                showToast("New package added successfully!", "check-circle");
            }
            setPackageModalOpen(false);
        } catch (err) {
            showToast("Error saving package.", "alert-triangle");
        }
    };

    const handlePackageDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete the package: "${name}"?`)) {
            try {
                await deletePackage(id);
                showToast("Package deleted successfully.", "trash-2");
            } catch (err) {
                showToast("Failed to delete package.", "alert-triangle");
            }
        }
    };

    // ----------------------------------------------------
    // LOGIN RENDER
    // ----------------------------------------------------
    if (!user) {
        return (
            <div className="admin-login-wrapper">
                <div className="admin-login-card">
                    <div className="login-header">
                        <div className="logo-icon logo-icon-footer" style={{ margin: "0 auto 15px" }}>
                            <Lock size={20} />
                        </div>
                        <h3>APL Dumka Admin Login</h3>
                        <p>Authenticate to access the pathology catalog and pricing dashboard.</p>
                    </div>

                    {!isFirebaseEnabled() && (
                        <div className="local-mode-warning">
                            <ShieldAlert size={16} style={{ marginRight: "8px", flexShrink: 0 }} />
                            <span>
                                Running in <strong>Local Storage Mode</strong>. Credentials: <br />
                                <code>admin@apldumka.com</code> / <code>admin123</code>
                            </span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="adminEmail">Email Address</label>
                            <input 
                                type="email" 
                                id="adminEmail"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="admin@apldumka.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="adminPassword">Password</label>
                            <input 
                                type="password" 
                                id="adminPassword"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {loginError && <div className="login-error-alert">{loginError}</div>}

                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? "Authenticating..." : "Login Dashboard"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------
    // MAIN DASHBOARD RENDER
    // ----------------------------------------------------
    return (
        <div className="admin-dashboard-container">
            {/* Dashboard Sidebar / Nav */}
            <header className="admin-dash-header">
                <div className="container admin-dash-nav">
                    <div className="admin-title">
                        <h3>APL DIAGNOSTICS</h3>
                        <span className="badge">Control Center</span>
                    </div>

                    <div className="admin-tabs">
                        <button 
                            className={`admin-tab-btn ${activeTab === "settings" ? "active" : ""}`}
                            onClick={() => setActiveTab("settings")}
                        >
                            <Settings size={16} />
                            <span>Settings & Offers</span>
                        </button>
                        <button 
                            className={`admin-tab-btn ${activeTab === "tests" ? "active" : ""}`}
                            onClick={() => setActiveTab("tests")}
                        >
                            <FlaskConical size={16} />
                            <span>Manage Tests ({tests.length})</span>
                        </button>
                        <button 
                            className={`admin-tab-btn ${activeTab === "packages" ? "active" : ""}`}
                            onClick={() => setActiveTab("packages")}
                        >
                            <Gift size={16} />
                            <span>Manage Packages ({packages.length})</span>
                        </button>
                    </div>

                    <button className="btn-logout" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Log Out</span>
                    </button>
                </div>
            </header>

            {/* Dashboard Body */}
            <main className="container admin-main-content">
                
                {/* 1. SETTINGS TAB */}
                {activeTab === "settings" && settings && (
                    <div className="admin-section-card">
                        <div className="card-header-with-actions">
                            <h3>Global Store Settings</h3>
                            <span className="db-mode-indicator">
                                {isFirebaseEnabled() ? "Firebase Live Database" : "Local Storage Demo"}
                            </span>
                        </div>
                        <p className="card-subtitle">Manage discount rates, marquee scrolling promo text, and laboratory routing WhatsApp number.</p>

                        <form onSubmit={handleSettingsSave} className="settings-form">
                            <div className="form-group">
                                <label htmlFor="settingsDiscount">Global Test Discount Percentage (%)</label>
                                <input 
                                    type="number" 
                                    id="settingsDiscount"
                                    min="0"
                                    max="99"
                                    value={settings.discountPercentage}
                                    onChange={(e) => setSettings({ ...settings, discountPercentage: e.target.value })}
                                    placeholder="e.g. 15 for 15% off"
                                    required
                                />
                                <span className="input-hint">If set to greater than 0, every test's price on the website will dynamically drop and show a slashed original price. Set to 0 to disable dynamic offers.</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="settingsBannerText">Promo Scrolling Marquee Text</label>
                                <textarea 
                                    id="settingsBannerText"
                                    rows={3}
                                    value={settings.bannerText}
                                    onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                                    placeholder="Enter discount offer banner content..."
                                    required
                                ></textarea>
                                <span className="input-hint">This text scrolls infinitely just below the navigation header. Visible only when discount percentage is greater than 0.</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="settingsWhatsapp">Lab Bookings WhatsApp Phone Number</label>
                                <input 
                                    type="text" 
                                    id="settingsWhatsapp"
                                    value={settings.whatsappNumber}
                                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                                    placeholder="e.g. +91 94311 23456"
                                    required
                                />
                                <span className="input-hint">Default phone number where patient bookings text is forwarded.</span>
                            </div>

                            <button type="submit" className="btn btn-primary btn-save-settings">
                                <Save size={16} style={{ marginRight: "8px" }} />
                                Save Global Settings
                            </button>
                        </form>
                    </div>
                )}

                {/* 2. TESTS TAB */}
                {activeTab === "tests" && (
                    <div className="admin-section-card">
                        <div className="card-header-with-actions">
                            <div>
                                <h3>Diagnostic Test Catalog</h3>
                                <p className="card-subtitle">Manage individual test items, prices, parameters and reports turnaround times.</p>
                            </div>
                            <button className="btn btn-primary" onClick={openAddTestModal}>
                                <Plus size={16} style={{ marginRight: "6px" }} />
                                Add New Test
                            </button>
                        </div>

                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Base Price</th>
                                        <th>Slashed Price</th>
                                        <th>Turnaround</th>
                                        <th>Params</th>
                                        <th>Popular</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tests.map((test) => (
                                        <tr key={test.id}>
                                            <td className="text-bold">{test.name}</td>
                                            <td><span className="category-badge">{test.category}</span></td>
                                            <td>₹{test.price}</td>
                                            <td className="text-muted">₹{test.slashedPrice}</td>
                                            <td>{test.reportTime}</td>
                                            <td>{test.parameters}</td>
                                            <td>{test.isPopular ? <Check size={16} className="text-success" /> : "-"}</td>
                                            <td>
                                                <div className="row-actions">
                                                    <button className="btn-action-edit" onClick={() => openEditTestModal(test)} title="Edit Test">
                                                        <Edit size={14} />
                                                    </button>
                                                    <button className="btn-action-delete" onClick={() => handleTestDelete(test.id, test.name)} title="Delete Test">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 3. PACKAGES TAB */}
                {activeTab === "packages" && (
                    <div className="admin-section-card">
                        <div className="card-header-with-actions">
                            <div>
                                <h3>Wellness Health Packages</h3>
                                <p className="card-subtitle">Manage bundled packages, included test items, and pricing structures.</p>
                            </div>
                            <button className="btn btn-primary" onClick={openAddPackageModal}>
                                <Plus size={16} style={{ marginRight: "6px" }} />
                                Add Package
                            </button>
                        </div>

                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Package Name</th>
                                        <th>Parameters Count</th>
                                        <th>Base Price</th>
                                        <th>Slashed Price</th>
                                        <th>Tests Included</th>
                                        <th>Popular</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packages.map((pkg) => (
                                        <tr key={pkg.id}>
                                            <td className="text-bold">{pkg.name}</td>
                                            <td>{pkg.parameters}</td>
                                            <td>₹{pkg.price}</td>
                                            <td className="text-muted">₹{pkg.slashedPrice}</td>
                                            <td className="text-sm">
                                                <div className="package-tests-summary">
                                                    {pkg.testsIncluded.slice(0, 3).join(", ")}
                                                    {pkg.testsIncluded.length > 3 && ` + ${pkg.testsIncluded.length - 3} more`}
                                                </div>
                                            </td>
                                            <td>{pkg.isPopular ? <Check size={16} className="text-success" /> : "-"}</td>
                                            <td>
                                                <div className="row-actions">
                                                    <button className="btn-action-edit" onClick={() => openEditPackageModal(pkg)} title="Edit Package">
                                                        <Edit size={14} />
                                                    </button>
                                                    <button className="btn-action-delete" onClick={() => handlePackageDelete(pkg.id, pkg.name)} title="Delete Package">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* --- 4. MODAL: ADD / EDIT TEST --- */}
            {testModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-card">
                        <div className="modal-header">
                            <h4>{currentTest ? "Edit Diagnostic Test" : "Create New Diagnostic Test"}</h4>
                            <button className="btn-close-modal" onClick={() => setTestModalOpen(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleTestSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Test Name</label>
                                <input 
                                    type="text" 
                                    value={testForm.name} 
                                    onChange={(e) => setTestForm({...testForm, name: e.target.value})} 
                                    placeholder="e.g. Complete Blood Count (CBC)"
                                    required 
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Category</label>
                                    <select 
                                        value={testForm.category} 
                                        onChange={(e) => setTestForm({...testForm, category: e.target.value})}
                                    >
                                        <option value="general">General & Blood</option>
                                        <option value="sugar">Diabetes & Sugar</option>
                                        <option value="organs">Liver & Kidney</option>
                                        <option value="hormones">Thyroid & Hormones</option>
                                        <option value="vitamins">Vitamins & Minerals</option>
                                        <option value="infections">Infections & Immunity</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>Report Time</label>
                                    <input 
                                        type="text" 
                                        value={testForm.reportTime} 
                                        onChange={(e) => setTestForm({...testForm, reportTime: e.target.value})} 
                                        placeholder="e.g. 6 Hours" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    rows={2} 
                                    value={testForm.description} 
                                    onChange={(e) => setTestForm({...testForm, description: e.target.value})}
                                    placeholder="Brief clinical description of the test..."
                                    required
                                ></textarea>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-4">
                                    <label>Base Price (₹)</label>
                                    <input 
                                        type="number" 
                                        value={testForm.price} 
                                        onChange={(e) => setTestForm({...testForm, price: e.target.value})} 
                                        placeholder="e.g. 299"
                                        required 
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <label>Slashed Price (₹)</label>
                                    <input 
                                        type="number" 
                                        value={testForm.slashedPrice} 
                                        onChange={(e) => setTestForm({...testForm, slashedPrice: e.target.value})} 
                                        placeholder="e.g. 499"
                                        required 
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <label>Parameters count</label>
                                    <input 
                                        type="number" 
                                        value={testForm.parameters} 
                                        onChange={(e) => setTestForm({...testForm, parameters: e.target.value})} 
                                        placeholder="e.g. 24"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <input 
                                    type="checkbox" 
                                    id="testPopular"
                                    checked={testForm.isPopular} 
                                    onChange={(e) => setTestForm({...testForm, isPopular: e.target.checked})}
                                />
                                <label htmlFor="testPopular" style={{ cursor: "pointer" }}>Mark as Popular Test (displays a badge)</label>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                {currentTest ? "Update test in catalog" : "Create and publish test"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- 5. MODAL: ADD / EDIT PACKAGE --- */}
            {packageModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-card">
                        <div className="modal-header">
                            <h4>{currentPackage ? "Edit Health Package" : "Create New Health Package"}</h4>
                            <button className="btn-close-modal" onClick={() => setPackageModalOpen(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handlePackageSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Package Name</label>
                                <input 
                                    type="text" 
                                    value={packageForm.name} 
                                    onChange={(e) => setPackageForm({...packageForm, name: e.target.value})} 
                                    placeholder="e.g. Executive Gold Package"
                                    required 
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Parameters Count Text</label>
                                    <input 
                                        type="text" 
                                        value={packageForm.parameters} 
                                        onChange={(e) => setPackageForm({...packageForm, parameters: e.target.value})} 
                                        placeholder="e.g. 75+ Parameters"
                                        required 
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <label>Base Price (₹)</label>
                                    <input 
                                        type="number" 
                                        value={packageForm.price} 
                                        onChange={(e) => setPackageForm({...packageForm, price: e.target.value})} 
                                        placeholder="e.g. 1999"
                                        required 
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <label>Slashed Price (₹)</label>
                                    <input 
                                        type="number" 
                                        value={packageForm.slashedPrice} 
                                        onChange={(e) => setPackageForm({...packageForm, slashedPrice: e.target.value})} 
                                        placeholder="e.g. 4500"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Included Tests (comma-separated list)</label>
                                <textarea 
                                    rows={4} 
                                    value={packageForm.testsIncludedString} 
                                    onChange={(e) => setPackageForm({...packageForm, testsIncludedString: e.target.value})}
                                    placeholder="e.g. Lipid Profile, Complete Blood Count, Liver Function Test (LFT), Fasting Blood Sugar"
                                    required
                                ></textarea>
                                <span className="input-hint">List test names separated by commas. These will be formatted as bullet points on the card.</span>
                            </div>

                            <div className="form-group checkbox-group">
                                <input 
                                    type="checkbox" 
                                    id="pkgPopular"
                                    checked={packageForm.isPopular} 
                                    onChange={(e) => setPackageForm({...packageForm, isPopular: e.target.checked})}
                                />
                                <label htmlFor="pkgPopular" style={{ cursor: "pointer" }}>Mark as Popular Package (displays "Best Value" banner)</label>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                {currentPackage ? "Update Package" : "Create and Publish Package"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
