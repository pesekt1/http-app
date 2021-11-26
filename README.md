# Simple react demo using axios library

## Branches sequence:
- start
- axios-1
- axios-2

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



https://axios-http.com/docs/interceptors

```javascript

```

```javascript

```

```javascript

```

```javascript

```






