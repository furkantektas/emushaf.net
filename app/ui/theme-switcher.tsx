"use client";

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const className = 'text-current peer-focus:text-gray-900 dark:peer-focus:text-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    const iconContainerStyle = 'relative text-current peer-focus:text-gray-900 dark:peer-focus:text-gray-100 rounded-full p-4 bg-gray-900 text-gray-100 dark:bg-gray-800 dark:text-gray-100 stroke-2';

    const selectTheme = (selectedTheme: string) => {
        setTheme(selectedTheme);
    }

    const darkButton = <div onClick={() => selectTheme('dark')} className={iconContainerStyle}>
        <div className={className}><Moon /></div>
    </div>

    const lightButton = <div onClick={() => selectTheme('light')} className={iconContainerStyle}>
        <div className={className}><Sun /></div>
    </div>

    return (
        <div className='rounded p-2'>
            {theme === 'dark' && lightButton}
            {theme === 'light' && darkButton}
        </div>
    )
}

export default ThemeSwitcher
