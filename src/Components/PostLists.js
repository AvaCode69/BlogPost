import React from "react";
import postImg from "../images/postImg.jpg";
function PostList(props) {
  return (
    <div
      className="card  mb-4 Regular shadow border-0 rounded-0"
      key={props.id}
    >
      <img src={postImg} className="card-img-top rounded-0" alt={props.title} />
      <div className="date-cat">
        {" "}
        <p className="cat-post">{props.category_name}</p>
        <p className="post-date">{props.created_at.slice(0, 10)}</p>
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content.substring(0, 140)}</p>
      </div>
    </div>
  );
}

export default PostList;
