// @ts-ignore

namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        MONGO_DB_HOST: string;
        MONGO_DB_NAME: string;
        MONGO_DB_USER: string;
        MONGO_DB_PASS: string;
        MONGO_DB_AUTH_SOURCE: string;
        MONGO_ACCESS_JWT_KEY: string;
        DATABASE_URL: string;
    }
}