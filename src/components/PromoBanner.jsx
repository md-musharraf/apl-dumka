import React from "react";

export default function PromoBanner({ bannerText, discountPercentage }) {
    if (!discountPercentage || discountPercentage === 0) return null;

    return (
        <div className="promo-banner">
            <div className="promo-banner-track">
                <div className="promo-banner-content">
                    <span>{bannerText}</span>
                    <span>{bannerText}</span>
                    <span>{bannerText}</span>
                    <span>{bannerText}</span>
                </div>
            </div>
        </div>
    );
}
