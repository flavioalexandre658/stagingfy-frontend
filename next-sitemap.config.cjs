module.exports = {
    siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`, // URL base do sitemap
    generateRobotsTxt: true,
    sitemapSize: 40000,
    exclude: ['/pagamento', '/comprovante', '/resgate', '/ajuste', '/producao'],
    changefreq: 'daily',
    priority: 1,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/pagamento', '/comprovante', '/resgate', '/ajuste', '/producao'], // Use `disallow` para o robots.txt
            },
        ],
    }
};
