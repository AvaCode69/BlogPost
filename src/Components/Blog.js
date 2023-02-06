import React from "react";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import PostList from "./PostList";
import { APIKEY, PostUrl } from "./Constants";

function Blog() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 8;
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("token", APIKEY);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(PostUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setpageCount(result.total);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("token", APIKEY);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    const getPost = async () => {
      const res = await fetch(
        `${PostUrl}?page=1&perPage=${limit}&sortDirection=desc`,
        requestOptions
      );

      const result = await res.json();

      setItems(result.data);
    };

    getPost();
  }, [limit]);

  const fetchPost = async (currentPage) => {
    var myHeaders = new Headers();
    myHeaders.append("token", APIKEY);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    const res = await fetch(
      `${PostUrl}?page=${currentPage}&perPage=${limit}&sortDirection=desc`,
      requestOptions
    );
    const result = await res.json();
    return result.data;
  };

  const handlePageClick = async (num) => {
    console.log(num.selected);

    let currentPage = num.selected + 1;

    const postsFormServer = await fetchPost(currentPage);

    setItems(postsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
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
