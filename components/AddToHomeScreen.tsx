'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function AddToHomeScreen() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        // Check if permanently dismissed or installed
        const hasPermaDismissed = localStorage.getItem('pwaPromptPermaDismissed');
        if (hasPermaDismissed === 'true') {
            return;
        }

        // Check if deferred and 24h haven't passed
        const lastDeferredTime = localStorage.getItem('pwaPromptDeferredTime');
        var shouldDefer = false
        if (lastDeferredTime) {
            const now = new Date().getTime();
            const timePassed = now - parseInt(lastDeferredTime, 10);
            if (timePassed < 24 * 60 * 60 * 1000) {
                shouldDefer = true;
                return;
            }
        }

        // Setup event listener for install prompt
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // If it's the first visit, try to show immediately
        if (!hasPermaDismissed && !shouldDefer) {
            setShowPrompt(true);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleDeferral = () => {
        setShowPrompt(false);
        localStorage.setItem('pwaPromptDeferredTime', new Date().getTime().toString());
    };

    const handlePermaDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwaPromptPermaDismissed', 'true');
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-background border rounded-lg shadow-lg p-4 z-50">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="font-semibold mb-2">Ana ekrana ekle</p>
                    <p className="text-sm text-muted-foreground mb-3">
                        eMushaf'ı ana ekranınıza ekleyerek daha hızlı erişebilirsiniz.
                    </p>
                    <Button onClick={handleDeferral} size="sm" aria-label="Daha sonra">
                        Daha sonra
                    </Button>
                </div>
                <button onClick={handlePermaDismiss} className="p-1" aria-label="Kapat">
                    <X className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>
        </div>
    );
}