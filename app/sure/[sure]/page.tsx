import { Surah } from '../../../interfaces/surah';
import { Surahs } from '../../../data/surahs';
import { redirect, RedirectType } from "next/navigation";
import { SurahPages } from "@/app/ui/quranpages";

type SurahParams = { params: Promise<{ sure: string }> };

export default async function Sure(props: SurahParams) {
    const params = await props.params;
    const sure = getSurahByURL(params.sure);

    if (!sure) {
        redirect("/", RedirectType.replace);
    }

    return <SurahPages surah={sure} />;
}

function getSurahByURL(sure: string): Surah | undefined {
    return Surahs.find((s) => s.url === sure);
}

export async function generateStaticParams(): Promise<{ sure: string }[]> {
    return Surahs.map((s) => ({ sure: s.url }));
}
