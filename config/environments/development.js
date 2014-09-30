module.exports = {
    port: 9365,
    environment: 'development',

    //auth policy configuration ==============================
    authPolicy : {

        //endpoint configuration ======================================
        endpoint: {
            host: 'http://mc.dev.nationalgeographic.com',
            port: 8000,
            path: '/_membercenter/header/session-auth/?session_id=%s',
            sessionCookie: 'mmdbsessionid'
        },
    },

    adapters: {

        neo4j: {
            protocol: 'http://',
            port: 7474,
            host: 'localhost',
            base: '/db/data/',
        },
        redis: {
            port: 6379,
            host: 'localhost',
            // db: 'cache'
        }
    },

    sockets: {
        adapter: 'redis',
        host: '127.0.0.1',
        port: 6379,
        db: 'sails',
    },

    session: {
        adapter: 'redis',
        host: 'localhost',
        port: 6379,
        db: 0,
        pass: '',
        prefix: 'sess',
        secret: '94c42bc4439e1fb0fae21bbc85b9f12d04c4177d9f1b9346ccba4dd441dbfd52'
    }
};