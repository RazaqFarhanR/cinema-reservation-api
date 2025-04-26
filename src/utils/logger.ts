import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat
    ),
  }),
  new winston.transports.File({
    filename: 'logs/app.log',
    level: 'info',
    format: logFormat,
  }),
];

if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: 'logs/production.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.json()
      ),
    })
  );
}

const logger = winston.createLogger({
  level: 'info',
  transports,
});

export default logger;
