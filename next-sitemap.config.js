/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://emushaf.net',
    generateRobotsTxt: false,
    changefreq: 'yearly',
    priority: 1.0,
    outDir: 'out',
    exclude: [
        '/up',
        '/manifest.webmanifest',
        '/settings',
    ],
    sitemapSize: 10000
}