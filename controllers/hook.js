const accessToken =
  "EAALySOJUMrQBOZCFazLGzZAtlPLgrxtjR5HpRuG41RKOzu94nylOtabSscnsJZBELTOTTWp4VFqxWL4bUEIibaEpPZBYBTv5VNoPXb2y0cyl9ma31nUYzYCSpXZBQoTH4ecvU0IVGbj0VAIQpF5c2DKeYtzl1mNo3RCtKI5foWG90g6rdw3CdodEeSEMYiZAak";
const veryfyToken = "Nigger";
const Chat = require('../modals/Chat')
const server = require('../index')
const cors = require('cors')
const { Server } = require('socket.io');
const request = require('request');
const ID = "117152548149209";





const postWebhook = async (req, res) => {
  let body = req.body;
  console.log("weeb");
  return res.status(200).json({
    status: true,
    desc: "succssssess",
  });
};


//PSID == page scope ID

const getWebHook = (req, res) => {
    let verify_token = veryfyToken;

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) { // check if token & mode are query string 
        if (mode === 'subscribe' && token === verify_token) {
            // mode aur token check karlo

            console.log('Webhook recieved');
            res.status(200).send(challenge+"hihihi")
        }
        else {
            res.sendStatus(403);
        }
        
    }
}
const postWeb = async (req, res) => {
    let body = req.body;
    // check if its an event from a page
    if (body.object === 'page') {
        // abhi sabh se iterate karo and check batches
        console.log("-----------------------------------------------------------------------------------------------------")
        body.entry.forEach(function (entry) {
            // yaha msg aayega -> entry is an array but only with 1 element
            // therefore we only need 0th element
            let data = entry.messaging;
            // console.log(data, "mai hu nigger");
            let webhook_event = entry.messaging[0];
            console.log(webhook_event)
            let sender_psid = webhook_event.sender.id;
            let recipient_id = webhook_event.recipient.id;

            console.log('sender PSID : ' + sender_psid)

            // let d = Chat.create({
            //         Name: sender_psid,
            //         messages: {
            //             action: false,
            //             message: webhook_event.message.text,
            //         },
            //     }); 
            // console.log(d);
            let use 
            if (sender_psid == ID) {
                (async () => {
                    try {
                        use = await Chat.findOne({ Name: recipient_id })
                    }
                    catch (err) {
                        console.log(err)
                    }
                })

                    Chat.findOneAndUpdate({
                      Name: recipient_id,
                      $push: {
                        messages: {
                          action: false,
                          message: webhook_event.message.text,
                        },
                      },
                    });
                }
            
            // maine send kiya hai
            else {

                use = Chat.findOne({ Name: sender_psid })

                if (use!=null) {
                    Chat.findOneAndUpdate({
                        Name: sender_psid,
                        $push: {
                            messages: {
                                action: false,
                                message: webhook_event.message.text,
                            }
                        }
                    })
                }
                else {
                    let d = Chat.create({
                    Name: sender_psid,
                    messages: {
                        action: false,
                        message: webhook_event.message.text,
                    },
                    }); 
                }
            }
            


            // we will check what the event is (image, or msg, or what)
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message)
            }
            else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback)
            }

        });
        res.status(200).send('mil gaua');
    }
    else {
        res.sendStatus(400);
    }
}

function handleMessage(sender_psid, recieved_message) {
    let response;

    if (recieved_message.text) {
        response = {
            "text" : `you send the msg: "${recieved_message.text}". now send me an image `
        }
    }
    else if (recieved_message.attachments) {
        let attachment_url = recieved_message.attachments[0].payload.url;

        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture!",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload" : "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload" : "no",
                            }
                        ],
                    }]
                }
            }
        }
    }

    // send a msg response
    callSendAPI(sender_psid, response)
}

function handlePostback(sender_psid, recieved_postback) {
    let response;

    let payload = recieved_postback.payload;

    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    }
    else if (payload === 'no') {
        response = {'text' : "Oops, try sending another image"}
    }

    callSendAPI(sender_psid, response)
}

function callSendAPI(sender_psid, response) {
    let request_body = {
        'recipient': {
            "id" : sender_psid
        },
        "message" : response
    }

    request({
        "uri": "https://graph.facebook.com/v7.0/me/messages",
        "qs": { "access_token": accessToken },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) { console.log('message sent!') }
        else {
            console.error("unable to send message :" + err)
        }
    });
}

const Alltxt = async (req, res) => {
    let data = await Chat.find();
    return res.status(200).json({data})
}

module.exports = { postWebhook, getWebHook, postWeb, Alltxt };


//curl -X GET "localhost:5000/api/hook/getWebHook?hub.verify_token=Nigger&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"