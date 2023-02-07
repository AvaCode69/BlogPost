import React from "react";
import { APIKEY, PostUrl, CategoryUrl } from "../Components/Constants";

async function FetchCategory() {
  var myHeaders = new Headers();
  myHeaders.append("token", APIKEY);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const response = await fetch(CategoryUrl, requestOptions);
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
}
export default FetchCategory;
