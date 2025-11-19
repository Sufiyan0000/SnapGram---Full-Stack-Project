import React, { useState } from "react";
import api from "../api";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

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
      })
      .catch((e) => alert(e));
    getNotes();
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note Created");
        else alert("failed to create note");
      })
      .catch((e) => alert(e));
    getNotes();
  };

  return <div>Home</div>;
};

export default Home;
