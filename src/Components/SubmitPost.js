import { useEffect, useState } from "react";
import CallPost from "./CallPost";
import React from "react";

function SubmitPost() {
  const [title, setTitle] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [post, setPost] = useState([]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var myHeaders = new Headers();
      myHeaders.append("token", "pj11daaQRz7zUIH56B9Z");
      let res = await fetch(
        "https://frontend-case-api.sbdev.nl/api/posts",
        { headers: myHeaders },
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            content: content,
            category_id: category_id,
            image: image,
          }),
          redirect: "follow",
        }
      );
      let resJson = await res.json();
      if (res.status >= 200 && res.status <= 299) {
        setPost("");
        setTitle("");
        setCategory_id("");
        setContent("");
        setImage("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12   form-box  ">
      <h2>Post a blog post</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Title Post
        </label>
        <input
          type="text"
          value={title}
          placeholder="Title"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label for="exampleFormControlInput1" className="form-label mt-3">
          Category number
        </label>
        <input
          type="number"
          min="1"
          max="3"
          value={category_id}
          placeholder="Category Number"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={(e) => setCategory_id(e.target.value)}
        />
        <label for="exampleFormControlInput1" className="form-label mt-3">
          Image Post
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          value={image}
          id="formFile"
          className="form-control"
          onChange={(e) => setImage(e.target.value)}
        />
        <label for="exampleFormControlInput1" className="form-label mt-3">
          Content Post
        </label>
        <textarea
          style={{ height: "40vh" }}
          value={content}
          placeholder="content"
          className="form-control"
          id="exampleFormControlTextarea1"
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          Create post
        </button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default SubmitPost;
