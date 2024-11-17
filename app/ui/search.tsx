'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';
// import { useDebouncedCallback } from 'use-debounce';
import useDebounce from '../utils/useDebounce';

export function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebounce((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300
    );

    return (
        <div>
            <div className="relative flex flex-1 flex-shrink-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    className="peer transition-all block w-full rounded-md border border-gray-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder={placeholder}
                    defaultValue={searchParams.get('query')?.toString()}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500 peer-focus:text-gray-900 peer-focus:dark:text-gray-100" />
            </div>
        </div>
    );
}

export default function SearchBox({ placeholder }: { placeholder: string }) {
    return (
        <Suspense>
            <Search placeholder={placeholder} />
        </Suspense>
    );
}