import { useEffect, useState } from "react";
import React from "react";
import PostList from "../PostList";
import { FetchCountAllPost, FetchPostApi } from "../../service/CallApi";

function HomePost() {
  const [items, setItems] = useState([]);
  const [visible_post, setVisible_post] = useState(4);
  const [getTotalPage, setGetTotalPage] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    FetchCountAllPost()
      .then((result) => {
        setGetTotalPage(result.total);
      })
      .catch((error) => console.log("error", error));
  }, [visible_post]);

  useEffect(() => {
    FetchPostApi(1, 150)
      .then((result) => {
        setItems(result.data);
      })
      .catch((error) => setMessage("No Post Available"));
  }, []);

  return (
    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 wrap-post ">
      <div className="post-list mt-4">
        {items.slice(0, visible_post).map((item, index) => (
          <PostList
            title={item.title}
            content={item.content}
            image={item.image}
            created_at={item.created_at}
            id={item.id}
            category_name={item.category.name}
          />
        ))}
      </div>
      <p className="text-center pb-3"> {message}</p>

      {visible_post < getTotalPage ? (
        <button
          onClick={() => setVisible_post(visible_post + 4)}
          type="button"
          className="round-btn "
          id="btnTst"
        >
          Load more
        </button>
      ) : (
        <p className="text-center pb-3">No more posts to show</p>
      )}
    </div>
  );
}

export default HomePost;
