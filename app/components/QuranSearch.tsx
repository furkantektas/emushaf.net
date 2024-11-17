'use client';

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Surahs } from '@/data/surahs';
import Fuse from 'fuse.js';
// import Search from '@/components/ui/search';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
const fuseOptions = {
    keys: ['name', 'url'],
    threshold: 0.3,
    ignoreLocation: false,
};

const fuse = new Fuse(Surahs, fuseOptions);

interface SearchResult {
    type: 'surah' | 'juz';
    value: string | number;
    url: string;
}

export default function QuranSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();
    const resultRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // only focus on search bar on desktop
        if (typeof window !== 'undefined' && window.innerWidth > 768) {
            console.log('focus');
            inputRef.current?.focus();
        }
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const surahResults = fuse.search(searchTerm).slice(0, 5);
            const numericValue = parseInt(searchTerm, 10);

            const newResults: SearchResult[] = [
                ...surahResults.map(result => ({
                    type: 'surah' as const,
                    value: result.item.name,
                    url: `/sure/${result.item.url}`
                })),
                ...(numericValue >= 1 && numericValue <= 30 ? [{
                    type: 'juz' as const,
                    value: numericValue,
                    url: `/cuz/${numericValue}`
                }] : []),
            ];

            setResults(newResults);
            setSelectedIndex(-1);
        } else {
            setResults([]);
            setSelectedIndex(-1);
        }
    }, [searchTerm]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            router.push(results[selectedIndex].url);
        } else if (e.key === 'Tab') {
            // Allow natural tab behavior
            setResults([]);
            setSelectedIndex(-1);
        }
    };

    useEffect(() => {
        if (selectedIndex >= 0 && selectedIndex < resultRefs.current.length) {
            resultRefs.current[selectedIndex]?.focus();
        }
    }, [selectedIndex]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (results.length > 0) {
            router.push(results[0].url);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <Input
                        ref={inputRef}
                        type="search"
                        placeholder="Sure / cüz / sayfa ara..."
                        className="pl-10 pr-4 py-4 bg-white dark:bg-slate-700 text-lg"
                        autoComplete="off"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="Sure, cüz veya sayfa ara..."
                        aria-autocomplete="list"
                        aria-controls="search-results"
                        aria-activedescendant={selectedIndex >= 0 ? `result-${selectedIndex}` : undefined}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </form>
            {results.length > 0 && (
                <div id="search-results" className="mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2" role="listbox">
                    {results.map((result, index) => (
                        <button
                            key={`${result.type}-${result.value}`}
                            // ref={el => resultRefs.current[index] = el}
                            onClick={() => router.push(result.url)}
                            onKeyDown={(e) => {
                                if (e.key === 'Tab' && index === results.length - 1) {
                                    setResults([]);
                                    setSelectedIndex(-1);
                                }
                            }}
                            className={`w-full text-left px-2 py-1 rounded ${index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            role="option"
                            aria-selected={index === selectedIndex}
                            id={`result-${index}`}
                            aria-label={`${result.type === 'surah' ? 'Sure' : result.type === 'juz' ? 'Cüz' : 'Sayfa'}: ${result.value}`}
                        >
                            {result.type === 'surah' && `${result.value}`}
                            {result.type === 'juz' && `${result.value}. Cüz`}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}