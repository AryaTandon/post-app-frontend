import React from 'react';
import './App.css';

function App() {

  const handleInput = async (e: any) => {
    e.preventDefault();
    try {
      const title = e.target.elements[0].value;
      const post = e.target.elements[1].value;
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, post}),
      });
    }
    catch (err) {
      console.error(err.message)
    }
  }

  return (
  
    <div className="App">
      
      <form id="usrform" onSubmit={(e) => handleInput(e)}>
        Title: <input type="text" name="title" />
        <br />
        Post: <textarea name="post" form="usrform" placeholder="Enter text here..." required={true}></textarea>
        <br />
        <input type="submit" />
      </form>

    </div>
  );
}

export default App;
