import { useEffect, useState } from "react";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { APIKEY, PostUrl, CategoryUrl } from "./Constants";
import FetchCategory from "../service/FetchCategory";

function SubmitPost() {
  const [title, setTitle] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [choose_category, setChoose_category] = useState([]);
  const [fileName, setFileName] = useState("");
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    FetchCategory()
      .then((result) => {
        setChoose_category(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("content", content);
      formdata.append("category_id", category_id);
      formdata.append("image", image);

      var myHeaders = new Headers({
        token: APIKEY,
      });

      let res = await fetch(
        PostUrl,

        {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        }
      );
      let resJson = await res.json();
      if (res.status >= 200 && res.status <= 299) {
        // e.target.reset();
        // setPost("");
        // setTitle("");
        // setCategory_id("");
        // setContent("");
        // setImage("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange_img = (event) => {
    setImage(event.target.files[0]);
    setFileName(event.target.value);
    console.log("show" + event.target.files[0]);
  };

  return (
    <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12    ">
      <div className="bg-white form-box ">
        <h2>Post a Content</h2>
        <form onSubmit={handleSubmit} className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Title Post
          </label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label for="exampleFormControlInput1" className="form-label mt-3">
            Choose Category
          </label>
          <select
            className="form-control arrow-btn"
            id="exampleFormControlSelect1"
            onChange={(e) => setCategory_id(e.target.value)}
            placeholder="Select category"
          >
            <option selected>Select category</option>
            {choose_category.map((cat, key) => (
              <option key={key} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label for="exampleFormControlInput1" className="form-label mt-3">
            Image Post
          </label>
          <div className="upload-btn">
            <FaCamera size="30px" color="#ccc" mt-5 />
            <button type="button" onClick={handleClick}>
              Choose file
            </button>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            // value={image}
            id="formFile"
            ref={hiddenFileInput}
            className="form-control"
            onChange={handleChange_img}
            hidden
          />
          <p>{fileName}</p>

          <label for="exampleFormControlInput1" className="form-label mt-3">
            Content Post
          </label>
          <textarea
            rows="10"
            value={content}
            placeholder="Enter something..."
            className="form-control"
            id="exampleFormControlTextarea1"
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            Create post
          </button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    </div>
  );
}

export default SubmitPost;
