import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Search extends Component {

  state = {
    recipes: [],
    random: [],
    searchTerm: ""
  }

  componentDidMount() {

    const ran = `https://www.themealdb.com/api/json/v1/1/random.php`;
    axios
      .get(ran)
      .then(res => res.data)
      .then(data => {
        this.setState({
          random: data.meals
        });
        //console.log(this.state.random);
      });
  }

  searchItems = searchTerm => {
    console.log(searchTerm);
    let endpoint = "";
    this.setState({
      recipes: [],
      searchTerm: searchTerm
    });
    if (searchTerm === "") {
      endpoint = ''
    } else {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        //console.log(res.meals)
        this.setState(
          {
            recipes: res.meals
          },
          () => {
            if (this.state.searchTerm !== "") {
              localStorage.setItem("recipe", JSON.stringify(this.state.recipes));
            }
          }
        );

      });
  };

  getData = () => {
    var retrievedData = JSON.parse(localStorage.getItem('recipe'))
    //console.log(retrievedData)

    if (retrievedData === null) {
      console.log('its a null')
    }

    return (
      <div>
        {retrievedData !== null ? <div className="row">
          {retrievedData.map(res => {
            return (
              <div className="col" key={res.idMeal}>
                <Link to={`/single-meal/${res.idMeal}`}><img src={res.strMealThumb} alt="..." style={{ width: "250px" }}
                  className="figure-img rounded mx-auto d-block" />
                </Link>
                <h6 className="text-center">{res.strMeal}</h6>
                <p className="text-center">Category: <b>{res.strCategory}</b></p>
                <p className="text-center">Country: <b>{res.strArea}</b></p>
              </div>
            )
          })}
        </div> : <h1 className="text-center mt-5 mb-5">Sorry, no recipes found for your search.</h1>}



      </div>
    )
  }

  render() {
    return (
      <div className="container py-5">

        {this.state.random.map(recipe => {
          return (
            <div className="row" key={recipe.idMeal}>
              <div className="col" >
                <h1>{recipe.strCategory}</h1>
                <p>Our recommendetion</p>

                <img
                  src={recipe.strMealThumb}
                  alt="..."
                  className="category-reco rounded"
                 
                />

                <h4 className="mt-3">{recipe.strMeal}</h4>
              </div>


            </div>
          );
        })}
        <div className="line-category"></div>

        {this.getData()}

      </div>
    )
  }
}
