/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(dataResponse);
 * return res.serverError(dataResponse, logMessage);
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */

module.exports = function serverError (data, err) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(500);

    // Log error to console
    if (err !== undefined) {
      Logger.error('Sending 500 ("Server Error") err: \n', JSON.stringify(err));
    }
    else Logger.error('Sending empty 500 ("Server Error")');

    res.json(data);
};

