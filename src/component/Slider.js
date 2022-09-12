import React from "react";
import Pokemons from "./Pokemons";
import PokemonsTest from "./PokemonsTest";
import { useState, useEffect } from "react";
import './Slider.css';

const Slider = (currentFilter) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  async function fetchMaxPage() {
    setCurrentPage(0);
    if (currentFilter === "all") {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );
      const data = await response.json();
      setMaxPage(parseInt(data.count / 20));
    } else {
      const response = await fetch(
        "https://pokeapi.co/api/v2/type/" + currentFilter
      );
      const data = await response.json();
      setMaxPage(data.pokemon.length / 20 -1 );
    }
  };

  useEffect(() => {
    fetchMaxPage();
  }, []);

  function clickPrev() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(maxPage);
    }
  }

  function clickNext() {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0);
    }
  }

  function keypressPage(prop){
      var value = prop.target.valueAsNumber;
      if(value && (value>0) && (value<=maxPage)){
        setCurrentPage(prop.target.valueAsNumber-1);
      }
  }

  return (
    <div>
      <div className="slider-container">
      <p className="showNumber">
        {parseInt(currentPage+1)}/{parseInt(maxPage+1)}
      </p>
      <button className="slider" onClick={clickPrev}>prev</button>
      <button onClick={clickNext}>next</button>
      <input type="number"  onKeyUp={keypressPage} min="0" max={maxPage} defaultValue={0}></input>
      </div>
      {Pokemons(currentPage, currentFilter)}
      {/* {PokemonsTest(currentPage, currentFilter)} */}
    </div>
  );
};

export default Slider;
