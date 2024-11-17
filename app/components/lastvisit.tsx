'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePreferences } from '../context/preferences';

const LastVisitUpdater = () => {
    const pathname = usePathname();
    const { updatePreferences } = usePreferences();
    const lastPathRef = useRef(pathname);

    useEffect(() => {
        if (pathname !== lastPathRef.current) {
            updatePreferences({
                lastPage: pathname,
                lastVisitTime: new Date().toISOString(),
            });
            lastPathRef.current = pathname;
        }
    }, [pathname, updatePreferences]);

    return null;
};

export default LastVisitUpdater;