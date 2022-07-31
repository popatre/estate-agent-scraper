// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const puppeteer = require("puppeteer");

export default function handler(req, res) {
    const scrapeListings = async (url) => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);
        //await page.screenshot({path:"tester.png"})

        const grabItem = await page.evaluate(() => {
            const pgTag = document.querySelectorAll("h1, h2");
            const listings = [];

            pgTag.forEach((tag) => {
                listings.push(tag.innerText);
            });
            return listings;
        });

        console.log(grabItem, "*****");

        if (grabItem) {
            const formattedResults = [];

            for (let i = 0; i < grabItem.length; i += 2) {
                const formattedStr = `${grabItem[i]} % ${grabItem[i + 1]}  `;

                formattedResults.push(formattedStr);
            }

            const filtered = formattedResults.filter((item) => {
                return (
                    !item.includes("Sold") &&
                    !item.includes("flat") &&
                    !item.includes("Flat")
                );
            });

            res.status(200).json({ listings: filtered });
        }
        await browser.close();
    };

    scrapeListings(
        "https://www.karltatler.com/merseyside/wirral/sales/tag-house/from-0-bed/from-20000/up-to-130000/most-recent-first"
    );
}
