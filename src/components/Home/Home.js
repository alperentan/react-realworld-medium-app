import React from "react";
import Banner from "./Banner";
import HomeView from "./HomeView";
const Home = (data) => {
  //mevcut kullanici datasi
  const value = data.data;
  return (
    <>
      <Banner />
      <HomeView data={value} />
    </>
  );
};

export default Home;
