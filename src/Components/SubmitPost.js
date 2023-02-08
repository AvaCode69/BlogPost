import { useEffect, useState } from "react";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { SubmitPostApi, FetchCategory } from "../service/CallApi";

function SubmitPost() {
  const [title, setTitle] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState([]);
  const [choose_category, setChoose_category] = useState([]);
  const [fileName, setFileName] = useState("");
  const [limitContent, setlimitContent] = useState("");
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    FetchCategory()
      .then((result) => {
        setChoose_category(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();

    SubmitPostApi({ title, content, category_id, image })
      .then((result) => {
        setTitle("");
        setCategory_id("");
        setContent("");
        setImage("");
        setMessage(<p className="text-success">Post Created successfully</p>);
        setTimeout(() => {
          setMessage(" ");
        }, 5000);
      })
      .catch(
        (error) =>
          setMessage(
            <p className="text-danger">
              An Errors occurred in posting data, All fields are required
            </p>
          ),
        setTimeout(() => {
          setMessage(" ");
        }, 5000)
      );
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange_img = (event) => {
    setImage(event.target.files[0]);
    setFileName(event.target.value);
  };

  function handleContent(e) {
    setContent(e.target.value);
    if (content.length > 255) {
      console.log("limitContent " + content.length);
      setlimitContent(
        <p className="text-danger">
          The content may not be greater than 255 characters
        </p>
      );
      setTimeout(() => {
        setlimitContent(" ");
      }, 5000);
    }
  }

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
          <div className="upload-box">
            <FaCamera size="30px" color="#ccc" mt-5 />
            <button type="button" onClick={handleClick}>
              Choose file
            </button>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
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
            // maxlength="255"
            rows="10"
            value={content}
            placeholder="Enter something..."
            className="form-control"
            id="exampleFormControlTextarea1"
            onChange={handleContent}
          />

          <button type="submit" className="round-btn">
            Create post
          </button>
          <div className="text-center pt-3">
            {message}
            {limitContent}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitPost;
