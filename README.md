# Simple react demo using axios library

## Axios - part 1:

Connect to jsonplaceholder and get some data.

Check promise and response in the console:
```javascript
async componentDidMount() {
  //pending > resolved (success) or rejected (failure)
  const promise = axios.get("https://jsonplaceholder.typicode.com/posts");
  console.log(promise); // see PromiseStatus and PromiseResult.data
  const response = await promise;
  console.log(response);
}
```

Simplify getting the response and set state.posts:
```javascript
async componentDidMount() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  this.setState({ posts: response.data });
}
```
You should see all the data showing on our web page.

Add button: Save new data as the first record:
```javascript
handleAdd = async () => {
  const obj = { title: "title", body: "body" };
  const response = await axios.post(apiEndpoint, obj);
  const posts = [response.data, ...this.state.posts];
  this.setState({ posts });
};
```

Updating: we can use post or patch method:
```javascript
handleUpdate = async (post) => {
  post.title = "updated";
  const response = await axios.put(apiEndpoint + "/" + post.id, post);
  const posts = [...this.state.posts];
  const index = posts.indexOf(post);
  posts[index] = { ...post };
  this.setState(posts);
};
```

Deleting data:
```javascript
handleDelete = async (post) => {
  console.log("Delete", post);
  await axios.delete(apiEndpoint + "/" + post.id);
  const posts = this.state.posts.filter((p) => p.id !== post.id);
  this.setState({ posts });
};
```

Optimistic updates: First update the DOM and then call the server. It will be much faster.

This code is simulating an error on the server side. It will revert the state to the original posts.
```javascript
handleDelete = async (post) => {
  const originalPosts = this.state.posts;
  console.log("Delete", post);

  const posts = this.state.posts.filter((p) => p.id !== post.id);
  this.setState({ posts });

  try {
    await axios.delete(apiEndpoint + "/" + post.id);
    throw new Error(""); //error simulation
  } catch (error) {
    alert("deleting a post failed.");
    this.setState({ posts: originalPosts });
  }
};
```
