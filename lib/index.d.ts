import restify = require("restify");
import type { plugins } from "restify";
declare type Options = {
    explorer?: boolean;
    customCss?: string;
    customJs?: string;
    customfavIcon?: string;
    customSiteTitle?: string;
    baseURL?: string;
    swaggerOptions?: object;
    swaggerUrl?: string;
    swaggerUrls?: any;
};
declare function setup(swaggerDoc: any, opts?: Options, serveStaticOpts?: Partial<plugins.ServeStatic>): restify.RequestHandler;
export { setup, setup as default };
