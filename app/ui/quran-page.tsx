import Image from "next/image";
import React from "react";
import '@/app/quran.css'
import { usePreferences } from "../context/preferences";

export default function QuranPage({ number, isPriority }: { number: number, isPriority: boolean }) {
    const imageUrl = `/sayfa/${number}.png`
    const { preferences } = usePreferences();

    return <Image
        src={imageUrl}
        alt={`Sayfa ${number}`}
        width={500}
        height={820}
        className={"object-contain sayfa mx-auto z-100 portrait:h-screen portrait:w-auto " + (preferences.fitTo !== 'width' ? "landscape:h-screen landscape:w-auto" : "landscape:h-auto landscape:w-screen")}
        key={`sayfa-${number}`}
        onError={(e) => { }}
        priority={isPriority}
    />

}