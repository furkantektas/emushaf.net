"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ fallback, className, icon }: { fallback?: string, className?: string, icon?: React.ReactNode }) {
    const router = useRouter();

    function handleBack() {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(fallback || "/");
        }
    }

    if (!className) {
        className = "rounded p-2";
    }

    if (!icon) {
        icon = <ChevronLeft size={24} />;
    }

    return <button className={className} onClick={handleBack}><div className="text-current peer-focus:text-gray-50 dark:peer-focus:text-gray-950 cursor-pointer">{icon}</div></button>;
}