const { createLogger, format, transports } = require('winston');


const logger = createLogger({
    level: 'info',
    format: format.simple(),
        
    /*format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),*/
    //defaultMeta: { service: 'your-service-name' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.File({ filename: 'error.log', level: 'error', json: false }),
        new transports.File({ filename: 'combined.log' })
    ]
});

module.exports = logger;
