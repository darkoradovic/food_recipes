import React, { Component } from 'react'
import axios from 'axios'

export default class SingleMeal extends Component {

    state = {
        random: [],
        id: this.props.match.params.id,
        similar:[]
      }; 
      componentDidMount() {
        const ran = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.state.id}`;
    axios
      .get(ran)
      .then(res => res.data)
      .then(data => {
        this.setState({
          random: data.meals
        });
        console.log(this.state.random);
        console.log(this.props.match.params.id)
      });

      const sim = `https://www.themealdb.com/api/json/v1/1/random.php`

      axios.get(sim).then(res => res.data).then(data => {
          
          this.setState({
              similar: data.meals
          })
          console.log(this.state.similar.slice(0,3))
      })
    
      }

    render() {
        return (
            <div className="container my-5">
                <div className="row">
                {this.state.random.map(recipe => {
          return (
            <div className="row" key={recipe.idMeal}>
              <div className="col-4">
                <h1>{recipe.strMeal}</h1>
                
                <img
                  src={recipe.strMealThumb}
                  alt="..."
                  className="category-reco"
                />
                
              </div>
              <div className="col-8 info-single">
                  <h5 className="single-hash"><b>#{recipe.strIngredient1} #{recipe.strIngredient5}</b></h5>
                  <p><b>Category</b>: {recipe.strCategory}</p>
                  <p><b>County:</b> {recipe.strArea}</p>
                  <p><b>Video:</b> {recipe.strYoutube}</p>
                  <p>{recipe.strInstructions}</p>
              </div>
              

              <div className="row" style={{marginTop:'40px'}}>
                <div className="col-md-4 " style={{width:'300px', paddingLeft:'30px'}}>
                    <h6>Ingrediants:</h6>
                    <ul className="single-ing">
                        <li>{recipe.strIngredient1}</li>
                        <li>{recipe.strIngredient2}</li>
                        <li>{recipe.strIngredient3}</li>
                        <li>{recipe.strIngredient4}</li>
                    </ul>
                </div>
                <div className="col-md-4" style={{width:'300px', paddingLeft:'30px'}}>
                    <h6>Measure:</h6>
                    <ul className="single-ing">
                        <li>{recipe.strMeasure1}</li>
                        <li>{recipe.strMeasure2}</li>
                        <li>{recipe.strMeasure3}</li>
                        <li>{recipe.strMeasure4}</li>
                    </ul>
                </div>
            </div>
            </div>
            
            
          );
        })}
                </div>
                <div className="row">
                    
                    <h1 style={{width:'100%', margin:'100px 0 40px 0'}}>Similar meals</h1>
                
                    {this.state.similar.map(recipe => {
                        return (
                            <div className="row" key={recipe.idMeal}>
                            <div className="col-6 col-md-4 " >
                                <img src={recipe.strMealThumb} alt="..." style={{width:'300px', height:'300px'}} />
                                <img src={recipe.strMealThumb} alt="..." style={{width:'300px', height:'300px'}} />
                                <img src={recipe.strMealThumb} alt="..." style={{width:'300px', height:'300px'}} />
                            </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
