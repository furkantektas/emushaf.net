import React from "react";
import Link from "next/link";
import { Surahs } from "@/data/surahs";
import BackButton from "@/app/ui/back-button";

export default function SurahsList() {
    return (
        <div className="grow p-0 md:overflow-y-auto mx-auto justify-center">
            <div className="w-full lg:max-w-5xl mx-auto p-4">
                <div className="flex items-center mb-4">
                    <BackButton />
                    <h1 className="text-2xl font-bold ml-4">Sureler</h1>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {Surahs.map((surah) => (
                        <li key={surah.order}>
                            <Link href={`/sure/${surah.url}`} className="flex justify-between items-center hover:bg-highlight dark:hover:bg-gray-800 px-2 py-4 rounded">
                                <span className="font-medium">{surah.order}. {surah.name}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Sayfa: {surah.start}-{surah.end}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}