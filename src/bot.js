// require('dotenv').config();
const MyUtil = require("./myutil.js");
const { CommentStream, SubmissionStream, ModMailStream, InboxStream } = require("snoostorm");
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const WatchJS = require("melanke-watchjs");
const r = new Snoowrap({
    userAgent: 'catmandx-1st-bot',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
});
const Messenger = require("./messenger");
const BOT_START = Date.now() / 1000;
var broadcast;

function initializeBot(broadcastFunc){
    configReddit();
    watchRateLimit();
    initCommentStream();
    initPostStream();
    initInboxStream();
    initModMailStream();
    broadcast = broadcastFunc;
    Messenger.callSendAPI("3805253409515079", "BOT Started!\nhttps://gas-lighter-bot.herokuapp.com")
    return module.exports
}

function configReddit(){
    r.config({
        continueAfterRatelimitError: true,
        requestTimeout:process.env.TIME_OUT
    });
    console.info("Finished Reddit configuration.")
}

function watchRateLimit(){
    //WATCH JS
// var watch = WatchJS.watch;
// var unwatch = WatchJS.unwatch;
// var callWatchers = WatchJS.callWatchers;

    WatchJS.watch(r, "ratelimitRemaining", 
    () => {
        if(r.ratelimitRemaining < 50){
            console.warn("Rate limit remaining:" +r.ratelimitRemaining);
        }
        if(broadcast){
            broadcast("ratelimitChanged", r.ratelimitRemaining);
        }
    });
}

function initCommentStream(){
    console.info("Trying to establish comment stream!");
    var streamOpts;
    try {
        streamOpts = JSON.parse(process.env.COMMENT_STREAM_OPTION);
        if(!streamOpts || !streamOpts.receiving){
            console.info("Comment Stream was disabled, enable through the environment variable.")
            return;
        }
    } catch (error) {
        console.log(error);
        console.info("COMMENT_STREAM_OPTION unavailable/wrong format.");
        return;
    }
    
    const comments = new CommentStream(r, streamOpts);
    comments.on("item", comment => {
        if(comment.created_utc < BOT_START) return;
        if(comment.body.toLowerCase().includes("!resolved")){
            console.log("New resolved comment!: "+comment.link_id.substring(3))
            let flair = {flair_template_id:MyUtil.FLAIR_ID.RESOLVED}
            let sub = r.getSubmission(comment.link_id.toString().substring(3));
            let reply = ""; //TODO
            sub.selectFlair(flair).then(()=>sub.reply()).catch(error=>{console.log("error when select flair:\n"+error)});
        }
    })

    console.info("Comment Stream established.");
}

function initPostStream(){
    console.info("Trying to establish post stream!");
    var streamOpts
    try {
        streamOpts = JSON.parse(process.env.POST_STREAM_OPTION);
        if(!streamOpts || !streamOpts.receiving){
            console.info("Post Stream was disabled, enable through the environment variable.")
            return;
        }
    } catch (error) {
        console.log(error)
        console.info("POST_STREAM_OPTION unavailable/wrong format.");
        return;
    }
    const posts = new Snoostorm.SubmissionStream(r, streamOpts);
    //*Listen for items (posts)
    posts.on("item", post =>{
        if(post.created_utc < BOT_START) return;
        console.log("New POST");
        console.log(post.body);
        notifyNewPost("/u/catmandx", post).catch((err)=>console.log("send failed at initPOstStream"))
        Messenger.notifyOwner(post);
        //TODO
    })
    console.info("Post Stream established!");
}

function initInboxStream(){
    //TODO
}

function initModMailStream(){
    //TODO
}

async function notifyNewPost(peopleList, post){
    if(!post._hasFetched){
        try {
            post = await post.fetch();
        } catch (error) {
            console.log("Error at notify NewPost")
            console.log(error);
            return
        }
    }
    var sendFunction = function(people, post){
        r.composeMessage({
            to:people,
            subject:"New post in r/GoogleAppsScript",
            text:`There's a new post in r/GoogleAppsScript:\n[${post.title}](${post.url}) posted by u/${post.author.name}`
        }).then(()=>{console.log(`New post notification sent to ${people}.`)})
        .catch((err)=>{console.log("Error on sending noti to catmandx:\n"+err)});
    }
    if(typeof peopleList == "string"){
        sendFunction(peopleList, post);
    }else{
        for (const people of peopleList) {
            sendFunction(people, post);
        }
    }
}

if(process.env.TESTING_MODE && process.env.TESTING_MODE.toLowerCase() == "true"){
    var num = 0
    var errorNum = 0
    setInterval(async()=>{
        var post = r.getSubmission("fhxl4r").fetch().then(()=>console.log("fetch complete",num++, " Err num so far:",errorNum)).catch((err)=>{console.log("Error fetching:",err);num++; errorNum++});
    
    },5000)
}

module.exports={
    initializeBot,
    r
}