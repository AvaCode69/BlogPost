import { useEffect, useState } from "react";
import postImg from "../images/postImg.jpg";
import React from "react";
import CallPost from "./CallPost";
import SubmitPost from "./SubmitPost";

function Home() {
  return (
    <section className="main py-5">
      <div className="container">
        <div className="row justify-content-around">
          <h1 className="page-title">Home</h1>
          <SubmitPost />
          <CallPost />
        </div>
      </div>
    </section>
  );
}

export default Home;
