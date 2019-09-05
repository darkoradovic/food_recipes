import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

    state = {
        recipes: [],
        random: [],
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
            console.log(this.state.random);
          });
      }

    getData = () => {
        var retrievedData = JSON.parse(localStorage.getItem('recipe'))
        console.log(retrievedData)

        return (
            <div>
                {retrievedData.map(res => {
                    return(
                        <div key={res.idMeal}>
                            <img src={res.strMealThumb} alt="..." />
                            <h6>{res.strMeal}</h6>
                            <p>Category: <b>{res.strCategory}</b></p>
                            <p>Country: <b>{res.strArea}</b></p>
                        </div>
                    )
                })}
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
                  className="category-reco"
                />
                <h4>{recipe.strMeal}</h4>
              </div>

              
            </div>
          );
        })}
                
                {this.getData()}
            </div>
        )
    }
}
