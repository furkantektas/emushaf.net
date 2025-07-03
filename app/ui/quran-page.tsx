import Image from "next/image";
import React from "react";
import '@/app/quran.css'
import { usePreferences } from "../context/preferences";

export default function QuranPage({ number, isPriority }: { number: number, isPriority: boolean }) {
    const imageUrl = `/sayfa/${number}.png`
    const { preferences } = usePreferences();

    const isLandscapeWidthFit = preferences.fitTo === 'width';
    // TODO: Check actual orientation, not just assume landscape based on fitTo preference.
    // For now, we assume that 'width' fit is only active/relevant in landscape.
    const conditionalClasses = isLandscapeWidthFit ? "landscape:h-auto landscape:w-screen landscape-width-fit-scroll" : "landscape:h-screen landscape:w-auto";

    return <Image
        src={imageUrl}
        alt={`Sayfa ${number}`}
        width={500}
        height={820}
        className={`object-contain sayfa mx-auto z-100 portrait:h-screen portrait:w-auto ${conditionalClasses}`}
        key={`sayfa-${number}`}
        onError={(e) => { }}
        priority={isPriority}
    />

}