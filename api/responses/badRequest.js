/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(dataResponse);
 * return res.badRequest(dataResponse, logMessage);
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Bad Request',
 *   'Authentication policy: userId is null'
 * );
 * ```
 */
var util = require('util');

module.exports = function badRequest(data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    var d = new Date();
    var response = '';

    if (req.options.action) {
        response = util.format('[%s] %s %s - %s %s %d - ', d.toLocaleString(), req.options.controller, req.options.action, req.method, req.url, 400);
    }
    else {
        response = util.format('[%s] - %s %s %d - ', d.toLocaleString(), req.method, req.url, 400);
    }


    // Set status code
    res.status(400);

    // Log error to console
    if (err !== undefined) {
      Logger.error(response, err);
    }
    else Logger.error(response);

    res.json(data);
};

