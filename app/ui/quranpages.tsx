"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import QuranPage from "./quran-page";
import Header, { CuzHeader, SurahHeader } from "@/app/ui/header";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { usePreferences } from "../context/preferences";
import 'swiper/css';
import 'swiper/css/keyboard';
import { Pagination, Navigation, Keyboard } from 'swiper/modules';
import { Surah } from "@/interfaces/surah";
import LastVisitUpdater from "../components/lastvisit";
import { Cuz } from "@/interfaces/cuz";

export default function QuranPages({
    start,
    end,
    header,
    onPageChange
}: {
    start: number,
    end: number,
    header?: React.ReactNode,
    onPageChange?: (page: number) => void
}) {
    const swiperInstanceRef = useRef<SwiperClass | null>(null);
    const [pageNum, setPageNum] = useState<number>(start);
    const { preferences } = usePreferences(); // Get preferences

    // Determine if landscape width fit mode is active
    // TODO: Add actual orientation detection if possible, for now, treat fitTo:'width' as landscape context
    const isLandscapeWidthFit = preferences.fitTo === 'width';

    header = header || <Header title={`Sayfa ${start} - ${end}`} pageNum={pageNum} />

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isLandscapeWidthFit && swiperInstanceRef.current) {
                const activeSlide = swiperInstanceRef.current.slides[swiperInstanceRef.current.activeIndex];
                if (!activeSlide) return;

                let scrollAmount = 50; // Amount to scroll by, can be adjusted

                if (event.key === "ArrowUp") {
                    event.preventDefault();
                    activeSlide.scrollTop -= scrollAmount;
                } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    activeSlide.scrollTop += scrollAmount;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLandscapeWidthFit, pageNum]); // Rerun if mode changes or page (active slide) changes

    const pages: ReactElement[] = [];
    for (let num = start; num <= end; num++) {
        // Determine if the page should be loaded with priority
        // Preload current, one previous, and two next pages
        const shouldBePriority = num >= pageNum - 1 && num <= pageNum + 2;
        pages.push(
            <SwiperSlide key={`sayfa-${num}`}>
                <QuranPage number={num} isPriority={shouldBePriority} />
                <div className="swiper-lazy-preloader"></div>
            </SwiperSlide>
        );
    }

    return (
        <div>
            <LastVisitUpdater />
            {header}
            <Swiper
                dir="rtl"
                onSwiper={(swiper) => { swiperInstanceRef.current = swiper; }}
                slidesPerView={1}
                grabCursor={true}
                slidesPerGroup={1}
                navigation
                cssMode={false}
                spaceBetween={50}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                modules={[Pagination, Navigation, Keyboard]}
                className={`landscape:h-screen ${isLandscapeWidthFit ? 'swiper-landscape-width-fit' : ''}`}
                speed={300}
                freeMode={false}
                onSlideChange={(swiper: SwiperClass) => {
                    const currentPageNum = swiper.realIndex + start;
                    setPageNum(currentPageNum);
                    onPageChange?.(currentPageNum);

                    // Scroll the active slide to the top smoothly
                    if (swiper.slides && swiper.slides[swiper.activeIndex]) {
                        swiper.slides[swiper.activeIndex].scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }}
            >
                {pages}
            </Swiper >
        </div>
    );
}

export function SurahPages({ surah }: { surah: Surah }) {
    const [currentPageNum, setCurrentPageNum] = useState<number>(surah.start);
    const header = <SurahHeader surah={surah} pageNum={currentPageNum} />

    return <QuranPages
        start={surah.start}
        end={surah.end}
        header={header}
        onPageChange={setCurrentPageNum}
    />;
}


export function CuzPages({ cuz }: { cuz: Cuz }) {
    const [currentPageNum, setCurrentPageNum] = useState<number>(cuz.start);
    const header = <CuzHeader cuz={cuz} pageNum={currentPageNum} />

    return <QuranPages
        start={cuz.start}
        end={cuz.end}
        header={header}
        onPageChange={setCurrentPageNum}
    />;
}