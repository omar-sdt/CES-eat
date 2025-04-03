// @ts-ignore

namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DB_NAME: string;
        DB_USER: string;
        DB_PASS: string;
        DB_AUTH_SOURCE: string;
        ACCESS_JWT_KEY: string;
    }
}