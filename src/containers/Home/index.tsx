import React from "react";
import CustomTable from "../../components/CustomTable";
import Toolbox from "../../components/Toolbox";
import Header from "../../components/Header";

function Home() {
  return (
    <section className="mw8 bg-light-gray center pa3">
      <Header />
      <Toolbox />
      <CustomTable />
    </section>
  );
}

export default Home;
