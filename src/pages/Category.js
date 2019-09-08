import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Category extends Component {
  state = {
    recipes: [],
    random: [],
    category: this.props.match.params.meal,
    searchTerm: '',
    value: ''
  };

  timeout = null

  componentDidMount() {
    const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.category}`;
    axios
      .get(api)
      .then(res => res.data)
      .then(data => {
        this.setState({ recipes: data.meals });
        //console.log(this.state.recipes);
        //console.log(this.props.match.params.meal);
      });

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

  searchItems = (searchTerm) => {
    console.log(searchTerm)
    let endpoint = ''
    this.setState({
      recipes: [],
      searchTerm: searchTerm
    })

    if(searchTerm === ''){
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.category}`;
    }else{
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.searchTerm}`
    }

     this.fetchItems(endpoint) 
  }

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
              localStorage.setItem("searchRecipe", JSON.stringify(this.state.recipes));
            }
          }
        );
        
      }); 
  };

  doSearch = (e) => {
    this.setState({value: e.target.value})
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.searchItems(this.state.value)
    }, 500)

  }

  getData = () => {
    var retrievedData = JSON.parse(localStorage.getItem('searchRecipe'))
    //console.log(retrievedData)
  
    return (
        <div>
            {retrievedData.map(res => {
                return(
                    <div key={res.idMeal}>
                        <img src={res.strMealThumb} alt="..." />
                        <h6>{res.strMeal}</h6>
                        
                    </div>
                )
            })}
        </div>
    )
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
                  style={{ float: "right", marginTop:'60px' }}
                  onChange={this.doSearch}
                  value={this.state.value}
                />
              </div>
            </div>
          );
        })}

        <div className="line-category"></div>

        {this.state.recipes ? 
        <div className="row">
          {this.state.recipes.map(recipe => {
            return (
              <div
                className=" mx-auto col  mb-3 "
                key={recipe.idMeal}
              >
                <Link to={`/single-meal/${recipe.idMeal}`}>
                  <img
                    src={recipe.strMealThumb}
                    alt="..."
                    style={{ width: "250px" }}
                    className="rounded mx-auto d-block"
                  />
                </Link>
                <h6 className="text-center">{recipe.strMeal}</h6>
              </div>
              
            );
          })}
          
        </div>
         : <h1 className="text-center mt-5 mb-5">Sorry, no recipes found for your search.</h1>}
        
      </div>
    );
  }
}
