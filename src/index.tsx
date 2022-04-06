import React from "react";
import { render } from "react-dom";
import { Assertion } from "./Assertion";
import Table from "./Table";

const App = () => {
  return (
    <div className="mt-12 max-w-xl mx-auto">
      <h1 className="font-medium text-center leading-tight text-4xl mt-2 mb-2 text-gray-700 mb-7">Your Inbox</h1>
      <Table />
      <Assertion />
    </div>
  );
};

render(<App />, document.getElementById("root"));
