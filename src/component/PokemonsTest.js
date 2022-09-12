import React from "react";
import { useEffect, useState } from "react";
import './Pokemon.css';

const PokemonsTest = (currentPage, currentFilter) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsImg, setPokemonsImg] = useState({});

  async function fetchData() {
    if (currentFilter === "all" ) {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + currentPage * 20
      );
      const data = await response.json();
      setPokemons(data.results);
    } else {
      const response = await fetch(
        "https://pokeapi.co/api/v2/type/" + currentFilter
      );
      const data = await response.json();
      const numberPage = currentPage * 20;
      setPokemons(
        data.pokemon.slice(
          numberPage,
          numberPage + 20 
        )
      );
    }
  };

  async function fetchImgTest() {

    if(currentFilter=== "all" ){
        const test = pokemons.map(({name, url}) => {
            return fetch(url);
         });
         
      const responseImg = await Promise.all(test);
      console.log(responseImg);
      const dataImg = await responseImg.json();

      var temp = pokemonsImg;
      temp["test"] = dataImg.sprites.front_default;
      setPokemonsImg(temp);
    } 
    else {
      const responseImg = await Promise.all(pokemons.map((obj) => {
        const pokemonUrl = obj.pokemon.url;
        return fetch(pokemonUrl);
     }));
     const dataImg = await responseImg.json();

     var temp = pokemonsImg;
     temp["test"] = dataImg.sprites.front_default;
     setPokemonsImg(temp);
    }

};

  async function fetchImg(name,url) {
      const responseImg = await fetch(url);
      const dataImg = await responseImg.json();
      var temp = pokemonsImg;
      temp[name] = dataImg.sprites.front_default;
      setPokemonsImg(temp);
  };

  useEffect(() => {
    fetchData();
    fetchImgTest();
    // if(currentFilter=== "all" ){
    //   pokemons.map(({name, url}) => {
    //     fetchImg(name,url);
    //   });
    // } 
    // else {
    //   pokemons.map((obj) => {
    //     if(obj.pokemon){
    //     fetchImg(obj.pokemon.name,obj.pokemon.url);
    //     } 
    //   });
    // }
  }, [currentFilter, pokemons]);

  function showPokemons() {
    if(currentFilter=== "all" ){
      return pokemons.map(({ name, url }, index) => {
        return (
          <div className="pokemon-container" key={index}>
            <img className="pokemon-image" src={pokemonsImg[name]}></img>
            <p>{name}</p>
          </div>
        );
      });
    } else {
      return pokemons.map((obj, index) => {
      if(obj.pokemon){
        const name = obj.pokemon.name;
        return (
          <div className="pokemon-container" key={index}>
            <img className="pokemon-image" src={pokemonsImg[name]}></img>
            <p>{name}</p>
          </div>
        );
      }
      });
    }

  }

  return (
    <div className="content">
      {showPokemons()}
    </div>
  );
};
export default PokemonsTest;