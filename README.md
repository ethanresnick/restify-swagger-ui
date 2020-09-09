# Swagger UI Restify

Adds middleware to your restify app to serve the Swagger UI bound to your Swagger document. This acts as living documentation for your API hosted from within your app.

Swagger version is pulled from npm module swagger-ui-dist. Please use a lock file or specify the version of swagger-ui-dist you want to ensure it is consistent across environments.

## Usage

Install using npm:

```bash
$ npm install --save swagger-ui-restify
```

Restify setup `app.js`

```javascript
const restify = require("restify");
const app = restify.createServer();
const swaggerUi = require("swagger-ui-restify");
const swaggerDocument = require("./swagger.json");

// options are optional; see below.
// If your swagger doc is in yaml, not json, you can convert it with yamljs.
const options = {};
const serveSwagger = swaggerUi(swaggerDocument, options);

app.get(/\/api-docs\/+.*/, serveSwagger);
app.get("/api-docs", serveSwagger);
```

Open http://`<app_host>`:`<app_port>`/api-docs in your browser to view the documentation.

### Supported options

````ts
{
  // By default the Swagger Explorer bar is hidden.
  // Use 'explorer: true' to display it
  explorer?: boolean,

  // Custom options, e.g. validatorUrl, that will be
  // passed through to the SwaggerUi client.
  swaggerOptions?: any,

  // To load your swagger from a url instead of passing in a document,
  // call `swaggerUi` with`null` as the first parameter, and then pass
  // the relative or absolute URL of your swagger spec as this option.
  swaggerUrl? string,

  // Options for customizing the Swagger UI HTML.

  // raw CSS, e.g. .swagger-ui .topbar { display: none }
  customCss?: string,

  // absolute or relative url of a custom script to include on th page,
  // e.g. "/custom.js"
  customJs: string,

  // Url prefix used in the html to refer to all static assets.
  // Defaults to "." and can usually be left as is.
  baseURL?: string,

  // Extras
  customSiteTitle?: string,
  customfavIcon?: string
}
```

## Requirements

- Node v10 or above
- Restify 5 or above

## Testing

- Install phantom
- `npm install`
- `npm test`
````
