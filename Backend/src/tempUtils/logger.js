// logger.js - This is where your logger configuration lives
import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize, printf } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
    timestamp(),
    colorize(),
    printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

// Create a Winston logger
const logger = createLogger({
    level: "info",  // Set the default logging level to 'info'
    format: combine(
        timestamp(),   // Include timestamp in logs
        json()         // Format logs as JSON for file logging
    ),
    transports: [
        // Console transport (colored output)
        new transports.Console({
            format: consoleLogFormat,
        }),
        // File transport (logging to app.log file)
        new transports.File({
            filename: "log/new.log",
            level: 'info',   // Log level for the file transport
            maxsize: 5242880, // 5MB max size per log file before rotating
            maxFiles: 5       // Keep 5 rotated log files before deleting old ones
        }),
    ],
});

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Log the error details
    logger.error("Error", {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
        status: statusCode
    });

    // Send error response to the client
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export { logger, errorHandler };
