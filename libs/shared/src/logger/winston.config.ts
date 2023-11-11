import * as winstonMongoDB from 'winston-mongodb';
import * as winston from 'winston';

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, context, trace }) => {
        return `${timestamp} [${context}] ${level}: ${message}${
          trace ? `\n${trace}` : ''
        }`;
      })
    )
  }),

  new winstonMongoDB.MongoDB({
    level: 'error',
    db: process.env.MONGO_LOG,
    options: {
      useUnifiedTopology: true
    },
    collection: 'logs',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  })
];

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports
});
