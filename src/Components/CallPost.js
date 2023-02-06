import { useEffect, useState } from "react";
import postImg from "../images/postImg.jpg";
import React from "react";

function CallPost() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(4);
  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("token", "pj11daaQRz7zUIH56B9Z");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch("https://frontend-case-api.sbdev.nl/api/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setpageCount(result.total);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("token", "pj11daaQRz7zUIH56B9Z");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    let res = fetch(
      "https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=50",
      // "https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=30&sortBy=title&sortDirection=asc&searchPhrase=new post&categoryId=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPost(result.data);
      })

      .catch((error) => {
        setError({
          error: true,
        });
      });
  }, []);

  return (
    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12   post-list">
      {post.slice(0, visible).map((item, index) => (
        <div
          className="card  mb-4 Regular shadow"
          style={{ width: "18rem" }}
          key={item.id}
        >
          <img src={postImg} className="card-img-top" alt={item.title} />
          <div className="date-cat">
            {" "}
            <p className="cat-post">{item.category.name}</p>
            <p className="post-date">{item.created_at.slice(0, 10)}</p>
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.content.substring(0, 200)}</p>
          </div>
        </div>
      ))}
      {visible < pageCount && (
        <button
          onClick={() => setVisible(visible + 4)}
          type="button"
          className="load-more"
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default CallPost;
