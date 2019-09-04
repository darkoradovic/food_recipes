import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Category extends Component {
  state = {
    recipes: [],
    random: [],
    category: this.props.match.params.meal
  };

  componentDidMount() {
    const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.category}`;
    axios
      .get(api)
      .then(res => res.data)
      .then(data => {
        this.setState({ recipes: data.meals });
        console.log(this.state.recipes);
        console.log(this.props.match.params.meal);
      });

    const ran = `https://www.themealdb.com/api/json/v1/1/random.php`;
    axios
      .get(ran)
      .then(res => res.data)
      .then(data => {
        this.setState({
          random: data.meals
        });
        console.log(this.state.random);
      });
  }

  render() {
    return (
      <div className="container my-5">
        {this.state.random.map(recipe => {
          return (
            <div className="row" key={recipe.idMeal}>
              <div className="col">
                <h1>{recipe.strCategory}</h1>
                <p>Our recommendetion</p>
                <img
                  src={recipe.strMealThumb}
                  alt="..."
                  className="category-reco"
                />
                <h4>{recipe.strMeal}</h4>
              </div>

              <div className="col">
                <input
                  type="text"
                  placeholder="Search meals..."
                  className="search-box"
                  style={{ float: "right" }}
                />
              </div>
            </div>
          );
        })}

        <div className="line-category"></div>

        <div className="row">
          {this.state.recipes.map(recipe => {
            return (
              <div
                className="col-10 mx-auto col-md-6 .col-lg-2 mb-3 "
                key={recipe.idMeal}
              >
                <Link to={`/single-meal/${recipe.idMeal}`}>
                  <img
                    src={recipe.strMealThumb}
                    alt="..."
                    style={{ width: "250px" }}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
