
declare module App {

    interface IStringArray {
        [index: number]: string;
    }

    interface ILocale {
        numberFormat?: string;
    }

    interface IConfig {
        locale?: string;
        localisation?: ILocale;
        baseUrl?: string;
        basePath?: string;
        staticPath?: string;
    }
}
