# Simple react demo using axios library

## Branches sequence:
- start
- axios-1
- axios-2
- axios-3

## Axios - part 3

Extracting the axios module:

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

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

