import React from "react";

const Banner = () => {
  const token = localStorage.getItem("jwt");
  var loggedIn = false;
  //conduit banner'i giris yapilmamissa gosteriyoruz, giris yapilmissa kaldiriyoruz(demo sitesinde boyle oldugu icin yaptim)
  if (token) {
    loggedIn = true;
  }
  return loggedIn ? (
    <></>
  ) : (
    <div className="banner">
      <div className="header-text-container">
        <h1 className="banner-header">conduit</h1>
        <p className="banner-text">A place to share your knowledge.</p>
      </div>
    </div>
  );
};

export default Banner;
