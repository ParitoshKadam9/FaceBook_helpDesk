const accessToken =
  "EAALySOJUMrQBOZBq5y57LN4l81ZB75yBmKU7FFPrZC4sRtrHNfiQtsZBDiWYff2W8F13EZAU3gfRzhEdddWkCz6TNVh08OUIeYSR0tMcIZA5nC7nwzmZAZCs2bqct0zlbFrB7s7x5JqXYQ9zC69gMy0DwsmmwhqsodZBMUYHhWZBGlq3ZCvGJuSBZCTgjTxmPaxA1ZAYq";
const veryfyToken = "Nigger";

const postWebhook = async (req, res) => {
  let body = req.body;
  console.log("weeb");
  return res.status(200).json({
    status: true,
    desc: "success",
  });
};


//PSID == page scope ID

const getWebHook = async (req, res) => {
    let verify_token = veryfyToken;

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) { // check if token & mode are query string 
        if (mode === 'subscribe' && token === verify_token) {
            // mode aur token check karlo

            console.log('Webhook recieved');
            res.status(200).send(challenge)
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
        body.entry.forEach(function (entry) {
            // yaha msg aayega -> entry is an array but only with 1 element
            // therefore we only need 0th element
            let webhook_event = entry.messaging[0];
            console.log(webhook_event)
            let sender_psid = webhook_event.sender.id;
            console.log('sender PSID : ' + sender_psid)

        });
        res.status(200).send('mil gaua');
    }
    else {
        res.sendStatus(400);
    }
}

function handleMessage(sender_psid, recieved_message) {
    
}

function handlePostback(sender_psid, recieved_message) {
    
}

function callSendAPI(sender_psid, response) {
    
}

module.exports = { postWebhook, getWebHook, postWeb };


//curl -X GET "localhost:5000/api/hook/getWebHook?hub.verify_token=Nigger&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"