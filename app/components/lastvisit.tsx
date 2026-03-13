'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { usePreferences } from '../context/preferences';

const LastVisitUpdaterContent = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { updatePreferences } = usePreferences();

    const queryString = searchParams.toString();
    const fullPath = `${pathname}${queryString ? `?${queryString}` : ''}`;
    const lastPathRef = useRef(fullPath);

    useEffect(() => {
        if (fullPath !== '/') {
            updatePreferences({
                lastPage: fullPath,
                lastVisitTime: new Date().toISOString(),
            });
            lastPathRef.current = fullPath;
        }
    }, [fullPath, updatePreferences]);

    return null;
};

const LastVisitUpdater = () => {
    return (
        <Suspense fallback={null}>
            <LastVisitUpdaterContent />
        </Suspense>
    );
}

export default LastVisitUpdater;