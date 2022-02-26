import { createLogger, format, transports } from 'winston'

const timezoned = () => {
    return new Date().toLocaleString('es-ES', {
        timeZone: 'America/Lima'
    });
}

const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp({format: timezoned}),
        format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()} : ${info.message}`)
    ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 3,
            filename: `${__dirname}/../logs/employees-api.log`
        }),
        new transports.Console({
            level: 'debug'
        })
    ]
})

export default logger