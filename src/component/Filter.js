import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import "./Filter.css";

const Filter = () => {
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("all");

  async function fetchFilter() {
    const response = await fetch("https://pokeapi.co/api/v2/type/");
    const data = await response.json();
    setTypes(data.results);
  };

  useEffect(() => {
    fetchFilter();
  }, [currentType]);

  function clickFilter(prop) {
    setCurrentType(prop.target.value);
  }

  function showFilter() {
    const link =
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_" +
      currentType +
      "_Type_Icon.svg";
    return types.map((obj, index) => {
      return (
        <button
          className="filter-type"
          key={index + 1}
          onClick={clickFilter}
          value={obj.name}
        >
          <img className="icon-type" src={obj.name + ".svg"}></img>
          {obj.name}
        </button>
      );
    });
  }


  return (
    <section>
      <p>{currentType}</p>
      <section className="filter-container">
        <button className="filter-type" key={0} onClick={clickFilter} value="all">
          <img></img>
          All
        </button>
        {showFilter()}
      </section>
      {currentType ? Slider(currentType) : Slider("all")}
    </section>
  );
};

export default Filter;
