/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var request = require('request');
var https = require('https');
var util = require('util');

module.exports = function(req, res, next) {
    /**
     * This is the generic Auth policy function that well take session Cookie and an endpoint
     * and will send each requset to the endpoint to authentication
     * This works like any other sails policy
     * http://sailsjs.org/#!documentation/policies
     */


    //grab sessionCooke from config
    sessionCookie = sails.config.authPolicy.endpoint.sessionCookie;

    if (!req.cookies[sessionCookie]) {

        return res.send(401, 'Not Authorized Noob');
    }

    //checks to see if post request contains actor.aid
    if (req.method === 'POST') {
        userId = ((req.body.actor || {}).aid || null);

        if (userId === null) {
            return res.send(400, 'Bad Request');
        }
    }

    // checks if DEL request contains actor_id in url params
    //if(req.method === 'DELETE') {
        //userId = req.param('actor_id') || null;

        //if (userId === null) {
            //return res.send(400, 'Bad Request');
        //}
    //}

    // grab the cookie name used to verify a session
    var options = {
        timeout: 2000,
        url: sails.config.authPolicy.endpoint.host + ":" + sails.config.authPolicy.endpoint.port + util.format(sails.config.authPolicy.endpoint.path, req.cookies[sessionCookie]),
        secureProtocol: 'SSLv3_method'
    };

    //request going out to the endpoint specificed
    var reqreq = request.get(options, function(err, response, body) {
        //check auth service statusCode
        if(response.statusCode == 404) {
            return res.send(404, 'Auth is 404');
        }

        var jsonBody = JSON.parse(body);
        if (jsonBody.userId) {
            return next();
        }
        return res.send(401, 'Not Authorized Noob!!!!!');
    });

    //basic error handling
    reqreq.on('error', function(err) {
        return res.send(400, 'Bad Request to Auth Service');
    });
};
