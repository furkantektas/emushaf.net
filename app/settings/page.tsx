import React from "react";
import ThemeSwitcher from '@/app/ui/theme-switcher';

export default function Settings() {
    return (
        <div className="w-full lg:max-w-5xl">
            <h1>Settings</h1>

            <ul className="border-2 border-slate-200 dark:border-slate-800 rounded-md divide-y-2 space-y-2 p-4">
                <li className="flex flex-row justify-between overflow-hidden">
                    Renk teması
                    <div className="relative"><ThemeSwitcher /></div>
                </li>
                <li className="flex flex-row justify-between overflow-hidden">
                    Renk teması
                    <div className="relative"><ThemeSwitcher /></div>
                </li>
            </ul>
        </div>
    )
}