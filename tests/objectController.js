var request = require('request'),
    url = require('url'),
    assert = require('assert'),
    testUtils = require('./utils'),
    http = require('http'),
    server = {};

describe('Test Object Controller  ', function () {
    before(function(done) {
        /** Disable caching. */
        sails.config.cacheEnabled = false;
        done();
    });

    after(function(done) {
        /** Enable caching. */
        sails.config.cacheEnabled = true;
        done();
    });

    describe('Check Object Requests', function () {
        it('GET: object/{appname_model} (getAllObjectsOfType)', function(done) {
            baseUrl.pathname += 'object/photo';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('GET: object/{appname_model}/{id} (getSpecificObject)', function(done) {
            baseUrl.pathname += 'object/photo/10010';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body){
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('GET: object/{appname_model}/{id}/activities (getAllActivitiesByObject)', function (done) {
            baseUrl.pathname += 'object/photo/10010/activities';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('GET: object/{appname_model}/{id}/{verb} (getAllActorsWhoVerbedObject)', function (done) {
            baseUrl.pathname += 'object/photo/10010/FAVORITED';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body){
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('GET: object/{appname_model}/{id}/{verb}/{appname_model} (getSpecificActorTypeWhoVerbedObject)', function(done) {
            baseUrl.pathname += 'object/photo/10010/FAVORITED/user';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();

            });
        });

        it('GET: object/{appname_model}/{id}/{verb}/{appname_model}/{id} (getActivityByObject)', function(done) {
            baseUrl.pathname += 'object/photo/10010/FAVORITED/user/1';
            var apiUrl = url.format(baseUrl);
            request(apiUrl, function (err, response, body) {
                assert.equal(response.statusCode, 200);
                done();

            });
        });
    });

    describe('Check Object DELETE Requests', function () {
        it('DELETE: object/{appname_model}/{id} (deleteSpecificObject) with a valid session', function (done) {
            server = testUtils.fakeServer({code:200, respond:{userId: 1}});
            var requestOptions = testUtils.createRequestOptions('DELETE', '/api/v1/object/app_object/1', '');

            server.on("listening", function() {
                testUtils.makeRequest(requestOptions, function (res) {
                    assert.equal(res.statusCode, 400);
                    server.close(done);
                });
            });
        });

        it('DELETE: object/{appname_model}/{id} (deleteSpecificObject) when the node doesn\'t exist', function (done) {
            server = testUtils.fakeServer({code:200, respond:{userId: 1}});
            var requestOptions = testUtils.createRequestOptions('DELETE', '/api/v1/object/app_object/1', '');

            server.on("listening", function() {
                testUtils.makeRequest(requestOptions, function (res) {
                    assert.equal(res.statusCode, 400);
                    server.close(done);
                });
            });
        });
    });
});
