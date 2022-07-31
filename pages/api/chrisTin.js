// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";

export default function handler(req, res) {
    const scrapeListings = async (url) => {
        const browser = await playwright.chromium.launch({
            args: [...chromium.args, "--font-render-hinting=none"], // This way fix rendering issues with specific fonts
            executablePath:
                process.env.NODE_ENV === "production"
                    ? await chromium.executablePath
                    : "/usr/local/bin/chromium",
            headless:
                process.env.NODE_ENV === "production"
                    ? chromium.headless
                    : true,
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url);
        //await page.screenshot({path:"tester.png"})

        const grabItem = await page.evaluate(() => {
            const pgTag = document.querySelectorAll(
                ".styled-block__heading, .styled-block__subheading, .styled-block__intro, .styled-block__status"
            );
            const listings = [];

            pgTag.forEach((tag) => {
                listings.push(tag.innerText);
            });

            return listings;
        });

        if (grabItem) {
            const formattedResults = [];

            for (let i = 0; i < grabItem.length; i += 4) {
                const formattedStr = `${grabItem[i]} % ${grabItem[i + 1]} % ${
                    grabItem[i + 2]
                } % ${grabItem[i + 3]} `;

                formattedResults.push(formattedStr);
            }

            res.status(200).json({ listings: formattedResults });
        }
        await browser.close();
    };

    scrapeListings(
        "https://www.christinsley.co.uk/merseyside/birkdale/sales/up-to-150000/within-0-25-miles"
    );
}
