'use client';
import React from 'react';
import Header from '../ui/header';
import ThemeSwitcher from '../ui/theme-switcher';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header pageNum={0} title="Gizlilik Politikası" right={<ThemeSwitcher />} />

            <main className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-8">Bilgilendirme ve Gizlilik</h1>

                <section className="space-y-6 text-lg leading-relaxed">
                    <p>
                        eMushaf.net olarak gizliliğinize önem veriyoruz. Bu sayfa, web sitemizi kullanırken verilerinizin nasıl işlendiği hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
                    </p>

                    <div>
                        <h2 className="text-xl font-semibold mb-3">Veri Toplama ve Kullanımı</h2>
                        <p>
                            eMushaf.net, kullanıcılarından herhangi bir kişisel veri (isim, e-posta, telefon vb.) toplamaz, işlemez ve sunucularına kaydetmez. Web sitesi üzerinde yaptığınız tüm etkileşimler anonimdir.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-3">Yerel Depolama (LocalStorage)</h2>
                        <p>
                            Okuma tercihleriniz (gece/gündüz modu, sayfa yerleşimi) ve "Okumaya Devam Et" özelliği için son ziyaret ettiğiniz sayfa bilgisi, tamamen sizin cihazınızda (tarayıcınızın yerel depolama alanında) saklanır. Bu verilere biz veya herhangi bir üçüncü şahıs erişemez.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-3">Sunucu Günlükleri ve Cloudflare</h2>
                        <p>
                            Web sitemiz güvenliğini sağlamak ve performansı optimize etmek amacıyla Cloudflare hizmetini kullanmaktadır. Cloudflare, standart internet protokolleri gereği bazı teknik bilgileri (IP adresi, tarayıcı türü vb.) sunucu günlüklerinde (logs) tutabilir. Bu veriler sadece hizmetin devamlılığı ve güvenliği için kullanılır.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-3">Veri Paylaşımı</h2>
                        <p>
                            Toplanmayan hiçbir veri paylaşılamaz veya satılamaz. eMushaf.net hiçbir şekilde kullanıcı verisi ticareti yapmaz.
                        </p>
                    </div>

                    <div className="pt-8 border-t">
                        <p className="text-muted-foreground italic text-base">
                            Bu uygulama Allah rızası güdülerek yapılmıştır ve bu amaçla hizmet vermeye devam etmektedir. Dualarınızı bekleriz.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
