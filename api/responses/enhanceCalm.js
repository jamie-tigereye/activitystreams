 /*
 * 420 (Enhance your calm) Handler
 *
 * Usage:
 * return res.enhanceCalm();
 * return res.enhanceCalm(dataResponse);
 * return res.enhanceCalm(dataResponse, logMessage);
 *
 * e.g.:
 * ```
 * return res.enhanceCalm();
 */
var util = require('util');

module.exports = function enhanceCalm (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    var d = new Date();
    var response = util.format('[%s] %s %s - %s %s %d - ', d.toLocaleString(), req.options.controller, req.options.action, req.method, req.url, 420);

    // Set status code
    res.status(420);

    // Log error to console
    if (err !== undefined) {
      Logger.error(response, err);
    }
    else Logger.error(response);

    res.json(data);
};
