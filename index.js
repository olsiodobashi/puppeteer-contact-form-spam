import puppeteer from 'puppeteer';
import { config } from './config.js';

const init = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(config.url, { waitUntil: 'networkidle2', headless: false });
    } catch (error) {
        console.log('Unable to open URL');
    }

    try {
        // Find input fields
        const fname = await page.$('input[name="fname"]');
        const lname = await page.$('input[name="lname"]');
        const email = await page.$('input[name="email"]');
        const message = await page.$('.textarea > textarea');
        // ===

        // Fill out inputs with content from config file
        await fname.type(config.fname);
        await lname.type(config.lname);
        await email.type(config.email);
        await message.type(config.message);
        // ===

        // Submit form
        const submit = await page.$('input[type="submit"]');
        await submit.click();
        // ===

        // Wait 2 seconds and take screenshot to verify form was submitted
        await page.waitForTimeout(2000);
        await page.screenshot({ path: `./screenshots/${new Date().getTime()}.png` })
    } catch (error) {
        console.log('Unable to find field', error);
    }

    await browser.close();
}

init();
