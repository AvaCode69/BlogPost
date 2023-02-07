import React from "react";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import PostList from "./PostList";
import { APIKEY, PostUrl } from "./Constants";
import BlogPostApi from "../service/BlogPostApi";
import fetchAllPost from "../service/fetchAllPost";

function Blog() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAllPost()
      .then((result) => {
        setpageCount(result.total);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    BlogPostApi(currentPage).then((result) => {
      setItems(result.data);
    });
  }, [currentPage]);

  const handlePageClick = (num) => {
    setCurrentPage(num.selected + 1);
  };
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

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-prev-link"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-next-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Blog;
