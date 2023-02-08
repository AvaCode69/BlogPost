import React from "react";
import { useEffect, useState } from "react";
import PostList from "../PostList";
import { FetchCountAllPost, FetchPostApi } from "../../service/CallApi";
import Pagination from "./Pagination";

function Blog() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 8;

  useEffect(() => {
    FetchCountAllPost()
      .then((result) => {
        setpageCount(result.total);
      })
      .catch((error) => console.log("error", message));
  }, []);

  useEffect(() => {
    FetchPostApi(currentPage, limit)
      .then((result) => {
        setItems(result.data);
      })
      .catch((error) => setMessage("No Post Available"));
  }, [currentPage]);

  function handlePageClick(num) {
    setCurrentPage(num.selected + 1);
  }
  return (
    <div className="container blog-page pb-4">
      <h1 className="page-title">Blog</h1>
      <div className="col-12  all-post-list">
        {items.map((item) => {
          return (
            <PostList
              title={item.title}
              content={item.content}
              image={item.image}
              created_at={item.created_at}
              id={item.id}
              category_name={item.category.name}
            />
          );
        })}
      </div>
      <p className="text-center pb-3"> {message}</p>
      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
    </div>
  );
}

export default Blog;
