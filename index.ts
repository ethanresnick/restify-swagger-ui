import fs = require("fs");
import restify = require("restify");
import swaggerUi = require("swagger-ui-dist");
import stringify = require("serialize-javascript");
import type { plugins, RequestHandler } from "restify";

type Options = {
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

function generateHTML(swaggerDoc: any, opts: Partial<Options> = {}) {
  const {
    customCss = "",
    customJs,
    customfavIcon = false,
    customSiteTitle = "Swagger UI",
    baseURL = ".",

    swaggerOptions = {},
    swaggerUrl,
    swaggerUrls,
  } = opts;

  const isExplorer = opts.explorer || !!swaggerUrls;
  const favIconHtml = customfavIcon
    ? '<link rel="icon" href="' + customfavIcon + '" />'
    : '<link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />' +
      '<link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />';

  // Becuase why use a templating system when you can
  // do (slow, inconsistent) string replacements yourself.
  return fs
    .readFileSync(__dirname + "/index.html.tpl")
    .toString()
    .replace(/{BASEURL}/g, baseURL)
    .replace(
      "<% customCss %>",
      isExplorer
        ? customCss
        : `.swagger-ui .topbar .download-url-wrapper { display: none } ${customCss}`
    )
    .replace("<% favIconString %>", favIconHtml)
    .replace(
      "<% customJs %>",
      customJs ? `<script src="${customJs}"></script>` : ""
    )
    .replace("<% title %>", customSiteTitle)
    .replace(
      "<% swaggerOptions %>",
      stringify({
        swaggerDoc: swaggerDoc || undefined,
        customOptions: swaggerOptions,
        swaggerUrl: swaggerUrl || undefined,
        swaggerUrls: swaggerUrls || undefined,
      })
    );
}

function setup(
  swaggerDoc: any,
  opts?: Options,
  serveStaticOpts?: Partial<plugins.ServeStatic>
) {
  var htmlString = generateHTML(swaggerDoc, opts);
  var staticServer = restify.plugins.serveStatic({
    directory: swaggerUi.getAbsoluteFSPath(),
    appendRequestPath: false,
    ...serveStaticOpts,
  });

  return <RequestHandler>((req, res, next) => {
    if (/(\/|index\.html)$/.test(req.path())) {
      res.writeHead(200, {
        "Content-Length": Buffer.byteLength(htmlString),
        "Content-Type": "text/html",
      });
      res.write(htmlString);
      res.end();
      return;
    } else {
      return staticServer(req, res, next);
    }
  });
}

export { setup, setup as default };
