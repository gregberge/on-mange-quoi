var CronJob = require('cron').CronJob,
pollEmailProcess = require('./processes/poll-email'),
resultEmailProcess = require('./processes/result-email'),
pollJob = new CronJob('0 11 * * *', pollEmailProcess.exec),
resultJob = new CronJob('0 12 * * *', resultEmailProcess.exec);

pollJob.start();
resultJob.start();