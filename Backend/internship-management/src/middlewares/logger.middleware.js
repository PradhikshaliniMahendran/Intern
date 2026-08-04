const logger = (req, res, next) => {
    console.log('====================================');
    console.log('Request Received');
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log(`Host: ${req.get('host')}`);
    console.log(`User Agent: ${req.get('user-agent')}`);
    console.log('====================================');

    next();
};

module.exports = logger;