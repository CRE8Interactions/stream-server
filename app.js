const cron = require('node-cron');
const moment = require('moment');
const ffmpeg = require('fluent-ffmpeg');

const task = cron.schedule('55 14 * * *', () => {
    console.log('Boom')
    let streamKey = 'f85f9340-42f2-4f9d-9e67-d8feff41b218'

    ffmpeg()
        .input('https://videos-for-live.nyc3.digitaloceanspaces.com/final.mp4')
        .format('flv')
        .videoCodec('libx264')
        .audioCodec('aac')
        .fps(25)
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