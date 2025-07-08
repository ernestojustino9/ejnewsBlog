import React from "react";
import Header from "../components/layouts/Header";
import Carocel from "./carocel/Carocel";
import Contact from "./contact/Contact";
import BlogRecente from "./blog/BlogRecente";

const Home = () => {
  //
  return (
    <div>
      <Header />
      <Carocel />
      <BlogRecente />
      <Contact />
    </div>
  );
};

export default Home;
