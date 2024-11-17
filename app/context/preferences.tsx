'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Preferences {
    fitTo: 'width' | 'height';
    lastPage: string;
    lastVisitTime: string | null;
}

interface PreferencesContextType {
    preferences: Preferences;
    updatePreferences: (newPreferences: Partial<Preferences>) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [preferences, setPreferences] = useState<Preferences>({
        fitTo: 'height',
        lastPage: '/',
        lastVisitTime: null,
    });

    useEffect(() => {
        // Load preferences from localStorage on initial render
        const storedPreferences = localStorage.getItem('appPreferences');
        if (storedPreferences) {
            setPreferences(JSON.parse(storedPreferences));
        }
    }, []);

    const updatePreferences = (newPreferences: Partial<Preferences>) => {
        setPreferences((prevPreferences) => {
            const updatedPreferences = { ...prevPreferences, ...newPreferences };
            localStorage.setItem('appPreferences', JSON.stringify(updatedPreferences));
            return updatedPreferences;
        });
    };

    return (
        <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = (): PreferencesContextType => {
    const context = useContext(PreferencesContext);
    if (context === undefined) {
        throw new Error('usePreferences must be used within a PreferencesProvider');
    }
    return context;
};