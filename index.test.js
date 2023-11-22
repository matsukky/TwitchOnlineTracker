require("dotenv").config()
const { TwitchOnlineTracker } = require("./lib/index.js")


const tracker = new TwitchOnlineTracker({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    track: process.env.STREAMS.split(','),
    pollInterval: 30,
    debug: false,
    start: true
  })

  tracker.on('live', streamData => {
    console.log(streamData)
  })

  tracker.on('offline', function (channel) {
    console.log(`${channel} has gone offline.`)
  })

  tracker.on('error', error => console.error)