'use client';

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';

const ThemeColorSetter = () => {
    const { resolvedTheme } = useTheme();
    const pathname = usePathname();

    useEffect(() => {
        const handleRouteChange = () => {
            const pageColor = '#fdedb9';
            const indexPageColor = '#fff';
            const darkPageColor = '#000';
            const cleanPath = pathname?.endsWith('/') ? pathname.slice(0, -1) : pathname;
            const isQuranPage = cleanPath?.startsWith('/sure/') || cleanPath?.startsWith('/cuz/');
            const lightThemeColor = isQuranPage ? pageColor : indexPageColor;

            let themeColorMeta = document.querySelector(
                'meta[name="theme-color"]'
            ) as HTMLMetaElement;

            if (!themeColorMeta) {
                themeColorMeta = document.createElement('meta');
                themeColorMeta.name = 'theme-color';
                document.head.appendChild(themeColorMeta);
            }

            themeColorMeta.content = resolvedTheme === 'dark' ? darkPageColor : lightThemeColor;
        };

        handleRouteChange(); // Set theme color on initial load
    }, [resolvedTheme, pathname]);

    return null;
};

export default ThemeColorSetter;