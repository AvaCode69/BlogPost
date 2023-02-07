import { useEffect, useState } from "react";
import React from "react";
import PostList from "./PostList";
import { APIKEY, PostUrl } from "./Constants";
import HomePostApi from "../service/HomePostApi";
import fetchAllPost from "../service/fetchAllPost";

function HomePost() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(false);
  const [visible_post, setVisible_post] = useState(4);
  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
    fetchAllPost()
      .then((result) => {
        setpageCount(result.total);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    HomePostApi()
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
    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 wrap-post ">
      <div className="post-list mt-4">
        {post.slice(0, visible_post).map((item, index) => (
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

      {visible_post < pageCount && (
        <button
          onClick={() => setVisible_post(visible_post + 4)}
          type="button"
          className="submit-btn"
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default HomePost;
