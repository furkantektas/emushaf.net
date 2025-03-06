'use client';
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./ui/theme-switcher";
import QuranSearch from "./components/QuranSearch";
import { useEffect, useRef } from 'react';
import { Book } from 'lucide-react'
import { Button } from "@/components/ui/button"
import AddToHomeScreen from '@/components/AddToHomeScreen';

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

        <footer className="pb-4 text-center z-10">
          <p className="text-sm text-muted-foreground">
            Muhabbetle yapılmıştır. <a href="https://furkantektas.com" className="text-blue-600 border-b border-blue-600" target="_blank"
            >(iletişim)</a></p>
          <p className="text-sm text-muted-foreground">
            Kur'an-ı Kerim sayfaları Ahmed Hüsrev Hatlı Tevafuklu Kur'an-ı Kerim'den, Hayrat Neşriyat yetkililerinin izniyle alınmıştır. <br />Ticari amaç güdülerek kullanılması, çoğaltılması ve dağıtılması yasaktır.
          </p>
        </footer>
      </div>
    </div>


  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 lg:p-16">
      <div className="z-10 w-full lg:max-w-5xl items-start justify-between lg:flex gap-4 ">
        <div className="lg:w-4/12 justify-center flex flex-col text-center items-center">
          <Image
            src="/emushaf-quran-logo.svg"
            alt="e-Mushaf Logo"
            width={150}
            height={150}
            priority
          />
          <h1 className="text-3xl font-light tracking-tight">e-Mushaf</h1>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 pt-4 mb-4">Telefon, tablet ve bilgisayarınızdan kuran okuyun.</p>
          <div className="w-full" ref={searchRef}>
            <QuranSearch />
          </div>
        </div>
        <div className="lg:w-8/12 mt-4 lg:mt-0 justify-center flex flex-col space-y-4">
          <section className="w-full rounded-md overflow-hidden border border-slate-200 dark:border-slate-600">
            <h2 id="cok-okunan-sureler" className="bg-slate-200 dark:bg-slate-600 py-3 px-4 font-bold">
              En çok okunan sureler
            </h2>
            <nav aria-labelledby="cok-okunan-sureler">
              <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { href: "/sure/yasin", name: "Yâsîn" },
                  { href: "/sure/mulk", name: "Mülk (Tebareke)" },
                  { href: "/sure/nebe", name: "Nebe (Amme)" },
                  { href: "/sure/rahman", name: "Rahmân" },
                  { href: "/sure/vakia", name: "Vâkı'a" },
                  { href: "/sure/fetih", name: "Fetih" },
                ].map((surah, index) => (
                  <li key={index}>
                    <Link
                      href={surah.href}
                      className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    >
                      {surah.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <div className="flex space-x-4">
            <Link
              href="/sure"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-center font-medium transition-colors duration-150 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-blue-300"
            >
              Tüm Sureleri Görüntüle
            </Link>
            <Link
              href="/cuz"
              className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-center font-medium transition-colors duration-150 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-green-300"
            >
              Cüzleri Görüntüle
            </Link>
          </div>
        </div>
      </div>
      <ThemeSwitcher />
    </main>
  );
}