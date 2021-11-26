# Simple react demo using axios library

## Axios - part 2

Expeced vs unexpected errors:

- Expected: 404 - not found, 400 - bad request. Client errors. Handling: 
  - Display a specific error message
- Unexpected: network down, server down, database down, bug. Handling: 
  - Log the error.
  - Display a general error message.

https://axios-http.com/docs/handling_errors

Delete method: if error contains a response and the status is 404, the user is accessing a non-existing item... expected error. If the url is wrong there will be no response object and we get unexpected error.
```javascript
  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete(apiEndpoint + "/" + post.id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("This post does not exist.");
      } else {
        console.log("Logging the error", error);
        alert("An unexpected error occured while deleting the post.");
      }
      this.setState({ posts: originalPosts });
    }
  };
```

Simulation of the expected error:
```javascript
await axios.delete(apiEndpoint + "/");
```

Simulation of the unexpected error:
```javascript
await axios.delete("a" + apiEndpoint + "/" + post.id);
```

Axios interceptors: global http error handling

https://axios-http.com/docs/interceptors

If there is an unexpected error (outside 400 range) we log it and send alert to the user. This is done before the try-catch block.

```javascript
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
```

Now in the handleDelete, we only handle the expected error with 404 status. Interceptor will take care of the unexpected errors.
```javascript
  handleDelete = async (post) => {
    ...
    try {
      await axios.delete(apiEndpoint + "/");
    } catch (error) {
      if (error.response && error.response.status === 404) 
        alert("This post does not exist.");
      this.setState({ posts: originalPosts });
    }
  };
```

Test that the interceptor works globally - simulate an error in componentDidMount:
```javascript
  async componentDidMount() {
    const response = await axios.get("a" + apiEndpoint);
```
