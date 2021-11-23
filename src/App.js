import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

const config = {
  headers: {
    Referer: "https://http-app-react.herokuapp.com/",
  },
};

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const response = await axios.get(apiEndpoint, config);
    console.log(response);
    this.setState({ posts: response.data });
  }

  handleAdd = async () => {
    console.log("Add pressed");
    const obj = { title: "title", body: "body" };
    const response = await axios.post(apiEndpoint, obj, {
      referrerPolicy: "no-referrer-when-downgrade",
    });
    console.log(response);
    const posts = [response.data, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = (post) => {
    console.log("Update", post);
  };

  handleDelete = (post) => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
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
