import React from 'react';
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  state = {
    title: '',
    body: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    Axios.get('/api').then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data received');
      }).catch((error) => {
          console.log(error);
        });
  };



  handleChange = ({ target }) => {
    const { name, value } = target;

    // const target = e.target;

    // const  name = target.name;
    // const value = target.value;

    this.setState({
      [name]: value
    });
  };

  submit = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    Axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    }).then(() => {
      console.log('Data sends to the server');
      this.restUserInputs();
      this.getBlogPost();
    }).catch(() => {
      console.log('Internal server error');
    });
  };

  restUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

  displayPosts = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  render() {
    console.log('State: ', this.state);
    return (
      <div className="App">
        <h3>Add Posts</h3>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input type="text" name="title" value={this.state.title} placeholder="Enter Title" onChange={this.handleChange}/>
          </div>
          <div className="form-input">
            <textarea name="body" cols="30" rows="10" placeholder="Enter Body" value={this.state.body} onChange={this.handleChange}></textarea>
          </div>
          <button>Submit</button>
        </form>
        <div className="blog-">
          {this.displayPosts(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
