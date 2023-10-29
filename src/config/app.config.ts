import { env } from 'process';

export const envConfiguration=() =>({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    poprt: process.env.PORT || 3002,
    default_limits: +process.env.DEFAULT_LIMIT || 10,
})