'use client';
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./ui/theme-switcher";
import QuranSearch from "./components/QuranSearch";
import { useEffect, useRef } from 'react';
import { Book } from 'lucide-react'
import { Button } from "@/components/ui/button"
import AddToHomeScreen from '@/components/AddToHomeScreen';
import ContinueReading from './components/ContinueReading';

import { Card, CardContent } from "@/components/ui/card"
import { Surahs } from "@/data/surahs";
import { Surah } from "@/interfaces/surah";
export default function Home() {
  const searchRef = useRef<HTMLDivElement>(null);

  const popularSurahs: Surah[] = ['yasin', 'mulk', 'nebe', 'rahman', 'vakia', 'fetih'].map((surah) => {
    const foundSurah = Surahs.find((s) => s.url === surah);
    if (!foundSurah) {
      throw new Error(`Surah with url ${surah} not found`);
    }
    return foundSurah;
  });
  const popularJuz: number[] = [30, 1, 2, 3, 4, 5, 11, 12, 13, 15, 16];

  useEffect(() => {
    if (searchRef.current) {
      const inputElement = searchRef.current.querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col`}>
      <div className="grow text-foreground">


        <main className="container mx-auto px-4 pt-8 lg:pt-24 z-10">
          <section className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">eMushaf.net</h2>
            <p className="text-xl mb-8">Kur'an-ı Kerim'i telefon, tablet ve bilgisayarınızdan kolaylıkla okuyun.</p>
            <div className="max-w-md mx-auto relative">
              <QuranSearch />
            </div>
            <ContinueReading />
          </section>

          <AddToHomeScreen />

          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">En çok okunan sureler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularSurahs.map((surah) => (
                <Link
                  key={surah?.url}
                  href={`sure/${surah.url}`}
                >
                  <Card
                    className="hover:shadow-lg transition-shadow"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.location.href = `sure/${surah.url}`;
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium">{surah.name} {surah.alias && ` (${surah.alias})`}</h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-5">
              <Button size="lg" className="w-full md:w-auto" asChild>
                <Link href="/sureler">
                  <Book className="mr-2 h-5 w-5" />
                  Tüm sureleri görüntüle
                </Link>
              </Button>
            </div>


          </section>
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">En çok okunan cüzler</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popularJuz.map((volume, index) => (
                <Button key={index} variant="outline" className="h-auto py-2" asChild>
                  <Link key={index} href={`/cuz/${volume}`}>
                    {volume}. cüz
                  </Link>
                </Button>
              ))}
              <Button className="h-auto py-2 w-full" asChild>
                <Link href="/cuzler" className="flex" passHref>
                  <Book className="mr-2 h-5 w-5" />
                  Tüm cüzler
                </Link>
              </Button>
            </div>
          </section>

        </main>

        <footer className="pb-12 text-center z-10 space-y-4">
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-sm text-muted-foreground italic mb-4">
              Allah rızası güdülerek yapılmıştır ve bu amaçla hizmet vermeye devam etmektedir.
            </p>

            <p className="text-xs text-muted-foreground">
              Kur'an-ı Kerim sayfaları Ahmed Hüsrev Hatlı Tevafuklu Kur'an-ı Kerim'den, Hayrat Neşriyat yetkililerinin izniyle alınmıştır. <br />Ticari amaç güdülerek kullanılması, çoğaltılması ve dağıtılması yasaktır.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground mt-6 pt-6 border-t">
              <a href="https://github.com/furkantektas/emushaf.net/issues" target="_blank" className="hover:text-blue-600 underline underline-offset-4">İletişim</a>
              <Link href="/gizlilik" className="hover:text-blue-600 underline underline-offset-4">Gizlilik</Link>
              <a href="https://github.com/furkantektas/emushaf.net" target="_blank" className="hover:text-blue-600 underline underline-offset-4">Açık Kaynak</a>
            </div>
          </div>
        </footer>
      </div>
    </div>


  );
}
