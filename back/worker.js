var CronJob = require('cron').CronJob,
pollEmailProcess = require('./processes/poll-email'),
resultEmailProcess = require('./processes/result-email'),

// every day at 11:00 AM
pollJob = new CronJob('0 11 * * *', pollEmailProcess.exec),

// every day at 12:00 AM
resultJob = new CronJob('0 12 * * *', resultEmailProcess.exec);

pollJob.start();
resultJob.start();