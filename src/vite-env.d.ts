/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    // more env variables...
    readonly VITE_APP_VERSION: string;
    readonly VITE_APP_ENV: string;
    readonly VITE_API_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}