import { useState, useEffect } from 'react';
import './App.css';
import FormatPosts from "./components/FormatPosts";
import { Props } from "./components/FormatPosts";

interface Props2 {
  id: number;
  title: string | undefined;
  post: string
};

function App() {

  const [posts, setPosts] = useState<Props[]>([]);
  const [newResponse, setNewResponse] = useState<Response>();
  const [displayedPost, setDisplayedPost] = useState<Props2 | null>();

  const displayPosts = async () => {
    try {
      const res = await fetch("http://localhost:4000/");
      setPosts(await res.json());
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleInput = async (e: any) => {
    e.preventDefault();
    try {
      const title = e.target.elements[0].value;
      const post = e.target.elements[1].value;
      const resOfPost = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, post}),
      });
      setNewResponse(resOfPost);
    }
    catch (err) {
      console.error(err.message)
    }
  }

  const deletePost = async (id: number) => {
    try {
      const resOfDelete = await fetch("http://localhost:4000/", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id}),
      });
      setNewResponse(resOfDelete);
      setDisplayedPost(null);
    }
    catch (err) {
      console.error(err.message)
    }
  }

  const showPost = ({id, title, post}: Props2) => {
    setDisplayedPost({id, title, post})
  }

  useEffect (() => {
    console.log('hey')
    displayPosts()
  }, [newResponse]);

  return (
  
    <>
      
      <form id="usrform" onSubmit={(e) => handleInput(e)}>
        Title: <input type="text" name="title" />
        <br />
        Post: <textarea name="post" form="usrform" placeholder="Enter text here..." required={true}></textarea>
        <br />
        <input type="submit" />
      </form>
      <br />
      {console.log(posts)}
      {posts.map(({id, title, post}) => {
        return (
          <div>
          <button onClick = {() => showPost({id, title, post})}>{title ? title : `(No title - post ${id})`}</button>
          <br />
          </div>
        )}
      )}
      <div>
      { displayedPost && <FormatPosts 
        id={displayedPost.id}
        title={displayedPost.title}
        post={displayedPost.post}
        deletePost={deletePost} /> }
      <br />
      </div>

    </ >
  );
}

export default App;
