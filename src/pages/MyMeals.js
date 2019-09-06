import React, { Component } from 'react'
import axios from 'axios'

export default class MyMeals extends Component {

    state = {
        recipes: [],
        random: []
      };
    
      timeout = null
    
      componentDidMount() {
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
                
                <img
                  src={recipe.strMealThumb}
                  alt="..."
                  className="category-reco"
                />
                <h4>{recipe.strMeal}</h4>
              </div>

              
            </div>
          );
        })}
        
        </div>
        )
    }
}
