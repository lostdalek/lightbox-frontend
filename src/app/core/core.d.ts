declare module App.Core {
    interface ILocale {
        numberFormat?: string;
    }

    interface IConfig {
        locale?: string;
        localisation?: ILocale;
        baseUrl?: string;
        basePath?: string;
        assetsPath?: string
    }
}
