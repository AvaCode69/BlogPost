import Post from "./Post";
import { useEffect, useState } from "react";
import postImg from "../images/postImg.jpg";
import React from "react";
import CallPost from "./CallPost";
import SubmitPost from "./SubmitPost";

function Home() {
  return (
    <section className="row content-sec  ">
      <SubmitPost />
      <CallPost />
    </section>
  );
}

export default Home;
