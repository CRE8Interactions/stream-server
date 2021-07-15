const cron = require('node-cron');
const moment = require('moment');
const ffmpeg = require('fluent-ffmpeg');

const task = cron.schedule('44 15 * * *', () => {
    console.log('Boom')
    let streamKey = '05ad598b-7162-46be-a88b-7ba6e9f8d9bd'

    const video = ffmpeg()
        .input('https://videos-for-live.nyc3.digitaloceanspaces.com/final.mp4')
        .format('flv')
        .audioCodec('libmp3lame') // Audio Codec
        .videoCodec('libx264')
        .on('start', function(commandLine) {
            console.log('Query : ' + commandLine);
        })
        .on('error', function(err) {
            console.log('Error: ' + err.message);
        })
        .output('rtmps://rtmp-global.cloud.vimeo.com:443/live/' + streamKey, function(stdout, stderr) {
            console.log('Convert complete' +stdout);
        })
        .run();
}, {
    scheduled: true,
    timezone: 'America/New_York'
});

const cancelTask = () => {
    task.stop()
}



// const cancelTask = task.stop();
task.start();