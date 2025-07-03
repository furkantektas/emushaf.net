import Image from "next/image";
import React from "react";
import '@/app/quran.css'
import { usePreferences } from "../context/preferences";

export default function QuranPage({ number, isPriority }: { number: number, isPriority: boolean }) {
    const imageUrl = `/sayfa/${number}.png`
    const { preferences } = usePreferences();

    // Determine classes based on fitTo preference.
    // The new scrolling behavior will be handled by a class on the Swiper container and CSS targeting swiper-slide.
    const imageLayoutClasses = preferences.fitTo === 'width'
        ? "landscape:h-auto landscape:w-screen" // Fit to width in landscape
        : "landscape:h-screen landscape:w-auto"; // Default: fit to height in landscape

    return <Image
        src={imageUrl}
        alt={`Sayfa ${number}`}
        width={500}
        height={820}
        className={`object-contain sayfa mx-auto z-100 portrait:h-screen portrait:w-auto ${imageLayoutClasses}`}
        key={`sayfa-${number}`}
        onError={(e) => { }}
        priority={isPriority}
    />

}