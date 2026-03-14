'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePreferences } from '../context/preferences';
import { Surahs } from '@/data/surahs';
import { BookOpen } from 'lucide-react';

export default function ContinueReading() {
    const { preferences } = usePreferences();
    const [label, setLabel] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!preferences.lastPage || preferences.lastPage === '/') {
            setLabel(null);
            return;
        }

        try {
            const url = new URL(preferences.lastPage, 'https://emushaf.net');
            const pathname = url.pathname;
            const searchParams = url.searchParams;
            const sayfa = searchParams.get('sayfa');

            let displayLabel = '';

            if (pathname.startsWith('/sure/')) {
                const surahUrl = pathname.replace('/sure/', '').replace(/\/$/, '');
                const surah = Surahs.find(s => s.url === surahUrl);
                if (surah) {
                    displayLabel = `${surah.name}`;
                    if (sayfa) {
                        displayLabel += `, Sayfa ${sayfa}`;
                    } else {
                        displayLabel += `, Sayfa ${surah.start}`;
                    }
                }
            } else if (pathname.startsWith('/cuz/')) {
                const cuzNumber = pathname.replace('/cuz/', '').replace(/\/$/, '');
                displayLabel = `${cuzNumber}. Cüz`;
                if (sayfa) {
                    displayLabel += `, Sayfa ${sayfa}`;
                }
            }

            if (displayLabel) {
                setLabel(displayLabel);
            } else {
                setLabel(null);
            }
        } catch (e) {
            setLabel(null);
        }
    }, [preferences.lastPage]);

    if (!mounted || !label || !preferences.lastPage || preferences.lastPage === '/') {
        return null;
    }

    return (
        <div className="mt-4 flex justify-center w-full max-w-md mx-auto px-4">
            <Link
                href={preferences.lastPage}
                className="flex sm:inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-sm text-muted-foreground border border-transparent hover:border-primary/20 group"
            >
                <BookOpen className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="truncate">Okumaya devam et: <span className="font-medium text-foreground">{label}</span></span>
                <span className="opacity-40 group-hover:opacity-100 transition-opacity ml-1">→</span>
            </Link>
        </div>
    );
}
