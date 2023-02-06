import React from "react";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import postImg from "../images/postImg.jpg";

function Blog() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 8;
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
    const getComments = async () => {
      const res = await fetch(
        `https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=${limit}&sortDirection=desc`,
        requestOptions

        //   `http://localhost:3004/comments?_page=1&_limit=${limit}`
        // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );

      const result = await res.json();
      // console.log(Math.ceil(total/12));
      //   console.log("total " + total);
      setItems(result.data);
    };

    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    var myHeaders = new Headers();
    myHeaders.append("token", "pj11daaQRz7zUIH56B9Z");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    const res = await fetch(
      `https://frontend-case-api.sbdev.nl/api/posts?page=${currentPage}&perPage=${limit}&sortDirection=desc`,
      requestOptions
    );
    const result = await res.json();
    return result.data;
  };

  const handlePageClick = async (num) => {
    console.log(num.selected);

    let currentPage = num.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };
  return (
    <div className="container blog-page pb-4">
      <h1 className="page-title">Blog</h1>
      <div className="col-12  all-post-list">
        {items.map((item) => {
          return (
            <div
              className="card  mb-4 Regular shadow"
              style={{ width: "16rem" }}
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
