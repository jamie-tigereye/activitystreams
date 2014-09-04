module.exports.adapters = {
    "default": "neo4j",
    "disk": {
        "module": "sails-disk"
    },
    "myLocalMySQLDatabase": {
        "module": "sails-mysql",
        "host": "YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS",
        "user": "YOUR_MYSQL_USER",
        "password": "YOUR_MYSQL_PASSWORD",
        "database": "YOUR_MYSQL_DB"
    },
    "neo4j": {
        "module": "sails-neo4j",
        "debug": true,
        "protocol": "http://",
        "port": 7474,
        "host": "localhost",
        "base": "/db/data/"
    }
}