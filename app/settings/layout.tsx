import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="grow p-0 md:overflow-y-auto md:p-12 mx-auto justify-center">{children}</div>
}