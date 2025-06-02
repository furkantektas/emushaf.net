"use client";

import React, { ReactElement, useRef, useState } from "react";
import QuranPage from "./quran-page";
import Header, { CuzHeader, SurahHeader } from "@/app/ui/header";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
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


    header = header || <Header title={`Sayfa ${start} - ${end}`} pageNum={pageNum} />

    const pages: ReactElement[] = [];
    for (let num = start; num <= end; num++) {
        pages.push(<SwiperSlide key={`sayfa-${num}`}><QuranPage number={num} /></SwiperSlide>);
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
                cssMode={true}
                spaceBetween={50}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                modules={[Pagination, Navigation, Keyboard]}
                className="landscape:h-screen"
                freeMode={{ enabled: true, sticky: true, momentum: false }}
                threshold={15}
                onSlideChange={(swiper: SwiperClass) => {
                    const currentPageNum = swiper.realIndex + start;
                    setPageNum(currentPageNum);
                    onPageChange?.(currentPageNum);
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