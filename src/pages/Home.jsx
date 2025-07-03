import React from "react";
import Header from "../components/layouts/Header";
import Welcomehero from "./welcomehero/Welcomehero";
import About from "./about/About";
import Skills from "./skills/Skills";
import Service from "./service/Service";
import Contact from "./contact/Contact";
import Projecto from "./projecto/Projecto";
import BlogRecente from "./blog/BlogRecente";


const Home = () => {

  // 
  return (
    <div>
      <Header />
      <Welcomehero />
      <About/>
      <Skills/>
      <Service/>
      <Projecto/>
      <BlogRecente/>
      <Contact/>
    </div>
  );
};

export default Home;
