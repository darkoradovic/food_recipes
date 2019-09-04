import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "../Assets/Images/HEADER IMAGE.png";
import About from "../components/About";
import Contact from "../components/Contact";
import axios from "axios";

import { recipes } from "../tempList";

export default class Home extends Component {
  state = {
    recipes: [],
    url: ""
  };

  componentDidMount() {
    const api = "https://www.themealdb.com/api/json/v1/1/categories.php";
    axios
      .get(api)
      .then(res => res.data)
      .then(data => {
        this.setState({ recipes: data.categories });
        console.log(this.state.recipes);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row home">
          <div className="col home-text">
            <h1>Food recipes</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <Link to="/category">
              <button className="btn-home">
                Category <i className="fas fa-chevron-down"></i>
              </button>
            </Link>
          </div>
          <div className="col">
            <img
              src={img}
              alt="..."
              style={{ width: "500px", height: "600px" }}
            />
          </div>
        </div>
        <div className="row">
          {this.state.recipes.map(recipe => {
            return (
              <div className="row" key={recipe.idCategory}>
                <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
                  <Link to={`category/${recipe.strCategory}`}>
                    <img
                      src={recipe.strCategoryThumb}
                      alt="..."
                      style={{ width: "250px" }}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <About />
        <Contact />
      </div>
    );
  }
}
