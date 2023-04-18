declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_USER: string
            DATABASE_HOST: string
            DATABASE_NAME: string
            DATABASE_PASSWORD: string
            DATABASE_PORT: `${number}`
        }
    }
}

export {}
