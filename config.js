//contains configuration for in app elements
module.exports = {
    HOST:'http://localhost:3000',
    /**
        Databases configuration
        //'mongodb://localhost:27017/instagram'
    */
    databases: {
        mongo: {
            instagram: 'mongodb://heroku_qvp5t1rc:qd708q70clv7justdv5uaf54i@ds161069.mlab.com:61069/heroku_qvp5t1rc'  
        }
    }
}