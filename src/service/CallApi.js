import { APIKEY, PostUrl, CategoryUrl } from "../Components/Constants";

// call Api for get post for Home_page and blog_page
var myHeaders = new Headers();
myHeaders.append("token", APIKEY);
var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

async function FetchPostApi(currentPage, limit) {
  const response = await fetch(
    `${PostUrl}?page=${currentPage}&perPage=${limit}&sortDirection=desc`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
}

// call Api for get count of all post
async function FetchCountAllPost() {
  const response = await fetch(PostUrl, requestOptions);
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
}

// call Api for get category
async function FetchCategory() {
  const response = await fetch(CategoryUrl, requestOptions);
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
}

// cal Api for post content to server
async function SubmitPostApi({ title, content, category_id, image }) {
  var formdata = new FormData();
  formdata.append("title", title);
  formdata.append("content", content);
  formdata.append("category_id", category_id);
  formdata.append("image", image);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(PostUrl, requestOptions);
  if (!response.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return response.json();
  }
}

export { FetchCountAllPost, FetchPostApi, FetchCategory, SubmitPostApi };
