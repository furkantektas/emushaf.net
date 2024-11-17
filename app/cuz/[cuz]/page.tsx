import { redirect, RedirectType } from "next/navigation";
import { CuzPages } from "@/app/ui/quranpages";
import { createCuz } from "@/interfaces/cuz";

type CuzParams = { params: Promise<{ cuz: string }> };

export default async function CuzListPage(props: CuzParams) {
    const cuz = createCuz((parseInt((await props.params).cuz)));

    if (cuz.start < 0 || cuz.end > 604) {
        redirect("/", RedirectType.replace);
    }

    return cuz ? <CuzPages cuz={cuz} /> : null;
}

export async function generateStaticParams(): Promise<{ cuz: string }[]> {
    return Array.from({ length: 30 }, (_, i) => i + 1).map((c) => ({ cuz: c.toString() }));
}
