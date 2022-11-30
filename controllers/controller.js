const webPush = require('web-push')
const Subscription = require('../Model/subscription')

exports.subscribe = async (req, res) => {
    const subData = req.body;
    const sub = await Subscription.findOne({endpoint:subData.endpoint})
    if(sub){
        return res.status(201).json({
            message:'already created created'
        })
    }
    const data =await Subscription.create(subData)
    res.status(201).json({
        message:'success fully created'
    })
}

exports.notifyall = async (req, res) => {

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

                    const pushPayload = JSON.stringify({title: 'Section.io Push Notification' });
                    webPush.sendNotification(pushSubscription,pushPayload).catch((err) => {
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
}
exports.index = async (req, res) => {
    res.status(200).render('index')
}
