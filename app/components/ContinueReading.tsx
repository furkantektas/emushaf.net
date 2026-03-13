'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePreferences } from '../context/preferences';
import { Surahs } from '@/data/surahs';
import { BookOpen, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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

        const url = new URL(preferences.lastPage, 'https://emushaf.net');
        const pathname = url.pathname;
        const searchParams = url.searchParams;
        const sayfa = searchParams.get('sayfa');

        let displayLabel = '';

        if (pathname.startsWith('/sure/')) {
            const surahUrl = pathname.replace('/sure/', '').replace(/\/$/, '');
            const surah = Surahs.find(s => s.url === surahUrl);
            if (surah) {
                displayLabel = `${surah.name} Suresi`;
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
    }, [preferences.lastPage]);

    if (!mounted || !label || !preferences.lastPage || preferences.lastPage === '/') {
        return null;
    }

    return (
        <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6 text-muted-foreground" />
                Okumaya devam et
            </h3>
            <Link href={preferences.lastPage}>
                <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-primary/5">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">{label}</h4>
                                {preferences.lastVisitTime && (
                                    <p className="text-sm text-muted-foreground">
                                        Son ziyaret: {new Date(preferences.lastVisitTime).toLocaleDateString('tr-TR')} {new Date(preferences.lastVisitTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="hidden sm:block text-primary font-medium">
                            Kaldığın yerden devam et →
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </section>
    );
}
