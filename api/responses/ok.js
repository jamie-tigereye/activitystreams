/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(dataResponse);
 * return res.ok(dataResponse, logMessage);
 *
 */

module.exports = function sendOK (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Log error to console
    Logger.info('Sending 200 ("OK") response: ', JSON.stringify(data));

    // Set status code
    res.status(200);

    res.json(data);
};
