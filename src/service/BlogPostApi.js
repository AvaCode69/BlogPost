import React from "react";
import { APIKEY, PostUrl } from "../Components/Constants";

async function BlogPostApi(currentPage) {
  var myHeaders = new Headers();
  myHeaders.append("token", APIKEY);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const response = await fetch(
    `${PostUrl}?page=${currentPage}&perPage=8&sortDirection=desc`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
}
export default BlogPostApi;
