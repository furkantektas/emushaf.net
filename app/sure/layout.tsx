export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="flex-grow p-0 md:overflow-y-auto mx-auto justify-center bg-page dark:bg-black">{children}</div>
}