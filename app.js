const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const { ppid } = require('process');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const publicVapidKey = 'BKk9HFpgFB6-7BtZu3IVDYQwLviYJvTnlkI0IKoBgl0lURcasoArTK5tCBJbOBIzfHiDtSU5EIX6pdFTDQEBfAs';
const privateVapidKey = 'RzPL98sZzBWbkrEUAn1tlFWt4NF6NrZEOkYzYFWKTeE';

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

// Subscribe route
app.post('/subscribe', async (req, res, next) => {
    const subData = req.body;
    console.log(subData)
    const pushPayload = JSON.stringify({ title: 'Section.io Push Notification' });
    webPush.sendNotification(subData, pushPayload).catch((err) => {
        return res.status(500).json({
            status: false,
            endpoint: subData.endpoint,
            data: err
        });
    });
    // const subData = req.body;
    // const sub = await Subscription.findOne({ endpoint: subData.endpoint })
    // if (sub) {
    //     return res.status(201).json({
    //         message: 'already created created'
    //     })
    // }
    // const data = await Subscription.create(subData)
    // res.status(201).json({
    //     message: 'success fully created'
    // })
})
app.get('/notify', async (req, res, next) => {
    await Subscription.find({}, async (err, subscriptions) => {
        if (err) {
            console.error(`Error occurred while getting subscriptions`);
            res.status(500).json({
                error: 'Technical error occurred'
            });
        } else {
            subscriptions.forEach((subscription) => {

                const pushSubscription = {
                    endpoint: subscription.endpoint,
                    keys: {
                        p256dh: subscription.keys.p256dh,
                        auth: subscription.keys.auth
                    }
                };

                const pushPayload = JSON.stringify({ title: 'Section.io Push Notification' });
                webPush.sendNotification(pushSubscription, pushPayload).catch((err) => {
                    return res.status(500).json({
                        status: false,
                        endpoint: subscription.endpoint,
                        data: err
                    });
                });
            });
        }
        return res.status(500).json({
            status: true,
        });
    });
})
app.get('/dd', (req, res) => {
    return res.render('index')
})
app.set('port', 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
