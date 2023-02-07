import { useEffect, useState } from "react";
import React from "react";
import HomePost from "./HomePost";
import SubmitPost from "../SubmitPost";

function Home() {
  return (
    <section className="main py-5">
      <div className="container">
        <div className="row justify-content-around">
          <h1 className="page-title">Home</h1>
          <SubmitPost />
          <HomePost />
        </div>
      </div>
    </section>
  );
}

export default Home;
