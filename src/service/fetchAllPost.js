import React from "react";
import { APIKEY, PostUrl, CategoryUrl } from "../Components/Constants";

async function fetchAllPost() {
  var myHeaders = new Headers();
  myHeaders.append("token", APIKEY);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const response = await fetch(PostUrl, requestOptions);
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
}
export default fetchAllPost;
