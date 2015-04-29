/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(dataResponse);
 * return res.ok(dataResponse, logMessage);
 *
 */
var util = require('util');

module.exports = function sendOK (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    var d = new Date();
    var response = util.format('[%s] %s %s - %s %s %d - ', d.toLocaleString(), req.options.controller, req.options.action, req.method, req.url, 200);

    sails.log.info(response, ' Response: ', JSON.stringify(data));
    // Set status code
    res.status(200);

    res.json(data);
};
