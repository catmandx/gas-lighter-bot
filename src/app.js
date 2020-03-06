require('dotenv').config();
const Util = require("./util.js")
const { CommentStream, SubmissionStream, ModMailStream, InboxStream } = require("snoostorm");
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

//WATCH JS
var WatchJS = require("melanke-watchjs")
var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;

const r = new Snoowrap({
    userAgent: 'catmandx-1st-bot',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
});
r.config({continueAfterRatelimitError: true});

watch(r, "ratelimitRemaining", 
    () => console.log(new Date().toLocaleString("vi-VN", {timeZone: "Asia/Bangkok"})
                        +": rate limit remaining:" +r.ratelimitRemaining));

const streamOpts = {
    subreddit: 'catmandx_bot_test',
    limit: 25,
    pollTime: 10000
};

const BOT_START = Date.now() / 1000;  

const comments = new CommentStream(r, streamOpts);
// On collections, perform whatever logic you want to do
// comments.on("listing", collection => {
//     console.log(collection.length)
// })
// // On comment, perform whatever logic you want to do
comments.on("item", comment => {
    if(comment.created_utc < BOT_START) return;
    console.log("New COMMENT")
    console.log(comment.body)
    console.log(comment.link_id.substring(3))
    if(comment.body.toLowerCase().includes("!resolved")){
        let flair = {flair_template_id:Util.RESOLVED_FLAIR_ID}
        var sub = r.getSubmission(comment.link_id.toString().substring(3));
        sub.selectFlair(flair)
    }
    
    // console.warn("rate limit remaining: "+r.ratelimitRemaining)
})

// const posts = new Snoostorm.SubmissionStream(r,streamOpts);
// posts.on("item", post =>{
//     if(post.created_utc < BOT_START) return;
//     console.log("New POST")
//     console.log(post.body)
//     // console.warn("rate limit remaining: "+r.ratelimitRemaining)
//     // if(!post.link_flair_text){
//     //     r.com
//     // }
// })

//TESTING
// console.log("Begin get submission:");
// // r.getSubmission("fdxylv").fetch().then(post=>console.log(JSON.stringify(post)));
// // r.getUser('catmandx').fetch().then(user => console.log(JSON.stringify(user)))
// r.getUser('catmandx').getComments()
//     .then(comments => {console.log(comments.length); return comments.fetchMore({amount:100})})
//     .then(comments => {console.log(comments.length)})
//     .catch(error => {console.log(error)})
// // setTimeout(() => {
// //     console.log("Replying");
// // console.log(sub.reply("Abc").then(comment => console.log(comment.body)))
// // }, (5 * 1000));

