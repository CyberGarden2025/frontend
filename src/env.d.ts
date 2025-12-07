interface ImportMetaEnv {
    readonly VITE_AGW_HOST: string;
    readonly VITE_AGW_PORT: string;
    readonly VITE_FIREBASE_VAPID_KEY?: string;
    readonly VITE_DEFAULT_USER_ID?: string;
    readonly VITE_KC_URL: string;
    readonly VITE_KC_REALM: string;
    readonly VITE_KC_USER: string;
    readonly VITE_AUTH_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
