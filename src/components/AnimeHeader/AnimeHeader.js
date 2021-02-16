import React from "react";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

export default function AnimeHeader(props) {
  const { ...rest } = props;
  return(
    <Header
      brand="Ygam's Portfolio Site"
      rightLinks={<HeaderLinks />}
      fixed
      changeColorOnScroll={{
        height: 400,
        color: "white"
      }}
      {...rest}
    />
  )
}
