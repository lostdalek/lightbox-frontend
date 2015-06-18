declare module App.Core {

    interface IStringArray {
        [index: number]: string;
    }

    interface IMedia {
        name?: string;
    }
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
