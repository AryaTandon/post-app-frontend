import { useState, useEffect } from 'react';
import './App.css';
import { config } from "dotenv";
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
  const [postEditor, setPostEditor] = useState<boolean>(false);

  const displayPosts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL!);
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
      const resOfPost = await fetch(process.env.REACT_APP_BACKEND_URL!, {
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

  const showPostEditor = () => {
    setPostEditor(!postEditor);
  } 

  const savePost = async (id: number, editedTitle: string, editedPost: string) => {
    try {
      const resOfUpdate = await fetch(process.env.REACT_APP_BACKEND_URL!, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, editedTitle, editedPost}),
      });
      setNewResponse(resOfUpdate);
      setPostEditor(false);
      const newRows = await resOfUpdate.json();
      setDisplayedPost({id: newRows.id, title: newRows.title, post: newRows.post})
    }
    catch (err) {
      console.error(err.message)
    }
  }

  const deletePost = async (id: number) => {
    try {
      const resOfDelete = await fetch(process.env.REACT_APP_BACKEND_URL!, {
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
    setDisplayedPost({id, title, post});
    setPostEditor(false);
  }

  useEffect (() => {
    console.log('hey')
    displayPosts()
  }, [newResponse]);

  return (
  
    <>
      <form className="form_top" id="usrform" onSubmit={(e) => handleInput(e)}>
       <h1>Create your Post!</h1>
        <input className="form_input"type="text" name="title" placeholder="Title of Post" />
        <textarea className="form_text_area" name="post" form="usrform" placeholder="Enter text here..." required={true}></textarea>
        <input className="form_submit"type="submit" />
      </form>
      
      <div className="mapped_flexbox_holder">
      <h1> All Posts</h1>
      <div className="mapped_flexbox">
      {posts.map(({id, title, post}) => {
        return (
          <div className='mapped_holder' key={id}>
          <button className="action_button" onClick = {() => showPost({id, title, post})}>{title ? title : `(No title - post ${id})`}</button>
          <br />
          </div>
        )}
      )}
      </div>
      </div>
      <div>
      { displayedPost && <FormatPosts 
        id={displayedPost.id}
        title={displayedPost.title}
        post={displayedPost.post}
        postEditor={postEditor}
        savePost={savePost}
        showPostEditor={showPostEditor}
        deletePost={deletePost} /> }
      <br />
      </div>

    </ >
  );
}

export default App;
