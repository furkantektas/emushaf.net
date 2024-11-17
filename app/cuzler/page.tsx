import React from "react";
import Link from "next/link";
import BackButton from "@/app/ui/back-button";

const juzList = Array.from({ length: 30 }, (_, i) => i + 1);

export default function JuzList() {
    return (
        <div className="flex-grow p-0 md:overflow-y-auto mx-auto justify-center ">
            <div className="w-full lg:max-w-5xl mx-auto p-4">
                <div className="flex items-center mb-4">
                    <BackButton />
                    <h1 className="text-2xl font-bold ml-4">Cüzler</h1>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {juzList.map((cuz) => (
                        <li key={cuz} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <Link href={`/cuz/${cuz}`} className="flex items-center justify-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <span className="font-medium text-lg">{cuz}. Cüz</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}