import React, { Component } from "react";
import httpService from "./services/httpService";
import config from "./config.json";

import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    console.log("component mounted");
    const response = await httpService.get(config.apiEndpoint);
    console.log(response);
    this.setState({ posts: response.data });
  }

  handleAdd = async () => {
    console.log("Add pressed!");
    const obj = { title: "title", body: "body" };
    const response = await httpService.post(config.apiEndpoint, obj);
    console.log(response);
    const posts = [response.data, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "updated";
    console.log("Update", post);
    const response = await httpService.put(
      config.apiEndpoint + "/" + post.id,
      post
    );
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
      await httpService.delete(config.apiEndpoint + "/" + post.id);
    } catch (error) {
      console.log("HANDLE DELETE CATCH BLOCK");

      if (error.response && error.response.status === 404)
        alert("This post does not exist.");
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
