import React, { memo } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}

export default memo(Layout);
