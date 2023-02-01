const webPush = require('web-push')
const Subscription = require('../Model/subscription')
const puppeteer = require('puppeteer')

exports.subscribe = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 960,
        height: 760,
        deviceScaleFactor: 1,
    });            
    // await page.setContent(imgHTML);
    await page.goto('https://www.freecodecamp.org/');
    await page.screenshot({path: example.png});
    await browser.close();
}

exports.index = async (req, res) => {
    res.status(200).render('index')
}
