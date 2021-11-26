import React, { Component } from "react";
import axios from "axios";
import "./App.css";

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
      alert("unexpected error occured.");
    }
    return Promise.reject(error);
  }
);

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    console.log("component mounted");
    const response = await axios.get(apiEndpoint);
    console.log(response);
    this.setState({ posts: response.data });
  }

  handleAdd = async () => {
    console.log("Add pressed!");
    const obj = { title: "title", body: "body" };
    const response = await axios.post(apiEndpoint, obj);
    console.log(response);
    const posts = [response.data, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "updated";
    console.log("Update", post);
    const response = await axios.put(apiEndpoint + "/" + post.id, post);
    console.log(response);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState(posts);
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete("a" + apiEndpoint + "/" + post.id);
    } catch (error) {
      console.log("HANDLE DELETE CATCH BLOCK");

      if (error.response && error.response.status === 404) {
        alert("This post does not exist.");
      } else {
        console.log("Logging the error", error);
        alert("An unexpected error occured while deleting the post.");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
