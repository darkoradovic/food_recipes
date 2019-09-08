import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {HashLink} from 'react-router-hash-link'
import img from "../Assets/Images/HEADER IMAGE.png";
import About from "../components/About";
import Contact from "../components/Contact";
import axios from "axios";


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
        //console.log(this.state.recipes);
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
            <HashLink to="/#category">
              <button className="btn-home">
                Category <i className="fas fa-chevron-down"></i>
              </button>
            </HashLink>
          </div>
          <div className="col home-col ">
            <img
              src={img}
              alt="..."
              
              className=" home-img"
            />
          </div>
        </div>
        <div className="row" id="category" style={{marginTop: '100px', marginBottom: '80px'}}>
          {this.state.recipes.map(recipe => {
            return (
              <div className="col" key={recipe.idCategory}>
                <div className="col">
                  <Link to={`category/${recipe.strCategory}`}>
                    <img
                      src={recipe.strCategoryThumb}
                      alt="..."
                      style={{ width: "250px" }}
                      className="rounded mx-auto d-block"
                    />
                  </Link>
                  <p className="text-center"><b>{recipe.strCategory}</b></p>
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
