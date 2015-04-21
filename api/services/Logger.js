var SysLogger = require('ain2');

customLogger = new SysLogger({tag: sails.config.tagSyslog, facility:'local3'});

customLogger.setMessageComposer(function(message, severity){
    sails.log(message.replace(/\r?\n/g,' '));
    return new Buffer(this.hostname + ' ' + this.tag + '[' + process.pid + ']:' + message.replace(/\r?\n/g,' '));
});

customLogger.info('Logger ready');

module.exports = customLogger;
