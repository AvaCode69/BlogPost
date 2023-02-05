import React from "react";
import postImg from "../images/postImg.jpg";

const Post = ({ item }) => (
  <div className="card  mb-4" style={{ width: "18rem" }}>
    <img src={postImg} className="card-img-top" alt={item.title} />
    <div className="card-body">
      <h5 className="card-title">{item.title}</h5>
      <p className="card-text">{item.content}</p>
    </div>
  </div>
);

export default Post;
