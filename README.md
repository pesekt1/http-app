# Simple react demo using axios library

## Branches sequence:
- start
- axios-1
- axios-2
- axios-3

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

```javascript

```

```javascript

```

```javascript

```

