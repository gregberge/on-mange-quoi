var CronJob = require('cron').CronJob,
pollEmailProcess = require('./processes/poll-email'),
resultEmailProcess = require('./processes/result-email'),
pollJob = new CronJob('0 11 * * *', pollEmailProcess.exec);

pollJob.start();

resultEmailProcess.exec();