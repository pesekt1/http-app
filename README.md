# Simple react demo using axios library

Create a new app: create-react-app
install dependencies:

yarn add bootstrap

yarn add axios

use bootstrap: in index.js:
```javascript
import "bootstrap/dist/css/bootstrap.css";
```

in index.css: add padding 30px:
```css
body {
  margin: 0;
  padding: 30px;
```

rewrite App.js like this:
```javascript
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  handleAdd = () => {
    console.log("Add");
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
```








