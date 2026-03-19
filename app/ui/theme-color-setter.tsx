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
            const isQuranPage = cleanPath?.startsWith('/sure/') || cleanPath?.startsWith('/cuz/') || cleanPath === '/sayfa';
            const lightThemeColor = isQuranPage ? pageColor : indexPageColor;
            const finalColor = resolvedTheme === 'dark' ? darkPageColor : lightThemeColor;

            let themeColorMeta = document.querySelector(
                'meta[name="theme-color"]'
            ) as HTMLMetaElement;

            if (!themeColorMeta) {
                themeColorMeta = document.createElement('meta');
                themeColorMeta.name = 'theme-color';
                document.head.appendChild(themeColorMeta);
            }

            themeColorMeta.content = finalColor;
            document.body.style.backgroundColor = finalColor;
        };

        handleRouteChange(); // Set theme color on initial load
    }, [resolvedTheme, pathname]);

    return null;
};

export default ThemeColorSetter;