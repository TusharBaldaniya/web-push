const express = require('express');
// const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
var fs = require('fs');
// const { ppid } = require('process');
const app = express();
const puppeteer = require('puppeteer')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/Public'));

// const publicVapidKey = 'BKk9HFpgFB6-7BtZu3IVDYQwLviYJvTnlkI0IKoBgl0lURcasoArTK5tCBJbOBIzfHiDtSU5EIX6pdFTDQEBfAs';
// const privateVapidKey = 'RzPL98sZzBWbkrEUAn1tlFWt4NF6NrZEOkYzYFWKTeE';

// webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

// // Subscribe route
// app.post('/subscribe', async (req, res, next) => {
//     const subData = req.body;
//     console.log(subData)
//     const pushPayload = JSON.stringify({ title: 'Section.io Push Notification' });
//     webPush.sendNotification(subData, pushPayload).catch((err) => {
//         return res.status(500).json({
//             status: false,
//             endpoint: subData.endpoint,
//             data: err
//         });
//     });
//     // const subData = req.body;
//     // const sub = await Subscription.findOne({ endpoint: subData.endpoint })
//     // if (sub) {
//     //     return res.status(201).json({
//     //         message: 'already created created'
//     //     })
//     // }
//     // const data = await Subscription.create(subData)
//     // res.status(201).json({
//     //     message: 'success fully created'
//     // })
// })
// app.get('/notify', async (req, res, next) => {
//     await Subscription.find({}, async (err, subscriptions) => {
//         if (err) {
//             console.error(`Error occurred while getting subscriptions`);
//             res.status(500).json({
//                 error: 'Technical error occurred'
//             });
//         } else {
//             subscriptions.forEach((subscription) => {

//                 const pushSubscription = {
//                     endpoint: subscription.endpoint,
//                     keys: {
//                         p256dh: subscription.keys.p256dh,
//                         auth: subscription.keys.auth
//                     }
//                 };

//                 const pushPayload = JSON.stringify({ title: 'Section.io Push Notification' });
//                 webPush.sendNotification(pushSubscription, pushPayload).catch((err) => {
//                     return res.status(500).json({
//                         status: false,
//                         endpoint: subscription.endpoint,
//                         data: err
//                     });
//                 });
//             });
//         }
//         return res.status(500).json({
//             status: true,
//         });
//     });
// })
const html = 
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Gyanmanjari vidhyapeeth</title>
</head>
<body>
  <header>
  <img class="w3-image" src="https://gyanmanjarividyapith.edu.in/wp-content/uploads/2018/04/gm-logo-2.png" alt="Architecture">
    
    <h1>Web Push Notifications Demo</h1>
  </header>

  <div class="buttons">
    <button class="trigger-push">Gyanmanjari Vidhyapeeth</button>
  </div>
</body>
</html>
`
app.get('/download', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 960,
        height: 760,
        deviceScaleFactor: 1,
    });            
    await page.setContent(html);
    // await page.goto('http://localhost:7000/gyanmanjari');
    await page.screenshot({path: 'Public/example.png'});
    await browser.close();
    return res.send('index')
})

app.get('/deletefile', (req, res) => {
    var filePath = './Public/example.png'; 
    fs.unlinkSync(filePath);
    return res.send('index')
})
app.get('/gyanmanjari', (req, res) => {
    return res.render('index')
})
app.set('port', 7000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
