import React from "react";

export default function PromoBanner({ bannerText, discountPercentage }) {
    if (!discountPercentage || discountPercentage === 0) return null;

    return (
        <div className="promo-banner">
            <div className="promo-banner-content">
                <span>{bannerText}</span>
                {/* Repeat for a seamless loop */}
                <span style={{ paddingLeft: "100px" }}>{bannerText}</span>
            </div>
        </div>
    );
}
