import React from "react";
import { APIKEY, PostUrl } from "../Components/Constants";

async function HomePostApi() {
  var myHeaders = new Headers();
  myHeaders.append("token", APIKEY);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  const response = await fetch(`${PostUrl}?page=1&perPage=50`, requestOptions);
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
}
export default HomePostApi;
