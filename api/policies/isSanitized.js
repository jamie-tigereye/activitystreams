/**
 * isSanitized
 *
 * @module      :: Policy
 * @description :: Check that all params are cypher free
 *                 Returns a 420 "Enhance your calm"
 */

module.exports = function(req, res, next) {
    if (Activity.adapter.query.sanitized(req.params) && Activity.adapter.query.sanitized(req.body)) {
        return next();
    }
    return res.send(420, 'You didn\'t say the magic word!');
};
