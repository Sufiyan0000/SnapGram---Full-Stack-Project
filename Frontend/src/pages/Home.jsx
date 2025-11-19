import React, { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes()
  },[]);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((e) => alert(e));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted");
        else alert("Note to be deleted Not Found!");
        getNotes();
      })
      .catch((e) => alert(e));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note Created");
        else alert("failed to create note");

        setContent("")
        setTitle("")

        getNotes()
      })
      .catch((e) => alert(e));
  };

  return (
    <div className="w-full h-auto overflow-hidden">
      <div className=" mx-auto">
        <div>
          <h1 className="text-5xl text-center">Notes</h1>
        </div>
        
        <div className="w-screen mt-4 gap-3 md:flex flex-wrap overflow-hidden">
          {notes.map((note) => (
            <div className="bg-neutral-100 w-90 mt-4 mx-auto rounded-2xl">
              <Note note={note} onDelete={deleteNote} key={note.id} />
            </div>
          
        ))}
        </div>
        
      </div>
      <h2 className="text-center mt-10 text-3xl">Create Note</h2>
      <form className="w-80 mx-auto mt-10 shadow-2xl p-7 rounded-xl"
      onSubmit={createNote}
      >
        <label htmlFor="title" className="text-xl">Title : </label>
        <br />
        <input type="text" value={title} name="title" id="title" 
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Hit Gym"
        className="border-2 border-neutral-100 mb-3 mt-2 w-full p-2"
        />
        <br />

        <label htmlFor="content">Content</label>
        <br />
        <textarea value={content} name="content" id="content" 
        onChange={(e) => setContent(e.target.value)}
        placeholder="Go to Gym @ 7pm"
        className="border-2 border-neutral-100 mb-3 mt-2 w-full p-2"
        />
        <br />
        <button type="submit" className="bg-blue-600 text-white px-2 py-2 w-full hover:cursor-pointer">Add Note</button>
      </form>
    </div>
  );
};

export default Home;
