# Track when Twitch streams go online

## Quickstart

Install: `npm install --save @matsukky/twitchtracker`

Get a Client ID & Client Secret. See Step 1 of the [Twitch API Introduction](https://dev.twitch.tv/docs/api/#introduction) on how to do this.

```js
const { TwitchOnlineTracker } = require('@matsukky/twitchtracker')
const tracker = new TwitchOnlineTracker({
  client_id: "your twitch app client id", // used for api requests
  client_secret: "your twitch app client secret", // used for connect to the api
  track: ['channel1', 'channel2'], // all the channels you want to track
  pollInterval: 30, // how often in between polls in seconds. default 30
  debug: false, // whether to debug to console
  start: true // whether to start immediately. if you don't use this, you must call.
})

// Listen to live event, it returns StreamData
tracker.on('live', streamData => {
  console.log(`${streamData.user_name} just went live!`)
})

// Listen to live end, only returns channel name
tracker.on('offline', function (channel) {
  console.log(`${channel} has gone offline.`)
})

// Make sure you listen for errors
tracker.on('error', error => console.error)
```

**NOTE:** If you don't pass `start: true` in the options, you must call `tracker.start()` to start polling.

## TwitchOnlineTracker API

### const tracker = new TwitchOnlineTracker(options: [TwitchOnlineTrackerOptions]())

Create a new `TwitchOnlineTracker` instance. It takes a TwitchOnlineTrackerOptions interface:

- `client_id` *string* **required** Your Twitch app's client id
- `client_secret` *string* **required** Your Twitch app's client secret
- `track` *string[]* An array of the channels you wish to track on startup
- `pollInterval` *number* The amount of time in seconds between polls
- `debug` *boolean* If true, output debug information to console
- `start` *boolean* If true, start polling immediately

### tracker.start()

Starts polling the Twitch API for stream changes.

### tracker.stop()

Stops polling the Twitch API for stream changes.

### tracker.track(usernamesToTrack: string[])

Adds more streams to track. `usernamesToTrack` expects an array of strings.

### tracker.untrack(usernamesToUntrack: string[])

Stops tracking streams. `usernamesToTrack` expects an array of strings.

### tracker.on('live', function (streamData: [StreamData]()) { })

When a stream is found to be live, fires this event. The callback function provides a StreamData parameter.

Example:
```javascript
tracker.on('live', function (streamData) {
  console.log(`${streamData.user_name} has started streaming with the title ${streamData.title} at https://twitch.tv/${streamData.user_name} for ${streamData.viewer_count} viewers!`)
})
```

### tracker.on('offline', function (channelName: string) { })

When a stream is found to have gone offline, fires this event. The callback function provides a string.

Example:
```javascript
tracker.on('offline', function (channel) {
  console.log(`${channel} has gone offline.`)
})
```

### tracker.on('error', function (error) { })

Fires this event on error. Make sure you capture this event.

Example:
```javascript
tracker.on('error', function (error) {
  throw Error(error)
})
```
