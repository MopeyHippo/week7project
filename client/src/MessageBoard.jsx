import { useState, useEffect } from "react";
import StuffForm from "./StuffForm";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  async function getPosts() {
    const response = await fetch("http://localhost:8080/posts");
    const data = await response.json();
    setPosts(data);
  }

  async function handleDeletePost(postId) {
    await fetch(`http://localhost:8080/posts/${postId}`, {
      method: 'DELETE'
    });
   
    getPosts();
  }

  return (
    <div>
      <StuffForm />
      <h1></h1>
      {posts.map((post) => {
        return (
          <div key={post.posts_id}>
            <h2>
              {post.posts_title}
              </h2>
              <h3>
              {post.platforms}, {post.tags}
              </h3>
            <p>
              {post.posts_content}
              </p>
              <h3>
              {post.posts_name}
              </h3> 
              <button onClick={() => handleDeletePost(post.posts_id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
