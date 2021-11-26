# Simple react demo using axios library

## Axios - part 3

### Extracting the axios module:

/services/httpService.js:
```javascript
import axios from "axios";

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("INTERCEPTOR CALLED");

    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log("Logging the error", error);
      alert("unexpected error occured.");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
```

in App.js we import this service and use the get,post,put,delete methods:
```javascript
import httpService from "./services/httpService";
...
await httpService.delete(apiEndpoint + "/" + post.id);
```

### extract configuration:

Create a config.json file:
```json
{
  "apiEndpoint": "https://jsonplaceholder.typicode.com/posts"
}
```

in App.js import config:
```javascript
import config from "./config.json";
...
const response = await httpService.get(config.apiEndpoint);
```

### Displaying Toast notifications:

install react-toastify package

in App.js import ToastContainer and ReactToastify.css
```javascript 
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
```

in render method add the ToastContainer - this will be the placeholder for the messages from toastify:
```javascript
render() {
  return (
    <React.Fragment>
      <ToastContainer />
```

Instead of alert, we can use toast.error:
```javascript
...
if (error.response && error.response.status === 404)
  toast.error("This post does not exist.");
```

The same can be done in httpService:
```javascript
import { toast } from "react-toastify";
...
if (!expectedError) {
  toast.error("unexpected error occured.");
```

We can also use toast as a function:
```javascript
toast("unexpected error occured.");
```

### Logging errors
For production we need to log the errors. We cannot use console.log()...

Third-party logging service: https://sentry.io/

Create an account, start a new project and follow the instructions...
https://docs.sentry.io/platforms/javascript/

install dependencies:

- yarn add @sentry/react 
- yarn add @sentry/tracing
- yarn add @sentry/browser

in index.js:
```javascript
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://ab4b5d41ce82498687cfab8a4df4ee08@o345327.ingest.sentry.io/6082573",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
```
This will log the unhandled errors - like calling a non-existing function.


Loggging the unexpected errors which we are handling by the axios interceptors: https://docs.sentry.io/platforms/javascript/usage/

httpService:
```javascript
import * as Sentry from "@sentry/browser";
...
if (!expectedError) {
  Sentry.captureException(error);
```

Extracting the logging service: 

services/logService.js:
```javascript
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://ab4b5d41ce82498687cfab8a4df4ee08@o345327.ingest.sentry.io/6082573",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logService = { init, log };
export default logService;
```

index.js:
```javascript
import logService from "./services/logService";
logService.init();
```

httpService:
```javascript
import logService from "./logService";
...
if (!expectedError) {
  logService.log(error);
```
