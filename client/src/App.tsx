import React from 'react';
import './App.css';
import PostCreate from './component/PostCreate';
import PostList from './component/PostList';

function App() {
  return (
    <div className="App container">
      <h1>Create Post</h1>
      <PostCreate/>
      <hr/>
      <h1>Posts</h1>
      <PostList/>
    </div>
  );
}

export default App;
