import React from "react";
import CommentSection from "../../commentSection/CommentSection";
import Contact from "../contact/Contact";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Srevice from "../servicees/Service";
import CustomerPic from "./custopic/CustomerPic";
import HomeBanner from "./HomeBanner";
import Team from "./team/Team";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <HomeBanner></HomeBanner>
      <Srevice></Srevice>
      {/* <CustomerPic></CustomerPic> */}
      <Team></Team>
      <Contact></Contact>
      <CommentSection></CommentSection>
      <Footer></Footer>
    </div>
  );
};

export default Home;
