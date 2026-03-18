"use client";

import React, { ReactElement, useEffect, useRef, useState, Suspense } from "react";
import QuranPage from "./quran-page";
import Header, { CuzHeader, SurahHeader, PageHeader } from "@/app/ui/header";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { usePreferences } from "../context/preferences";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/keyboard';
import 'swiper/css/virtual';
import { Navigation, Keyboard, Virtual } from 'swiper/modules';
import { Surah } from "@/interfaces/surah";
import LastVisitUpdater from "../components/lastvisit";
import { Cuz } from "@/interfaces/cuz";

export default function QuranPages({
    start,
    end,
    header,
    onPageChange,
    initialPage
}: {
    start: number,
    end: number,
    header?: React.ReactNode,
    onPageChange?: (page: number) => void,
    initialPage?: number
}) {
    const swiperInstanceRef = useRef<SwiperClass | null>(null);
    const [pageNum, setPageNum] = useState<number>(initialPage || start);
    const { preferences } = usePreferences(); // Get preferences
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // Determine if landscape width fit mode is active
    // TODO: Add actual orientation detection if possible, for now, treat fitTo:'width' as landscape context
    const isLandscapeWidthFit = preferences.fitTo === 'width';

    header = header || <Header title={`Sayfa ${start} - ${end}`} pageNum={pageNum} />

    useEffect(() => {
        if (swiperInstanceRef.current && initialPage && initialPage >= start && initialPage <= end) {
            const targetIndex = initialPage - start;
            if (swiperInstanceRef.current.activeIndex !== targetIndex) {
                swiperInstanceRef.current.slideTo(targetIndex);
            }
        }
    }, [initialPage, start, end]);

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

    return (
        <div>
            <LastVisitUpdater />
            {header}
            <Swiper
                dir="rtl"
                onSwiper={(swiper) => { swiperInstanceRef.current = swiper; }}
                initialSlide={(initialPage && initialPage >= start && initialPage <= end) ? initialPage - start : 0}
                slidesPerView={1}
                grabCursor={true}
                slidesPerGroup={1}
                navigation
                cssMode={false}
                spaceBetween={50}
                keyboard={{ enabled: true }}
                virtual
                modules={[Navigation, Keyboard, Virtual]}
                className={`h-screen overflow-hidden ${isLandscapeWidthFit ? 'swiper-landscape-width-fit' : ''}`}
                speed={300}
                freeMode={false}
                onSlideChange={(swiper: SwiperClass) => {
                    const currentPageNum = swiper.realIndex + start;
                    setPageNum(currentPageNum);
                    onPageChange?.(currentPageNum);

                    const params = new URLSearchParams(searchParams.toString());
                    if (currentPageNum === start) {
                        params.delete('sayfa');
                    } else {
                        params.set('sayfa', currentPageNum.toString());
                    }

                    const queryString = params.toString();
                    const newUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;

                    // Only replace if the URL actually changed to avoid unnecessary router overhead
                    if (typeof window !== 'undefined' && (window.location.pathname + window.location.search !== newUrl)) {
                        router.replace(newUrl, { scroll: false });
                    }

                    // Scroll the active slide to the top smoothly
                    if (swiper.slides && swiper.slides[swiper.activeIndex]) {
                        swiper.slides[swiper.activeIndex].scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }}
            >
                {Array.from({ length: end - start + 1 }).map((_, index) => {
                    const num = start + index;
                    // Determine if the page should be loaded with priority
                    // Preload current, +/- 3 pages for smooth experience on low-end devices
                    const shouldBePriority = num >= pageNum - 3 && num <= pageNum + 3;
                    return (
                        <SwiperSlide key={`sayfa-${num}`} virtualIndex={index}>
                            <QuranPage number={num} isPriority={shouldBePriority} />
                            <div className="swiper-lazy-preloader"></div>
                        </SwiperSlide>
                    );
                })}
            </Swiper >
        </div>
    );
}

function SurahPagesContent({ surah }: { surah: Surah }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const initialPageParam = searchParams.get('sayfa');
    const initialPage = initialPageParam ? parseInt(initialPageParam) : surah.start;

    const [currentPageNum, setCurrentPageNum] = useState<number>(initialPage);

    useEffect(() => {
        const title = `${surah.name} Suresi, Sayfa ${currentPageNum} - eMushaf.net`;
        document.title = title;

        // Update meta description
        const description = `${surah.name} Suresi, Sayfa ${currentPageNum}. Kuran-ı Kerim'i kolaylıkla telefon, tablet ve bilgisayarınızdan okuyun.`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", description);
        }

        // Update canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        const url = new URL(window.location.href);
        const canonicalUrl = `${url.origin}${pathname}${currentPageNum !== surah.start ? `?sayfa=${currentPageNum}` : ''}`;
        canonical.setAttribute('href', canonicalUrl);

        // Update rel="prev"
        let prev = document.querySelector('link[rel="prev"]');
        if (currentPageNum > surah.start) {
            if (!prev) {
                prev = document.createElement('link');
                prev.setAttribute('rel', 'prev');
                document.head.appendChild(prev);
            }
            const prevPage = currentPageNum - 1;
            const prevHref = `${url.origin}${pathname}${prevPage !== surah.start ? `?sayfa=${prevPage}` : ''}`;
            prev.setAttribute('href', prevHref);
        } else if (prev) {
            prev.remove();
        }

        // Update rel="next"
        let next = document.querySelector('link[rel="next"]');
        if (currentPageNum < surah.end) {
            if (!next) {
                next = document.createElement('link');
                next.setAttribute('rel', 'next');
                document.head.appendChild(next);
            }
            const nextPage = currentPageNum + 1;
            const nextHref = `${url.origin}${pathname}?sayfa=${nextPage}`;
            next.setAttribute('href', nextHref);
        } else if (next) {
            next.remove();
        }
    }, [surah.name, currentPageNum, pathname, surah.start, surah.end]);

    const header = <SurahHeader surah={surah} pageNum={currentPageNum} />

    return <QuranPages
        start={surah.start}
        end={surah.end}
        header={header}
        onPageChange={setCurrentPageNum}
        initialPage={initialPage}
    />;
}

export function SurahPages({ surah }: { surah: Surah }) {
    return (
        <Suspense>
            <SurahPagesContent surah={surah} />
        </Suspense>
    );
}

function PagePagesContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const initialPageParam = searchParams.get('sayfa');
    const initialPage = initialPageParam ? parseInt(initialPageParam) : 0;

    const [currentPageNum, setCurrentPageNum] = useState<number>(initialPage);

    useEffect(() => {
        const title = `Sayfa ${currentPageNum} - eMushaf.net`;
        document.title = title;

        // Update meta description
        const description = `Kur'an-ı Kerim Sayfa ${currentPageNum}. Kuran-ı Kerim'i kolaylıkla telefon, tablet ve bilgisayarınızdan okuyun.`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", description);
        }

        // Update canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        const url = new URL(window.location.href);
        const canonicalUrl = `${url.origin}${pathname}${currentPageNum !== 0 ? `?sayfa=${currentPageNum}` : ''}`;
        canonical.setAttribute('href', canonicalUrl);

        // Update rel="prev"
        let prev = document.querySelector('link[rel="prev"]');
        if (currentPageNum > 0) {
            if (!prev) {
                prev = document.createElement('link');
                prev.setAttribute('rel', 'prev');
                document.head.appendChild(prev);
            }
            const prevPage = currentPageNum - 1;
            const prevHref = `${url.origin}${pathname}${prevPage !== 0 ? `?sayfa=${prevPage}` : ''}`;
            prev.setAttribute('href', prevHref);
        } else if (prev) {
            prev.remove();
        }

        // Update rel="next"
        let next = document.querySelector('link[rel="next"]');
        if (currentPageNum < 604) {
            if (!next) {
                next = document.createElement('link');
                next.setAttribute('rel', 'next');
                document.head.appendChild(next);
            }
            const nextPage = currentPageNum + 1;
            const nextHref = `${url.origin}${pathname}?sayfa=${nextPage}`;
            next.setAttribute('href', nextHref);
        } else if (next) {
            next.remove();
        }
    }, [currentPageNum, pathname]);

    const header = <PageHeader pageNum={currentPageNum} />

    return <QuranPages
        start={0}
        end={604}
        header={header}
        onPageChange={setCurrentPageNum}
        initialPage={initialPage}
    />;
}

export function PagePages() {
    return (
        <Suspense>
            <PagePagesContent />
        </Suspense>
    );
}

function CuzPagesContent({ cuz }: { cuz: Cuz }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const initialPageParam = searchParams.get('sayfa');
    const initialPage = initialPageParam ? parseInt(initialPageParam) : cuz.start;

    const [currentPageNum, setCurrentPageNum] = useState<number>(initialPage);

    useEffect(() => {
        const title = `${cuz.number}. Cüz, Sayfa ${currentPageNum} - eMushaf.net`;
        document.title = title;

        // Update meta description
        const description = `${cuz.number}. Cüz, Sayfa ${currentPageNum}. Kuran-ı Kerim'i kolaylıkla telefon, tablet ve bilgisayarınızdan okuyun.`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", description);
        }

        // Update canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        const url = new URL(window.location.href);
        const canonicalUrl = `${url.origin}${pathname}${currentPageNum !== cuz.start ? `?sayfa=${currentPageNum}` : ''}`;
        canonical.setAttribute('href', canonicalUrl);

        // Update rel="prev"
        let prev = document.querySelector('link[rel="prev"]');
        if (currentPageNum > cuz.start) {
            if (!prev) {
                prev = document.createElement('link');
                prev.setAttribute('rel', 'prev');
                document.head.appendChild(prev);
            }
            const prevPage = currentPageNum - 1;
            const prevHref = `${url.origin}${pathname}${prevPage !== cuz.start ? `?sayfa=${prevPage}` : ''}`;
            prev.setAttribute('href', prevHref);
        } else if (prev) {
            prev.remove();
        }

        // Update rel="next"
        let next = document.querySelector('link[rel="next"]');
        if (currentPageNum < cuz.end) {
            if (!next) {
                next = document.createElement('link');
                next.setAttribute('rel', 'next');
                document.head.appendChild(next);
            }
            const nextPage = currentPageNum + 1;
            const nextHref = `${url.origin}${pathname}?sayfa=${nextPage}`;
            next.setAttribute('href', nextHref);
        } else if (next) {
            next.remove();
        }
    }, [cuz.number, currentPageNum, pathname, cuz.start, cuz.end]);

    const header = <CuzHeader cuz={cuz} pageNum={currentPageNum} />

    return <QuranPages
        start={cuz.start}
        end={cuz.end}
        header={header}
        onPageChange={setCurrentPageNum}
        initialPage={initialPage}
    />;
}

export function CuzPages({ cuz }: { cuz: Cuz }) {
    return (
        <Suspense>
            <CuzPagesContent cuz={cuz} />
        </Suspense>
    );
}
