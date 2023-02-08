import { useEffect, useState } from "react";
import React from "react";
import HomePost from "./HomePost";
import SubmitPost from "../SubmitPost";

function Home() {
  return (
    <section className=" py-5">
      <div className="container main">
        <h1 className="page-title">Home</h1>
        <SubmitPost />
        <HomePost />
      </div>
    </section>
  );
}

export default Home;
