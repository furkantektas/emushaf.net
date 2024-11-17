// import { Cog6ToothIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

import React, { ReactElement, ReactNode, useState, useEffect, useCallback } from "react";
import BackButton from "./back-button";
import { Surah } from '@/interfaces/surah';
import PageFitButton from './page-fit-button';
import ThemeSwitcher from './theme-switcher';
import { Cuz } from "@/interfaces/cuz";


export default function Header({ pageNum, left, title, right }: { pageNum: number, left?: ReactElement, title?: ReactElement | string, right?: ReactElement }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    const hideHeader = useCallback(() => {
        if (!isHovering) {
            setIsVisible(false);
        }
    }, [isHovering]);

    const showHeader = useCallback((duration: number) => {
        setIsVisible(true);
        if (duration === 0) return;
        const timer = setTimeout(hideHeader, duration);
        return () => clearTimeout(timer);
    }, [hideHeader]);


    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY <= 100) {
                showHeader(0);
            } else if (e.clientY > 100 && !isHovering) {
                hideHeader();
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [showHeader, hideHeader, isHovering]);


    useEffect(() => {
        // Initial timer to hide the header after 2 seconds when component mounts
        return showHeader(2000);
    }, [showHeader]);

    useEffect(() => {
        const handleTap = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.header-container')) {
                if (isVisible) {
                    // If header is visible and user taps outside, hide it immediately
                    setIsVisible(false);
                } else {
                    // If header is not visible, show it for 10 seconds
                    return showHeader(10000);
                }
            }
        };

        // Add click event listener to handle taps anywhere on the screen
        document.addEventListener('click', handleTap);
        return () => document.removeEventListener('click', handleTap);
    }, [showHeader, isVisible]);

    // ReactElement.prototype.
    var titleElem: ReactElement;
    if (React.isValidElement(title)) {
        titleElem = title;
    } else {
        titleElem = <div className="flex flex-row space-x-2 items-baseline"><h1 className="font-medium tracking-wide uppercase dark:text-gray-50 text-gray-900">{title}</h1></div>
    }
    if (!left) {
        left = <BackButton />
    }

    if (!right) {
        right = <div>
            <PageFitButton />
            <ThemeSwitcher />
        </div>
    }

    return <div
        className={`fixed t-0 l-0 z-10 w-full transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
        <div className="header-container flex flex-row justify-between border-b-2 border-slate-900 dark:border-slate-900 m-0 px-2 py-4 w-full dark:bg-slate-900 bg-page dark:text-white text-black opacity-85"
            onClick={() => showHeader(2000)}>
            {left}
            {titleElem}
            {right}
        </div>
    </div>

}


export function SurahHeader({ surah, pageNum }: { surah: Surah, pageNum: number }) {
    const title = (
        <div className="flex flex-col space-x-2 items-center">
            <h1 className="font-medium tracking-wide uppercase dark:text-gray-50 text-gray-950">{surah.name}</h1>
            <span className="text-xs dark:text-neutral-300 text-neutral-600">s. {pageNum} ({surah.start} — {surah.end})</span>
        </div>
    )

    return <Header pageNum={pageNum} title={title} />
}

export function CuzHeader({ cuz, pageNum }: { cuz: Cuz, pageNum: number }) {
    const title = (
        <div className="flex flex-col space-x-2 items-center">
            <h1 className="font-medium tracking-wide uppercase dark:text-gray-50 text-gray-950">{cuz.number}. cüz</h1>
            <span className="text-xs dark:text-neutral-300 text-neutral-600">s. {pageNum} ({cuz.start} — {cuz.end})</span>

        </div>
    )

    return <Header pageNum={pageNum} title={title} />
}