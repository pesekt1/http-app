# Simple react demo using axios library

## Branches sequence:
- start
- axios


Check promise and response in the console:
```javascript
  async componentDidMount() {
    //pending > resolved (success) or rejected (failure)
    pending > resolved (success) or rejected (failure)
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







