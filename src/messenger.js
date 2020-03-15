var request = require('request')

// Handles messages events
function handleMessage(sender_psid, received_message) {
    // let response;

    // // Check if the message contains text
    // if (received_message.text) {    
  
    //   // Create the payload for a basic text message
    //   response = {
    //     "text": `You sent the message: "${received_message.text}". Now send me an image!`
    //   }
    // }  
    
    // // Sends the response message
    // callSendAPI(sender_psid, response); 
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    //TODO
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  //3805253409515079 Hoang
    // Construct the message body
    let request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
      }
    
      // Send the HTTP request to the Messenger Platform
      request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
      }, (err, res, body) => {
        if (!err) {
          console.log('message sent!')
        } else {
          console.error("Unable to send message:" + err);
        }
      }); 
}

async function notifyOwner(post){
    if(!post._hasFetched){
        try {
            post = await post.fetch();
        } catch (error) {
            console.log("Error at notifyNewPost")
            console.log(error);
            return
        }
    }
    var sendFunction = function(people, post){
        r.composeMessage({
            to:people,
            subject:"New post in r/GoogleAppsScript",
            text:`There's a new post in r/GoogleAppsScript:\n
            [${post.title}](${post.url}) posted by u/${post.author.name}
            `
        }).then(()=>{console.log(`New post notification sent to ${people}.`)})
        .catch((err)=>{console.log("Error on sending noti to catmandx:\n"+err)});
    }
    //3805253409515079 Hoang
    // Construct the message body

    let request_body = {
        "recipient": {
          "id": "3805253409515079"
        },
        "message":{
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"button",
                "text":`There's a new post in r/GoogleAppsScript:\n${post.title} posted by u/${post.author.name}`,
                "buttons":[
                  {
                    "type":"web_url",
                    "url":`${post.url}`,
                    "title":"Visit the post!",
                    "webview_height_ratio": "full"
                  }
                ]
              }
            }
          }
      }
    
      // Send the HTTP request to the Messenger Platform
      request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
      }, (err, res, body) => {
        if (!err) {
          console.log('message sent!')
        } else {
          console.error("Unable to send message:" + err);
        }
      }); 
}
module.exports={
    handleMessage,
    handlePostback,
    callSendAPI,
    notifyOwner
}