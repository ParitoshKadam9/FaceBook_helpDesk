const accessToken =
  "EAALySOJUMrQBOZCFazLGzZAtlPLgrxtjR5HpRuG41RKOzu94nylOtabSscnsJZBELTOTTWp4VFqxWL4bUEIibaEpPZBYBTv5VNoPXb2y0cyl9ma31nUYzYCSpXZBQoTH4ecvU0IVGbj0VAIQpF5c2DKeYtzl1mNo3RCtKI5foWG90g6rdw3CdodEeSEMYiZAak";
const veryfyToken = "Nigger";
const Chat = require('../modals/Chat')
const request = require('request');
const ID = "117152548149209";
const PageID = "24490130860585831";

const io = require('socket.io-client');

const socket = io("http://localhost:5000")

function sendDataToServer(data) {
    socket.emit('customEvent', data)
}




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
const postWeb = (req, res) => {
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
            console.log('sender PSID : ' + recipient_id)

            // let d = Chat.create({
            //         Name: sender_psid,
            //         messages: {
            //             action: false,
            //             message: webhook_event.message.text,
            //         },
            //     }); 
            // console.log(d);
            let use 
            if (sender_psid == PageID) {
                    Chat.create({
                      Name: recipient_id,
                        action: true,
                          message: webhook_event.message.text,
                    });
                                sendDataToServer({
                                  Name: recipient_id,
                                  action: true,
                                  message: webhook_event.message.text,
                                });
                    
                }
            
            // maine send kiya hai
            else {
                    Chat.create({
                      Name: sender_psid,
                      action: false,
                      message: webhook_event.message.text,
                    });
                                sendDataToServer({
                                  Name: sender_psid,
                                  action: false,
                                  message: webhook_event.message.text,
                                });
            }
            

            // we will check what the event is (image, or msg, or what)
            // if (webhook_event.message) {
                // handleMessage(sender_psid, "nice")
            // }
            // else if (webhook_event.postback) {
            //     handlePostback(sender_psid, webhook_event.postback)
            // }

        });
        res.status(200).send('mil gaua');
    }
    else {
        res.sendStatus(400);
    }
}

const sendMsg = (req, res) => {
    let msg = req.body.text
    let id = req.body.reciever;
    console.log(id)
    // Chat.create({
    //     Name: PageID,
    //     action: true,
    //     message: msg,
    // });
                sendDataToServer({
                  Name: id,
                  action: true,
                  message: msg,
                });
    handleMessage(id, msg)
    return res.sendStatus(200)
}

function handleMessage(sender_psid, recieved_message) {
    let response;

        response = {
            "text" : `${recieved_message}`
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
        if (!err) { console.log('message sent!', response) }
        else {
            console.error("unable to send message :" + err)
        }
    });
}

const Alltxt = async (req, res) => {
    let data = await Chat.find();
    return res.status(200).json({data})
}

module.exports = { postWebhook, getWebHook, postWeb, Alltxt, sendMsg, sendDataToServer};


//curl -X GET "localhost:5000/api/hook/getWebHook?hub.verify_token=Nigger&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"